define([
    'Titan',
    'template!./template.html',
    'styles!./styles.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template:template,

        styles:styles,

        events:{
            "focus .w-Search-input": "onSearchFieldFocus",
            "blur  .w-Search-input": "onSearchFieldBlur",
            "keyup .w-Search-input": "onSearchFieldKeyUp",
            "click .w-Search-cancel": "onSearchCancel"
        },

        onSearchFieldFocus: function(e) {
            if (this['searchResults'].$el.children().length > 0) {
                this.$(".w-Search-results").addClass("w-Search-results_highlighted");
            }
        },

        onSearchFieldBlur: function(e) {
            this.$(".w-Search-results").removeClass("w-Search-results_highlighted");
        },

        addResultsHighlight: function() {
            this.$(".w-Search-results").addClass("w-Search-results_highlighted");
        },

        removeResultsHighlight: function() {
            this.$(".w-Search-results").removeClass("w-Search-results_highlighted");
        },

        onSearchFieldKeyUp: function(e) {
            var searchTerm = this.$(e.target).val();
            this.options.eventBus.trigger("onSearchFieldKeyUp", searchTerm);
        },

        onSearchCancel: function(e) {
            this.$(".w-Search-input").val("");
            this.options.eventBus.trigger("onSearchFieldKeyUp", "");
            this.$(".w-Search-input").focus();
        }

    });

});