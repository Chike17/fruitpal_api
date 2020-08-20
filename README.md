## STEPS TO GETTING THE SERVER UP AND RUNNING

1. If you don't have Node installed issue the below command in a terminal to install
   Homebrew

   ## `/bin/bash -c "\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh"

   Reference: https://brew.sh/

2. Install Node by issuing the below command in a terminal

   ## `brew install node`

3. Issue the below command at the root of this directory.

   ## `npm install`

4. Issue the below command at the root of this directory.

   ## `node server.js`

5. The server will now be running on port 8080

6. Make api calls to the 3 endpoints to receive country data for
   commodities. The 3 commodities that the api tracks are mangos, peaches, and pineapples.

# ENDPOINTS

1. Retrieve all data for a commodity in all countries\
   GET REQUEST\
   URL: localhost:8080/api/commodity_info/commodity/mango/tons/405/price/53

2. Retrieve all data for a commodity in one country\
   GET REQUEST\
   URL: localhost:8080/api/commodity_info/country_filter/commodity/peach/tons/405/price/53/country/canada

3. Retrieve all data for a commodity in specific countries\
   POST REQUEST\
   URL: localhost:8080/api/commodity_info/countries_filter/commodity/pineapple/tons/405/price/53/
   QUERY INPUT: {moreCountries: ['australia', 'nigeria', 'zimbabwe']}

# EXAMPLES WITH AXIOS

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api/commodity_info';

1. Retrieve all country data

   axios.get('/commodity/mango/tons/405/price/53')
   .then((response) => { console.log(response.data.items); })
   .catch(function (error) { console.log(error); });

other response data is located in the data key on the response object

2. Retrieve one country's commodity data

   axios.get('/country_filter/commodity/peach/tons/405/price/53/country/canada')
   .then((response) => { console.log(response.data.items); })
   .catch(function (error) { console.log(error); });

other response data is located in the data key on the response object

3. Retrieve commodity data for multiple countries

   const query = { moreCountries: ['australia', 'nigeria', 'zimbabwe']};

   axios.post('/countries_filter/commodity/pineapple/tons/405/price/53', query)
   .then((response) => { console.log(response.data.items); })
   .catch(function (error){ console.log(error); });

other response data is located in the data key on the response object

# NOTE

The countries.json file is only included in the repo for when a user wants to target the commodity data for specific countries. It is there to map the codes to the country names.

The json file used to calculate commodity data for all countries is the commodities.json file.
