import express from "express";
import productController from "../controllers/productController";
import brandController from "../controllers/brandController";
import categoryController from "../controllers/categoryController";
import userController from "../controllers/userController";
import discountsController from "../controllers/discountsController";

let router = express.Router();

let initWebRotes = (app) => {
  router.get("/", (req, res) => {
    res.send("backend mykitchen");
  });

  //Product
  router.get("/api/product/get-all", productController.getAllProducts);
  router.get("/api/product/:product_id", productController.getProductById);
  router.get("/api/get-popular", productController.getPopularProducts);
  router.get("/api/get-latest", productController.getLatestProducts);
  router.get("/api/product/get-by-category/:category_id", productController.getProductsByCategory);
  router.post("/api/product/create", productController.createProduct);
  router.put("/api/product/update/:product_id", productController.updateProduct);
  router.delete("/api/product/delete/:product_id", productController.deleteProduct);

  //Brand
  router.get("/api/brand/get-all", brandController.getAllBrands);

  //Category
  router.get("/api/category/get-all", categoryController.getAllCategories);

  //User
  router.get("/api/user/get-all", userController.getAllUser);
  router.get("/api/user/get-id/:id", userController.getUserById);
  router.post("/api/user/create", userController.creatUser);
  router.post("/api/user/create-admin", userController.creatAdmin);
  router.delete("/api/user/delete/:id", userController.DeleteUser);
  router.put("/api/user/update/:id", userController.UpdateUser);
  router.post("/api/user/login", userController.loginUser);

  //Discounts
  router.get("/api/discounts/get-all", discountsController.getAllDiscounts);
  router.get("/api/discounts/get-id/:id", discountsController.getDiscountsById);
  router.post("/api/discounts/create", discountsController.creatDiscounts);
  router.put("/api/discounts/update/:id", discountsController.updateDiscounts);
  router.delete("/api/discounts/delete/:id",discountsController.deleteDiscounts);

  return app.use("/", router);
};

export default initWebRotes;
