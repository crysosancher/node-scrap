const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const cronjob = require("cron").CronJob;
const nodemailer = require("nodemailer");
const url =
  "https://www.amazon.in/s?k=sindoor&crid=Y9U1OHNHT8IM&sprefix=sindoor%2Caps%2C279&ref=nb_sb_noss_2";
  //"https://www.amazon.in/s?k=watch&crid=3L3TRTINOKLXF&sprefix=watch%2Caps%2C289&ref=nb_sb_noss";
  let browser;
async function getData() {
  browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  await page.goto(url, { waitUntil: "networkidle0" });
  return page;
}
async function checkPrice(page) {
  await page.reload({ waitUntil: "networkidle0" });
  let html = await page.evaluate(() => {
    return document.body.getElementsByClassName('s-main-slot s-result-list s-search-results sg-row')[0].innerHTML;
    //console.log(document.body.getElementsByClassName('s-main-slot s-result-list s-search-results sg-row')[0].innerHTML)
  });
  const $ = cheerio.load(html);
  const price=[];
  $(".a-price-whole", html).each(function () {
    let pricegandu = $(this).text();
    price.push(pricegandu);
  });
  // console.log(price.length);

  const products=[];
  $("h2 .a-size-base-plus", html).each(function () {
	let name = $(this).text();
	products.push(name);
	
      });
  const brand=[];
  $("h5 .a-size-base-plus", html).each(function () {
	let Bname = $(this).text();
	brand.push(Bname);
	
      });
	//console.log("Brand=>",brand,products);
 
// const img=[];
//   $(".s-image", html).each(function () {
//     let imageurl = $(this).attr('src');
//     img.push(imageurl);
//   });
//   console.log(img)
console.log("brand=",brand.length,"Product Name=",products.length,"Price=",price.length);
for(let i=0;i<price.length;i++){
    console.log("Product Name=>",products[i],"Price=>",price[i+3]);
}
 }
async function main() {
  const page = await getData();
  await checkPrice(page);
  //await browser.close();
}
main();
