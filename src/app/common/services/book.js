'use strict';

import angular from 'angular';
import _ from 'lodash';

const bookService = 'service.book';

/** @ngInject */
angular.module(bookService, [])
    .service('Book', function ($http) {
        /**
         * Init Book
         *
         * @constructor
         */
        function Book(filters) {
            /**
             * Number of items loaded
             *
             * @type {number}
             * @private
             */
            this.numLoaded_ = 0;

            /**
             * Items loaded
             *
             * @type {{}}
             */
            this.loadedPages = {};

            /**
             * Check if is the end of items
             *
             * @type {boolean}
             * @private
             */
            this.isEndOfItems_ = false;

            /**
             * Number of items to fetch per request
             *
             * @type {number}
             */
            this.PAGE_SIZE = 20;

            /**
             * Filters for the request
             *
             * @type {{}}
             */
            this.filters = filters || {};
        }

        /**
         * Get item in the index
         *
         * @param index
         * @returns {*}
         */
        Book.prototype.getItemAtIndex = function getItemAtIndex(index) {
            const pageNumber = Math.floor(index / this.PAGE_SIZE);
            const page = this.loadedPages[pageNumber];

            if (page) {
                return page[index % this.PAGE_SIZE];
            } else if (page !== null) {
                this.fetchMoreItems_(pageNumber);
            }
        };

        /**
         * Get length
         *
         * @returns {number}
         */
        Book.prototype.getLength = function getLength() {
            if (this.isEndOfItems_) {
                return this.numLoaded_;
            }

            return this.numLoaded_ + this.PAGE_SIZE;
        };

        /**
         * Fetch more items
         *
         * @private
         */
        Book.prototype.fetchMoreItems_ = function fetchMoreItems_(pageNumber) {
            this.loadedPages[pageNumber] = null;
            const skip = this.PAGE_SIZE * pageNumber;
            let filters = '';

            if (!_.isEmpty(this.filters)) {
                _.forEach(this.filters, function (value, key) {
                    filters += '&filter[' + key + ']=' + value;
                });
            }

            $http
                .get('http://localhost:3002/api/Books?filter[limit]=' + this.PAGE_SIZE + '&filter[include]=author&filter[skip]=' + skip + filters)
                .then(angular.bind(this, function (response) {
                    this.numLoaded_ += response.data.length;

                    if (!response.data.length || response.data.length < this.PAGE_SIZE) {
                        this.isEndOfItems_ = true;
                    }

                    this.loadedPages[pageNumber] = response.data;
                }));
        };

        return Book;
    });

export default bookService;
