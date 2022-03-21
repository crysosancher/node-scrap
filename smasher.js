const axios = require("axios");
const cheerio = require("cheerio");

const fetchShelves = async () => {
   try {
       const response = await axios.get('https://www.amazon.com/s?crid=36QNR0DBY6M7J&k=shelves&ref=glow_cls&refresh=1&sprefix=s%2Caps%2C309');

       const html = response.data;

       const $ = cheerio.load(html);

       const shelves = [];

 $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20').each((_idx, el) => {
           const shelf = $(el)
           const title = shelf.find('span.a-size-base-plus.a-color-base.a-text-normal').text()

           shelves.push(title)
       });

       return shelves;
   } catch (error) {
       throw error;
   }
};

fetchShelves().then((shelves) => console.log(shelves));