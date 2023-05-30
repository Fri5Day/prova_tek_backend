const db = require("../config/database");
// ==> Método responsável por criar um novo 'Produto':
exports.createProduct = async (req, res) => {
  const { product_name, description, price, category } = req.body;
  const { rows } = await db.query(
    "INSERT INTO products (product_name, description, price, category) VALUES ($1, $2, $3, $4)",
    [product_name, description, price, category]
  );
  res.status(201).send({
    message: "Product added successfully!",
    body: {
      product: { product_name, description, price, category }
    },
  });
};


exports.listAllProducts = async (req, res) => {
  const response = await db.query('SELECT * FROM products ORDER BY product_name ASC');
  res.status(200).send(response.rows);
};


exports.findProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM products WHERE productid = $1', [productId]);
  res.status(200).send(response.rows);
};


exports.updateProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const { product_name, description, price, category } = req.body;
  const response = await db.query(
    "UPDATE products SET product_name = $1, description = $2, price = $3, category = $4 WHERE productId = $5",
    [product_name, description, price, category, productId]
  );
  res.status(200).send({ message: "Product Updated Successfully!" });
};


exports.deleteProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  await db.query('DELETE FROM products WHERE productId = $1', [
    productId
  ]);
  res.status(200).send({ message: 'Product deleted successfully!', productId });
};
