const router = require('express').Router();
const faker = require('faker');

const Product = require('../models/product');

router.get('/', (req, res) => {
    let perPage = 10;
    let page = 1;

    Product
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            Product.estimatedDocumentCount((err, count) => {
                if (err) return next('error: ',err);
                res.render('index', {
                    products,
                    current: page,
                    pages: Math.ceil(count / perPage)

                })
            })
        })
})

router.get('/page/:page?', (req, res) => {
    let perPage = 10;
    let page = req.params.page || 1;

    Product
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            Product.estimatedDocumentCount((err, count) => {
                if (err) return next('error: ',err);
                res.render('index', {
                    products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})



router.get('/add-product', (req, res) => {
    res.render('products/add');
})

router.post('/add-product', (req, res) => {
    const product  = new Product();
    product.category = req.body.category_name;
    product.name = req.body.name;
    product.price = req.body.price;
    product.cover = faker.image.image();
    product.save(err => {
        if (err) return next(err);
        res.redirect('/add-product');
    });
    
})

router.get('/generate-fake-data', (req, res) => {
    for(let i = 0; i < 80; i++) {
        const product = new Product();
        product.category = faker.commerce.department();
        product.name = faker.commerce.productName();
        product.price = faker.commerce.price();
        product.cover = faker.image.image();
        product.save(err => {
            if (err) return next(err);
        });
    }
    res.redirect('/');
    
})

module.exports = router;