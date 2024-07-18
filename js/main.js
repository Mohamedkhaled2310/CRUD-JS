var products = JSON.parse(localStorage.getItem('products'))
var productsContainer = document.getElementById("product-tabel-container");
var warningMessage = document.getElementById("warning-msg");
var tabelBody = document.getElementById("tabel-body");
var isFound = false;

var productName = document.getElementById("product_name");
var productCat = document.getElementById("product_category");
var productPrice = document.getElementById("product_price");
var productDesc = document.getElementById("prodct_desc");
var createBtn = document.getElementById("create-btn");
var resetBtn = document.getElementById("reset-btn");
var productForm = document.getElementById("product-form");
let searchBtn = document.getElementById("search");


class Product{
  constructor(name,cat,price,dec){
    this.name = name;
    this.cat =cat;
    this.price = price;
    this.dec = dec;
  }
}


class Admin{
  constructor(){
    this.products =products;
  }
  
   handelDataShow() {
    console.log(this);
    if (this.products && this.products.length !== 0) {
      console.log("tableOpened");
      productsContainer.classList.replace("d-none", "d-block");
      warningMessage.classList.replace("d-block", "d-none");
  
      tabelBody.innerHTML = '';
  
      for (var i = 0; i < this.products.length; i++) {
        var row = document.createElement('tr');
  
        var cellIndex = document.createElement('th');
        cellIndex.textContent = i + 1;
        row.appendChild(cellIndex);
  
        var cellName = document.createElement('td');
        cellName.textContent = this.products[i].name;
        row.appendChild(cellName);
  
        var cellCat = document.createElement('td');
        cellCat.textContent = this.products[i].cat;
        row.appendChild(cellCat);
  
        var cellPrice = document.createElement('td');
        cellPrice.textContent = this.products[i].price;
        row.appendChild(cellPrice);
  
        var cellDec = document.createElement('td');
        cellDec.textContent = this.products[i].dec;
        row.appendChild(cellDec);
  
        var cellEdit = document.createElement('td');
        var editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-outline-success');
        editButton.onclick = (function(index) {
          return function() {
            admin.editProduct(index);
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
            admin.deleteProduct(index);
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

  addProduct(product){
 
    if (!this.products) {
      this.products = [];
    }
 
    this.products.push(product);
    localStorage.setItem("products",JSON.stringify(this.products));
    this.handelDataShow();
    Swal.fire({
      title: 'Product Added!',
      text: 'Your product has been added successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn-add'
      }
    });
  
  }

  // delete product
  deleteProduct(id) {
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
        this.products.splice(id, 1);
        localStorage.setItem("products",JSON.stringify(this.products));
        this.handelDataShow();
        
      }
    });
  }

  //edit product
 editProduct(id) {
  let product = this.products[id];

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

    admin.products[id].name = productName.value;
    admin.products[id].cat = productCat.value;
    admin.products[id].price = productPrice.value;
    admin.products[id].dec = productDesc.value;
    createBtn.innerHTML = "Add Product";
    productForm.reset();
    localStorage.setItem("products",JSON.stringify(admin.products));
    admin.handelDataShow();
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

 search(searchValue){
  var value =searchValue;
  tabelBody.innerHTML = "";
  var isFound = false;
  

  var notFoundElement = document.getElementById('not-found');
  if (notFoundElement) {
    notFoundElement.remove();
  }
  
  for (var i = 0; i < this.products.length; i++) {
    if (this.products[i].name.includes(value)) {
      var row = document.createElement('tr');

      var cellIndex = document.createElement('th');
      cellIndex.textContent = i + 1;
      row.appendChild(cellIndex);

      var cellName = document.createElement('td');
      cellName.textContent = this.products[i].name;
      row.appendChild(cellName);

      var cellCat = document.createElement('td');
      cellCat.textContent = this.products[i].cat;
      row.appendChild(cellCat);

      var cellPrice = document.createElement('td');
      cellPrice.textContent = this.products[i].price;
      row.appendChild(cellPrice);

      var cellDec = document.createElement('td');
      cellDec.textContent = this.products[i].dec;
      row.appendChild(cellDec);

      var cellEdit = document.createElement('td');
      var editButton = document.createElement('button');
      editButton.classList.add('btn', 'btn-outline-success');
      editButton.onclick = (function (index) {
        return function () {
          admin.editProduct(index);
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
          admin.deleteProduct(index);
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
 }

}


const admin = new Admin(products);
admin.handelDataShow();


//onclick to add data
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
    }else{
    const product = new Product(productName.value,productCat.value,productPrice.value,productDesc.value);
    admin.addProduct(product);
}
};

searchBtn.addEventListener("keyup", function (event) {
  admin.search(searchBtn.value);
});



document.addEventListener('DOMContentLoaded', function() {
  let animatedTitle = document.querySelector("#animatedTitle");

  const text = "CRUD";
  const speed = 300; 
  const delay = 850; 
  let i = 0;

  function typeWriter() {
      if (i < text.length) {
          animatedTitle.children[i].style.visibility = "visible";
          i++;
          setTimeout(typeWriter, speed);
      } else {
          setTimeout(() => {
            Array.from(animatedTitle.children).forEach(span =>{
              span.style.visibility = "hidden";
             });
              i = 0;
              setTimeout(typeWriter, speed);
          }, delay);
      }
  }

  Array.from(animatedTitle.children).forEach(span =>{
    span.style.visibility = "hidden";
   });


  typeWriter();
});
