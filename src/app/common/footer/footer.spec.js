import angular from 'angular';
import 'angular-mocks';
import {footer} from './footer';

describe('footer component', () => {
    beforeEach(() => {
        angular
            .module('common.footer', ['app/common/footer/footer.html'])
            .component('casumoFooter', footer);
        angular.mock.module('casumoFooter');
    });
});
