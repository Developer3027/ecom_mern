import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//* @desc    Fetch all products
//* @route   GET /api/products
//* @access  public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i'
        }
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//* @desc    Fetch top products
//* @route   GET /api/products/top
//* @access  public
const getTopProducts = asyncHandler(async (req, res) => {
  const topProducts = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(topProducts);
});

//* @desc    Fetch Barleans products
//* @route   GET /api/products/barleans
//* @access  public
const getBarleansProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    brand: 'Barleans'
  });
  res.json(products);
});

//* @desc    Fetch product by id
//* @route   GET /api/products/:id
//* @access  public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

//* @desc    Delete a product
//* @route   DELETE /api/products/:id
//* @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product Removed' });
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

//* @desc    Create a product
//* @route   POST /api/products
//* @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReview: 0,
    description: 'sample description'
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//* @desc    update a product
//* @route   PUT /api/products/:id
//* @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//* @desc    create new review
//* @route   PUT /api/products/:id/reviews
//* @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
  } else {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.save();
  res.status(201).json({ message: 'Review added' });
});

export {
  getProducts,
  getTopProducts,
  getBarleansProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview
};
