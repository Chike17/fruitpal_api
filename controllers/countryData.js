const _ = require('lodash');
const commodities = require('../commodities.json');
const countries = require('../countries.json');

module.exports = {
  retrieveInfo: (req, res) => {
    let { commodity, tons, price } = req.params;
    tons = Number(tons);
    price = Number(price);

    if (Number.isNaN(tons) || Number.isNaN(price)) {
      return res
        .status(400)
        .json({ message: 'Invalid entry for tons or price.', items: [] });
    }

    let mappedCountryData = _.filter(commodities, (item) => {
      return item.COMMODITY.toLowerCase() === commodity.toLowerCase();
    });

    if (!mappedCountryData.length) {
      return res.status(400).json({ message: 'Invalid entry.', items: [] });
    }

    mappedCountryData = _.map(mappedCountryData, (country) => {
      let { VARIABLE_COST, FIXED_OVERHEAD } = country;

      VARIABLE_COST = Number(VARIABLE_COST);
      FIXED_OVERHEAD = Number(FIXED_OVERHEAD);

      const variableCost = (VARIABLE_COST + price).toFixed(2);
      const total = (tons * variableCost + FIXED_OVERHEAD).toFixed(2);

      FIXED_OVERHEAD = FIXED_OVERHEAD.toFixed(2);

      return {
        COUNTRY: country.COUNTRY,
        TOTAL_COST: total,
        FIXED_OVERHEAD: FIXED_OVERHEAD,
        VARIABLE_COST: variableCost,
      };
    });

    mappedCountryData = _.sortBy(mappedCountryData, (item) => {
      return -Number(item.TOTAL_COST);
    });

    return res.status(200).json({ items: mappedCountryData });
  },
  countryFilter: (req, res) => {
    let { commodity, tons, price, country } = req.params;
    tons = Number(tons);
    price = Number(price);

    if (Number.isNaN(tons) || Number.isNaN(price)) {
      return res
        .status(402)
        .json({ message: 'Invalid entry for tons or price.', items: [] });
    }

    let targetCountryCode;

    _.forEach(countries, (oneCountry) => {
      if (country.toLowerCase() === oneCountry.name.toLowerCase()) {
        targetCountryCode = oneCountry.code;
      }
    });

    if (!targetCountryCode) {
      return res
        .status(402)
        .json({ message: 'Invalid country entry.', items: [] });
    }

    let mappedCountryData = _.filter(commodities, (item) => {
      return item.COUNTRY === targetCountryCode;
    });

    mappedCountryData = _.filter(mappedCountryData, (item) => {
      return item.COMMODITY.toLowerCase() === commodity.toLowerCase();
    });

    if (!mappedCountryData.length) {
      return res
        .status(402)
        .json({ message: 'Invalid commodity entry.', items: [] });
    }

    mappedCountryData = _.map(mappedCountryData, (country) => {
      let { VARIABLE_COST, FIXED_OVERHEAD } = country;

      VARIABLE_COST = Number(VARIABLE_COST);
      FIXED_OVERHEAD = Number(FIXED_OVERHEAD);

      const variableCost = (VARIABLE_COST + price).toFixed(2);
      const total = (tons * variableCost + FIXED_OVERHEAD).toFixed(2);

      FIXED_OVERHEAD = FIXED_OVERHEAD.toFixed(2);

      return {
        COUNTRY: country.COUNTRY,
        TOTAL_COST: total,
        FIXED_OVERHEAD: FIXED_OVERHEAD,
        VARIABLE_COST: variableCost,
      };
    });

    mappedCountryData = _.sortBy(mappedCountryData, (item) => {
      return -Number(item.TOTAL_COST);
    });

    return res.status(200).json({ items: mappedCountryData });
  },
  countriesFilter: (req, res) => {
    let { commodity, tons, price } = req.params;
    const { moreCountries } = req.body;
    tons = Number(tons);
    price = Number(price);

    if (Number.isNaN(tons) || Number.isNaN(price)) {
      return res
        .status(400)
        .json({ message: 'Invalid entry for tons or price.', items: [] });
    }

    const targetCountryCodes = [];

    _.forEach(countries, (oneCountry) => {
      for (let i = 0; i < moreCountries.length; i++) {
        const country = moreCountries[i];
        if (country.toLowerCase() === oneCountry.name.toLowerCase()) {
          targetCountryCodes.push(oneCountry.code);
        }
      }
    });

    if (!targetCountryCodes.length) {
      return res
        .status(402)
        .json({ message: 'Invalid country entries.', items: [] });
    }

    let mappedCountryData = _.filter(commodities, (item) => {
      for (let i = 0; i < targetCountryCodes.length; i++) {
        const code = targetCountryCodes[i];
        if (item.COUNTRY === code) {
          return true;
        }
      }
    });

    mappedCountryData = _.filter(mappedCountryData, (item) => {
      return item.COMMODITY.toLowerCase() === commodity.toLowerCase();
    });

    if (!mappedCountryData.length) {
      return res
        .status(402)
        .json({ message: 'Invalid commodity entry.', items: [] });
    }

    mappedCountryData = _.map(mappedCountryData, (country) => {
      let { VARIABLE_COST, FIXED_OVERHEAD } = country;

      VARIABLE_COST = Number(VARIABLE_COST);
      FIXED_OVERHEAD = Number(FIXED_OVERHEAD);

      const variableCost = (VARIABLE_COST + price).toFixed(2);
      const total = (tons * variableCost + FIXED_OVERHEAD).toFixed(2);

      FIXED_OVERHEAD = FIXED_OVERHEAD.toFixed(2);

      return {
        COUNTRY: country.COUNTRY,
        TOTAL_COST: total,
        FIXED_OVERHEAD: FIXED_OVERHEAD,
        VARIABLE_COST: variableCost,
      };
    });

    mappedCountryData = _.sortBy(mappedCountryData, (item) => {
      return -Number(item.TOTAL_COST);
    });

    if (mappedCountryData.length < countries.length) {
      return res.status(200).json({
        message: 'Showing less results! A name was entered incorrectly!',
        items: mappedCountryData,
      });
    }

    return res.status(200).json({ items: mappedCountryData });
  },
};
