import axios from "axios";
import * as cheerio from "cheerio";;
import fs from "fs";
import { format } from "path";
let $;
let pageLength;
let data = [];
 
const getData = async (searchTerm,pageNo) => {
  // Send GET Request
  //https://www.amazon.in/s?k=headphones&page=2
  const response = await (
    await axios.get(`https://www.amazon.in/s?k=${searchTerm}&page=${pageNo||1}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 5.1; AFTS Build/LMY47O) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/41.99900.2250.0242 Safari/537.36",
      },
    })
  ).data;
  // Load the returned response
  $ = cheerio.load(response);
};
const getPageDetails = async () => {
  let pageScrap=$(`.s-pagination-strip`,`div[role="navigation"]`);
  //console.log("page length =",pageScrap[0].children[5].children[0]['data']);
  pageLength=pageScrap[0].children[5].children[0]['data'];
}
const getProductDetails = async () => {
  // Find Title Section of the page
  let titleObj = $(
    "h2 a.a-link-normal.a-text-normal",
    'div[data-component-type="s-search-result"]'
  );
  // Find Price Section of the page
  let priceObj = $(
    "span.a-price:nth-of-type(1) span.a-offscreen",
    'div[data-component-type="s-search-result"]'
  );
  let img = $(
    `img.s-image`,
    'div[data-component-type="s-search-result"]'
  );
  
  // Get all product names and links
  for (let i = 0; i < titleObj.length; i++) {
    let productName = $(titleObj[i]).find("span")[0].children[0]["data"];
    let productLink = "https://amazon.in" + $(titleObj[i]).attr("href");
    let price = $(priceObj[i]).text();
    let imgUrl=$(img[i]).attr("src");
    data.push({
      productName: productName,
      price: price,
      imageUrl: imgUrl,
      productLink: productLink,
    });
  }
  //console.log(data);
  return data;
};

async function main(){
  await getData("headphones");
  getPageDetails();
  getProductDetails();
  console.log("page length =",pageLength);
   for(let i=2;i<=pageLength;i++){
    await getData("shoe",i);
    getProductDetails();

   }
   console.log(data);
  let jsonData=JSON.stringify(data);
 fs.writeFileSync(`data.json`,jsonData);
  //console.log(jsonData);
}
main();