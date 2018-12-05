// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {

  // Add book to list
  UI.prototype.addBookToList = function (book) {
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
}

// Clear fields function
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
}

// Fields validation
UI.prototype.showAlert = function (message, className) {
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

    // Clear fields
    ui.clearFields();

    //Show message
    ui.showAlert("You successfully added data", "success");
  }

  e.preventDefault();
});