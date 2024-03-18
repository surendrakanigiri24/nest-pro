import * as dotenv from 'dotenv'

// Load environment variables from .env file into process.env
dotenv.config()

export const CONFIG = {
    // JWT SECRET
    JWT_SECRET : process.env.JWT_SECRET
}
