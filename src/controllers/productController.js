import { sequelize } from '../models/index';
const { QueryTypes } = require('sequelize');


//GET ALL
let getAllProducts = async (req, res) => {

    const sql = `SELECT products.product_id, products.brand_id, products.category_id, product_name, size, weight,
    material, country, price, status, description, capacity, wattage, products.url, brand_name, category_name
    FROM brands JOIN products ON brands.brand_id = products.brand_id
    JOIN categories ON products.category_id = categories.category_id
    ORDER BY products.product_id ASC
    `;

    const products = await sequelize.query(sql, {type: QueryTypes.SELECT});

    return res.status(200).json({
        data: products
    });
};


//GET ALL ACTIVE
let getAllActive = async (req, res) => {

    const sql = `SELECT products.product_id, products.brand_id, products.category_id, product_name, size, weight,
    material, country, price, status, description, capacity, wattage, products.url, brand_name, category_name
    FROM brands JOIN products ON brands.brand_id = products.brand_id
    JOIN categories ON products.category_id = categories.category_id
    WHERE products.status = 'Active'
    ORDER BY products.product_id ASC
    `;

    const products = await sequelize.query(sql, {type: QueryTypes.SELECT});

    return res.status(200).json({
        data: products
    });
};


//GET BY ID
let getProductById = async (req, res) => {

    const sql = `SELECT products.product_id, products.brand_id, products.category_id, product_name, size, weight,
    material, country, price, status, description, capacity, wattage, products.url, brand_name, category_name
    FROM brands JOIN products ON brands.brand_id = products.brand_id
    JOIN categories ON products.category_id = categories.category_id
    WHERE products.product_id = '${req.params.product_id}'
    `;
    const product = await sequelize.query(sql, {type: QueryTypes.SELECT});

    return res.status(200).json({
        data: product[0]
    });
};


//GET POPULAR
let getPopularProducts = async (req, res) => {

    const sql = `SELECT products.product_id, products.brand_id, products.category_id, product_name, size, weight,
    material, country, price, status, description, capacity, wattage, products.url, brand_name, category_name
    FROM brands JOIN products ON brands.brand_id = products.brand_id
    JOIN categories ON products.category_id = categories.category_id
    ORDER BY products.product_id ASC
    LIMIT 4`;

    const products = await sequelize.query(sql);

    return res.status(200).json({
        data: products[0]
    });
};


//GET LATEST
let getLatestProducts = async (req, res) => {

    const sql = `SELECT products.product_id, products.brand_id, products.category_id, product_name, size, weight,
    material, country, price, status, description, capacity, wattage, products.url, brand_name, category_name
    FROM brands JOIN products ON brands.brand_id = products.brand_id
    JOIN categories ON products.category_id = categories.category_id
    ORDER BY products.product_id DESC
    LIMIT 8`;

    const products = await sequelize.query(sql);

    return res.status(200).json({
        data: products[0]
    });
};


//GET BY CATEGORY
let getProductsByCategory = async (req, res) => {

    const sql1 = `SELECT * FROM categories WHERE category_id = '${req.params.category_id}'`;
    const category = await sequelize.query(sql1, {type: QueryTypes.SELECT});

    if(category.length > 0) {

        const sql2 = `SELECT products.product_id, products.brand_id, products.category_id, product_name, size, weight,
        material, country, price, status, description, capacity, wattage, products.url, brand_name, category_name
        FROM brands JOIN products ON brands.brand_id = products.brand_id
        JOIN categories ON products.category_id = categories.category_id
        WHERE categories.category_id = '${req.params.category_id}'
        ORDER BY products.product_id ASC`;
    
        const products = await sequelize.query(sql2, {type: QueryTypes.SELECT});
    
        return res.status(200).json({
            data: products
        });
    }
    else {
        return res.status(404).json({
            message: 'Không tìm thấy loại sản phẩm'
        });
    }
}


//GET BY BRAND
let getProductsByBrand = async (req, res) => {

    const sql1 = `SELECT * FROM brands WHERE brand_id = '${req.params.brand_id}'`;
    const brand = await sequelize.query(sql1, {type: QueryTypes.SELECT});

    if(brand.length > 0) {

        const sql2 = `SELECT products.product_id, products.brand_id, products.category_id, product_name, size, weight,
        material, country, price, status, description, capacity, wattage, products.url, brand_name, category_name
        FROM brands JOIN products ON brands.brand_id = products.brand_id
        JOIN categories ON products.category_id = categories.category_id
        WHERE brands.brand_id = '${req.params.brand_id}'
        ORDER BY products.product_id ASC`;
    
        const products = await sequelize.query(sql2, {type: QueryTypes.SELECT});
    
        return res.status(200).json({
            data: products
        });
    }
    else {
        return res.status(404).json({
            message: 'Không tìm thấy thương hiệu'
        });
    }
}


//GET BY NAME
let getProductsByname = async (req, res) => {
    const sql = `SELECT products.product_id, products.brand_id, products.category_id, product_name, size, weight,
    material, country, price, status, description, capacity, wattage, products.url, brand_name, category_name
    FROM brands JOIN products ON brands.brand_id = products.brand_id
    JOIN categories ON products.category_id = categories.category_id
    WHERE product_name like '%${req.params.product_name}%'
    ORDER BY products.product_id ASC
    `;
    const products = await sequelize.query(sql, {type: QueryTypes.SELECT});

    return res.status(200).json({
        data: products
    });
    
    
}
//CREATE
let createProduct = async (req, res) => {
    if(
        req.body.brand_id !== undefined &&
        req.body.category_id !== undefined &&
        req.body.product_name !== undefined &&
        req.body.price !== undefined &&
        req.body.size !== undefined &&
        req.body.weight !== undefined &&
        req.body.material !== undefined &&
        req.body.country !== undefined &&
        req.body.status !== undefined &&
        req.body.description !== undefined &&
        req.body.capacity !== undefined &&
        req.body.wattage !== undefined &&
        req.body.url !== undefined
    ) {
        const sql1 = `SELECT * FROM products WHERE product_name = '${req.body.product_name}'`;
        const product = await sequelize.query(sql1, {type: QueryTypes.SELECT});

        if(product.length > 0) {
            return res.status(400).json({
                message: "Sản phẩm đã tồn tại",
            });
        }
        else {
            if(
                req.body.brand_id === "" ||
                req.body.category_id === "" ||
                req.body.product_name === "" ||
                req.body.price === ""
            ) {
                return res.status(400).json({
                    message: "Thêm sản phẩm không thành công do null"
                })
            }
            else {
                const sql2 = `INSERT INTO products VALUES(
                    DEFAULT,
                    '${req.body.brand_id}',
                    '${req.body.category_id}',
                    '${req.body.product_name}',
                    '${req.body.size}',
                    '${req.body.weight}',
                    '${req.body.material}',
                    '${req.body.country}',
                    '${req.body.price}',
                    '${req.body.status}',
                    '${req.body.description}',
                    '${req.body.capacity}',
                    '${req.body.wattage}',
                    '${req.body.url}'
                )`;
        
                await sequelize.query(sql2, {type: QueryTypes.INSERT});
        
                return res.status(201).json({
                    message: "Thêm sản phẩm thành công"
                });
            }
        }
    }
    else {
        return res.status(400).json({
            message: "Thiếu thuộc tính"
        })
    }
};


//UPDATE
let updateProduct = async (req, res) => {    
    if(
        req.body.brand_id !== undefined &&
        req.body.category_id !== undefined &&
        req.body.product_name !== undefined &&
        req.body.price !== undefined &&
        req.body.size !== undefined &&
        req.body.weight !== undefined &&
        req.body.material !== undefined &&
        req.body.country !== undefined &&
        req.body.status !== undefined &&
        req.body.description !== undefined &&
        req.body.capacity !== undefined &&
        req.body.wattage !== undefined &&
        req.body.url !== undefined
    ) {
        const sql1= `SELECT * FROM products WHERE product_id = '${req.params.product_id}'`;
        const product = await sequelize.query(sql1, {type: QueryTypes.SELECT});

        if(product.length > 0) {
            const sql2 = `UPDATE products SET 
            brand_id = '${req.body.brand_id === "" ? product[0].brand_id: req.body.brand_id}',
            category_id = '${req.body.category_id === "" ? product[0].category_id: req.body.category_id}',
            product_name = '${req.body.product_name  === "" ? product[0].product_name: req.body.product_name}',
            size = '${req.body.size}',
            weight = '${req.body.weight}',
            material = '${req.body.material}',
            country = '${req.body.country}',
            price = '${req.body.price  === "" ? product[0].price: req.body.price}',
            status = '${req.body.status}',
            description = '${req.body.description}',
            capacity = '${req.body.capacity}',
            wattage = '${req.body.wattage}',
            url = '${req.body.url}' 
            WHERE product_id = '${req.params.product_id}'`;

            await sequelize.query(sql2, {type: QueryTypes.UPDATE});
            
            return res.status(200).json({
                message: "Cập nhật sản phẩm thành công"
            })
        }
        else {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm cần cập nhật"
            })
        }
    }
    else {
        return res.status(400).json({
            message: "Thiếu thuộc tính"
        })
    }
};


//DELETE
let deleteProduct = async (req, res) => {
    const sql1 = `SELECT * FROM products WHERE product_id = '${req.params.product_id}'`;
    const product = await sequelize.query(sql1, {type: QueryTypes.SELECT});

    if(product.length > 0) {
        const sql2 = `DELETE FROM products WHERE product_id = '${req.params.product_id}'`;
        await sequelize.query(sql2, {type: QueryTypes.DELETE});

        return res.status(204).json({
            message: "Xóa sản phẩm thành công"
        });
    }
    else {
        return res.status(404).json({
            message: "Không tìm thấy sản phẩm"
        });
    }
};


module.exports = {
    getAllProducts,
    getAllActive,
    getProductById,
    getPopularProducts,
    getLatestProducts,
    getProductsByCategory,
    getProductsByBrand,
    getProductsByname,
    createProduct,
    updateProduct,
    deleteProduct,
};