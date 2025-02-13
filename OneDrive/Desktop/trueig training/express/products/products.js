const express = require('express');
const app = express();
const PORT =3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory array to store products
let products = [];

// POST /products - Add a new product
app.post('/products', (req, res) => {
    const { name, price, description } = req.body;
    const newProduct = {
        id: products.length + 1, //  ID generation
        name,
        price,
        description,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});


// GET /products/:id - Retrieve a specific product by ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});



// GET /products - Retrieve all products
app.get('/products', (req, res) => {
    res.json(products);
});

// PUT /products/:id - Update an existing product
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const { name, price, description } = req.body;
    product.name = name;
    product.price = price;
    product.description = description;
    res.json(product);
});

// DELETE /products/:id - Remove a product
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    products.splice(productIndex, 1);
    res.status(204).send(); // No content
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});