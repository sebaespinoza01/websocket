

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('websocket')
    res.render('home', { products: products });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products: products });
});

io.on('connection', (socket) => {
    console.log('Usuario conectado por WebSocket');
    socket.on('createProduct', (productName) => {
        products.push(productName);
        io.emit('productCreated', productName);
        socket.emit('productCreatedConfirmation', `Producto creado: ${productName}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
