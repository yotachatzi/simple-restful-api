const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const contentType = req.headers['content-type'];

    switch (contentType) {
      case 'application/x-www-form-urlencoded':
      case 'application/json': {
        const {
          name,
          description,
          type,
          color,
          price,
        } = req.body;

        const product = new Product({
          name,
          description,
          type,
          color,
          price,
        });

        try {
          const savedProduct = await product.save();

          res.status(201).location(`${req.originalUrl}${savedProduct.id}`).json(savedProduct);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }

        break;
      }

      default:
        res.status(400).json({ error: 'Invalid content type' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (product === null) {
      res.status(404).json({ error: 'Not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const contentType = req.headers['content-type'];
    const { id } = req.params;
    const fieldsToUpdate = req.body;

    switch (contentType) {
      case 'application/x-www-form-urlencoded':
      case 'application/json': {
        try {
          const operationResult = await Product.updateOne(
            { _id: id },
            {
              $set: { ...fieldsToUpdate },
            },
          );

          if (operationResult.n === 0) {
            res.status(404).json({ message: 'Not Found' });
          } else {
            res.status(200).json({ message: 'Resource Updated' });
          }
        } catch (err) {
          res.status(400).json({ message: 'Bad Request' });
        }

        break;
      }

      default:
        res.status(400).json({ error: 'Invalid content type' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const operationResult = await Product.deleteOne({ _id: id });

    if (operationResult.deletedCount === 0) {
      res.status(404).json({ message: 'Not Found' });
    } else {
      res.status(204).json({ message: 'Resource deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
