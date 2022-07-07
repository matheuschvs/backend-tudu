import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: ['src/modules/**/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts']
})

AppDataSource.initialize()
  .then(() => {
    console.log('Data source has been initialized')
  })
  .catch((err) => {
    console.error('Erro during data source initialization', err)
  })
