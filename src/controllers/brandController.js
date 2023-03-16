import db, { sequelize } from "../models/index";

let getAllBrands = async (req, res) => {
  const sql = "SELECT * FROM brands";
  const data = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
  return res.status(200).json(data);
};

let getBrandById = async (req, res) => {
  const sql = `SELECT * FROM brands join products on brands.brand_id = products.brand_id WHERE brands.brand_id = ${req.params.id}`;
  const data = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
  res.status(200).json(data);
};

let createBrand = async (req, res) => {
  const sql1 = `SELECT * FROM brands where brand_name = '${req.body.brand_name}'`;
  const brand = await sequelize.query(sql1, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (brand.length > 0) {
    res.status(200).json({ result: "brand already exists" });
  } else {
    if (req.body.brand_name !== undefined) {
      const sql = `INSERT INTO brands VALUES (DEFAULT,'${req.body.brand_name}','${req.body.url}')`;
      await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT,
      });
      return res.status(200).json({ result: "Create successful" });
    } else {
      return res.status(200).json({ result: "incomplete information" });
    }
  }
};

let updateBrand = async (req, res) => {
  const sql1 = `SELECT * FROM brands where brand_id = '${req.params.id}'`;
  const brand = await sequelize.query(sql1, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (brand.length < 0) {
    res.status(404).json({ result: "brand does not exist" });
  } else {
    if (req.body.brand_name !== undefined) {
      const sql = `UPDATE brands SET brand_name='${
        req.body.brand_name === "" ? brand[0].brand_name : req.body.brand_name
      }',url='${
        req.body.url === "" ? brand[0].url : req.body.url
      }' WHERE brand_id = '${req.params.id}'`;
      const [result, update] = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
      });
      if (update > 0)
        return res.status(200).json({ result: "Update successful" });
      else return res.status(200).json({ result: "Update failed" });
    } else {
      return res.status(200).json({ result: "incomplete information" });
    }
  }
};

let deleteBrand = async (req, res) => {
  const sql2 = `SELECT * FROM brands WHERE brand_id= '${req.params.id}'`;
  const brand2 = await sequelize.query(sql2, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (brand2.length > 0) {
    const sql1 = `SELECT * FROM brands join products on brands.brand_id = products.brand_id WHERE brands.brand_id= '${req.params.id}'`;
    const brand = await sequelize.query(sql1, {
      type: sequelize.QueryTypes.SELECT,
    });
    if (brand.length <= 0) {
      const sql = `DELETE FROM brands WHERE brand_id = '${req.params.id}'`;
      await sequelize.query(sql);
      return res.status(200).json({ result: "Delete successful" });
    } else {
      return res.status(201).json({ result: "brand have product" });
    }
  } else {
    return res.status(202).json({ result: "brand not found" });
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
