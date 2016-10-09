export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider) {
    $stateProvider
        .state('app', {
            url: '/',
            component: 'main'
        });
}
