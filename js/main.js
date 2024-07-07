var products = null;
var productsContainer = document.getElementById("product-tabel-container");
var warningMessage = document.getElementById("warning-msg");
var tabelBody = document.getElementById("tabel-body");


function handelDataShow() {
  if ( products && products.length !== 0) {
    console.log("tableOpened");
    productsContainer.classList.remove("d-none");
    productsContainer.classList.add("d-block");
    warningMessage.classList.add("d-none");
    warningMessage.classList.remove("d-block");

    var rows_eleemnts = "";
// fetch data
    for (var i = 0; i < products.length; i++) {
      rows_eleemnts += `
             <tr>
            <th>${i + 1}</th>
            <td>${products[i].name}</td>
            <td>${products[i].cat}</td>
            <td>${products[i].price}</td>
            <td>
            ${products[i].dec}
            </td>
            <td>
              <button class="btn btn-outline-success" onclick="editProduct(${i})">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </td>
            <td>
              <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
          
        `;
    }

    tabelBody.innerHTML = rows_eleemnts;
  } else {
    warningMessage.classList.remove("d-none");
    warningMessage.classList.add("d-block");
    productsContainer.classList.add("d-none");
    productsContainer.classList.remove("d-block");
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
createBtn.onclick = function() {
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
function reset(){
  productForm.reset();
}
// delete product
function deleteProduct(id){
    products.splice(id,1);
    handelDataShow();
    Swal.fire({
      title: 'Product Deleted!',
      text: 'Your product has been deleted successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
          confirmButton: 'btn-delete'
      }
  });
}
//edit product
function editProduct(id){
    var product = products[id];

  productName.value = product.name; 
  productCat.value = product.cat; 
  productPrice.value = product.price; 
  productDesc.value = product.dec;
  
  createBtn.innerHTML ="Update Product";

  createBtn.onclick = function(){

  products[id].name =  productName.value; 
  products[id].cat =  productCat.value;
  products[id].price =  productPrice.value; 
  products[id].dec =  productDesc.value; 
  createBtn.innerHTML ="Add Product";
reset();
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