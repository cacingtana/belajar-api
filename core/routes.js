const { addBook, getAllBook, getBookById, updateBookById, deleteBookById } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },
    {
        method: 'GET', //get all
        path: '/books',
        handler: getAllBook, 
    },
    {
        method: 'GET', //get data bi ID
        path: '/books/{bookId}',
        handler: getBookById,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookById,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookById,
    },
];

module.exports = routes;