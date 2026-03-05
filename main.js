const LAST_RULE_UPDATE = '2026-03-05';

// 세법/가정 숫자 상수: 연도별 변경 가능성이 있어 수정 가능하게 분리
const TAX_CONSTANTS = {
  card: {
    deductionStartRate: 0.25, // 총급여의 25% 초과 사용분부터 공제 대상 가정
    rates: {
      credit: 0.15,
      checkCash: 0.3,
      traditionalMarket: 0.4,
      transit: 0.4
    },
    baseLimitByIncome: [
      { maxIncome: 70000000, limit: 3000000 },
      { maxIncome: 120000000, limit: 2500000 },
      { maxIncome: Infinity, limit: 2000000 }
    ],
    extraLimitTraditionalMarket: 1000000,
    extraLimitTransit: 1000000
  },
  personal: {
    baseDeductionPerPerson: 1500000,
    seniorAdditionalPerPerson: 1000000,
    disabledAdditionalPerPerson: 2000000,
    singleParentAdditional: 1000000
  },
  pension: {
    pensionSavingAnnualLimit: 6000000, // 연금저축 단독 기준 가정
    combinedAnnualLimit: 9000000 // 연금저축+IRP 합산 기준 가정
  },
  isa: {
    // ISA는 단정적 절세 계산 대신 운용 목표 가이드 수치만 사용
    note: '연도별 한도/비과세 요건은 변경될 수 있어 최신 공시 확인 필요'
  },
  scenario: {
    simple: {
      title: '심플(귀찮음 최소)',
      summary: '이것만 하면 손해를 크게 보기 어렵게, 최소 행동에 집중합니다.',
      coverage: 0.7,
      maxSpendShare: 0.35,
      mix: { credit: 0.68, checkCash: 0.25, traditionalMarket: 0.04, transit: 0.03 },
      pensionConservativeMonthly: 70000,
      pensionAggressiveMonthly: 180000,
      isaMonthly: 80000,
      riskTone: 'low'
    },
    balanced: {
      title: '균형(현금흐름/편의)',
      summary: '무리 없이 효율을 노리는 기본형 시나리오입니다.',
      coverage: 0.9,
      maxSpendShare: 0.45,
      mix: { credit: 0.55, checkCash: 0.3, traditionalMarket: 0.08, transit: 0.07 },
      pensionConservativeMonthly: 130000,
      pensionAggressiveMonthly: 300000,
      isaMonthly: 200000,
      riskTone: 'mid'
    },
    max: {
      title: '절세 극대화(적극)',
      summary: '가능하면 여기까지를 목표로, 납입/소비 패턴을 적극 조정합니다.',
      coverage: 1.05,
      maxSpendShare: 0.55,
      mix: { credit: 0.4, checkCash: 0.32, traditionalMarket: 0.15, transit: 0.13 },
      pensionConservativeMonthly: 220000,
      pensionAggressiveMonthly: 550000,
      isaMonthly: 350000,
      riskTone: 'high'
    }
  }
};

const FAQ_ITEMS = [
  { q: '카드 공제는 무조건 많이 쓰면 좋은가요?', a: '추가 소비를 억지로 늘리기보다, 계획된 지출을 공제 효율이 높은 방식으로 관리하는 것이 안전합니다.' },
  { q: '체크카드와 현금영수증 비중을 올려야 하나요?', a: '일반적으로 신용카드보다 공제율이 높게 적용되는 경우가 많아, 생활 패턴 내에서 비중 조정이 유리할 수 있습니다.' },
  { q: '전통시장/대중교통은 꼭 분리 입력해야 하나요?', a: '정확한 분리 입력이 어려우면 0으로 두고 시작해도 됩니다. 분리할수록 목표 가이드가 더 구체화됩니다.' },
  { q: '연금저축과 IRP는 둘 다 해야 하나요?', a: '필수는 아닙니다. 현금흐름을 해치지 않는 선에서 자동이체를 유지하는 것이 우선입니다.' },
  { q: '연금저축 600, 합산 900은 확정 수치인가요?', a: '안내에서 자주 쓰이는 기준이지만 연도별 정책 변경 가능성이 있어 반드시 최신 정보를 확인해야 합니다.' },
  { q: 'ISA는 어떤 상품을 사야 하나요?', a: '이 서비스는 특정 상품을 추천하지 않습니다. 리스크 톤에 맞춰 예금/채권형/혼합형 비중을 정하는 수준으로 안내합니다.' },
  { q: '인적공제 인원은 어떻게 입력하나요?', a: '본인을 포함한 기본공제 대상 인원을 입력하고, 경로우대/장애인/한부모 해당 여부를 추가하면 됩니다.' },
  { q: '정확한 환급액 계산은 왜 안 하나요?', a: '정확 계산에는 상세 소득/공제 자료가 더 필요합니다. 이 페이지는 실행 가능한 목표치와 행동 가이드에 집중합니다.' },
  { q: '현재 사용액을 안 넣어도 되나요?', a: '가능합니다. 입력하지 않으면 0 기준으로 목표치를 제시합니다.' },
  { q: '시나리오는 어떤 기준으로 고르면 되나요?', a: '현금흐름이 불안하면 심플, 유지 가능하면 균형, 여유가 크면 절세 극대화 시나리오를 추천합니다.' },
  { q: '카드 공제 한도는 소득에 따라 달라지나요?', a: '네. 일반적으로 총급여 구간에 따라 기본 한도 가정이 달라지므로, 소득 입력값에 따라 목표치가 달라집니다.' },
  { q: '결과를 저장할 수 있나요?', a: '체크리스트 상태는 브라우저 로컬 저장소에 저장됩니다.' }
];

const TODO_STORAGE_KEY = 'moneyback-scenario-todos-v2';

const form = document.getElementById('planner-form');
const formError = document.getElementById('formError');
const results = document.getElementById('results');
const ruleUpdateDate = document.getElementById('ruleUpdateDate');
const personalSummary = document.getElementById('personalSummary');
const scenarioCard = document.getElementById('scenarioCard');
const todoList = document.getElementById('todoList');

let scenarioResults = [];
let activeScenarioId = 'simple';

function toNumber(raw) {
  const digits = String(raw || '').replace(/[^0-9]/g, '');
  return digits ? Number(digits) : 0;
}

function formatMoney(value) {
  return Number(Math.round(value)).toLocaleString('ko-KR');
}

function getMonthsLeft() {
  const now = new Date();
  return Math.max(1, 12 - now.getMonth());
}

function getBaseCardLimit(income) {
  return TAX_CONSTANTS.card.baseLimitByIncome.find((item) => income <= item.maxIncome).limit;
}

function getRiskToneText(riskTone) {
  if (riskTone === 'low') return '낮음: 예금/채권형 중심의 변동성 낮은 구성';
  if (riskTone === 'mid') return '중간: 채권형+혼합형 중심, 주식혼합 소량 포함';
  return '높음: 혼합형/주식혼합 비중을 높이되 분할 매수 유지';
}

function computePersonalSummary(input) {
  const base = input.dependentsCount * TAX_CONSTANTS.personal.baseDeductionPerPerson;
  const senior = input.seniorCount * TAX_CONSTANTS.personal.seniorAdditionalPerPerson;
  const disabled = input.disabledCount * TAX_CONSTANTS.personal.disabledAdditionalPerPerson;
  const singleParent = input.isSingleParent ? TAX_CONSTANTS.personal.singleParentAdditional : 0;
  const total = base + senior + disabled + singleParent;

  return { base, senior, disabled, singleParent, total };
}

function buildScenario(input, key) {
  const conf = TAX_CONSTANTS.scenario[key];
  const threshold = input.annualIncome * TAX_CONSTANTS.card.deductionStartRate;
  const baseLimit = getBaseCardLimit(input.annualIncome);

  const weightedRate =
    conf.mix.credit * TAX_CONSTANTS.card.rates.credit +
    conf.mix.checkCash * TAX_CONSTANTS.card.rates.checkCash +
    conf.mix.traditionalMarket * TAX_CONSTANTS.card.rates.traditionalMarket +
    conf.mix.transit * TAX_CONSTANTS.card.rates.transit;

  const eligibleNeeded = (baseLimit / weightedRate) * conf.coverage;
  const annualTarget = Math.max(
    threshold + input.annualIncome * 0.03,
    Math.min(threshold + eligibleNeeded, input.annualIncome * conf.maxSpendShare)
  );

  const targetCredit = annualTarget * conf.mix.credit;
  const targetCheckCash = annualTarget * conf.mix.checkCash;
  const targetTraditionalMarket = annualTarget * conf.mix.traditionalMarket;
  const targetTransit = annualTarget * conf.mix.transit;

  const currentTotal =
    input.currentCreditCard +
    input.currentCheckCash +
    input.currentTraditionalMarket +
    input.currentTransit;

  const remainingTotal = Math.max(0, annualTarget - currentTotal);
  const monthsLeft = getMonthsLeft();

  const incomeFactor = input.annualIncome < 30000000 ? 0.75 : input.annualIncome > 70000000 ? 1.15 : 1;
  const pensionConservative = conf.pensionConservativeMonthly * incomeFactor;
  const pensionAggressiveRaw = conf.pensionAggressiveMonthly * incomeFactor;
  const pensionAggressive = Math.min(
    pensionAggressiveRaw,
    TAX_CONSTANTS.pension.combinedAnnualLimit / 12
  );

  const isaMonthly = conf.isaMonthly * incomeFactor;

  return {
    id: key,
    title: conf.title,
    summary: conf.summary,
    cardPlan: {
      targetEligibleSpend: annualTarget,
      targetCredit,
      targetCheckCash,
      targetTraditionalMarket,
      targetTransit,
      remainingTotal,
      monthlyTargets: {
        total: annualTarget / 12,
        credit: targetCredit / 12,
        checkCash: targetCheckCash / 12,
        traditionalMarket: targetTraditionalMarket / 12,
        transit: targetTransit / 12,
        additionalNeededByYearEnd: remainingTotal / monthsLeft
      }
    },
    pensionPlan: {
      conservativeMonthly: pensionConservative,
      aggressiveMonthly: pensionAggressive,
      note: `연금저축/IRP 합산 가이드 상수(연 ${formatMoney(TAX_CONSTANTS.pension.combinedAnnualLimit)}원)는 연도별 변경 가능성 있음`
    },
    isaPlan: {
      monthly: isaMonthly,
      yearly: isaMonthly * 12,
      riskTone: conf.riskTone,
      note: TAX_CONSTANTS.isa.note
    },
    todo: [
      '이번 주 안에 카드/현금영수증 사용내역 누락 여부 확인하기',
      `월 ${formatMoney(Math.round(pensionConservative))}원 연금 자동이체 먼저 설정하기`,
      `ISA 월 ${formatMoney(Math.round(isaMonthly))}원 목표를 캘린더에 등록하기`
    ],
    rationale: [
      `카드 공제 가정은 총급여의 ${Math.round(TAX_CONSTANTS.card.deductionStartRate * 100)}% 초과 사용분부터 시작했습니다.`,
      '시나리오별 결제수단 비중(신용/체크·현금/전통시장/대중교통)을 다르게 설정해 목표치를 만들었습니다.',
      `기본 카드 공제 한도는 총급여 구간별 가정(현재 입력 기준 ${formatMoney(baseLimit)}원)으로 반영했습니다.`,
      '실제 공제/세액은 연도별 세법, 공제 요건, 증빙 여부에 따라 달라질 수 있습니다.'
    ]
  };
}

function generateScenarios(input) {
  return ['simple', 'balanced', 'max'].map((key) => buildScenario(input, key));
}

function renderPersonalSummary(summary, income) {
  personalSummary.innerHTML = [
    `<p><strong>입력 연봉:</strong> ${formatMoney(income)}원</p>`,
    `<p><strong>인적공제 가이드 합계:</strong> ${formatMoney(summary.total)}원 (기본 ${formatMoney(summary.base)} / 경로우대 ${formatMoney(summary.senior)} / 장애인 ${formatMoney(summary.disabled)} / 한부모 ${formatMoney(summary.singleParent)})</p>`,
    '<p>위 금액은 참고용 입력 가이드이며, 실제 인정 여부는 개인 요건 및 증빙 기준을 확인해야 합니다.</p>'
  ].join('');
}

function loadTodoState() {
  try {
    return JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) || '{}');
  } catch (_) {
    return {};
  }
}

function saveTodoState(state) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(state));
}

function renderTodo(scenario) {
  const state = loadTodoState();
  const currentState = state[scenario.id] || scenario.todo.map(() => false);

  todoList.innerHTML = scenario.todo
    .map((item, idx) => `
      <li>
        <input type="checkbox" id="todo-${scenario.id}-${idx}" ${currentState[idx] ? 'checked' : ''} />
        <label for="todo-${scenario.id}-${idx}" class="${currentState[idx] ? 'done' : ''}">${item}</label>
      </li>
    `)
    .join('');

  scenario.todo.forEach((_, idx) => {
    const checkbox = document.getElementById(`todo-${scenario.id}-${idx}`);
    const label = document.querySelector(`label[for="todo-${scenario.id}-${idx}"]`);
    checkbox.addEventListener('change', () => {
      const next = loadTodoState();
      const base = next[scenario.id] || scenario.todo.map(() => false);
      base[idx] = checkbox.checked;
      next[scenario.id] = base;
      saveTodoState(next);
      label.classList.toggle('done', checkbox.checked);
    });
  });
}

function renderScenario(scenario) {
  const plan = scenario.cardPlan;

  scenarioCard.innerHTML = `
    <h3>${scenario.title}</h3>
    <p>${scenario.summary}</p>

    <section class="block">
      <h4>A. 카드/현금 목표 사용액(가이드)</h4>
      <ul>
        <li>연간 목표 사용액: ${formatMoney(plan.targetEligibleSpend)}원</li>
        <li>월 평균 목표: ${formatMoney(plan.monthlyTargets.total)}원</li>
        <li>현재 입력 기준 남은 기간 추가 목표: ${formatMoney(plan.remainingTotal)}원 (월 약 ${formatMoney(plan.monthlyTargets.additionalNeededByYearEnd)}원)</li>
      </ul>
    </section>

    <section class="block">
      <h4>B. 카테고리별 목표</h4>
      <ul>
        <li>신용카드 목표: 연 ${formatMoney(plan.targetCredit)}원 / 월 ${formatMoney(plan.monthlyTargets.credit)}원</li>
        <li>체크·현금영수증 목표: 연 ${formatMoney(plan.targetCheckCash)}원 / 월 ${formatMoney(plan.monthlyTargets.checkCash)}원</li>
        <li>전통시장 목표: 연 ${formatMoney(plan.targetTraditionalMarket)}원 / 월 ${formatMoney(plan.monthlyTargets.traditionalMarket)}원</li>
        <li>대중교통 목표: 연 ${formatMoney(plan.targetTransit)}원 / 월 ${formatMoney(plan.monthlyTargets.transit)}원</li>
      </ul>
    </section>

    <section class="block">
      <h4>C. 연금저축/IRP 월 납입</h4>
      <ul>
        <li>보수적: 월 ${formatMoney(scenario.pensionPlan.conservativeMonthly)}원</li>
        <li>적극: 월 ${formatMoney(scenario.pensionPlan.aggressiveMonthly)}원</li>
      </ul>
      <p>${scenario.pensionPlan.note}</p>
    </section>

    <section class="block">
      <h4>D. ISA 운용 가이드</h4>
      <ul>
        <li>월 목표: ${formatMoney(scenario.isaPlan.monthly)}원</li>
        <li>연 목표: ${formatMoney(scenario.isaPlan.yearly)}원</li>
        <li>리스크 톤: ${getRiskToneText(scenario.isaPlan.riskTone)}</li>
      </ul>
      <p>${scenario.isaPlan.note}</p>
    </section>

    <button type="button" class="accordion-btn" id="rationaleBtn">근거/가정 펼치기</button>
    <div class="accordion-content hidden" id="rationaleBody">
      ${scenario.rationale.map((line) => `<p>${line}</p>`).join('')}
    </div>
  `;

  const rationaleBtn = document.getElementById('rationaleBtn');
  const rationaleBody = document.getElementById('rationaleBody');
  rationaleBtn.addEventListener('click', () => {
    const opened = !rationaleBody.classList.contains('hidden');
    rationaleBody.classList.toggle('hidden');
    rationaleBtn.textContent = opened ? '근거/가정 펼치기' : '근거/가정 접기';
  });

  renderTodo(scenario);
}

function activateTab(id) {
  activeScenarioId = id;
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    const active = btn.getAttribute('data-tab') === id;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  const scenario = scenarioResults.find((item) => item.id === id);
  if (scenario) renderScenario(scenario);
}

function renderFaq() {
  const faqList = document.getElementById('faqList');
  faqList.innerHTML = FAQ_ITEMS
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
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };
  document.getElementById('faq-jsonld').textContent = JSON.stringify(faqLd);
}

function setupMoneyInputs() {
  document.querySelectorAll('input[data-money]').forEach((input) => {
    input.addEventListener('input', (e) => {
      const digits = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = digits ? Number(digits).toLocaleString('ko-KR') : '';
    });
  });
}

function getInputValue(id) {
  return toNumber(document.getElementById(id).value);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const annualIncome = getInputValue('annualIncome');
  if (!annualIncome) {
    formError.textContent = '연봉(총급여)을 입력해 주세요.';
    return;
  }

  const dependentsCount = getInputValue('dependentsCount');
  if (dependentsCount < 1) {
    formError.textContent = '기본공제 대상 인원은 본인 포함 1명 이상이어야 합니다.';
    return;
  }

  formError.textContent = '';

  const input = {
    annualIncome,
    dependentsCount,
    seniorCount: getInputValue('seniorCount'),
    disabledCount: getInputValue('disabledCount'),
    isSingleParent: document.getElementById('isSingleParent').checked,
    currentCreditCard: getInputValue('currentCreditCard'),
    currentCheckCash: getInputValue('currentCheckCash'),
    currentTraditionalMarket: getInputValue('currentTraditionalMarket'),
    currentTransit: getInputValue('currentTransit')
  };

  scenarioResults = generateScenarios(input);
  renderPersonalSummary(computePersonalSummary(input), annualIncome);
  activateTab(activeScenarioId);
  results.classList.remove('hidden');
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => activateTab(btn.getAttribute('data-tab')));
});

ruleUpdateDate.textContent = LAST_RULE_UPDATE;
setupMoneyInputs();
renderFaq();
