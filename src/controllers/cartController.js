import { sequelize } from '../models/index';
const { QueryTypes } = require('sequelize');


//LẤY THÔNG TIN GIỎ HÀNG THEO USER_ID
let getCartInfo = async (user_id) => {
    const sql = `SELECT * FROM carts WHERE user_id = '${user_id}'`;
    const cart = await sequelize.query(sql, {type: QueryTypes.SELECT});

    if(cart.length > 0) {
        return {
            result: true,
            data: cart[0]
        }
    }
    else {
        return {
            result: false
        }
    }
}


//CHECK SẢN PHẨM CÓ TỒN TẠI TRONG HỆ THỐNG
let checkValidProduct = async (product_id) => {
    const sql = `SELECT product_id FROM products WHERE product_id = '${product_id}'`;
    const product = await sequelize.query(sql, {type: QueryTypes.SELECT});

    if(product.length > 0) {
        return true
    }
    else {
        return false
    }
}


//TẠO GIỎ HÀNG KHI USER ĐĂNG KÝ TÀI KHOẢN
let createCart = async (req, res) => {
    const cart = await getCartInfo(req.params.user_id);

    if(cart.result) {
        return res.status(400).json({
            message: 'Người dùng đã có giỏ hàng'
        });
    }
    else {
        const sql2 = `INSERT INTO carts VALUES(DEFAULT, '${req.params.user_id}')`;
        await sequelize.query(sql2, {type: QueryTypes.INSERT});
        return res.status(201).json({
            message: 'Đã tạo giỏ hàng'
        });
    }
}


//LẤY DANH SÁCH SẢN PHẨM HIỆN CÓ TRONG GIỎ HÀNG
let getProductsFromCart = async (req, res) => {
    const cart = await getCartInfo(req.params.user_id);

    if(cart.result) {
        const sql = `SELECT products.product_id, products.product_name, products.price,
        products.url, carts_products.quantity, carts_products.price as subtotal
        FROM products JOIN carts_products ON products.product_id = carts_products.product_id
        WHERE cart_id = '${cart.data.cart_id}'`;

        const products = await sequelize.query(sql, {type: QueryTypes.SELECT});
        return res.status(200).json({
            data: products
        });
    }
    else {
        return res.status(404).json({
            message: 'Không tìm thấy giỏ hàng'
        });
    }
}


//THÊM SẢN PHẨM VÀO GIỎ HÀNG
let addProductToCart = async (req, res) => {
    const cart = await getCartInfo(req.body.user_id);

    if(cart.result) {
        const isValidProduct = await checkValidProduct(req.body.product_id);

        //NẾU SẢN PHẨM CÓ TRONG HỆ THỐNG
        if(isValidProduct) {
            const sql1 = `SELECT * FROM carts_products
            WHERE cart_id = '${cart.data.cart_id}' AND product_id = '${req.body.product_id}'`;
            const product = await sequelize.query(sql1, {type: QueryTypes.SELECT});
    
            //SẢN PHẨM ĐÃ TỒN TẠI TRONG GIỎ
            if(product.length > 0) {
                const quantity = parseInt(req.body.quantity) + parseInt(product[0].quantity);
                const price = parseInt(req.body.price) * quantity;
    
                //SỐ LƯỢNG VƯỢT GIỚI HẠN
                if(quantity > 10) {
                    return res.status(202).json({
                        message: 'Sản phẩm đã đạt số lượng tối đa'
                    });
                }
                else {
                    const sql2 = `UPDATE carts_products SET quantity = '${quantity}', price = '${price}'
                    WHERE cart_id = '${cart.data.cart_id}' AND product_id = '${req.body.product_id}'`;

                    await sequelize.query(sql2, {type: QueryTypes.UPDATE});
                    return res.status(200).json({
                        message: 'Cập nhật số lượng thành công'
                    });
                }
            }
            else {
                const quantity = parseInt(req.body.quantity);
                const price = parseInt(req.body.price) * quantity;

                if(quantity > 10) {
                    return res.status(202).json({
                        message: 'Sản phẩm đã đạt số lượng tối đa'
                    });
                }
                else {
                    const sql3 = `INSERT INTO carts_products
                    VALUES(DEFAULT, '${cart.data.cart_id}', '${req.body.product_id}',
                    '${quantity}', '${price}')`;

                    await sequelize.query(sql3, {type: QueryTypes.INSERT});
                    return res.status(201).json({
                        message: 'Thêm vào giỏ hàng thành công'
                    });
                }
            }
        }
        else {
            return res.status(404).json({
                message: 'Không tìm thấy sản phẩm trong hệ thống'
            });
        }
    }
    else {
        return res.status(404).json({
            message: 'Không tìm thấy giỏ hàng'
        });
    }
}


//XÓA SẢN PHẨM KHỎI GIỎ HÀNG
let deleteProductFromCart = async (req, res) => {
    const cart = await getCartInfo(req.body.user_id);

    if(cart.result) {
        const isValidProduct = await checkValidProduct(req.body.product_id);

        //NẾU SẢN PHẨM CÓ TRONG HỆ THỐNG
        if(isValidProduct) {
            const sql1 = `SELECT * FROM carts_products WHERE product_id = '${req.body.product_id}'`;
            const product = await sequelize.query(sql1, {type: QueryTypes.SELECT});
    
            if(product.length > 0){
                const sql2 = `DELETE FROM carts_products
                WHERE cart_id = '${cart.data.cart_id}' AND product_id = '${req.body.product_id}'`;

                await sequelize.query(sql2, {type: QueryTypes.DELETE});
                return res.status(200).json({
                    message: 'Đã xóa sản phẩm khỏi giỏ hàng'
                });
            }
            else {
                return res.status(404).json({
                    message: 'Không tìm thấy sản phẩm trong giỏ hàng'
                });
            }
        }
        else {
            return res.status(404).json({
                message: 'Không tìm thấy sản phẩm trong hệ thống'
            });
        }
    }
    else {
        return res.status(404).json({
            message: 'Không tìm thấy giỏ hàng'
        });
    }
}


//TĂNG SỐ LƯỢNG
let increaseQuantity = async (req, res) => {
    const cart = await getCartInfo(req.body.user_id);

    if(cart.result) {
        const isValidProduct = await checkValidProduct(req.body.product_id);

        if(isValidProduct) {

            //KIỂM TRA SỐ LƯỢNG CHƯA == 10
            if(parseInt(req.body.quantity) < 10) {
                const newQuantity = parseInt(req.body.quantity) + 1;
                const price = parseInt(req.body.price) * newQuantity;

                const sql1 = `UPDATE carts_products SET quantity = '${newQuantity}', price = '${price}'
                WHERE cart_id = '${cart.data.cart_id}' AND product_id = '${req.body.product_id}'`;
    
                await sequelize.query(sql1, {type: QueryTypes.UPDATE});
                return res.status(200).json({
                    message: 'Tăng số lượng thành công'
                });
            }
            else {
                return res.status(202).json({
                    message: 'Sản phẩm đã đạt giới hạn số lượng tối đa'
                });
            }
        }
        else {
            return res.status(404).json({
                message: 'Không tìm thấy sản phẩm trong hệ thống'
            });
        }
    }
    else {
        return res.status(404).json({
            message: 'Không tìm thấy giỏ hàng'
        });
    }
}


//GIẢM SỐ LƯỢNG
let decreaseQuantity = async (req, res) => {
    const cart = await getCartInfo(req.body.user_id);

    if(cart.result) {
        const isValidProduct = await checkValidProduct(req.body.product_id);

        if(isValidProduct) {

            //KIỂM TRA SỐ LƯỢNG CHƯA == 1
            if(parseInt(req.body.quantity) > 1) {
                const newQuantity = parseInt(req.body.quantity) - 1;
                const price = parseInt(req.body.price) * newQuantity;

                const sql1 = `UPDATE carts_products SET quantity = '${newQuantity}', price = '${price}'
                WHERE cart_id = '${cart.data.cart_id}' AND product_id = '${req.body.product_id}'`;

                await sequelize.query(sql1, {type: QueryTypes.UPDATE});
                return res.status(200).json({
                    message: 'Giảm số lượng thành công'
                });
            }
            else {
                return res.status(202).json({
                    message: 'Sản phẩm đã đạt số lượng tối thiểu'
                });
            }
        }
        else {
            return res.status(404).json({
                message: 'Không tìm thấy sản phẩm trong hệ thống'
            });
        }
    }
    else {
        return res.status(404).json({
            message: 'Không tìm thấy giỏ hàng'
        });
    }
}


module.exports = {
    createCart,
    getProductsFromCart,
    addProductToCart,
    deleteProductFromCart,
    increaseQuantity,
    decreaseQuantity,
}