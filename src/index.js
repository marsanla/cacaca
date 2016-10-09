import angular from 'angular';

import common from './app/common';
import main from './app/main/main';


angular
    .module('app', [
        common,
        main
    ]);
