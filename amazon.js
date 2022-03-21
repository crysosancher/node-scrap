const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const cronjob = require("cron").CronJob;
const nodemailer = require("nodemailer");
const url =
  "https://www.amazon.in/s?k=shoe&crid=Y9U1OHNHT8IM&sprefix=shoe%2Caps%2C279&ref=nb_sb_noss_2";
 let browser; 
async function getData() {
 browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  await page.goto(url, { waitUntil: "networkidle0" });
  return page;
}
async function checkPrice(page) {
  await page.reload({ waitUntil: "networkidle0" });
  let html = await page.evaluate(() => {
    return document.getElementsByClassName('s-main-slot s-result-list s-search-results sg-row')[0].children
    //console.log(document.body.getElementsByClassName('s-main-slot s-result-list s-search-results sg-row')[0].innerHTML)
  });
  console.log(typeof html);
  for(x of html){
    console.log(x);
  }
//  const $ = cheerio.load(html);

//   const price=[];
//   $(".a-price-whole", html).each(function () {
//     let pricegandu = $(this).text();
//     price.push(pricegandu);
//   });
//   console.log(price.length);

//   const products=[];
//   $("h5 .a-size-base-plus", html).each(function () {
// 	let name = $(this).text();
// 	 products.push(name);
//   });
// 	console.log(products.length);
//   const productDesciption = [];
//   $('h2 .a-size-base-plus',html).each(function (){
//     let desc = $(this).text();
//     productDesciption.push(desc);
//   })
//  console.log('product description = ',productDesciption.length);
// const img=[];
//   $(".s-image", html).each(function () {
//     let imageurl = $(this).attr('src');
//     img.push(imageurl);
//   });
//   console.log(img.length)

 }

async function main() {
  const page = await getData();
  await checkPrice(page);
  await browser.close();
}
main();
