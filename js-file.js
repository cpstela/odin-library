let myLibrary = [];
const noteArchive= document.getElementById("note-archive");
const creatorBtn = document.getElementById("creator-btn");

//Book constructor.
function Book(title,author,pages,read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//Function that toggles a book’s read status on the Book prototype instance.
Book.prototype.toggleRead = function() {
  let index = this.parentElement.parentElement.parentElement.getAttribute('data-index');
  if (myLibrary[index].read === 'read') {
    myLibrary[index].read = 'not read' 
  } else {
    myLibrary[index].read ='read';
  } 
  displayBooks(myLibrary);
}

//Store the new book objects into the library array.
function addBookToLibrary() {
  let book = new Book(document.getElementById("creator-title").value, document.getElementById("creator-author").value,
   document.getElementById("creator-pages").value, document.getElementById("creator-read").checked ? 'read' : 'not read');
  myLibrary.push(book);
  displayBooks(myLibrary);
}

//Function that loops through the array and displays each book by creating the necessary DOM elements.
function displayBooks(library){
  emptyNoteArchive(noteArchive);
  library.forEach(book => {
    const bookNote = document.createElement('div');
    bookNote.classList.add('book-note'); 
    bookNote.setAttribute('data-index', myLibrary.indexOf(book));   

    const close = document.createElement("div");
    close.classList.add('close');
    close.addEventListener('click', removeBook);
  
    const list = document.createElement("ul");

    const title = document.createElement("li");
    const author = document.createElement("li");
    const pages = document.createElement("li");
    const read = document.createElement("li");

    let titleContent = document.createElement("span");
    let authorContent = document.createElement("span");
    let pagesContent = document.createElement("span");
    let readContent = document.createElement("button");
    titleContent.textContent = book.title;
    authorContent.textContent = book.author
    pagesContent.textContent= book.pages
    readContent.textContent = book.read
    readContent.addEventListener('click', book.toggleRead);

    noteArchive.appendChild(bookNote);
    bookNote.appendChild(close);
    bookNote.appendChild(list);
    list.appendChild(title);
    list.appendChild(author);
    list.appendChild(pages);
    list.appendChild(read);
    title.appendChild(titleContent);
    author.appendChild(authorContent);
    pages.appendChild(pagesContent);
    read.appendChild(readContent);
  });
}

//Remove book from library.
function removeBook(e){
  let index = e.target.parentElement.getAttribute('data-index');
  myLibrary.splice(index, 1)
  displayBooks(myLibrary);
}

//When we click the creator button we make a new book after validating the form.
creatorBtn.addEventListener('click', function(e) {
  e.preventDefault;
  if (checkIfEmpty()){
    addBookToLibrary()
    emptyCreator();
  } else {
    alert("Some fields are missing.");
  }
})

//Empty the fields of the form.
function emptyCreator() {
  document.getElementById("creator-title").value = '';
  document.getElementById("creator-author").value = '';
  document.getElementById("creator-pages").value = ''; 
  document.getElementById("creator-read").checked = false;
}

//Validate the form.
function checkIfEmpty() {
  return (
  document.getElementById("creator-title").value !== '' &&
  document.getElementById("creator-author").value !== '' &&
  document.getElementById("creator-pages").value !== '' 
  );
}

//Remove all children.
function emptyNoteArchive(parent){
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}


/*
TO DO:
toggle read no va. Ha de fer servir prototype i potser data-index.
polir els comentaris
pujar al git
*/

























