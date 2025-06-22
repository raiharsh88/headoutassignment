import { config } from "dotenv"
config()
export const config1 = {
    pgUserName: process.env.PG_USER,
    pgHost: process.env.PG_HOST as string,
    pgDBName: process.env.PG_DB_NAME,
    pgPassword: process.env.PG_PASSWORD,
    pgPort: Number(process.env.PG_PORT),

    azureConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING as string,
    azureStorageName: process.env.AZURE_STORAGE_SHARE_NAME as string,
    azureImageDirectoryName: process.env.AZURE_STORAGE_DIRECTORY_NAME as string,
    azureStorageBaseUrl:process.env.AZURE_STORAGE_BASE_URL as string
}