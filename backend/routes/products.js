const router = require('express-promise-router')();

const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/products');



router.post('/', createProduct);
router.get('/:limit/:page', getProducts);
router.put('/:id', updateProduct);
router.delete('/:id',deleteProduct);



module.exports = router;