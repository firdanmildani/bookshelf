function alreadyReadBook(id) {
    let confirmAction = confirm("Pindahkan Buku ke List Selesai Dibaca ?");

    if (confirmAction == true) {
        const booksDataDetail = getBookList().filter(a => a.id == id);
        const newBookData = {
            id: booksDataDetail[0].id,
            title: booksDataDetail[0].title,
            author: booksDataDetail[0].author,
            year: booksDataDetail[0].year,
            isCompleted: true
        }

        const bookData = getBookList().filter(a => a.id != id);
        localStorage.setItem(localBooksDataKey,JSON.stringify(bookData));

        putBookList(newBookData);
        
        if (localStorage.getItem(localBooksDataKey) !== null){
            const booksData = getBookList();
            showData(booksData);
        }

    }else{
        return 0;
    }
}

function unreadBook(id) {
    let confirmAction = confirm("Pindahkan Buku ke List Belum Dibaca ?")

    if (confirmAction == true) {
        const booksDataDetail = getBookList().filter(a => a.id == id);
        const newBookData = {
            id: booksDataDetail[0].id,
            title: booksDataDetail[0].title,
            author: booksDataDetail[0].author,
            year: booksDataDetail[0].year,
            isCompleted: false
        }

        const bookData = getBookList().filter(a => a.id != id);
        localStorage.setItem(localBooksDataKey,JSON.stringify(bookData));

        putBookList(newBookData);

        if (localStorage.getItem(localBooksDataKey) !== null){
            const booksData = getBookList();
            showData(booksData);
        }

    }else{
        return 0;
    }
}