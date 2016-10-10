export default mainController;

/** @ngInject */
function mainController(Author, Book) {
    const vm = this;

    vm.authors = Author;
    vm.books = new Book();

    vm.inHalloween = inHalloween;
    vm.lastFridayOfMonth = lastFridayOfMonth;

    vm.options = [{
        name: 'Sort by Book',
        icon: 'sort-alphabetical',
        fn: () => {
            vm.books = new Book({
                order: 'name%20ASC'
            });
        }
    }, {
        name: 'Sort by Author',
        icon: 'sort-alphabetical',
        fn: () => {
            vm.books = new Book({
                order: 'authorId%20ASC'
            });
        }
    }, {
        name: 'Reset',
        icon: 'refresh',
        fn: () => {
            vm.books = new Book();
        }
    }];

    // -------

    /**
     * Check if book was publish in halloween
     *
     * @param book
     * @returns {boolean}
     */
    function inHalloween(book) {
        if (!book) {
            return false;
        }

        const date = new Date(book.publish_date);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);

        if (book.genre === 'horror' && day === '31' && month === '10') {
            return true;
        }

        return false;
    }

    /**
     * Check if book is finance and publish last friday of any month
     *
     * @param $book
     * @returns {boolean}
     */
    function lastFridayOfMonth(book) {
        if (!book) {
            return false;
        }

        if (book.genre === 'finance' && checkLastFriday_(book.publish_date)) {
            return true;
        }

        return false;
    }

    /**
     * Check if date is last friday of month
     *
     * @param date
     * @returns {boolean}
     * @private
     */
    function checkLastFriday_(publishDate) {
        const date = new Date(publishDate);

        if (date.getDay() === 5 && date.getDate() >= 23) {
            return true;
        }

        return false;
    }
}
