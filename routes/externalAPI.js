'use strict'

import { Router } from 'express';
import handler from './handlers/externalAPIHandler.js';

const router = Router();

router.get(
  '/fromSource',
  async (req, res, next) => {
    try {
      // 6. Call handler to response with data

      const { page } = req.query;

      //console.log(req);
      
      const raw = await handler.getListFromAPI();
      const response = await raw.json();

      const propertyArr = response.outlets.availability.results



      const propertyList = await Promise.all(propertyArr.map( async (obj, idx) => {

        const score = obj.property.reviews?.summary?.score

        return {
          id: idx,
          name: obj.property.name,
          location: obj.property.location,
          score: score,
          //raw: obj.property
        }
      }));
      //console.log(propertyList);

      //pagination logic here.

      const startIdx = (page - 1) * 5      
      const endIdx = page * 5

      const list = propertyList.slice(startIdx, endIdx);

      //console.log(list)

      res.send(list);

    } catch (err) {
      next(err);
    }
  }
)

export default router;