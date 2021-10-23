import { Router } from 'express';

import EmojiController from './Emoji/EmojiController.js';

const router = Router();

router.get('/', (_, response) => {
  response.json({
    message: '👋🌎🌍🌏 - Hello World from the API!',
  });
});

router.use('/emojis', EmojiController);

export default router;
