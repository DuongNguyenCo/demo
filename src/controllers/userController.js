import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import db, { sequelize } from "../models/index";
const saltRounds = 10;

let getAllUser = async (req, res) => {
  const sql = `select * from users`;
  const data = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
  return res.status(200).json({ data });
};

let getUserById = async (req, res) => {
  const sql = `select * from users where user_id = "${req.params.id}"`;
  const data = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (data.length > 0) {
    return res.status(200).json({ data });
  } else {
    return res.status(200).json({ result: "User not found" });
  }
};

let loginUser = async (req, res) => {
  const sql = `select * from users where username = "${req.body.username}"`;
  const user = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (user.length > 0) {
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      user[0].password
    );
    if (checkPassword) {
      const { password, ...data } = user[0];
      return res.status(200).json({ data });
    } else {
      return res.status(200).json({ result: "Incorrect account or password" });
    }
  } else {
    return res.status(200).json({ result: "User not found" });
  }
};

let creatUser = async (req, res) => {
  const sql1 = `select * from users where username = "${req.body.username}"`;
  const user = await sequelize.query(sql1, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (user.length > 0) {
    return res.status(200).json({ result: "User already exists" });
  } else {
    if (
      req.body.username === undefined ||
      req.body.password === undefined ||
      req.body.email === undefined ||
      req.body.name === undefined
    ) {
      return res.status(200).json({ result: "incomplete information" });
    } else {
      const hashPass = await hashPassword(req.body.password);
      const sql = `INSERT INTO users(role_id, username,password,user_name,email)
            VALUES ('1','${req.body.username}','${hashPass}','${req.body.name}','${req.body.email}')`;
      const data = await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT,
      });
      return res
        .status(200)
        .json({ result: "Create successful", userId: data[0] });
    }
  }
};

let creatAdmin = async (req, res) => {
  const sql1 = `select * from users where username = "${req.body.username}"`;
  const user = await sequelize.query(sql1, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (user.length > 0) {
    return res.status(200).json({ result: "User already exists" });
  } else {
    if (
      req.body.role === undefined ||
      req.body.name === undefined ||
      req.body.gender === undefined ||
      req.body.dob === undefined ||
      req.body.phone === undefined ||
      req.body.street === undefined ||
      req.body.ward === undefined ||
      req.body.district === undefined ||
      req.body.city === undefined ||
      req.body.username === undefined ||
      req.body.password === undefined
    ) {
      return res.status(200).json({ result: "incomplete information" });
    } else {
      const hashPass = await hashPassword(req.body.password);
      const sql = `INSERT INTO users(role_id, user_name, gender, dob, phone, street, ward, district, city, username, password) 
      VALUES ('${req.body.role}','${req.body.name}','${req.body.gender}','${req.body.dob}','${req.body.phone}','${req.body.street}',
      '${req.body.ward}','${req.body.district}','${req.body.city}','${req.body.username}','${hashPass}')`;
      await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT,
      });
      return res.status(200).json({ result: "Create successful" });
    }
  }
};

let UpdateUser = async (req, res) => {
  const sql1 = `select * from users where user_id = "${req.params.id}"`;
  const user = await sequelize.query(sql1, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (user.length > 0) {
    const sql = `UPDATE users SET ${
      req.body.username
        ? "user_name='" + req.body.username + "',"
        : user[0].user_name === null
        ? "user_name=" + user[0].user_name + ","
        : "user_name='" + user[0].user_name + "',"
    }${
      req.body.gender
        ? "gender='" + req.body.gender + "',"
        : user[0].gender === null
        ? "gender=" + user[0].gender + ","
        : "gender='" + user[0].gender + "',"
    }${
      req.body.dob
        ? "dob='" + req.body.dob + "',"
        : user[0].dob === null
        ? "dob=" + user[0].dob + ","
        : "dob='" + user[0].dob + "',"
    }${
      req.body.phone
        ? "phone='" + req.body.phone + "',"
        : user[0].phone === null
        ? "phone=" + user[0].phone + ","
        : "phone='" + user[0].phone + "',"
    }${
      req.body.street
        ? "street='" + req.body.street + "',"
        : user[0].street === null
        ? "street=" + user[0].street + ","
        : "street='" + user[0].street + "',"
    }${
      req.body.ward
        ? "ward='" + req.body.ward + "',"
        : user[0].ward === null
        ? "ward=" + user[0].ward + ","
        : "ward='" + user[0].ward + "',"
    }${
      req.body.district
        ? "district='" + req.body.district + "',"
        : user[0].district === null
        ? "district=" + user[0].district + ","
        : "district='" + user[0].district + "',"
    }${
      req.body.city
        ? "city='" + req.body.city + "',"
        : user[0].city === null
        ? "city=" + user[0].city + ","
        : "city='" + user[0].city + "',"
    }${
      req.body.email
        ? "email='" + req.body.email + "',"
        : user[0].email === null
        ? "email=" + user[0].email + ""
        : "email='" + user[0].email + "'"
    } WHERE user_id = ${req.params.id}`;
    const [result, update] = await sequelize.query(sql, {
      type: sequelize.QueryTypes.UPDATE,
    });
    if (update) {
      return res.status(200).json({ result: "Update successful" });
    } else {
      return res.status(200).json({ result: "Update failed" });
    }
  } else {
    return res.status(200).json({ result: "User does not exist" });
  }
};

let DeleteUser = async (req, res) => {
  const sql1 = `select * from users where user_id = "${req.params.id}"`;
  const user = await sequelize.query(sql1, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (user.length > 0) {
    const sql = `DELETE FROM users where user_id = '${req.params.id}'`;
    await sequelize.query(sql);
    return res.status(200).json({ result: "Delete successful" });
  } else {
    return res.status(200).json({ result: "User does not exist" });
  }
};

let hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await bcrypt.hash(password, saltRounds);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllUser,
  creatUser,
  getUserById,
  UpdateUser,
  DeleteUser,
  loginUser,
  creatAdmin,
};
