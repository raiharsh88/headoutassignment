import { BlobServiceClient } from '@azure/storage-blob';
import { config } from '../config/base.config';

// Create a BlobServiceClient from the connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(config.azureConnectionString);

// Get a reference to the container
const containerClient = blobServiceClient.getContainerClient(config.azureStorageName);
// Ensure the container exists (create if it doesn't)
(async () => {
  await containerClient.createIfNotExists();
  console.log(`Container ${config.azureStorageName} ensured to exist.`);
})();

// Get a reference to the directory (as a prefix for blobs)
const directoryPrefix = config.azureImageDirectoryName ? `${config.azureImageDirectoryName}/` : '';

export { containerClient, directoryPrefix };
