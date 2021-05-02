const { nanoid } = require("nanoid");
const books = require("./books");

const addBook = (request, h) => {
    const { name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading, } = request.payload;

    const bookId = nanoid(16);
    const insertAt = new Date().toISOString();
    const updatedAt = insertAt;
    const finished = false;

    const newBook = {
            bookId, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertAt, updatedAt,
    };
    books.push(newBook);

    const isFinished = books.filter((book) => book.pageCount === book.readPage); 

    if(!newBook.name){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if(newBook.readPage > newBook.pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    if(isFinished){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllBook = () => {
    if(!books){
        return {
            status: 'success',
            data: {
                "books": [],
            },
        };
    };

    return {
        status: 'success',
        data: {
            books,
        },
    };
};

const getBookById = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((b) => b.bookId === bookId)[0];

    if(book !== undefined){
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
}


const updateBookById = (request, h) => {
    const { bookId } = request.params;

    const { name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading, } = request.payload;

    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.bookId === bookId);

    if(!newBook.name){ //belum selesai
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if(newBook.readPage > newBook.pageCount){  //belum selesai
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    if(index != -1){
        books[index] = {
            ...books[index],name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    };
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookById = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((book) => book.bookId === bookId);

    if (index !== -1){
        books.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = { addBook, getAllBook, getBookById, updateBookById, deleteBookById };