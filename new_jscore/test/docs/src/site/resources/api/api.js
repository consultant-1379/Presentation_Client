YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "core.App",
        "core.AppContext",
        "core.Element",
        "core.EventBus",
        "core.Region",
        "core.View",
        "core.Widget",
        "ext.css",
        "ext.dom",
        "ext.dom.Element",
        "ext.mediator.EventBus",
        "ext.mvp.Collection",
        "ext.mvp.Model",
        "ext.mvp.View",
        "interfaces.App",
        "interfaces.AppContext",
        "interfaces.UIComponent"
    ],
    "modules": [
        "core",
        "ext",
        "interfaces"
    ],
    "allModules": [
        {
            "displayName": "core",
            "name": "core",
            "description": "The core contains a set of base classes that can be extended by developers to create scalable client apps."
        },
        {
            "displayName": "ext",
            "name": "ext",
            "description": "ext is a set of application extensions that may be accessed by the core classes. A standard set of extensions are provided by the framework and additional extensions may be added by applications. Only extensions may access the base layer."
        },
        {
            "displayName": "interfaces",
            "name": "interfaces",
            "description": "The interfaces package contains a set of abstract interface classes that are extended by the core base classes."
        }
    ]
} };
});