'use strict'

import { Router } from 'express';

// 4. Import routes

import externalAPIRouter from './externalAPI.js';


const router = Router({
  caseSensitive: true
})

// 5. Use imported routes in router
router.use('/api', externalAPIRouter);


export default router;