import path from "node:path";
import dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";

dotenv.config()
//'..' cada um sobe uma pasta
const baseConfig={
  entities:[path.join(__dirname, '..', '..', 'src', 'modules', '*.entities.{ts,js}')],
  migrations:[path.join(__dirname,'..', '..', 'src', 'migrations', '*,migration.{ts,js}')],
  logging:false,
};

const configurations = {
  production: {
    ...baseConfig,
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false, // Nunca use true em produção
    ssl: process.env.DB_SSL === 'true',
  },
  test: {
    ...baseConfig,
    type: 'sqlite',
    database: ':memory:', // Banco em memória para testes
    synchronize: true,    // OK para testes
    dropSchema: true,     // Limpa o banco antes dos testes
  },
} as const;

export const getDatabaseConfig = (
  env: keyof typeof configurations
): DataSourceOptions => {
  return configurations[env];
};