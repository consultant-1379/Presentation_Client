define(['torContainer/Application'], function (Container) {
    window.location.hash = '';
    var container, presenter;

    describe('Container', function () {
        beforeEach(function () {
            runs(function () {
                container = new Container({
                    appsUrl: "../test/apps.json",
                    appRoot: "test",
                    topMenu: '#TopMenu',
                    container: '#Container'
                });
                container.start();
                presenter = container._children[0];


            });

            waitsFor(function () {
                return presenter.apps && presenter.apps.length > 1;
            });
        });

        afterEach(function () {
            runs(function () {
                container.stop();

            });
        });
        describe('Check if app  settings available in presenter', function () {


            ['appsUrl', 'appRoot'].forEach(function (name) {
                it('Option ' + name + ' Is defined', function () {
                    runs(function () {
                        var options = presenter.app.options;
                        expect(options[name]).toBeDefined();
                    });
                });
            });


        });

        it('check if loads apps.json and lenght equals 2', function () {

            runs(function () {
                expect(presenter.apps).toEqual(jasmine.any(Array));
                expect(presenter.apps.length).toEqual(2);

            });


        });

        describe('Check getSegments Method', function () {

            it('window.location.hash is empty expect return empty', function () {

                runs(function () {
                    var getSegments = presenter.getSegments;
                    window.location.hash = '';
                    expect(getSegments()[0]).toEqual('');

                });

            });

            it('window.location.hash equals #/appTest1/home expect to return array with values', function () {
                runs(function () {
                    var getSegments = presenter.getSegments;
                    window.location.hash = 'appTest1/home';
                    expect(getSegments()).toEqual(jasmine.any(Array));
                    var array = ['appTest1', 'home'];
                    array.forEach(function (name, index) {
                        expect(getSegments()[index]).toEqual(name);
                    });

                });


            });
        });
        describe('Check checkApps Method', function () {


            it('Application started presenter.started length equals to Be  1', function () {
                runs(function () {

                    var checkApps = presenter.checkApps;

                    expect(presenter.started.length).toEqual(1);
                });

            });


            it('Location is changed presenter.started length equals 2', function () {

                runs(function () {
                    window.location.hash = 'appTest2/home';

                });
                waits(300);
                runs(function () {
                    expect(presenter.started.length).toEqual(2);
                });

            });

        });

        describe('test TopBar Component', function () {

            it('TopBar component is created and presenter + view is available', function () {
                runs(function () {
                    var menuApp = presenter.menuApp;

                    expect(menuApp).toEqual(jasmine.any(Object));
                    expect(menuApp._children[0]).toEqual(jasmine.any(Object));
                    expect(menuApp._children[0].view).toEqual(jasmine.any(Object));


                });
            });
            it('check if apps is available in component', function () {
                runs(function () {
                    var menuApp = presenter.menuApp;

                    expect(menuApp.options.apps).toEqual(jasmine.any(Object));

                });
            });
            describe('Check if in view elements available', function () {

                var array = ['topMenu', 'signOutButton'];

                array.forEach(function (name) {

                    it('in view ' + name, function () {
                        runs(function () {

                            var menuApp = presenter.menuApp;
                            var view = menuApp._children[0].view;

                            expect(view[name]).toEqual(jasmine.any(Object));
                        });

                    });


                });
            });

        });

    });

});