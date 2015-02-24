'use strict';

// Declare app level module which depends on filters, and services
angular.module('exGeo.exGeoPages', [])
.provider('$exGeoPages', function () {




    var provider;



    provider = createProvider();


    this.$get = function () { return provider; };

    function createProvider() {
        //  force the partial page to reload when the page is refreshed
        var d = new Date();
        var version = "?v=" + d.getTime();

        var pages = [

                //{ path: '/pages/signin', route: { url: 'Signin', dir: "pages/", requiresLogin: false } },
                //{ path: '/pages/signup', route: { url: 'Signup', dir: "pages/", requiresLogin: false } },
                { path: '/dashboard', route: { url: 'Dashboard', dir: "", requiresLogin: true } },
                { path: '/sendmoney', route: { url: 'SendMoney', dir: "", requiresLogin: false } }

        ];

        var errorPages = [
                 { path: '/pages/404', route: { templateUrl: 'app/views/pages/404.html', requiresLogin: false } },
                  { path: '/', route: { templateUrl: 'app/views/landing.html', requiresLogin: false } },
                    { path: '/index', route: { templateUrl: 'app/views/landing.html', requiresLogin: false } }

        ];

        var providerValue = {
            pages: pages,
            landingPage: '/index',
            error404Page: '/pages/404',
            errorPages: errorPages
       };

        return providerValue;
    };


});
