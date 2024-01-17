const localBooksDataKey = "BOOKS_DATA";

const submitAction = document.getElementById("inputBook");
const searchValue = document.getElementById("searchBookTitle");
const buttonSearch = document.getElementById("searchSubmit");

function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

function putBookList(data){
    if(checkForStorage()){
        let bookData = [];
        if (localStorage.getItem(localBooksDataKey) === null) {
            bookData = [];
        } else {
            bookData = JSON.parse(localStorage.getItem(localBooksDataKey));
        }     
        bookData.unshift(data); 
        if (bookData.length > 20) {
            bookData.pop();
        }
        localStorage.setItem(localBooksDataKey, JSON.stringify(bookData));   
    }
}

function getBookList() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(localBooksDataKey)) || [];
    } else {
        return [];
    }
}

function showData(books = []) {
    const inCompleted = document.getElementById("incompleteBookshelfList");
    const completed = document.getElementById("completeBookshelfList");

    inCompleted.innerHTML = '';
    completed.innerHTML = '';

    books.forEach(book => {
        if (book.isCompleted == false) {
            let el = `
            <article class="book_item">
                <h3 style="text-align:justify;">${book.title}</h3>
                <p style="text-align:justify;">Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>

                <div class="action" style="margin-top: 30px;">
                    <button class="green" onclick="alreadyReadBook('${book.id}')">
                        
                        <span>Selesai Dibaca</span>
                    </button>
                    <button class="red" onclick="deleteBook('${book.id}')">
                        
                        <span>Hapus</span>
                    </button>
                </div>
            </article>
            `

            inCompleted.innerHTML += el;
        }else{
            let el = `
            <article class="book_item">
                <h3 style="text-align:justify;">${book.title}</h3>
                <p style="text-align:justify;">Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>

                <div class="action" style="margin-top: 30px;">
                    <button class="green" onclick="unreadBook('${book.id}')"> 
                        
                        <span>Belum Dibaca</span>
                    </button>
                    <button class="red" onclick="deleteBook('${book.id}')">
                        
                        <span>Hapus</span>
                    </button>
                </div>
            </article>
            `
            completed.innerHTML += el;
        }
    });
}

submitAction.addEventListener("submit", function(event){
    const inputTitle = document.getElementById("inputBookTitle").value;
    const inputAuthor = document.getElementById("inputBookAuthor").value;
    const inputYear = document.getElementById("inputBookYear").value;
    const alreadyRead = document.getElementById("inputBookIsComplete");
    
    const newBookData = {
        id: +new Date(),
        title: inputTitle,
        author: inputAuthor,
        year: inputYear,
        isCompleted: alreadyRead.checked
    }
    putBookList(newBookData);
    location.reload();
});
 
window.addEventListener("load", function(){
    if (checkForStorage) {
        if (localStorage.getItem(localBooksDataKey) !== null){
                const booksData = getBookList();
                showData(booksData);
            }
    }else{
        alert("Browser yang Anda gunakan tidak mendukung Web Storage")
    }
});

function deleteBook(id) {
    const booksData = getBookList();
    let confirmAction = confirm(`Anda Yakin Ingin Menghapus Data Buku : ${booksData[0].title} ?`);

    if (confirmAction == true) {
        const booksDataDetail = getBookList().filter(a => a.id == id);
        const booksData = getBookList().filter(a => a.id != id);
        localStorage.setItem(localBooksDataKey,JSON.stringify(booksData));
        showData(getBookList());
        window.location.reload();
    }else{
        return 0;
    }
}

buttonSearch.addEventListener("click",function(e) {
    e.preventDefault()

    if (localStorage.getItem(localBooksDataKey) == "") {    
        alert("List Kosong");
        return location.reload();
    }else{
        
        const getByTitle = getBookList().filter(a => a.title == searchValue.value);
        if (getByTitle.length == 0) {
            alert(`Buku Yang Anda Cari Tidak Ada Di List`);
            return location.reload();
        }else{
            showSearchResult(getByTitle);
        }
    }
    
    searchValue.value = '';
    
})

function showSearchResult(books) {
    const searchResult = document.getElementById("searchResult");

    searchResult.innerHTML = '';
    let el = `
        <div id="searchResult" class="book_list">
            <h3>Hasil Pencarian :</h3>
        </div>
        `
        searchResult.innerHTML += el;
    
    books.forEach(book => {
        let el = `
        <article class="book_item">
            <div id="search_book_list" class="book_list">
            <section class="book_shelf">
                <article class="book_item">
                <h3 style="text-align:justify;">${book.title}</h3>
                <p style="text-align:justify;">Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
                <p class="ket">Keterangan : <span>${book.isCompleted ? 'Sudah Dibaca' : 'Belum Dibaca'}</span></p> 
                </article>
            </section>
                
            </div>
        </article>
        `

        searchResult.innerHTML += el;
    });
}