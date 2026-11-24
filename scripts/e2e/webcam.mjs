import puppeteer from '/Users/phanu/Developer/ClaudeAnimationBase/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
const [base, out] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = {};
async function run(name, { permit = true, blockCdn = false } = {}) {
  const args = ['--use-fake-device-for-media-stream'];
  if (permit) args.push('--use-fake-ui-for-media-stream');
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args });
  const ctx = browser.defaultBrowserContext();
  if (!permit) await ctx.overridePermissions(base, []);
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  if (blockCdn) {
    await page.setRequestInterception(true);
    page.on('request', (r) => (r.url().includes('cdn.jsdelivr.net') ? r.abort() : r.continue()));
  }
  await page.evaluateOnNewDocument((deny) => {
    window.__streams = [];
    const orig = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = async (c) => {
      if (deny) throw new DOMException('denied', 'NotAllowedError');
      const s = await orig(c);
      window.__streams.push(s);
      return s;
    };
  }, !permit);
  await page.goto(base, { waitUntil: 'load', timeout: 20000 });
  const click = (txt) => page.evaluate((t) => [...document.querySelectorAll('button')].find((x) => x.textContent.trim().includes(t))?.click(), txt);
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.includes('SignBridge')); b.scrollIntoView(); b.click(); });
  await sleep(500);
  await click('Try it live');
  await page.waitForFunction(() => document.querySelectorAll('button[class*="thumb"]').length >= 48, { timeout: 20000 });
  await click('Use webcam');
  const r = (report[name] = {});
  await sleep(blockCdn ? 2500 : 9000);
  r.alert = await page.$eval('[role=alert]', (e) => e.textContent.trim()).catch(() => null);
  r.overlay = await page.$eval('[class*="camOverlay"]', (e) => e.textContent.trim()).catch(() => null);
  r.liveTracks = await page.evaluate(() => window.__streams.flatMap((s) => s.getTracks()).filter((t) => t.readyState === 'live').length);
  r.samplesStillThere = await page.evaluate(() => [...document.querySelectorAll('[role=tab]')].some((t) => t.textContent.includes('Test images')));
  await page.screenshot({ path: `${out}/webcam-${name}.png` });
  if (name === 'allowed') {
    // scroll the drawer so the webcam panel leaves view
    await page.evaluate(() => { const v = document.querySelector('[class*="camStage"]'); const p = v.closest('[class*="drawerPanel"]') || document.scrollingElement; p.scrollTop = p.scrollHeight; });
    await sleep(800);
    r.scrollDebug = await page.evaluate(() => { const p = document.querySelector('[class*="drawerPanel"]'); const v = document.querySelector('[class*="camStage"]'); return { scrollTop: p?.scrollTop, scrollHeight: p?.scrollHeight, clientHeight: p?.clientHeight, camTop: v?.getBoundingClientRect().top ?? 'gone', camBottom: v?.getBoundingClientRect().bottom ?? 'gone' }; });
    r.tracksAfterScrollAway = await page.evaluate(() => window.__streams.flatMap((s) => s.getTracks()).filter((t) => t.readyState === 'live').length);
    r.modeAfterScrollAway = await page.evaluate(() => [...document.querySelectorAll('[class*="SignBridgeDemo"][role=tab], [role=tab]')].filter((t) => t.getAttribute('aria-selected') === 'true').map((t) => t.textContent).join('|'));
    // re-open webcam, then close drawer with Escape
    await page.evaluate(() => { const p = document.querySelector('[class*="drawerPanel"]'); if (p) p.scrollTop = 0; });
    await click('Use webcam');
    await sleep(3000);
    r.tracksReopened = await page.evaluate(() => window.__streams.flatMap((s) => s.getTracks()).filter((t) => t.readyState === 'live').length);
    await page.keyboard.press('Escape');
    await sleep(800);
    r.tracksAfterClose = await page.evaluate(() => window.__streams.flatMap((s) => s.getTracks()).filter((t) => t.readyState === 'live').length);
  }
  r.errors = errors;
  await browser.close();
}
await run('allowed');
await run('denied', { permit: false });
await run('cdnBlocked', { blockCdn: true });
console.log(JSON.stringify(report, null, 1));
