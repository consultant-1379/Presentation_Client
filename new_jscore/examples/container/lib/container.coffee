root = exports ? this
root.container =

  load: (appId) ->
    require
      baseUrl: 'src'
    , [appId + '/app.nocache'], ((config) =>
      require
        context: appId
        baseUrl: 'src'
        paths: config.paths
      , [config.entryPoint], this.callback

    ), this.error

  callback: (App) ->
    console.log App

  error: () ->
    throw "Can't load application"
