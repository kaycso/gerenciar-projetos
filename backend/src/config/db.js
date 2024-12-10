import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

dotenv.config();

const connectToDatabase = () => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    console.log("conexão bem sucessida!");
    return sql;
  } catch (error) {
    console.log(error);
  }
};

export default connectToDatabase;
