'use strict';

import angular from 'angular';

const bookService = 'service.book';

/** @ngInject */
angular.module(bookService, [])
    .service('Book', function ($http) {
        ///**
        // * Init Book
        // *
        // * @constructor
        // */
        //function Book() {
        //    /**
        //     * @type {!Object<?Array>} Data pages, keyed by page number (0-index).
        //     */
        //    this.loadedPages = {};
        //
        //    /** @type {number} Total number of items. */
        //    this.numItems = 0;
        //
        //    /** @const {number} Number of items to fetch per request. */
        //    this.PAGE_SIZE = 10;
        //
        //    this.fetchNumItems_();
        //}
        //
        //
        ///**
        // * Get item in the index
        // *
        // * @param index
        // * @returns {*}
        // */
        //Book.prototype.getItemAtIndex = function getItemAtIndex(index) {
        //    var pageNumber = Math.floor(index / this.PAGE_SIZE);
        //    var page = this.loadedPages[pageNumber];
        //
        //    if (page) {
        //        return page[index % this.PAGE_SIZE];
        //    } else if (page !== null) {
        //        this.fetchPage_(pageNumber);
        //    }
        //};
        //
        //
        ///**
        // * Get length
        // *
        // * @returns {number}
        // */
        //Book.prototype.getLength = function getLength() {
        //    return this.numItems;
        //};
        //
        //
        ///**
        // * Fecth page
        // *
        // * @param pageNumber
        // * @private
        // */
        //Book.prototype.fetchPage_ = function fetchPage_(pageNumber) {
        //    console.log(pageNumber)
        //    this.loadedPages[pageNumber] = null;
        //    const skip = this.PAGE_SIZE * pageNumber;
        //
        //    $http
        //        .get('http://localhost:3002/api/Books?filter[limit]=' + this.PAGE_SIZE + '&filter[skip]=' + skip)
        //        .then(angular.bind(this, function (response) {
        //            this.loadedPages[pageNumber] = response.data;
        //        }));
        //};
        //
        //
        ///**
        // * Fetch number of items
        // *
        // * @private
        // */
        //Book.prototype.fetchNumItems_ = function fetchNumItems_() {
        //    $http
        //        .get('http://localhost:3002/api/Books/count')
        //        .then(angular.bind(this, function (response) {
        //            this.numItems = response.data.count;
        //        }));
        //};


        /**
         * Init Book
         *
         * @constructor
         */
        function Book() {
            /**
             * Number of items loaded
             *
             * @type {number}
             * @private
             */
            this.numLoaded_ = 0;

            /**
             * Amount of items to load
             *
             * @type {number}
             * @private
             */
            this.toLoad_ = 0;

            /**
             * List of items
             *
             * @type {Array}
             */
            this.items = [];


            /**
             * Amount of items to load in each iteration
             *
             * @type {number}
             * @private
             */
            this.PAGE_SIZE = 20;


            /**
             * Total items
             *
             * @type {number}
             * @private
             */
            this.numItems = 0;


            this.fetchNumItems_();
        }


        /**
         * Get item in the index
         *
         * @param index
         * @returns {*}
         */
        Book.prototype.getItemAtIndex = function getItemAtIndex(index) {
            if (index > this.numLoaded_) {
                this.fetchMoreItems_(index);
                return null;
            }

            return this.items;
        };


        /**
         * Get length
         *
         * @returns {number}
         */
        Book.prototype.getLength = function getLength() {
            return this.numLoaded_ + this.PAGE_SIZE;
        };


        /**
         * Fetch more items
         *
         * @private
         */
        Book.prototype.fetchMoreItems_ = function fetchMoreItems_(index) {
            //if (this.toLoad_ < index) {
            //    this.toLoad_ += 20;
            //    $timeout(angular.noop, 300).then(angular.bind(this, function() {
            //        this.numLoaded_ = this.toLoad_;
            //    }));
            //}


            if (this.toLoad_ < index) {
                //this.toLoad_ += this.PAGE_SIZE;

                console.log(this.toLoad_, index)


                $http
                    .get('http://localhost:3002/api/Books?filter[limit]=' + this.PAGE_SIZE + '&filter[skip]=' + this.toLoad_)
                    .then(angular.bind(this, function (response) {
                        this.items = this.items.concat(response.data);
                    }));


                //$http.get('app/common/services/data/book.json', {
                //        responseType: 'arraybuffer'
                //    })
                //    .success(function (data) {
                //        //var file = new Blob([data], { type: 'application/pdf' });
                //        //var fileURL = URL.createObjectURL(file);
                //        //window.open(fileURL);
                //
                //        var decodedString = String.fromCharCode.apply(null, new Uint8Array(data));
                //        //var obj = JSON.parse(decodedString);
                //        console.log(decodedString)
                //
                //        console.log("with " + data.byteLength
                //            + " bytes in a variable of type '" + typeof(data) + "'", data);
                //    })
                //    .error(function (data, status) {
                //        console.log("Request failed with status: " + status);
                //    });


                //$http.get('app/common/services/data/book.json').then(angular.bind(this, function (obj) {
                //    this.total_items_ = obj.data.length;
                //
                //    console.log(this.total_items_)
                //
                //    this.items = this.items.concat(obj.data);
                //    this.numLoaded_ = this.toLoad_;
                //}));
            }
        };


        /**
         * Fetch number of items
         *
         * @private
         */
        Book.prototype.fetchNumItems_ = function fetchNumItems_() {
            $http
                .get('http://localhost:3002/api/Books/count')
                .then(angular.bind(this, function (response) {
                    this.numItems = response.data.count;
                }));
        };


        return new Book();
    });

export default bookService;


