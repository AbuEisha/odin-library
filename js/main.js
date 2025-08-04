const myLibrary = [];
const booksContainer = document.querySelector(".books");
const showDialogBtn = document.querySelector(".show-dialog");
const closeDialogBtn = document.getElementById("cancel");
const dialogBox = document.getElementById("dialog");
const titleBox = document.getElementById("title");
const authorBox = document.getElementById("author");
const pagesBox = document.getElementById("pages");
const statusBox = document.getElementById("status");
const addBookBtn = document.getElementById("add-book");

function Book(id, title, author, nums, status) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.numsOfPages = nums;
  this.status = status;
}
const addBookToLibrary = () => {
  const book = new Book(
    self.crypto.randomUUID(),
    titleBox.value,
    authorBox.value,
    pagesBox.value,
    statusBox.value
  );
  myLibrary.push(book);
};

const resetInputs = () => {
  titleBox.value = "";
  authorBox.value = "";
  pagesBox.value = "";
  statusBox.value = "Read";
};

const removeBook = (ele, arr) => {
  arr.map((book, i) => {
    if (book.id === ele.parentElement.parentElement.id) {
      arr.splice(i, 1);
    }
  });
  if (arr.length != 0) {
    displayBooks(arr);
  } else {
    booksContainer.innerHTML = "";
    let msgBox = document.createElement("div");
    msgBox.className = "empty-msg";
    msgBox.textContent = "There Is No Books";
    booksContainer.appendChild(msgBox);
  }
};

const changeStatus = (ele, arr) => {
  arr.forEach((book) => {
    if (book.id === ele.parentElement.parentElement.id) {
      if (book.status === "Read") {
        book.status = "No Read";
      } else {
        book.status = "Read";
      }

      displayBooks(arr);
    }
  });
};

const displayBooks = (array) => {
  booksContainer.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let card = document.createElement("div");
    card.className = "card";
    card.id = array[i].id;
    booksContainer.appendChild(card);

    let title = document.createElement("h3");
    title.textContent = array[i].title;
    card.appendChild(title);

    let author = document.createElement("div");
    author.className = "book-author";
    author.innerHTML = `The Book Author Is: <span>${array[i].author}</span>`;
    card.appendChild(author);

    let pages = document.createElement("div");
    pages.className = "book-pages";
    pages.innerHTML = `Number Of Pages Are: <span>${array[i].numsOfPages}</span>`;
    card.appendChild(pages);

    let status = document.createElement("div");
    status.className = "book-status";
    status.innerHTML = `The Book Status Is: <span>${array[i].status}</span>`;
    card.appendChild(status);

    let buttonsBox = document.createElement("div");
    buttonsBox.className = "buttons";
    card.appendChild(buttonsBox);

    let removeBtn = document.createElement("button");
    removeBtn.className = "remove";
    removeBtn.textContent = "Remove Book";
    buttonsBox.appendChild(removeBtn);

    let changeBtn = document.createElement("button");
    changeBtn.className = "change";
    changeBtn.textContent = "Change Status";
    buttonsBox.appendChild(changeBtn);
  }
};

showDialogBtn.addEventListener("click", () => {
  dialogBox.showModal();
});

closeDialogBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialogBox.close();
  resetInputs();
});

addBookBtn.addEventListener("click", (e) => {
  if (titleBox.value && authorBox.value && pagesBox.value && statusBox.value) {
    e.preventDefault();
    addBookToLibrary();
    displayBooks(myLibrary);
    dialogBox.close();
    resetInputs();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.className === "remove") {
    removeBook(e.target, myLibrary);
  } else if (e.target.className === "change") {
    changeStatus(e.target, myLibrary);
  }
});
