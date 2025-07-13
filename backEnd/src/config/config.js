import dotenv from "dotenv";

dotenv.config();

export const config = {
	PORT: 3004,
	HOST: "127.0.0.1",
	DB_PATH: "./src/db/task.db.json",
	SUPABASE_URL: process.env.SUPABASE_URL,
	SUPABASE_KEY: process.env.SUPABASE_KEY,
};
