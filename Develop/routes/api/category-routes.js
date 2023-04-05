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

// get request used to find a single category by it's id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ mode: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// post request, when activated code will create a new category with sequelize ORM
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
 
});

// put request, when triggered code will update an existing category in the db 
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch {
    console.error(err);
    res.status(500).json(err);
  }
});

// delete request, when triggered this will delete the existing code in the db
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json('The category has been removed', categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
