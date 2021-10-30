import { Router } from 'express';

import PokemonController from '@/controllers/APICollection/PokemonController';
import TrainerController from '@/controllers/APICollection/TrainerController';

const router = Router();

router.use('/pokemon', PokemonController);
router.use('/trainer', TrainerController);

export default router;
