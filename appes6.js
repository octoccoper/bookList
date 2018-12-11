// Book Constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Constructor
class UI {

  // Add book to list
  addBookToList(book) {
    const list = document.getElementById("book-list");

    // Create list element
    const row = document.createElement("tr");

    // Insert cols

    row.innerHTML = `
    <tr>
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.isbn} </td>
    <td><a href="#" class="delete">X</a></td>
    </tr>
    `;

    list.appendChild(row);
  }

  // Clear fields function
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  // Fields validation
  showAlert(message, className) {
    // Create div
    const div = document.createElement("div");

    // Add classes
    div.className = `alert ${className}`;

    // Add text
    div.appendChild(document.createTextNode(message));

    // Add node before form
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // Timeout
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  // Delete book
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI;

      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    
    books.forEach(function (book, index) { 
      console.log("isbn=",isbn);
      console.log("book.isbn",book.isbn);
      if (book.isbn === isbn) { 
        books.splice(index, 1);
      }
    })

    localStorage.setItem("books", JSON.stringify(books));
  }
}


// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);


// Event listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validation data
  if ((title || author || isbn) === "") {
    //Show message
    ui.showAlert("Please fill all data", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add book to local storage 
    Store.addBook(book);

    // Clear fields
    ui.clearFields();

    //Show message
    ui.showAlert("You successfully added data", "success");
  }

  e.preventDefault();
});

// Remove books from list
document.getElementById("book-list").addEventListener("click", function (e) {

  //Istantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Remove from localStorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showAlert("You deleted all items", "success");

  e.preventDefault();
})