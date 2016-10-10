'use strict';

import angular from 'angular';

const authorService = 'service.author';

/** @ngInject */
angular.module(authorService, [])
    .service('Author', function ($http) {
        /**
         * Init Author
         *
         * @constructor
         */
        function Author() {
            /**
             * Items loaded
             *
             * @type {{}}
             */
            this.loadedPages = {};

            /**
             * Total number of items
             *
             * @type {number}
             */
            this.numItems = 0;

            /**
             * Number of items to fetch per request
             *
             * @type {number}
             */
            this.PAGE_SIZE = 10;

            this.fetchNumItems_();
        }

        /**
         * Get item in the index
         *
         * @param index
         * @returns {*}
         */
        Author.prototype.getItemAtIndex = function getItemAtIndex(index) {
            const pageNumber = Math.floor(index / this.PAGE_SIZE);
            const page = this.loadedPages[pageNumber];

            if (page) {
                return page[index % this.PAGE_SIZE];
            } else if (page !== null) {
                this.fetchPage_(pageNumber);
            }
        };

        /**
         * Get length
         *
         * @returns {number}
         */
        Author.prototype.getLength = function getLength() {
            return this.numItems;
        };

        /**
         * Fecth page
         *
         * @param pageNumber
         * @private
         */
        Author.prototype.fetchPage_ = function fetchPage_(pageNumber) {
            this.loadedPages[pageNumber] = null;
            const skip = this.PAGE_SIZE * pageNumber;

            $http
                .get('http://localhost:3002/api/Authors?filter[limit]=' + this.PAGE_SIZE + '&filter[skip]=' + skip)
                .then(angular.bind(this, function (response) {
                    this.loadedPages[pageNumber] = response.data;
                }));
        };

        /**
         * Fetch number of items
         *
         * @private
         */
        Author.prototype.fetchNumItems_ = function fetchNumItems_() {
            $http
                .get('http://localhost:3002/api/Authors/count')
                .then(angular.bind(this, function (response) {
                    this.numItems = response.data.count;
                }));
        };

        return new Author();
    });

export default authorService;
