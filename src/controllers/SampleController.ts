import { Router } from 'express';

import EmojiController from './SampleCollection/EmojiController.js';

const router = Router();

router.get('/', (_, response) => {
  response.json({
    message: '👋🌎🌍🌏 - Hello World from the API!',
  });
});

router.post('/name', (request, response) => {
  response.json({
    name: request.body.name,
  });
});

router.use('/emojis', EmojiController);

export default router;
