const faqItems = [
  { q: '연금저축 vs IRP, 뭐가 먼저인가요?', a: '둘 다 활용 가능하지만 시작은 수수료/운용 편의성을 보고 한 계좌부터 자동이체를 거는 방식이 현실적입니다.' },
  { q: '현금영수증 등록은 왜 중요한가요?', a: '결제 누락을 줄여 연말정산 확인 시간을 줄일 수 있습니다. 홈택스 등록 여부를 먼저 점검하세요.' },
  { q: 'ISA는 꼭 해야 하나요?', a: '필수는 아니지만 중장기 자금 관리에 유용합니다. 생활비를 해치지 않는 범위에서 소액으로 시작해도 충분합니다.' },
  { q: '소득이 낮아도 연금계좌를 시작할 가치가 있나요?', a: '절세 체감이 크지 않을 수 있어도 자동이체 습관을 만들면 내년 전략 수립이 쉬워집니다.' },
  { q: '카드 사용을 연말에 몰아서 늘리면 유리한가요?', a: '무리한 추가 소비는 비효율일 수 있습니다. 사용 확대보다 증빙 누락 방지가 더 안전합니다.' },
  { q: '연금저축을 이미 하고 있으면 뭘 점검하나요?', a: '자동이체 금액, 납입일, 남은 개월 수 기준 월 페이스를 먼저 점검하세요.' },
  { q: 'IRP는 직장인만 가능한가요?', a: '세부 자격/상품 조건은 금융사마다 다를 수 있습니다. 실제 가입 요건은 별도 확인이 필요합니다.' },
  { q: '월 납입 금액은 고정해야 하나요?', a: '필수는 아닙니다. 지출이 큰 달에는 낮추고 여유가 있는 달에 높이는 방식이 현실적입니다.' },
  { q: '정확한 환급액 계산도 해주나요?', a: '아니요. 이 페이지는 3분 내 실행할 행동을 제안하는 가이드입니다.' },
  { q: '근로소득이 아니어도 써도 되나요?', a: '가능하지만 공제 항목이 달라질 수 있습니다. 핵심은 누락 방지와 자동이체 습관입니다.' },
  { q: '연말 전에 가장 먼저 할 일은?', a: '현금영수증 등록 확인, 연금계좌 자동이체 점검, 고정지출 결제수단 점검 3가지를 먼저 끝내세요.' },
  { q: '절세형 플랜이 항상 좋은가요?', a: '현금흐름을 해치면 지속되지 않습니다. 보수적 플랜으로 시작해 유지 가능한 범위에서만 확대하세요.' }
];

const STORAGE_KEY = 'moneyback-todos-v1';

const form = document.getElementById('recommend-form');
const incomeInput = document.getElementById('income');
const errorEl = document.getElementById('error');
const resultEl = document.getElementById('result');
const toneEl = document.getElementById('tone');
const cardsEl = document.getElementById('cards');
const todoListEl = document.getElementById('todoList');

function getBand(income) {
  if (income < 30000000) return 'low';
  if (income <= 70000000) return 'mid';
  return 'high';
}

function moneyToManwon(value) {
  return `${Math.round(value / 10000)}만원`;
}

function getRecommend(input) {
  const band = getBand(input.income);
  const monthlyMap = {
    low: { conservative: 50000, taxFocused: 150000 },
    mid: { conservative: 80000, taxFocused: 220000 },
    high: { conservative: 100000, taxFocused: 300000 }
  };
  const monthly = monthlyMap[band];

  const toneMap = {
    low: '올해는 무리한 납입보다 누락 방지와 기본 공제 점검이 더 중요합니다.',
    mid: '연금계좌 중심으로 페이스를 잡으면 절세 체감 가능성이 높아집니다.',
    high: '연금계좌 납입 페이스를 강하게 가져가되 현금흐름을 함께 관리하는 전략이 유리합니다.'
  };

  const workerNote = input.isWorker
    ? '근로소득 기준 체크리스트 중심으로 추천했습니다.'
    : '근로소득 외 소득 구조는 공제 항목이 달라질 수 있어 세부 확인이 필요합니다.';

  const pensionBullets = input.hasPension
    ? [
        '이미 하고 있다면 자동이체 금액과 납입일을 먼저 점검하세요.',
        '남은 개월 수 기준으로 월 납입 페이스를 재설정하세요.',
        '월 납입 후 생활비 압박이 생기면 보수적 플랜으로 즉시 낮추세요.'
      ]
    : [
        '연금저축 또는 IRP 중 하나부터 소액 자동이체로 시작하세요.',
        '이번 달 계좌 개설 후 다음 달부터 자동이체를 켜두는 흐름이 간단합니다.',
        '한 번에 크게 넣기보다 월별 분할 납입이 부담을 줄입니다.'
      ];

  return {
    tone: `${toneMap[band]} ${workerNote}`,
    cards: [
      {
        title: '💳 카드/현금 전략',
        bullets: [
          input.highCardSpend ? '추가 소비보다 현금영수증/영수증 누락 방지에 집중하세요.' : '고정지출 결제수단을 정리해 공제 누락 가능성을 줄이세요.',
          '이번 달 안에 홈택스 현금영수증 발급수단 등록 여부를 확인하세요.',
          '연말 몰아쓰기보다 월별 분산 관리가 유리합니다.'
        ],
        planA: '보수적 플랜: 추가 소비 유도 없이 증빙 관리에 집중',
        planB: '절세형 플랜: 월 지출 리뷰 시간을 2회 확보해 누락 가능성 최소화',
        rationale: [
          '카드 사용액을 인위적으로 늘리는 전략은 효율이 떨어질 수 있습니다.',
          '증빙 정리와 결제수단 점검만으로도 실수 비용을 줄이는 데 도움이 됩니다.'
        ]
      },
      {
        title: '🏦 연금저축/IRP 전략',
        bullets: pensionBullets,
        planA: `보수적 플랜: 월 ${moneyToManwon(monthly.conservative)} 자동이체`,
        planB: `절세형 플랜: 월 ${moneyToManwon(monthly.taxFocused)} 자동이체`,
        rationale: [
          '소득 구간별 체감은 다르지만 월 자동이체 전략은 실행 난도가 낮습니다.',
          '개인 현금흐름을 우선하고 무리하지 않는 선에서 조정하는 것이 핵심입니다.'
        ]
      },
      {
        title: '📈 ISA 전략',
        bullets: [
          'ISA는 단기 환급보다 중장기 자금 관리 통장으로 접근하세요.',
          '입출금 여유자금 범위 안에서만 월 납입을 설정하세요.',
          input.highCardSpend ? '소비가 큰 달엔 ISA 납입을 줄이고 여유 달에 늘리세요.' : '월급일 다음날 소액 자동이체로 시작하면 지속성이 높습니다.'
        ],
        planA: `보수적 플랜: 월 ${moneyToManwon(Math.round(monthly.conservative * 0.6))} 적립`,
        planB: `절세형 플랜: 월 ${moneyToManwon(Math.round(monthly.taxFocused * 0.7))} 적립`,
        rationale: [
          'ISA는 즉시 환급액 계산보다 자산 형성 흐름 유지에 의미가 있습니다.',
          '연말정산 대비와 장기 투자 루틴을 동시에 고려하는 보조 축으로 활용하세요.'
        ]
      }
    ],
    todos: [
      '홈택스에서 현금영수증 발급수단 등록 상태 확인하기',
      '연금저축/IRP 자동이체 금액과 이체일 캘린더에 등록하기',
      '이번 달 고정지출 결제수단 3개만 먼저 점검하기'
    ]
  };
}

function renderCards(cards) {
  cardsEl.innerHTML = cards
    .map((card, idx) => `
      <article class="result-card">
        <h3 class="result-title">${card.title}</h3>
        <ul>${card.bullets.map((line) => `<li>${line}</li>`).join('')}</ul>
        <div class="plan">
          <span>${card.planA}</span>
          <strong>${card.planB}</strong>
          <em>개인 상황에 따라 무리하지 않는 선에서 조정하세요.</em>
        </div>
        <button type="button" class="toggle-rationale" data-target="rationale-${idx}" aria-expanded="false">근거 펼치기</button>
        <div id="rationale-${idx}" class="rationale hidden">${card.rationale.map((line) => `<p>${line}</p>`).join('')}</div>
      </article>
    `)
    .join('');

  document.querySelectorAll('.toggle-rationale').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-target');
      const target = document.getElementById(id);
      const open = !target.classList.contains('hidden');
      target.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(!open));
      btn.textContent = open ? '근거 펼치기' : '근거 접기';
    });
  });
}

function loadTodoState(length) {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (Array.isArray(parsed) && parsed.length === length) return parsed;
  } catch (e) {}
  return new Array(length).fill(false);
}

function renderTodos(todos) {
  const state = loadTodoState(todos.length);

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  todoListEl.innerHTML = todos
    .map(
      (todo, idx) => `
        <li>
          <input type="checkbox" id="todo-${idx}" ${state[idx] ? 'checked' : ''} />
          <label for="todo-${idx}" class="${state[idx] ? 'done' : ''}">${todo}</label>
        </li>
      `
    )
    .join('');

  todos.forEach((_, idx) => {
    const checkbox = document.getElementById(`todo-${idx}`);
    const label = document.querySelector(`label[for="todo-${idx}"]`);
    checkbox.addEventListener('change', () => {
      state[idx] = checkbox.checked;
      label.classList.toggle('done', checkbox.checked);
      save();
    });
  });
}

function renderFaq() {
  const faqList = document.getElementById('faqList');
  faqList.innerHTML = faqItems
    .map(
      (item) => `
        <details class="faq-item">
          <summary>${item.q}</summary>
          <p>${item.a}</p>
        </details>
      `
    )
    .join('');

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };
  document.getElementById('faq-jsonld').textContent = JSON.stringify(faqLd);
}

incomeInput.addEventListener('input', (e) => {
  const digits = e.target.value.replace(/[^0-9]/g, '');
  e.target.value = digits ? Number(digits).toLocaleString('ko-KR') : '';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const raw = incomeInput.value.replace(/,/g, '');
  const income = Number(raw);

  if (!raw || Number.isNaN(income) || income <= 0) {
    errorEl.textContent = '연 소득(총급여)을 숫자로 입력해 주세요.';
    return;
  }

  errorEl.textContent = '';

  const data = getRecommend({
    income,
    isWorker: document.getElementById('isWorker').checked,
    hasPension: document.getElementById('hasPension').checked,
    highCardSpend: document.getElementById('highCardSpend').checked
  });

  toneEl.textContent = data.tone;
  renderCards(data.cards);
  renderTodos(data.todos);

  resultEl.classList.remove('hidden');
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

renderFaq();
