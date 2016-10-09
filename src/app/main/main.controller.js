export default mainController;

/** @ngInject */
function mainController(Author, Book) {
    var vm = this;

    vm.authors = Author;
    vm.books = Book;
}
