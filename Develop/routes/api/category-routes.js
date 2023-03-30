const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get request is being made, code retrieves the the categories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll([
      { include: [{ model: Product, attributes : ['id', 'product_name', 'price', 'stock', 'category_id']}] },
    ]);
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ mode: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
  } catch {
    console.log(err);
    res.status(500).json(err);
  }
 
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryDate = await Category.uppdate(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
