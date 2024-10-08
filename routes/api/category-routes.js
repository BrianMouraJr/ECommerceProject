const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // Find all categories and include associated products
    const categories = await Category.findAll({
      include: [
        {
          model: Product, // Assuming Category has a relation with Product
          as: 'products'  // Ensure you are using the right alias if applicable
        }
      ]
    });

    // Return the found categories and their products
    res.status(200).json(categories);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve categories' });
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
