define([
    'Titan'
], function (Titan) {

    return  Titan.Collection.extend({

        params: null,

        searchTerm: '',

        timeTook: 0,

        totalResults: 0,

        url: function () {
            /*var paramString = "sort=@timestamp:desc"
            if (this.params != null) {
                paramString += '&q=*'
                if (this.params.has('q') && this.params.get('q') != '') {
                    paramString += this.params.get('q') + '*';
                }
                if (this.params.has('ts_from') && this.params.has('ts_to')) {
                    paramString += '%20@timestamp:[' + this.params.get('ts_from') + ' TO ' + this.params.get('ts_to') + ']';
                }
                if (this.params.has('from') && this.params.get('from') != '') {
                    paramString += '&from=' + this.params.get('from');
                }
                if (this.params.has('size') && this.params.get('size') != '') {
                    paramString += '&size=' + this.params.get('size');
                } else {
                    paramString += '&size=50';
                }
            }*/
            return '/logstash-*/_search'; //?' + paramString;
        },

        parse: function (res) {
            this.timeTook = res.took;
            this.totalResults = res.hits.total;
            return res.hits.hits;
        },

        otherFetch: function() {
            var queryObj = {
                sort: {
                    '@timestamp': {
                        order: 'desc'
                    }
                },
                from: 0,
                size: 50,
                query: {
                    filtered: {
                        query: {
                            query_string: {
                                query: '* '
                            }
                        }
                    }
                }
            };

            if (this.params.has('ts_from') && this.params.has('ts_to')) {
                queryObj.query.filtered.filter = {
                    range: {
                        '@timestamp': {
                            from: this.params.get('ts_from'),
                            to: this.params.get('ts_to'),
                            include_upper: true,
                            include_lower: true
                        }
                    }
                };
            }
            if (this.params.has('from')) {
                queryObj.from = this.params.get('from');
            }
            if (this.params.has('size')) {
                queryObj.size = this.params.get('size');
            }
            if (this.params.has('q') && this.params.get('q') != undefined) {
                queryObj.query.filtered.query.query_string.query += this.params.get('q');
            }
            this.fetch({
                data: JSON.stringify(queryObj),
                type: 'POST',
                dataType: 'json'
            });
        },

        setParamsModel: function (model) {
            this.params = model;
        }

    });

});