import puppeteer from '/Users/phanu/Developer/ClaudeAnimationBase/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
const [base, only] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const report = {};
async function setup({ intercept } = {}) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 2 });
  if (intercept) { await page.setRequestInterception(true); page.on('request', intercept); }
  await page.evaluateOnNewDocument(() => {
    window.__streams = []; window.__sends = 0;
    const orig = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = async (c) => { const s = await orig(c); window.__streams.push(s); return s; };
    let H;
    Object.defineProperty(window, 'Hands', { configurable: true, get: () => H, set: (v) => { H = v; const o = v.prototype.send; v.prototype.send = function (...a) { window.__sends++; return o.apply(this, a); }; } });
  });
  await page.goto(base, { waitUntil: 'load', timeout: 20000 });
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.includes('SignBridge')); b.scrollIntoView(); b.click(); });
  await sleep(500);
  await page.evaluate(() => [...document.querySelectorAll('button')].find((x) => x.textContent.includes('Try it live')).click());
  return { browser, page };
}
const live = (page) => page.evaluate(() => window.__streams.flatMap((s) => s.getTracks()).filter((t) => t.readyState === 'live').length);
const sbTab = (page) => page.evaluate(() => [...document.querySelectorAll('[role=tab]')].filter((t) => t.getAttribute('aria-selected') === 'true').map((t) => t.textContent).join('|'));
const clickWebcam = (page) => page.evaluate(() => [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Use webcam').click());
const gridReady = (page) => page.waitForFunction(() => document.querySelectorAll('button[class*="thumb"]').length >= 48, { timeout: 20000 });

const cases = {
  async stalledModel() {
    const { browser, page } = await setup({ intercept: (r) => (r.url().endsWith('/signbridge/model.bin') ? undefined : r.continue()) });
    await sleep(16000);
    const r = { alert: await page.$eval('[role=alert]', (e) => e.textContent.trim()).catch(() => null), retry: await page.evaluate(() => [...document.querySelectorAll('button')].some((b) => b.textContent.trim() === 'Retry')) };
    await browser.close(); return r;
  },
  async trackerRuntimeBlocked() {
    const { browser, page } = await setup({ intercept: (r) => (r.url().includes('cdn.jsdelivr.net') && !r.url().endsWith('/hands.js') ? r.abort() : r.continue()) });
    await gridReady(page); await clickWebcam(page); await sleep(14000);
    const r = { alert: await page.$eval('[role=alert]', (e) => e.textContent.trim()).catch(() => null), liveTracks: await live(page) };
    await browser.close(); return r;
  },
  async tabNearBottom() {
    const { browser, page } = await setup();
    await gridReady(page);
    // put the tab bar near the bottom edge of the viewport so the (not yet rendered) video starts off-screen
    await page.evaluate(() => document.querySelector('[role=tablist][class*="tabs"]').scrollIntoView({ block: 'end' }));
    await sleep(300);
    const tabBottomGap = await page.evaluate(() => window.innerHeight - document.querySelector('[role=tablist][class*="tabs"]').getBoundingClientRect().bottom);
    await clickWebcam(page); await sleep(1500);
    const r = { tabBottomGap, tab: await sbTab(page), liveTracks: await live(page) };
    await browser.close(); return r;
  },
  async sendRate() {
    const { browser, page } = await setup();
    await gridReady(page);
    await page.evaluate(() => document.querySelector('[role=tablist][class*="tabs"]').scrollIntoView({ block: 'start' }));
    await clickWebcam(page); await sleep(9000);
    const a = await page.evaluate(() => window.__sends); await sleep(3000); const b = await page.evaluate(() => window.__sends);
    await browser.close(); return { sendsPerSec: (b - a) / 3 };
  },
};
for (const [k, f] of Object.entries(cases)) if (!only || only === k) report[k] = await f();
console.log(JSON.stringify(report, null, 1));
