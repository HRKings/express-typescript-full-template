import { Router } from 'express';

import PokemonController from '@/controllers/APICollection/PokemonController';
import TrainerController from '@/controllers/APICollection/TrainerController';

const router = Router();

// Aggregates the two controllers under the same route (/api/v1/)
router.use('/pokemon', PokemonController);
router.use('/trainer', TrainerController);

export default router;
