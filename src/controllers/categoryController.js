import db, { sequelize } from '../models/index'

let getAllCategories = async (req, res) => {
    const sql = "SELECT * FROM categories";

    const [results, metadata] = await sequelize.query(sql);
    return res.status(200).json({
        data: results
    })
}

module.exports = {
    getAllCategories
}