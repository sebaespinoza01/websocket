
const socket = io();


socket.on('productCreated', (newProduct) => {
    const productList = document.getElementById('productList');
    const newItem = document.createElement('li');
    newItem.textContent = newProduct;
    productList.appendChild(newItem);
});

socket.on('productCreatedConfirmation', (message) => {
    alert(message);
});


function createProduct() {
    const productName = document.getElementById('productName').value;
    socket.emit('createProduct', productName);
}
