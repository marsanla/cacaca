import angular from 'angular';
import 'angular-mocks';
import headerM from './header';

describe('header component', () => {
    beforeEach(() => {
        angular.mock.module(headerM);
    });

    it('should pass a test', angular.mock.inject(() => {
        expect(1).toEqual(1);
    }));
});
