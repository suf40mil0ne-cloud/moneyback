import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { randomUUID } from 'crypto';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cron from 'node-cron';

const __dir = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dir, 'data');
const ARTICLES_FILE = join(DATA_DIR, 'articles.json');

// ── 한글 자모 분해/조합 ──────────────────────────────────────

const JAMO_BASE = 0xAC00;
const JONG_CNT = 28;
const JUNG_CNT = 21;

const CHO_LIST  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG_LIST = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG_LIST = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

// 조사 (변경 금지)
const PARTICLES = new Set(['은','는','이','가','을','를','의','에','로','와','과','도','서','만','에서','부터','까지']);

// 비슷한 중성(모음) 쌍 인덱스
const SIMILAR_VOWEL_PAIRS = [
  [0,  4],  // ㅏ ↔ ㅓ
  [8,  13], // ㅗ ↔ ㅜ
  [1,  5],  // ㅐ ↔ ㅔ
  [2,  6],  // ㅑ ↔ ㅕ
  [12, 17], // ㅛ ↔ ㅠ
  [9,  14], // ㅘ ↔ ㅝ
  [11, 16], // ㅚ ↔ ㅟ
];

// 비슷한 초성(자음) 쌍 인덱스 + 쌍자음 여부
const DOUBLE_CHO = new Set([1, 4, 8, 13, 10]); // ㄲ ㄸ ㅃ ㅉ ㅆ
const SIMILAR_CHO_PAIRS = [
  [0,  15], // ㄱ ↔ ㅋ
  [3,  16], // ㄷ ↔ ㅌ
  [7,  17], // ㅂ ↔ ㅍ
  [12, 14], // ㅈ ↔ ㅊ
  [9,  10], // ㅅ ↔ ㅆ
  [0,  1],  // ㄱ ↔ ㄲ
  [3,  4],  // ㄷ ↔ ㄸ
  [7,  8],  // ㅂ ↔ ㅃ
  [12, 13], // ㅈ ↔ ㅉ
];

// 비슷한 종성(받침) 쌍 인덱스
const SIMILAR_JONG_PAIRS = [
  [4,  8],  // ㄴ ↔ ㄹ
  [16, 4],  // ㅁ ↔ ㄴ
  [16, 17], // ㅁ ↔ ㅂ
  [1,  17], // ㄱ ↔ ㅂ
  [4,  21], // ㄴ ↔ ㅇ
];

// 받침 추가 후보 인덱스
const ADD_JONG = [4, 16, 8, 1]; // ㄴ ㅁ ㄹ ㄱ
// 받침 제거 가능한 종성
const REMOVABLE_JONG = new Set([4, 8, 16, 1, 17, 21]); // ㄴ ㄹ ㅁ ㄱ ㅂ ㅇ

// 전략별 가중치 (난이도별)
const STRATEGY_WEIGHTS = {
  easy:   { vowel: 10, consonant: 30, final: 20, addRemove: 10, double: 30 },
  normal: { vowel: 30, consonant: 25, final: 25, addRemove: 15, double:  5 },
  hard:   { vowel: 50, consonant: 15, final: 25, addRemove: 10, double:  0 },
};

function decomposeHangul(char) {
  const code = char.charCodeAt(0) - JAMO_BASE;
  if (code < 0 || code > 11171) return null;
  return {
    cho:  Math.floor(code / (JONG_CNT * JUNG_CNT)),
    jung: Math.floor((code % (JONG_CNT * JUNG_CNT)) / JONG_CNT),
    jong: code % JONG_CNT,
  };
}

function composeHangul({ cho, jung, jong }) {
  return String.fromCharCode(JAMO_BASE + (cho * JUNG_CNT + jung) * JONG_CNT + jong);
}

function mutateHangul(char, difficulty = 'normal') {
  if (PARTICLES.has(char)) return null;
  const jamo = decomposeHangul(char);
  if (!jamo) return null;

  const W = STRATEGY_WEIGHTS[difficulty] || STRATEGY_WEIGHTS.normal;
  const candidates = []; // { result, w }

  // 1. 비슷한 모음(중성) 교체
  for (const [a, b] of SIMILAR_VOWEL_PAIRS) {
    const swap = jamo.jung === a ? b : jamo.jung === b ? a : -1;
    if (swap === -1) continue;
    const result = composeHangul({ ...jamo, jung: swap });
    if (result !== char && !PARTICLES.has(result))
      candidates.push({ result, w: W.vowel });
  }

  // 2. 비슷한 자음(초성) 교체
  for (const [a, b] of SIMILAR_CHO_PAIRS) {
    const swap = jamo.cho === a ? b : jamo.cho === b ? a : -1;
    if (swap === -1) continue;
    const isDouble = DOUBLE_CHO.has(a) || DOUBLE_CHO.has(b);
    const result = composeHangul({ ...jamo, cho: swap });
    if (result !== char && !PARTICLES.has(result))
      candidates.push({ result, w: isDouble ? W.double : W.consonant });
  }

  // 3. 비슷한 받침(종성) 교체
  for (const [a, b] of SIMILAR_JONG_PAIRS) {
    const swap = jamo.jong === a ? b : jamo.jong === b ? a : -1;
    if (swap === -1) continue;
    const result = composeHangul({ ...jamo, jong: swap });
    if (result !== char && !PARTICLES.has(result))
      candidates.push({ result, w: W.final });
  }

  // 4. 받침 추가 (받침 없는 글자만)
  if (jamo.jong === 0) {
    for (const jong of ADD_JONG) {
      const result = composeHangul({ ...jamo, jong });
      if (result !== char && !PARTICLES.has(result))
        candidates.push({ result, w: W.addRemove });
    }
  }

  // 5. 받침 제거 (제거 가능한 받침만)
  if (jamo.jong !== 0 && REMOVABLE_JONG.has(jamo.jong)) {
    const result = composeHangul({ ...jamo, jong: 0 });
    if (result !== char && !PARTICLES.has(result))
      candidates.push({ result, w: W.addRemove });
  }

  if (candidates.length === 0) return null;

  // 가중치 기반 무작위 선택
  const total = candidates.reduce((s, c) => s + c.w, 0);
  let rand = Math.random() * total;
  for (const c of candidates) {
    rand -= c.w;
    if (rand <= 0) return c.result;
  }
  return candidates[candidates.length - 1].result;
}

// ── 오타 생성 ────────────────────────────────────────────────

function generateTypos(text) {
  const len = text.length;
  const errorCount = len < 500 ? 5 : len < 1000 ? 8 : 12;

  // 문단 분리 (문단이 1개뿐이면 문장 단위로 분리)
  let paragraphs = text.split(/\n+/).filter(Boolean);
  if (paragraphs.length < 3) {
    paragraphs = text.split(/(?<=다\.) /).filter(Boolean); // 구분자 1글자(공백) — globalIdx 계산 유지
  }

  // 각 문단에서 후보 위치 수집 (max 2개/문단)
  const candidates = []; // { paraIdx, charIdx, globalIdx }
  let globalOffset = 0;

  const paragraphErrorCount = new Array(paragraphs.length).fill(0);

  for (let p = 0; p < paragraphs.length; p++) {
    const para = paragraphs[p];
    for (let i = 0; i < para.length; i++) {
      const char = para[i];
      if (!/[가-힣]/.test(char)) continue;
      if (PARTICLES.has(char)) continue;
      // 앞뒤 조사 위치 방지 (단어 끝 글자는 조사일 가능성 높으므로 skip)
      const next = para[i + 1];
      if (next && PARTICLES.has(next)) continue;
      candidates.push({ paraIdx: p, charIdx: i, globalIdx: globalOffset + i });
    }
    globalOffset += para.length + 1; // +1 for \n
  }

  // 셔플 후 errorCount개 선택 (문단당 max 2)
  const shuffled = candidates.sort(() => Math.random() - 0.5);
  const selected = [];

  for (const c of shuffled) {
    if (selected.length >= errorCount) break;
    if (paragraphErrorCount[c.paraIdx] >= 2) continue;
    const char = paragraphs[c.paraIdx][c.charIdx];
    const mutated = mutateHangul(char);
    if (!mutated) continue;
    selected.push({ ...c, original: char, mutated });
    paragraphErrorCount[c.paraIdx]++;
  }

  selected.sort((a, b) => a.globalIdx - b.globalIdx);
  return selected;
}

// ── 세그먼트 생성 ────────────────────────────────────────────

function buildSegments(text, typos) {
  // typos: [{ globalIdx, original, mutated, index }] sorted by globalIdx
  const modified = text.split('');
  typos.forEach((t, i) => { t.index = i; modified[t.globalIdx] = t.mutated; });
  const modifiedText = modified.join('');

  const segments = [];
  let prev = 0;
  for (const t of typos) {
    if (prev < t.globalIdx) {
      segments.push({ text: modifiedText.slice(prev, t.globalIdx), isTypo: false });
    }
    segments.push({ text: t.mutated, isTypo: true, index: t.index });
    prev = t.globalIdx + 1;
  }
  if (prev < modifiedText.length) {
    segments.push({ text: modifiedText.slice(prev), isTypo: false });
  }
  return segments;
}

// ── 스크래핑 ─────────────────────────────────────────────────

const LIST_URL    = 'https://www.korea.kr/briefing/pressReleaseList.do';
const DETAIL_BASE = 'https://www.korea.kr/briefing/pressReleaseView.do?newsId=';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.5',
};

async function fetchHtml(url) {
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    console.log('✅ fetch 성공:', url, html.length, 'bytes');
    return html;
  } catch (e) {
    console.error('❌ fetch 실패:', url, e.message);
    throw e;
  }
}

async function scrapeList() {
  const html = await fetchHtml(LIST_URL);
  const $ = cheerio.load(html);

  const items = [];
  // korea.kr 실제 구조: .list_type ul li > a > span.text > strong(제목) + span.lead(전문) + span.source > span(날짜) + span(부처)
  $('.list_type li').each((_, el) => {
    const $el   = $(el);
    const $a    = $el.find('a').first();
    const href  = $a.attr('href') || '';
    const match = href.match(/newsId=(\d+)/);
    if (!match) return;

    const title = $el.find('strong').first().text().trim();
    const lead  = $el.find('.lead').text().replace(/\s+/g, ' ').trim();
    const date  = $el.find('.source span').eq(0).text().trim();
    const dept  = $el.find('.source span').eq(1).text().trim();

    if (title) items.push({ newsId: match[1], title, dept, date, lead });
  });

  if (items.length === 0) {
    console.error('❌ 파싱 실패: .list_type li 매칭 0개 (HTML 구조 변경 가능성)');
  } else {
    console.log(`✅ 기사 ${items.length}개 파싱 완료`);
  }
  return items.slice(0, 10); // 최대 10개
}

async function scrapeDetail(newsId) {
  let html;
  try {
    html = await fetchHtml(DETAIL_BASE + newsId);
  } catch {
    return { title: '', dept: '', date: '', body: '' };
  }
  const $ = cheerio.load(html);

  const title = $('.view_title h1').first().text().trim();
  const dept  = $('.article_head .info .dept, .info .dept').first().text().trim();
  const date  = $('.article_head .info span').first().text().trim();

  // 본문: .view_cont — 단, 실제 본문이 docViewer iframe인 경우가 많아 <p>만 수집
  const paras = [];
  const $content = $('.view_cont, .article_body').first();
  if ($content.length) {
    $content.find('script, style, .remark, iframe').remove();
    $content.find('p').each((_, el) => {
      const t = $(el).text().replace(/\s+/g, ' ').trim();
      if (t.length > 20) paras.push(t);
    });
    if (paras.length === 0) {
      $content.text().split(/\n+/).forEach(line => {
        const t = line.trim();
        if (t.length > 20) paras.push(t);
      });
    }
  }

  const body = paras.join('\n\n');
  console.log(`✅ 기사 ${newsId} 본문 fetch 성공: ${body.length}자 (문단 ${paras.length}개)`);
  return { title, dept, date, body };
}

// ── 저장 ─────────────────────────────────────────────────────

function loadArticles() {
  if (!existsSync(ARTICLES_FILE)) return [];
  try { return JSON.parse(readFileSync(ARTICLES_FILE, 'utf-8')); } catch { return []; }
}

function saveArticles(articles) {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2));
    console.log('✅ 저장 완료:', ARTICLES_FILE, articles.length, '개');
  } catch (e) {
    console.error('❌ 저장 실패:', ARTICLES_FILE, e.message);
    throw e;
  }
}

// ── 메인 실행 ────────────────────────────────────────────────

let running = false;

export async function runScraper() {
  if (running) { console.log('[scraper] 이미 실행 중 — skip'); return []; }
  running = true;
  console.log(`[scraper] 시작 ${new Date().toISOString()}`);

  try {
    let listItems;
    try {
      listItems = await scrapeList();
    } catch (e) {
      console.error('❌ 리스트 스크래핑 실패:', e.message);
      return [];
    }

    const existing = loadArticles();
    const existingIds = new Set(existing.map(a => a.newsId));
    const today = new Date().toISOString().slice(0, 10);
    const newArticles = [];

    for (const item of listItems) {
      if (existingIds.has(item.newsId)) { console.log(`[scraper] 중복 skip: ${item.newsId}`); continue; }

      let detail = { title: '', dept: '', date: '', body: '' };
      try {
        detail = await scrapeDetail(item.newsId);
        await new Promise(r => setTimeout(r, 1200)); // rate limit
      } catch (e) {
        console.error(`❌ 상세 실패 ${item.newsId}:`, e.message);
      }

      // 목록 lead(전문 포함)와 상세 본문 중 더 긴 쪽 사용
      const text = [item.lead || '', detail.body || '']
        .sort((a, b) => b.length - a.length)[0] || item.title;
      if (text.length < 50) { console.log(`❌ 텍스트 너무 짧음 (${text.length}자): ${item.newsId}`); continue; }

      const len = text.length;
      const typos = generateTypos(text);
      const segments = buildSegments(text, typos);
      const timerSeconds = len < 500 ? 30 : len < 1000 ? 60 : 90;

      const article = {
        id: randomUUID(),
        newsId: item.newsId,
        title: detail.title || item.title,
        dept: detail.dept || item.dept,
        date: detail.date || item.date || today,
        category: '정책뉴스',
        originalText: text,
        segments,
        errorCount: typos.length,
        timerSeconds,
        scrapedAt: today,
        isActive: true,
      };

      newArticles.push(article);
      console.log(`✅ 추가: ${article.title} (${len}자, 오류 ${typos.length}개, ${timerSeconds}초)`);
    }

    // 최근 30일치만 유지
    const cutoff = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
    const updated = [...existing.filter(a => a.scrapedAt >= cutoff), ...newArticles];
    saveArticles(updated);

    console.log(`[scraper] 완료: ${newArticles.length}개 추가, 총 ${updated.length}개`);
    return newArticles;
  } finally {
    running = false;
  }
}

// ── 인기뉴스 스크래핑 ────────────────────────────────────────

const POPULAR_FILE = join(DATA_DIR, 'popular_news.json');
const MAIN_URL = 'https://www.korea.kr/main.do';

async function scrapePopularNews() {
  const html = await fetchHtml(MAIN_URL);
  const $ = cheerio.load(html);

  const items = [];
  // korea.kr 메인 "실시간 인기뉴스": .trend_wrap .trend ol li > a > span.thumb img + span.text span
  $('.trend_wrap .trend ol li').each((_, el) => {
    if (items.length >= 6) return;
    const $el   = $(el);
    const $a    = $el.find('a').first();
    const href  = $a.attr('href') || '';
    const title = $el.find('.text span').first().text().trim();
    const thumb = $el.find('img').first().attr('src') || '';

    if (!title || title.length < 5) return;
    const url     = href.startsWith('http') ? href : `https://www.korea.kr${href}`;
    const thumbUrl = thumb ? (thumb.startsWith('http') ? thumb : `https://www.korea.kr${thumb}`) : '';
    items.push({ rank: items.length + 1, title, url: url || 'https://www.korea.kr/news/listAll.do', thumb: thumbUrl || undefined });
  });

  return items;
}

export async function runPopularScraper() {
  console.log('[popular] 인기뉴스 스크래핑 시작');
  try {
    const items = await scrapePopularNews();
    if (items.length > 0) {
      if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
      writeFileSync(POPULAR_FILE, JSON.stringify(items, null, 2));
      console.log(`✅ [popular] ${items.length}개 저장:`, POPULAR_FILE);
    } else {
      console.error('❌ [popular] 결과 없음 (셀렉터 미매칭)');
    }
    return items;
  } catch (e) {
    console.error('❌ [popular] 실패:', e.message);
    return [];
  }
}

// ── cron 스케줄 ──────────────────────────────────────────────

export function startScheduler() {
  // 매일 09:00~09:50 KST, 10분 간격 6회
  // timezone 옵션으로 KST 고정 — 서버가 UTC여도 KST 09시에 실행됨
  cron.schedule('*/10 9 * * *', () => {
    runScraper().catch(e => console.error('❌ [cron] 에러:', e.message));
    runPopularScraper().catch(e => console.error('❌ [cron-popular] 에러:', e.message));
  }, { timezone: 'Asia/Seoul' });
  console.log('[cron] 스케줄러 시작 (매일 09:00~09:50 KST, 10분 간격)');
}

// ── 직접 실행 ────────────────────────────────────────────────

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runScraper().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
}
