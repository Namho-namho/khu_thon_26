import { load } from 'cheerio';

const ALLOWED_HOSTS = new Set(['namu.wiki', 'ko.wikipedia.org']);
const TIMEOUT_MS = 10_000;
const MAX_LEN = 5000;
const MIN_LEN = 200;
const USER_AGENT = 'Mozilla/5.0 (compatible; AfterStage/1.0)';

export async function fetchWikiFromUrl(url: string): Promise<string> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('잘못된 URL입니다');
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    throw new Error('나무위키 또는 위키백과 URL만 지원합니다');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let html: string;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    html = await res.text();
  } finally {
    clearTimeout(timer);
  }

  const $ = load(html);
  $('script, style, nav, footer, .navbar, .sidebar').remove();

  let bodyText: string;
  if (parsed.hostname === 'ko.wikipedia.org') {
    bodyText = $('#mw-content-text').text();
  } else {
    bodyText =
      $('article').text() ||
      $('main').text() ||
      $('#content').text() ||
      $('body').text();
  }

  const cleaned = bodyText.replace(/\s+/g, ' ').trim().slice(0, MAX_LEN);

  if (cleaned.length < MIN_LEN) {
    throw new Error('본문이 너무 짧습니다');
  }

  return cleaned;
}
