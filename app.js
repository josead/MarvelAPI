

//configs
requirejs.config({
    baseUrl: 'js',
    paths: {
        app: '../app'
    }
});

requirejs(['main']);
