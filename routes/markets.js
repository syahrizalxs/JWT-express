const express = require('express');
const router =  express.Router();
const MarketController = require('../app/api/controllers/market');

router.get('/',MarketController.getAllMarkets)
router.post('/',MarketController.create)
router.delete('/',MarketController.deleteMarket)
router.put('/',MarketController.updateMarket)

module.exports = router;