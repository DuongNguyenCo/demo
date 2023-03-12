import db, { sequelize } from '../models/index'

let getAllCategories = async (req, res) => {
    const sql = "SELECT * FROM categories";

    const [results, metadata] = await sequelize.query(sql);
    return res.status(200).json({
        data: results
    })
}

let getCategoryById = async (req, res) => {
    const sql = `select * from categories WHERE category_id = ${req.params.id}`;
    const data = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      })
      if (data.length > 0) {
        return res.status(200).json({ data });
      } else {
        return res.status(404).json({ result: "Categories not found" });
      }
  };
  
  let createCategory = async (req, res) => {
    const sql1 = `select * from categories where category_name ='${req.body.caterogy_name}'`;
    
    const caterogy = await sequelize.query(sql1, {
      type: sequelize.QueryTypes.SELECT,
    });
   
    if (caterogy.length > 0) {
      res.status(400).json({ result: "category already exists" });
    } else {
       
      if (req.body.caterogy_name !== undefined) {
        const sql = `INSERT INTO categories VALUES (DEFAULT,'${req.body.caterogy_name}')`;
        
        await sequelize.query(sql, {
          type: sequelize.QueryTypes.INSERT,
        });
        return res.status(200).json({ result: "Create successful" });
      } 
      else {
        return res.status(400).json({ result: "incomplete information" });
        
      }
    }
  };
  
  let updateCaterogy = async (req, res) => {
    const sql1 = `select * from categories where category_id = '${req.params.id}'`;
    const categorys = await sequelize.query(sql1, {
      type: sequelize.QueryTypes.SELECT,
    });
    if (categorys.length === 0) {
      res.status(404).json({ result: "Category does not exist" });
    } else {
        const sql =`update categories set category_name= '${req.body.caterogy_name===""?categorys[0].caterogy_name:req.body.caterogy_name}' where category_id='${req.params.id}'`;
        const [result, update] = await sequelize.query(sql, {
          type: sequelize.QueryTypes.UPDATE,
        });
        if (update > 0)
          return res.status(200).json({ result: "Update successful" });
        else return res.status(200).json({ result: "Update failed" });
      }
    }
  
  let deleteCaterogy = async (req, res) => {
    const sql1 = `select * from categories where category_id = '${req.params.id}'`;
    const category = await sequelize.query(sql1, {
      type: sequelize.QueryTypes.SELECT,
    });
    if (category.length > 0) {
      const sql = `delete from categories where category_id = '${req.params.id}'`;
      await sequelize.query(sql);
      return res.status(200).json({ result: "Delete successful" });
    } else {
      return res.status(404).json({ result: "Category does not exist" });
    }
  };


module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCaterogy,
    deleteCaterogy
}