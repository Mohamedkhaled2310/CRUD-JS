var products = JSON.parse(localStorage.getItem("products"));
var productsContainer = document.getElementById("product-tabel-container");
var warningMessage = document.getElementById("warning-msg");
var tabelBody = document.getElementById("tabel-body");
var isFound = false;

function handelDataShow() {
  if (products && products.length !== 0) {
    console.log("tableOpened");
    console.log(products);
    productsContainer.classList.replace("d-none", "d-block");
    warningMessage.classList.replace("d-block", "d-none");

    tabelBody.innerHTML = '';

    for (var i = 0; i < products.length; i++) {
      var row = document.createElement('tr');

      var cellIndex = document.createElement('th');
      cellIndex.textContent = i + 1;
      row.appendChild(cellIndex);

      var cellName = document.createElement('td');
      cellName.textContent = products[i].name;
      row.appendChild(cellName);

      var cellCat = document.createElement('td');
      cellCat.textContent = products[i].cat;
      row.appendChild(cellCat);

      var cellPrice = document.createElement('td');
      cellPrice.textContent = products[i].price;
      row.appendChild(cellPrice);

      var cellDec = document.createElement('td');
      cellDec.textContent = products[i].dec;
      row.appendChild(cellDec);

      var cellEdit = document.createElement('td');
      var editButton = document.createElement('button');
      editButton.classList.add('btn', 'btn-outline-success');
      editButton.onclick = (function(index) {
        return function() {
          editProduct(index);
        };
      })(i);
      editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      cellEdit.appendChild(editButton);
      row.appendChild(cellEdit);

      var cellDelete = document.createElement('td');
      var deleteButton = document.createElement('button');
      deleteButton.classList.add('btn', 'btn-outline-danger');
      deleteButton.onclick = (function(index) {
        return function() {
          deleteProduct(index);
        };
      })(i);
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      cellDelete.appendChild(deleteButton);
      row.appendChild(cellDelete);

      tabelBody.appendChild(row);
    }
  } else {
    warningMessage.classList.replace("d-none", "d-block");
    productsContainer.classList.replace("d-block", "d-none");
  }
}
handelDataShow();

var productName = document.getElementById("product_name");
var productCat = document.getElementById("product_category");
var productPrice = document.getElementById("product_price");
var productDesc = document.getElementById("prodct_desc");
var createBtn = document.getElementById("create-btn");
var resetBtn = document.getElementById("reset-btn");
var productForm = document.getElementById("product-form");

//add data
createBtn.onclick = function () {
  if (!productName.value.trim() || !productCat.value.trim() || !productPrice.value.trim() || !productDesc.value.trim()) {
    Swal.fire({
      title: 'Error!',
      text: 'Please fill in all fields.',
      icon: 'error',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-danger'
      }
    });
    return;
  }

  if (!products) {
    products = [];
  }
  var product = {
    name: productName.value,
    cat: productCat.value,
    price: productPrice.value,
    dec: productDesc.value,
  };

  products.push(product);
  localStorage.setItem("products",JSON.stringify(products));
  handelDataShow();
  Swal.fire({
    title: 'Product Added!',
    text: 'Your product has been added successfully.',
    icon: 'success',
    confirmButtonText: 'OK',
    customClass: {
      confirmButton: 'btn-add'
    }
  });

};

// set inputs empty
function reset() {
  productForm.reset();
}

// delete product
function deleteProduct(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      products.splice(id, 1);
      handelDataShow();
    }
  });
}

//edit product
function editProduct(id) {
  var product = products[id];

  productName.value = product.name;
  productCat.value = product.cat;
  productPrice.value = product.price;
  productDesc.value = product.dec;

  createBtn.innerHTML = "Update Product";

  createBtn.onclick = function () {
    if (!productName.value.trim() || !productCat.value.trim() || !productPrice.value.trim() || !productDesc.value.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all fields.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-danger'
        }
      });
      return;
    }

    products[id].name = productName.value;
    products[id].cat = productCat.value;
    products[id].price = productPrice.value;
    products[id].dec = productDesc.value;
    createBtn.innerHTML = "Add Product";
    reset();
    localStorage.setItem("products",JSON.stringify(products));
    handelDataShow();
    Swal.fire({
      title: 'Product Updated!',
      text: 'Your product has been updated successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn-update'
      }
    });
  }
}

var searchBtn = document.querySelector("#search");

searchBtn.addEventListener("keyup", function (event) {
  var value = searchBtn.value;
  tabelBody.innerHTML = "";
  var isFound = false;
  

  var notFoundElement = document.getElementById('not-found');
  if (notFoundElement) {
    notFoundElement.remove();
  }
  
  for (var i = 0; i < products.length; i++) {
    if (products[i].name.includes(value)) {
      var row = document.createElement('tr');

      var cellIndex = document.createElement('th');
      cellIndex.textContent = i + 1;
      row.appendChild(cellIndex);

      var cellName = document.createElement('td');
      cellName.textContent = products[i].name;
      row.appendChild(cellName);

      var cellCat = document.createElement('td');
      cellCat.textContent = products[i].cat;
      row.appendChild(cellCat);

      var cellPrice = document.createElement('td');
      cellPrice.textContent = products[i].price;
      row.appendChild(cellPrice);

      var cellDec = document.createElement('td');
      cellDec.textContent = products[i].dec;
      row.appendChild(cellDec);

      var cellEdit = document.createElement('td');
      var editButton = document.createElement('button');
      editButton.classList.add('btn', 'btn-outline-success');
      editButton.onclick = (function (index) {
        return function () {
          editProduct(index);
        };
      })(i);
      editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      cellEdit.appendChild(editButton);
      row.appendChild(cellEdit);

      var cellDelete = document.createElement('td');
      var deleteButton = document.createElement('button');
      deleteButton.classList.add('btn', 'btn-outline-danger');
      deleteButton.onclick = (function (index) {
        return function () {
          deleteProduct(index);
        };
      })(i);
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      cellDelete.appendChild(deleteButton);
      row.appendChild(cellDelete);

      tabelBody.appendChild(row);
      isFound = true;
    }
  }

  if (!isFound) {
    var notFound = document.createElement('div');
    notFound.setAttribute('id', 'not-found');
    var h3 = document.createElement('h3');
    h3.textContent = "No product includes this letter";
    notFound.appendChild(h3);
    notFound.classList.add('text-center', 'text-secondary');
    productsContainer.appendChild(notFound);
  }
});
