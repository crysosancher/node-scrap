const axios = require("axios");
const cheerio = require("cheerio");

const fetchShelves = async () => {
   try {
       const response = await axios.get('https://www.amazon.com/s?k=shoe&crid=3SZVCWHCAQBKS&sprefix=sh%2Caps%2C426&ref=nb_sb_noss');

       const html = response.data;

       const $ = cheerio.load(html);

       const shelves = [];

 $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20').each((_idx, el) => {
           const shelf = $(el)
           const title = shelf.find('span.a-size-base-plus.a-color-base.a-text-normal').text()
           const price = shelf.find('span.a-offscreen').text()
           const imgUrl = shelf.find('img.s-image').attr('src')

           shelves.push({title: title, price: price,imgUrl: imgUrl})
       });

       return shelves;
   } catch (error) {
       throw error;
   }
};

fetchShelves().then((shelves) => console.log(shelves));