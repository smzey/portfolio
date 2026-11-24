import puppeteer from '/Users/phanu/Developer/ClaudeAnimationBase/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
const [base, out] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = {};
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
for (const reduced of [false, true]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }]);
  const reqs = [];
  page.on('request', (r) => r.url().includes('/videos/') && reqs.push(r.url().split('/').pop()));
  await page.goto(base, { waitUntil: 'load' });
  await sleep(800);
  const r = (report[reduced ? 'reduced' : 'normal'] = {});
  r.requestsOnLoad = [...reqs];
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.includes('KhaiDee')); b.scrollIntoView(); b.click(); });
  await sleep(2500);
  r.requestsAfterDrawer = [...new Set(reqs)];
  r.paused = await page.$eval('figure video', (v) => v.paused);
  r.playBtn = await page.$('figure button').then((b) => !!b);
  await page.screenshot({ path: `${out}/video-${reduced ? 'reduced' : 'normal'}.png` });
  await page.close();
}
console.log(JSON.stringify(report, null, 1));
await browser.close();
