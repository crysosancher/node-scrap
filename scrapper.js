const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 })
  await page.goto('https://www.amazon.in/s?k=shoes',{
      waitUntil: 'networkidle0'
  });
  const source=await page.evaluate(()=>{
    const resulttg=document.getElementsByClassName('a-size-base-plus a-color-base a-text-normal')
    return resulttg;
  });
  console.log(source);
 

  await browser.close();
 })();
// const puppeteer = require("puppeteer");

// puppeteer
//   .launch()
//   .then(async (browser) => {
//     const page = await browser.newPage();
//     await page.goto(
//       "https://www.amazon.com/Apple-iPhone-XR-Fully-Unlocked/dp/B07P6Y7954",{
//           waitUntil: "networkidle0"
//       }
//     );
//     await page.waitForSelector('body');
//   await page.evaluate(()=>{
//       let title = document.body.querySelector('#productTitle').innerText;
//       console.log(title);

//   })

// await browser.close();
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// import axios from 'axios'
// import { JSDOM, ResourceLoader } from 'jsdom'

// const getHTML = async (url: ): Promise<string> => {
//     const dom = new JSDOM((await axios.get<string>(url)).data, {
//         url,
//         runScripts: 'dangerously',
//         resources: new ResourceLoader()
//     })

//     // ignore all errors in the page
//     dom.window.onerror = () => {}

//     dom.window.addEventListener('error', () => {})

//     Object.defineProperty(dom.window, 'matchMedia', {
//         value: () => ({
//             matches: false,
//             addListener: () => {},
//             removeListener: () => {}
//         })
//     })

//     // fix Error: Secure random number generation is not supported by this browser. in jsdom
//     Object.defineProperty(dom.window, 'crypto', {
//         value: {
//             getRandomValues: () => [1, 2, 3]
//         }
//     })

//     //fix TypeError: window.requestAnimationFrame is not a function
//     Object.defineProperty(dom.window, 'requestAnimationFrame', {
//         value: (callback: () => void) => {
//             setTimeout(callback, 0)
//         }
//     })

//     //fix ReferenceError: IntersectionObserver is not defined (class)
//     Object.defineProperty(dom.window, 'IntersectionObserver', {
//         value: class {
//             observe() {}
//         }
//     })

//     return await new Promise<string>((resolve) => {
//         dom.window.addEventListener('load', () => {
//             setTimeout(() => {
//                 resolve(dom.serialize())
//                 dom.window.close()
//             }, 4000)
//         })
//     })
// }

// export default getHTML
