define(['Titan',
        "_",
        '../../torMegamenu/Application'],
    function (Titan, _, Megamenu) {


        return Titan.Presenter.extend({
                AFTER_LOAD_EVENT: 'Container.AfterLoadEvent',

                init: function (app) {
                    this.app = app;
                    var Model = Titan.Model.extend({
                        urlRoot: this.app.options.appsUrl
                    });

                    var model = this.create(Model);
                    model.on('change', this.onAppListLoaded, this);
                    model.fetch();
                },
                getSegments: function () {
                    var loc = window.location.hash;
                    var match = loc.match(/#?\/?(.*)$/);
                    match = match[1].split('/');
                    return match;
                },
                onAppListLoaded: function (model) {
                    var self = this;

                    this.started = [];
                    this.apps = model.get('apps');
                    this.checkApps();
                    window.onhashchange = function () {
                        self.checkApps();

                    };
                    //Load Component
                    this.menuApp = new Megamenu({
                        container: this.app.options.topMenu,
                        apps: this.apps
                    });
                    this.menuApp.start();


                },
                checkApps: function () {
                    var segments = this.getSegments();
                    self = this;

                    this.apps.some(function (app, index) {

                        if ((self.started.indexOf(segments[0]) === -1 && app.namespace === segments[0]) || (self.started.indexOf(app.namespace) === -1 && segments[0] === '')) {
                            self.loadApp(app);
                            return true;
                        }

                        if (segments[0] === '' && index === 0) {
                            return true;
                        }
                        return false;
                    });
                },
                loadApp: function (app) {

                    var appRoot = (this.app.options.appRoot !== undefined) ? this.app.options.appRoot + '/' : '',
                        self = this;

                    require([appRoot + app['namespace'] + '/' + app['script']], function () {
                        self.onDepsLoad.apply(self, arguments);     // TODO: replace with underscore bind
                    });

                    this.started.push(app['namespace']);

                },

                onDepsLoad: function (Application) {

                    var container = this.app.container,
                        option = {silent: true};
                    this.app.globalEvents.on("global:title", this.changeTitle, this);

                    var options = _.extend(this.app.options, {
                        container: container,
                        eventBus: this.app.globalEvents
                    });

                    var app = new Application(options);
                    this.app.localEvents.trigger(this.AFTER_LOAD_EVENT, app);

                    app.start();


                },
                changeTitle: function (title) {
                    document.title = title;
                }
            }
        )
            ;
    });