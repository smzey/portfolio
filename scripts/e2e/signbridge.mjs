import puppeteer from '/Users/phanu/Developer/ClaudeAnimationBase/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
const [base, out] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const report = {};
for (const [name, w, h] of [['mobile', 390, 844], ['desktop', 1440, 900]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  const reqs = [];
  const errors = [];
  page.on('request', (r) => reqs.push(r.url()));
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(base, { waitUntil: 'load', timeout: 20000 });
  const r = (report[name] = {}); console.error(name, 'loaded');
  r.modelBeforeOpen = reqs.some((u) => u.includes('/signbridge/'));
  // open SignBridge drawer
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent.includes('SignBridge'));
    b.scrollIntoView(); b.click();
  });
  await page.waitForSelector('[role=dialog], [aria-modal=true]', { timeout: 5000 }).catch(() => {});
  await new Promise((res) => setTimeout(res, 600));
  r.modelAfterDrawerBeforeTap = reqs.some((u) => u.includes('/signbridge/model'));
  console.error('drawer'); await page.evaluate(() => [...document.querySelectorAll('button')].find((x) => x.textContent.includes('Try it live')).click()); console.error('tapped');
  await page.waitForFunction(() => document.querySelectorAll('[class*="thumb_"], [class*="thumb"] img').length >= 48, { timeout: 20000 });
  r.thumbs = await page.$$eval('button[class*="thumb"]', (b) => b.length);
  r.misses = await page.$$eval('button[class*="thumbMiss"]', (b) => b.map((x) => x.textContent.trim()));
  r.stat = await page.$eval('[class*="stat"]', (e) => e.textContent.trim());
  await page.evaluate(() => document.querySelector('button[class*="thumbMiss"]').click());
  await new Promise((res) => setTimeout(res, 200));
  r.resultText = await page.$eval('[aria-live=polite]', (e) => e.textContent.replace(/\s+/g, ' ').trim());
  r.overflowX = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await page.screenshot({ path: `${out}/${name}-en-dark.png` });
  // TH toggle (header button labelled TH)
  await page.evaluate(() => [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'TH')?.click());
  await new Promise((res) => setTimeout(res, 300));
  r.thStat = await page.$eval('[class*="stat"]', (e) => e.textContent.trim()).catch(() => 'n/a');
  r.modelRequests = reqs.filter((u) => u.includes('/signbridge/')).map((u) => u.split('/').pop());
  r.errors = errors;
  await page.screenshot({ path: `${out}/${name}-th.png` });
  await page.close();
}
console.log(JSON.stringify(report, null, 1));
await browser.close();
