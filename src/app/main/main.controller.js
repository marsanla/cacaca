export default mainController;

/** @ngInject */
function mainController(Author, Book) {
    const vm = this;

    vm.authors = Author;
    vm.books = Book;
}
