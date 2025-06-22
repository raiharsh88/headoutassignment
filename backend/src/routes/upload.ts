import { Router, Request, Response } from 'express';
import uploadMiddleware from '../middleware/multer';
import pool from '../clients/database';
import { containerClient, directoryPrefix } from '../clients/azureStorage';

const router = Router();

router.post('/', uploadMiddleware.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;
    const blobName = `${directoryPrefix}${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload file to Azure Blob Storage
    await blockBlobClient.upload(req.file.buffer, req.file.buffer.length, {
        blobHTTPHeaders: {
            blobContentType: req.file.mimetype
        }
    });

    // Save metadata to PostgreSQL
    const query = `
      INSERT INTO images (file_name, file_size, mime_type, upload_date)
      VALUES ($1, $2, $3, NOW())
      RETURNING id
    `;
    const values = [fileName, req.file.size, req.file.mimetype];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'File uploaded successfully',
      fileId: result.rows[0].id,
      fileName: fileName
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
