require.config({
    baseUrl: 'app/scripts',
    urlArgs: 'v=2.0'
});

require(
    [

        'services/routeResolver',
        'app',
        'directives/general-directives',
        'directives/ui-directives',
        'directives/ui-form-directives',
        'directives/chart-directives',
        'services/localization-services',
        'services/ui-services',
        'services/exGeo-pages-services',
        'services/exGeo-http',
        'services/utils',
        'services/exGeo-authenticate',
        'controllers/general-Controllers'
        //'ibid2goApp/services/ibid2go-http',
        //'ibid2goApp/services/ibid2go-pages',
        //'ibid2goApp/services/ibid2go-paths',
        //'ibid2goApp/services/utils',

    ],
    function () {
        angular.bootstrap(document, ['exGeoApp']);
    });
