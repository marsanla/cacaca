import angular from 'angular';

import author from './author';
import book from './book';

const servicesModule = 'services';

angular.module(servicesModule, [
    author,
    book
]);

export default servicesModule;
