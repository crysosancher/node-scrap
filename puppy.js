const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
var fs=require('fs');
const url =
  "https://www.amazon.in/s?k=honey";
  let browser;
  const shelves = [];
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
      return document.body.getElementsByClassName('s-main-slot s-result-list s-search-results sg-row')[0].childNodes[5];
      //console.log(document.body.getElementsByClassName('s-main-slot s-result-list s-search-results sg-row')[0].innerHTML)
    });
    console.log(html);
    fs.writeFileSync('puppy.html', html);
    const $ = cheerio.load(html);
    console.log("hey")
    $("*").each((_idx, el) => {
	const shelf = $(el)
  console.log("shelf=",shelf)
	const title = shelf.find('span.a-size-base-plus.a-color-base.a-text-normal').text()
	const price = shelf.find('span.a-price-whole').text()
	const imgUrl = shelf.find('img.s-image').attr('src')

	shelves.push({title: title, price: price,imgUrl: imgUrl})
    });
}
async function main() {
	const page=await getData()
	await checkPrice(page);
	//await console.log(shelves);
	await browser.close();
}
main();