define([
    'jscore/core',
    'text!./template.html',
    './ext/ext.dom'
], function (core, template, dom) {

    var View = core.View.extend({
        getTemplate: function () { return template; }
    });

    return core.App.extend({

        View: View,

        onStart: function () {
            this.applyDropdowns();
            this.applyComboboxes();
            this.applyFilterExpand();
            this.applyTableCheckboxes();
        },

        applyDropdowns: function () {
            var dropdowns = dom.findAll('.ebDropdown', this.getElement());

            dropdowns.forEach(function (dropdown) {
                var $button = dropdown.find('.ebBtn');
                var listItems = dom.findAll('.ebComponent-List-item', dropdown);

                $button.addEventHandler('click', function () {
                    $button.trigger('focus');
                });

                listItems.forEach(function (listItem) {
                    listItem.addEventHandler('click', function (event) {
                        alert(listItem.getText());
                    });
                });
            });
        },

        applyComboboxes: function () {
            var rootElement = this.getElement(),
                comboboxes = dom.findAll('.ebCombobox', rootElement),
                body = core.Element.wrap(document.body);

            comboboxes.forEach(function (combobox) {
                var $button = combobox.find('.ebCombobox-Helper');
                var $input = combobox.find('.ebCombobox-Input');
                var listItems = dom.findAll('.ebComponent-List-item', combobox);

                $button.addEventHandler('click', function (event) {
                    $input.trigger('focus');
                });

                listItems.forEach(function (listItem) {
                    listItem.addEventHandler('click', function (event) {
                        $input.setValue(listItem.getText());

                        dom.removeClass(body, 'style1');
                        dom.removeClass(body, 'style2');
                        dom.removeClass(body, 'style3');

                        var id = listItem.getAttribute('data-id');
                        dom.addClass(body, 'style' + id);
                    }, this);
                }, this);
            });
        },

        applyFilterExpand: function () {
            var filters = dom.findAll('.eaNetwork-Filter', this.getElement());

            filters.forEach(function (filter) {
                var $expandBtn = filter.find('.ebIconBtn'),
                    $itemsHolder = filter.find('.eaNetwork-Filter-items');

                $expandBtn.addEventHandler('click', function () {
                    var displayStyle = $itemsHolder.getStyle('display');
                    if (displayStyle === 'none') {
                        dom.removeClass($expandBtn, 'ebIcon-downArrow');
                        dom.addClass($expandBtn, 'ebIcon-upArrow');

                        dom.slideDown($itemsHolder, 500);
                    } else {
                        dom.removeClass($expandBtn, 'ebIcon-upArrow');
                        dom.addClass($expandBtn, 'ebIcon-downArrow');

                        dom.slideUp($itemsHolder, 500);
                    }
                });
            });
        },

        applyTableCheckboxes: function () {
            var tables = dom.findAll('.ebRadioTabs-content .ebTable', this.getElement());

            tables.forEach(function (table) {
                var $selectAllCheck = table.find('input[name="selectAll"]'),
                    rowCheckboxes = dom.findAll('input[name="selectCell"]', table),
                    tableRows = dom.findAll('tbody tr', table);

                $selectAllCheck.addEventHandler('click', function () {
                    if (dom.getProperty($selectAllCheck, 'checked') === true) {
                        rowCheckboxes.forEach(function (rowCheckbox) {
                            dom.setProperty(rowCheckbox, 'checked', true);
                            rowCheckbox.trigger('change');
                        });
                    } else {
                        rowCheckboxes.forEach(function (rowCheckbox) {
                            dom.setProperty(rowCheckbox, 'checked', false);
                            rowCheckbox.trigger('change');
                        });
                    }
                });

                tableRows.forEach(function (tableRow) {
                    var rowCheckbox = tableRow.find('input[name="selectCell"]');

                    rowCheckbox.addEventHandler('change', function (event) {
                        var checkedRows = dom.findAll('input[name="selectCell"]:checked', table);
                        var isAllChecked = checkedRows.length === rowCheckboxes.length;
                        dom.setProperty($selectAllCheck, 'checked', isAllChecked);

                        if (dom.getProperty(rowCheckbox, 'checked') === true) {
                            dom.addClass(tableRow, 'ebTableRow-hightlighted');
                        } else {
                            dom.removeClass(tableRow, 'ebTableRow-hightlighted');
                        }
                    });
                });
            });
        }
    });
});