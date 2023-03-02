import db, { sequelize } from '../models/index'

let getAllBrands = async (req, res) => {
    const sql = "SELECT * FROM brands";

    const [results, metadata] = await sequelize.query(sql);
    return res.status(200).json({
        data: results
    })
}

module.exports = {
    getAllBrands
}