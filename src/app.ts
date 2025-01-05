import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { AppDataSource } from "./database/AppDataSource"
 
dotenv.config()

export const createApp = async () =>{
  if(!AppDataSource.isInitialized){
    await AppDataSource.initialize()
    console.log('Database initialized')
  }

  const app = express()
  app.use(express.json())
  app.use(cors())


  return app
}
