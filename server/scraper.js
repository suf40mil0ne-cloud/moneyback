import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { randomUUID } from 'crypto';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dir, 'games.json');
const LIST_URL = 'https://www.korea.kr/briefing/pressReleaseList.do';
const DETAIL_URL = 'https://www.korea.kr/briefing/pressReleaseView.do?newsId=';

function loadGames() {
  if (!existsSync(DB_PATH)) return [];
  try { return JSON.parse(readFileSync(DB_PATH, 'utf-8')); } catch { return []; }
}

function saveGames(games) {
  writeFileSync(DB_PATH, JSON.stringify(games, null, 2));
}

// 텍스트에서 오류 생성 (랜덤으로 글자 변조)
function generateErrors(text, count = 3) {
  const chars = [...text];
  const koreanPositions = chars
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => /[가-힣]/.test(c))
    .map(({ i }) => i);

  if (koreanPositions.length < count) return { modifiedText: text, errors: [] };

  // 랜덤으로 count개 위치 선택
  const selected = [];
  const pool = [...koreanPositions];
  while (selected.length < count && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(idx, 1)[0]);
  }

  const modified = [...chars];
  selected.forEach(pos => {
    const code = chars[pos].charCodeAt(0);
    // 초성을 다음 자음으로 변경 (단순 +1)
    modified[pos] = String.fromCharCode(code + 1);
  });

  return {
    modifiedText: modified.join(''),
    errors: selected.sort((a, b) => a - b),
  };
}

async function scrapeList() {
  const res = await fetch(LIST_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PolicyGameBot/1.0)' },
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  const items = [];
  $('.press-list li, .list-type01 li, .news-list li').each((_, el) => {
    const $el = $(el);
    const title = $el.find('a').first().text().trim();
    const href = $el.find('a').first().attr('href') || '';
    const newsIdMatch = href.match(/newsId=(\d+)/);
    if (title && newsIdMatch) {
      items.push({ title, newsId: parseInt(newsIdMatch[1]) });
    }
  });

  return items.slice(0, 5);
}

async function scrapeDetail(newsId) {
  const res = await fetch(DETAIL_URL + newsId, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PolicyGameBot/1.0)' },
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  const title = $('h3.view-title, .view-head h3, h1').first().text().trim();
  const department = $('.dept-name, .view-info .dept, .writer').first().text().trim();
  const body = $('.view-con p, .press-content p').map((_, el) => $(el).text().trim()).get().join(' ');

  return { title, department, body: body.slice(0, 500) };
}

async function run() {
  console.log('스크래핑 시작...');
  const existing = loadGames();
  const existingIds = new Set(existing.map(g => g.newsId));

  let items;
  try {
    items = await scrapeList();
    console.log(`보도자료 ${items.length}개 발견`);
  } catch (e) {
    console.error('리스트 스크래핑 실패:', e.message);
    return;
  }

  const newGames = [];
  for (const item of items) {
    if (existingIds.has(item.newsId)) {
      console.log(`이미 있음: ${item.newsId}`);
      continue;
    }

    let detail;
    try {
      detail = await scrapeDetail(item.newsId);
      await new Promise(r => setTimeout(r, 1000)); // 1초 대기
    } catch (e) {
      console.error(`상세 스크래핑 실패 ${item.newsId}:`, e.message);
      continue;
    }

    const text = detail.body || item.title;
    const errorCount = 3;
    const { modifiedText, errors } = generateErrors(text, errorCount);

    if (errors.length === 0) continue;

    const game = {
      gameId: randomUUID(),
      newsId: item.newsId,
      title: detail.title || item.title,
      department: detail.department || '',
      category: '정책',
      summary: text.slice(0, 150),
      originalText: text,
      modifiedText,
      errors,
      difficulty: 'normal',
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    newGames.push(game);
    console.log(`추가: ${game.title}`);
  }

  saveGames([...existing, ...newGames]);
  console.log(`완료: ${newGames.length}개 추가, 총 ${existing.length + newGames.length}개`);
}

run().catch(console.error);
