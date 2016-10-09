export default themeConfig;

/** @ngInject */
function themeConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('amber');
}
