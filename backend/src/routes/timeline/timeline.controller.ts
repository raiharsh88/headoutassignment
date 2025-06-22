import { Router } from 'express';
import TimelineService from './timeline.service';
import {  Request, Response } from 'express';
import uploadMiddleware from '../../middleware/multer';
import pool from '../../clients/database';
import { containerClient, directoryPrefix } from '../../clients/azureStorage';

const router = Router();

let timelineService: TimelineService;

router.use('/', async function (req, res, next) {
    if (!timelineService) {
        timelineService = await new TimelineService().getInstance();
    }
    next();
})

router.get('/:postId', async (req, res) => {
    try {
        const { postId } = req.body;
        const respone = await timelineService.getPost(postId)
        res.json({
            data: respone,
        })
    } catch (e) {
        res.status(500).json({ error: 'server error' })

    }
})


router.get('/', async (req, res) => {
    try {
        const { limit, page } = req.body;
        const respone = await timelineService.get(page, limit)

        res.json({
            data: respone,
        })
    } catch (e) {
        res.status(500).json({ error: 'server error' })

    }
})


router.patch('/', async (req, res) => {
    try {
        const {postId , action, userId } = req.body;
        const respone = await timelineService.patch(postId , userId , action)
        res.json({
            data: respone,
        })
    } catch (e) {
        res.status(500).json({ error: 'server error' })

    }
})

router.post('/', uploadMiddleware.single('image'), async (req: any, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    const {userId, caption} = req.body;
    const fileName = `${Date.now()}-${req.file.originalname}`;
    await timelineService.post(fileName, userId, caption, req.file.buffer, req.file.mimetype)
    res.json({
        message:'successfully uploaded'
    })
  
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
