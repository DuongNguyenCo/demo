const { Sequelize } = require("sequelize");
require("dotenv").config();

// const sequelize = new Sequelize("mykitchen_db", "root", null, {
//   host: "localhost",
//   dialect: "mysql",
//   logging: false,
// });

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: "mysql",
        logging: false,
    }
);

let connet = async () => {
    try {
        await sequelize.authenticate();
        console.log("kết nối thành công");
    } catch (e) {
        console.error("kêt nối thất bại");
    }
};
export default connet;
