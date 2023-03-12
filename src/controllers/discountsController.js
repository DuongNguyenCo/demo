import { DataTypes } from "sequelize";
import db, { sequelize } from "../models/index";

let getAllDiscounts = async (req, res) => {
  const sql = `select * from discounts`;
  const data = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
  return res.status(200).json({ data });
};

let getDiscountsById = async (req, res) => {
  const sql = `select * from discounts where discount_id = "${req.params.id}"`;
  const data = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (data.length > 0) {
    return res.status(200).json({ data });
  } else {
    return res.status(404).json({ result: "Discounts not found" });
  }
};

let creatDiscounts = async (req, res) => {
  const sql = `select * from discounts where code = "${req.body.code}"`;
  const discount = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (discount.length > 0) {
    return res.status(400).json({ result: "Discounts already exists" });
  } else {
    if (
      req.body.title === undefined ||
      req.body.code === undefined ||
      req.body.percent === undefined ||
      req.body.condition === undefined ||
      req.body.start_date === undefined ||
      req.body.end_date === undefined ||
      req.body.description === undefined
    ) {
      return res.status(400).json({ result: "incomplete information" });
    } else {
      const sql1 = `INSERT INTO discounts VALUES (DEFAULT,
            '${req.body.title}',
            '${req.body.code}',
            '${req.body.percent}',
            '${req.body.condition}',
            '${req.body.start_date}',
            '${req.body.end_date}',
            '${req.body.description}'
            )`;
      console.log(sql1);

      await sequelize.query(sql1, {
        type: sequelize.QueryTypes.INSERT,
      });
      return res
        .status(200)
        .json({ result: "Successfully Generated Discount Code !!!" });
    }
  }
};
let updateDiscounts = async (req, res) => {
  const sql1 = `select * from discounts where discount_id = "${req.params.id}"`;
  const discount = await sequelize.query(sql1, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (discount.length > 0) {
    const sql = `UPDATE discounts SET ${
      req.body.title
        ? "title='" + req.body.title + "',"
        : "title='" + discount[0].title + "',"
    }${
      req.body.code
        ? "code='" + req.body.code + "',"
        : "code='" + discount[0].code + "',"
    }${
      req.body.percent
        ? "percent='" + req.body.percent + "',"
        : "percent='" + discount[0].percent + "',"
    }${
      req.body.condition
        ? "`condition`='" + req.body.condition + "',"
        : "`condition`='" + discount[0].condition + "',"
    }${
      req.body.start_date
        ? "start_date='" + req.body.start_date + "',"
        : "start_date='" + discount[0].start_date + "',"
    }${
      req.body.end_date
        ? "end_date='" + req.body.end_date + "',"
        : "end_date='" + discount[0].end_date + "',"
    }${
      req.body.description
        ? "description='" + req.body.description + "'"
        : "description='" + discount[0].description + "'"
    } WHERE discount_id = "${req.params.id}"`;
    const [result, update] = await sequelize.query(sql, {
      type: sequelize.QueryTypes.UPDATE,
    });
    if (update) {
      return res.status(200).json({ result: "Update successful" });
    } else {
      return res.status(400).json({ result: "Update failed" });
    }
  } else {
    return res.status(400).json({ result: "discounts does not exist" });
  }
};

let deleteDiscounts = async (req, res) => {
  const sql1 = `select * from discounts where discount_id = "${req.params.id}"`;
  const user = await sequelize.query(sql1, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (user.length > 0) {
    const sql = `DELETE FROM discounts where discount_id = '${req.params.id}'`;
    await sequelize.query(sql);
    return res.status(200).json({ result: "Delete successful" });
  } else {
    return res.status(400).json({ result: "discounts does not exist" });
  }
};

module.exports = {
  getAllDiscounts,
  getDiscountsById,
  creatDiscounts,
  updateDiscounts,
  deleteDiscounts,
};
