const express = require('express');
const router = express.Router();
const controllers = require('../controllers/');

router.get(
  '/commodity/:commodity/tons/:tons/price/:price',
  controllers.countryData.retrieveInfo
);

router.get(
  '/country_filter/commodity/:commodity/tons/:tons/price/:price/country/:country',
  controllers.countryData.countryFilter
);

router.post(
  '/countries_filter/commodity/:commodity/tons/:tons/price/:price',
  controllers.countryData.countriesFilter
);

module.exports = router;
