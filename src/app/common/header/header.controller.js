export default headerController;

/** @ngInject */
function headerController($mdSidenav) {
    const vm = this;

    vm.toggleLeft = toogleSidenav('left');

    // --------

    function toogleSidenav(navID) {
        return function () {
            $mdSidenav(navID).toggle();
        }
    }
}
