import { DataTypes } from "sequelize";
import connection from "./index.js"

export default connection.define("verify_code",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        code:{
         type:DataTypes.INTEGER,
         allowNull:false, 
      
        },
    },
    {timestamps:false,}
)