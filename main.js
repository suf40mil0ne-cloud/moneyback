const RULES = {
  year: 2025,
  meta: {
    updatedAt: '2026-03-09',
    modeLabelSingle: '1인',
    modeLabelCouple: '맞벌이 부부 최적화'
  },
  card: {
    thresholdRate: 0.25,
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
    ]
  },
  pension: {
    pensionSavingAnnualLimit: 6000000,
    combinedAnnualLimit: 9000000
  },
  irp: {
    yearlyGuideLimit: 9000000
  },
  childCredit: {
    minimumAge: 8,
    minorAge: 19
  },
  warnings: {
    duplicateDependent: '부양가족은 부부가 동시에 중복 공제하면 안 되므로 최종 제출 전 귀속 1인 확정이 필요합니다.',
    payerMismatch: '실제 지출자와 기본공제 귀속자가 다르면 공제 누락 가능성이 높습니다.',
    rentCashOverlap: '월세 세액공제와 현금영수증(카드성) 공제는 같은 지출에 대해 중복 적용이 불가합니다.'
  },
  scenario: {
    simple: {
      title: '심플',
      singleSummary: '입력 최소, 실수 방지 중심, 과도한 명의 조정 최소',
      coupleSummary: '입력 최소로 시작하고, 이미 쓰던 결제/납입 흐름을 크게 바꾸지 않는 방식입니다.'
    },
    balanced: {
      title: '균형',
      singleSummary: '공제 효율과 실행 편의성 균형',
      coupleSummary: '부부 간 배분 효율을 챙기되, 실행 피로도를 과도하게 늘리지 않는 방식입니다.'
    },
    max: {
      title: '절세 극대화',
      singleSummary: '납입·지출 배분을 적극 조정',
      coupleSummary: '부부 귀속 최적화, 카드 명의 전략, 연금저축/IRP 우선순위를 적극적으로 맞춥니다.'
    }
  }
};

const FAQ_ITEMS = [
  {
    q: '맞벌이 부부는 부부합산으로 신고하나요?',
    a: '일반적으로 근로소득 연말정산은 개인별로 진행되며, 이 서비스는 합산 신고가 아니라 부부 간 공제 항목 배분 최적화를 돕습니다.'
  },
  {
    q: '자녀 공제는 누구에게 몰아주는 게 유리한가요?',
    a: '자녀 기본공제를 누구에게 귀속하느냐에 따라 교육비·보험료·기부금·카드 관련 추천이 달라질 수 있어, 소득과 실제 지출자를 함께 보고 배분하는 것이 유리할 가능성이 높습니다.'
  },
  {
    q: '자녀 의료비를 다른 배우자가 결제했으면 어떻게 되나요?',
    a: '기본공제 귀속자와 실제 결제자가 다르면 공제 누락 위험이 생길 수 있어, 실제 지출자 기준으로 증빙과 귀속을 다시 확인해야 합니다.'
  },
  {
    q: '월세 세액공제와 현금영수증을 같이 받을 수 있나요?',
    a: '같은 월세 지출에 대해 월세 세액공제와 현금영수증 공제를 동시에 적용하는 것은 불가능할 수 있어 둘 중 하나를 선택해 점검해야 합니다.'
  },
  {
    q: '카드 사용은 누구 명의로 몰아야 하나요?',
    a: '카드 공제는 배우자별 총급여 대비 사용액 초과 구간이 중요해 단순 합산보다 각자 부족 구간을 먼저 채우는 방식이 실수 방지에 유리합니다.'
  }
];

const TODO_STORAGE_KEY = 'moneyback-action-guide-v3';

const form = document.getElementById('planner-form');
const results = document.getElementById('results');
const formError = document.getElementById('formError');
const ruleUpdateDate = document.getElementById('ruleUpdateDate');
const summaryList = document.getElementById('summaryList');
const allocationBody = document.getElementById('allocationBody');
const scenarioPanel = document.getElementById('scenarioPanel');
const todoList = document.getElementById('todoList');
const singleModeSection = document.getElementById('singleModeSection');
const coupleModeSection = document.getElementById('coupleModeSection');
const childList = document.getElementById('childList');
const dependentList = document.getElementById('dependentList');
const childrenCountInput = document.getElementById('childrenCount');

let activeMode = 'single';
let activeScenarioId = 'simple';
let latestResult = null;

function sanitizeNumber(raw) {
  const digits = String(raw == null ? '' : raw).replace(/[^0-9]/g, '');
  return digits ? Number(digits) : 0;
}

function formatMoney(value) {
  return Number(Math.max(0, Math.round(value))).toLocaleString('ko-KR');
}

function getMoneyInputValue(id) {
  const el = document.getElementById(id);
  return el ? sanitizeNumber(el.value) : 0;
}

function getBaseCardLimit(income) {
  return RULES.card.baseLimitByIncome.find((row) => income <= row.maxIncome).limit;
}

function computeCardTargetByPerson(income, usageTotal, mixBias = 'balanced') {
  const threshold = income * RULES.card.thresholdRate;
  const baseLimit = getBaseCardLimit(income);
  const weight = mixBias === 'check' ? 0.31 : mixBias === 'credit' ? 0.2 : 0.26;
  const desiredEligibleSpend = baseLimit / weight;
  const target = Math.max(threshold, threshold + desiredEligibleSpend);
  const shortfall = Math.max(0, target - usageTotal);

  return {
    threshold,
    target,
    shortfall,
    baseLimit
  };
}

function yearsOldFromBirthYear(birthYear) {
  if (!birthYear) return null;
  return RULES.year - birthYear;
}

function isMinor(birthYear) {
  const age = yearsOldFromBirthYear(birthYear);
  return age != null ? age <= RULES.childCredit.minorAge : null;
}

function isChildCreditEligible(birthYear) {
  const age = yearsOldFromBirthYear(birthYear);
  return age != null ? age >= RULES.childCredit.minimumAge : null;
}

function getSpouseLabelByIncome(aIncome, bIncome) {
  if (aIncome === bIncome) return '균형 배분';
  return aIncome > bIncome ? '배우자 A' : '배우자 B';
}

function getPreferredCardHolder(aCard, bCard) {
  return aCard.shortfall >= bCard.shortfall ? '배우자 A' : '배우자 B';
}

function createChildCard(data = {}) {
  const index = childList.children.length + 1;
  const card = document.createElement('article');
  card.className = 'repeat-card';
  card.innerHTML = `
    <div class="repeat-card-title">
      <strong>자녀 ${index}</strong>
      <button type="button" class="remove-btn" data-remove="child">삭제</button>
    </div>
    <div class="grid two-col">
      <div>
        <label>이름/구분명</label>
        <input data-field="name" value="${data.name || ''}" placeholder="자녀${index}" />
      </div>
      <div>
        <label>출생연도</label>
        <input data-field="birthYear" data-money inputmode="numeric" value="${data.birthYear || ''}" placeholder="예: 2016" />
      </div>
      <div>
        <label>교육비 지출액</label>
        <input data-field="education" data-money inputmode="numeric" value="${data.education || ''}" placeholder="0" />
      </div>
      <div>
        <label>의료비 지출액</label>
        <input data-field="medical" data-money inputmode="numeric" value="${data.medical || ''}" placeholder="0" />
      </div>
      <div>
        <label>보험료 지출액</label>
        <input data-field="insurance" data-money inputmode="numeric" value="${data.insurance || ''}" placeholder="0" />
      </div>
      <div>
        <label>기부금 지출액</label>
        <input data-field="donation" data-money inputmode="numeric" value="${data.donation || ''}" placeholder="0" />
      </div>
      <div>
        <label>신용카드 등 사용액</label>
        <input data-field="cardSpend" data-money inputmode="numeric" value="${data.cardSpend || ''}" placeholder="0" />
      </div>
      <div>
        <label>실제 결제자 <span class="mini-help" title="기본공제 추천 귀속 대상은 자동 계산됩니다.">?</span></label>
        <select data-field="payer">
          <option value="A" ${data.payer === 'A' ? 'selected' : ''}>배우자 A</option>
          <option value="B" ${data.payer === 'B' ? 'selected' : ''}>배우자 B</option>
          <option value="child" ${data.payer === 'child' ? 'selected' : ''}>자녀 본인</option>
          <option value="unknown" ${data.payer === 'unknown' ? 'selected' : ''}>모름</option>
        </select>
      </div>
    </div>
    <p class="hint">8세 이상 여부/미성년 여부는 출생연도로 자동 판단됩니다.</p>
  `;

  card.querySelector('[data-remove="child"]').addEventListener('click', () => {
    card.remove();
    renumberCards(childList, '자녀');
    childrenCountInput.value = String(childList.children.length);
  });

  childList.appendChild(card);
}

function createDependentCard(data = {}) {
  const index = dependentList.children.length + 1;
  const card = document.createElement('article');
  card.className = 'repeat-card';
  card.innerHTML = `
    <div class="repeat-card-title">
      <strong>부양가족 ${index}</strong>
      <button type="button" class="remove-btn" data-remove="dependent">삭제</button>
    </div>
    <div class="grid two-col">
      <div>
        <label>관계</label>
        <input data-field="relation" value="${data.relation || ''}" placeholder="부, 모, 조부모 등" />
      </div>
      <div>
        <label>나이</label>
        <input data-field="age" data-money inputmode="numeric" value="${data.age || ''}" placeholder="0" />
      </div>
      <label class="inline-check"><input type="checkbox" data-field="incomeEligible" ${data.incomeEligible ? 'checked' : ''} />소득요건 충족 여부</label>
      <label class="inline-check"><input type="checkbox" data-field="disabled" ${data.disabled ? 'checked' : ''} />장애인 여부</label>
      <label class="inline-check"><input type="checkbox" data-field="senior70" ${data.senior70 ? 'checked' : ''} />70세 이상 여부</label>
      <div></div>
      <div>
        <label>의료비 지출액</label>
        <input data-field="medical" data-money inputmode="numeric" value="${data.medical || ''}" placeholder="0" />
      </div>
      <div>
        <label>기부금 지출액</label>
        <input data-field="donation" data-money inputmode="numeric" value="${data.donation || ''}" placeholder="0" />
      </div>
      <div>
        <label>보험료 지출액</label>
        <input data-field="insurance" data-money inputmode="numeric" value="${data.insurance || ''}" placeholder="0" />
      </div>
      <div>
        <label>신용카드 등 사용액</label>
        <input data-field="card" data-money inputmode="numeric" value="${data.card || ''}" placeholder="0" />
      </div>
      <div>
        <label>실제 결제자</label>
        <select data-field="payer">
          <option value="A" ${data.payer === 'A' ? 'selected' : ''}>배우자 A</option>
          <option value="B" ${data.payer === 'B' ? 'selected' : ''}>배우자 B</option>
          <option value="dependent" ${data.payer === 'dependent' ? 'selected' : ''}>부양가족 본인</option>
          <option value="unknown" ${data.payer === 'unknown' ? 'selected' : ''}>모름</option>
        </select>
      </div>
    </div>
  `;

  card.querySelector('[data-remove="dependent"]').addEventListener('click', () => {
    card.remove();
    renumberCards(dependentList, '부양가족');
  });

  dependentList.appendChild(card);
}

function renumberCards(container, label) {
  Array.from(container.children).forEach((card, idx) => {
    const title = card.querySelector('.repeat-card-title strong');
    if (title) title.textContent = `${label} ${idx + 1}`;
  });
}

function syncChildrenCount() {
  const desired = sanitizeNumber(childrenCountInput.value);
  const current = childList.children.length;

  if (desired > current) {
    for (let i = 0; i < desired - current; i += 1) createChildCard();
  } else if (desired < current) {
    for (let i = 0; i < current - desired; i += 1) childList.lastElementChild.remove();
  }
  renumberCards(childList, '자녀');
}

function parseChildCards() {
  return Array.from(childList.children).map((card, idx) => {
    const read = (field) => card.querySelector(`[data-field="${field}"]`);
    const birthYear = sanitizeNumber(read('birthYear').value);
    const autoMinor = isMinor(birthYear);
    const auto8plus = isChildCreditEligible(birthYear);

    return {
      name: read('name').value.trim() || `자녀${idx + 1}`,
      birthYear,
      isMinor: autoMinor,
      is8Plus: auto8plus,
      education: sanitizeNumber(read('education').value),
      medical: sanitizeNumber(read('medical').value),
      insurance: sanitizeNumber(read('insurance').value),
      donation: sanitizeNumber(read('donation').value),
      cardSpend: sanitizeNumber(read('cardSpend').value),
      payer: read('payer').value
    };
  });
}

function parseDependentCards() {
  return Array.from(dependentList.children).map((card, idx) => {
    const read = (field) => card.querySelector(`[data-field="${field}"]`);
    return {
      relation: read('relation').value.trim() || `부양가족${idx + 1}`,
      age: sanitizeNumber(read('age').value),
      incomeEligible: read('incomeEligible').checked,
      disabled: read('disabled').checked,
      senior70: read('senior70').checked,
      medical: sanitizeNumber(read('medical').value),
      donation: sanitizeNumber(read('donation').value),
      insurance: sanitizeNumber(read('insurance').value),
      card: sanitizeNumber(read('card').value),
      payer: read('payer').value
    };
  });
}

function collectSingleInput() {
  return {
    mode: 'single',
    income: getMoneyInputValue('annualIncome'),
    monthlyRent: getMoneyInputValue('singleMonthlyRent'),
    pension: getMoneyInputValue('singlePension'),
    irp: getMoneyInputValue('singleIrp'),
    credit: getMoneyInputValue('currentCreditCard'),
    checkCash: getMoneyInputValue('currentCheckCash'),
    market: getMoneyInputValue('currentTraditionalMarket'),
    transit: getMoneyInputValue('currentTransit')
  };
}

function collectCoupleInput() {
  return {
    mode: 'couple',
    isMarriedRegistered: document.getElementById('isMarriedRegistered').checked,
    spouseA: {
      income: getMoneyInputValue('aIncome'),
      credit: getMoneyInputValue('aCredit'),
      checkCash: getMoneyInputValue('aCheckCash'),
      market: getMoneyInputValue('aMarket'),
      transit: getMoneyInputValue('aTransit'),
      pension: getMoneyInputValue('aPension'),
      irp: getMoneyInputValue('aIrp'),
      rent: getMoneyInputValue('aRent'),
      medical: getMoneyInputValue('aMedical'),
      donation: getMoneyInputValue('aDonation')
    },
    spouseB: {
      income: getMoneyInputValue('bIncome'),
      credit: getMoneyInputValue('bCredit'),
      checkCash: getMoneyInputValue('bCheckCash'),
      market: getMoneyInputValue('bMarket'),
      transit: getMoneyInputValue('bTransit'),
      pension: getMoneyInputValue('bPension'),
      irp: getMoneyInputValue('bIrp'),
      rent: getMoneyInputValue('bRent'),
      medical: getMoneyInputValue('bMedical'),
      donation: getMoneyInputValue('bDonation')
    },
    children: parseChildCards(),
    dependents: parseDependentCards()
  };
}

function validateInput(input) {
  if (input.mode === 'single') {
    if (!input.income) return '연봉(총급여)을 입력해 주세요.';
    return '';
  }

  if (!input.spouseA.income || !input.spouseB.income) {
    return '맞벌이 모드에서는 배우자 A/B 연봉(총급여)을 모두 입력해 주세요.';
  }

  if (!input.isMarriedRegistered) {
    return '혼인신고 여부가 체크되지 않았습니다. 맞벌이 부부 최적화 모드 사용 전 상태를 확인해 주세요.';
  }

  return '';
}

function buildSingleRecommendation(input) {
  const totalCard = input.credit + input.checkCash + input.market + input.transit;
  const card = computeCardTargetByPerson(input.income, totalCard, input.checkCash > input.credit ? 'check' : 'balanced');
  const preferredType = card.shortfall > 0 ? (input.checkCash >= input.credit ? '체크카드/현금영수증' : '체크카드') : '추가 사용보다 증빙 점검';

  const warnings = [];
  if (input.monthlyRent > 0 && input.checkCash > 0) warnings.push(RULES.warnings.rentCashOverlap);

  const summary = [
    `현재 기준으로는 카드 사용을 무리하게 늘리기보다, 남은 목표 ${formatMoney(card.shortfall)}원을 계획 지출 안에서 ${preferredType} 위주로 배치하는 편이 유리할 가능성이 높습니다.`,
    `연금저축+IRP 입력 합계는 ${formatMoney(input.pension + input.irp)}원입니다. 연간 가이드 상한 ${formatMoney(RULES.irp.yearlyGuideLimit)}원 대비 여유를 확인해 자동이체 금액을 조정해 보세요.`,
    input.monthlyRent > 0
      ? '월세 지출을 입력하셨으므로, 월세 세액공제와 현금영수증 처리 중 어떤 방식으로 갈지 하나만 확정하는 점검이 필요합니다.'
      : '월세 입력이 없으므로 카드/현금영수증 증빙 누락 점검에 집중하는 전략이 적합합니다.'
  ];

  const allocations = [
    {
      item: '카드사용액 전략',
      current: `누적 ${formatMoney(totalCard)}원`,
      target: '본인',
      reason: `총급여 ${formatMoney(input.income)}원 기준 목표 대비 부족분 ${formatMoney(card.shortfall)}원을 먼저 확인`,
      caution: card.shortfall > 0 ? '계획 없는 추가 소비는 피하고, 결제수단만 조정하세요.' : '목표 구간 도달 가능성이 높아 증빙 정리 우선'
    },
    {
      item: '연금저축/IRP',
      current: `연금저축 ${formatMoney(input.pension)} / IRP ${formatMoney(input.irp)}`,
      target: '본인',
      reason: '연말 몰아서 납입하기보다 월 자동이체 유지가 실수 방지에 유리',
      caution: '한도는 연도별로 변동될 수 있어 최종 확인 필요'
    },
    {
      item: '월세',
      current: input.monthlyRent > 0 ? `월 ${formatMoney(input.monthlyRent)}원 지출 입력` : '입력 없음',
      target: '본인',
      reason: '월세 증빙 방식 선택이 누락되면 공제 누락 가능성',
      caution: RULES.warnings.rentCashOverlap
    }
  ];

  const scenarioContent = {
    simple: [
      '이번 달은 결제수단 변경 최소화로 시작합니다.',
      '남은 소비 중 생활필수 지출만 체크카드/현금영수증으로 우선 배치합니다.',
      '증빙 누락(현금영수증 미발급) 여부만 먼저 점검합니다.'
    ],
    balanced: [
      '신용카드 비중이 높다면 일부를 체크카드로 이동해 공제 효율 균형을 맞춥니다.',
      '연금저축/IRP는 월 자동이체를 유지하면서 분기별로 한도 여유를 확인합니다.',
      '월세가 있다면 월세 세액공제와 현금영수증 중 한 가지 경로를 문서로 확정합니다.'
    ],
    max: [
      '연말 전까지 부족분을 월 단위로 쪼개 결제수단을 적극 최적화합니다.',
      '연금저축/IRP를 우선순위로 배치해 연말 급납입 리스크를 줄입니다.',
      '카드·현금·월세 증빙 경로를 한 장표로 만들어 누락 가능성을 최소화합니다.'
    ]
  };

  const todos = [
    `이번 주에 카드 부족분 ${formatMoney(card.shortfall)}원 달성 가능한 결제 항목만 분류하기`,
    '월세는 세액공제로 갈지 현금영수증으로 갈지 하나만 선택하기',
    '홈택스 간소화 자료에서 누락된 카드/현금영수증 항목 확인하기'
  ];

  return {
    mode: 'single',
    summary,
    allocations,
    warnings,
    scenarios: scenarioContent,
    todos,
    cardStats: { self: card }
  };
}

function buildCoupleRecommendation(input) {
  const aTotalCard = input.spouseA.credit + input.spouseA.checkCash + input.spouseA.market + input.spouseA.transit;
  const bTotalCard = input.spouseB.credit + input.spouseB.checkCash + input.spouseB.market + input.spouseB.transit;
  const aCard = computeCardTargetByPerson(input.spouseA.income, aTotalCard, input.spouseA.checkCash > input.spouseA.credit ? 'check' : 'balanced');
  const bCard = computeCardTargetByPerson(input.spouseB.income, bTotalCard, input.spouseB.checkCash > input.spouseB.credit ? 'check' : 'balanced');

  const recommendedChildOwner = getSpouseLabelByIncome(input.spouseA.income, input.spouseB.income);
  const preferredCardHolder = getPreferredCardHolder(aCard, bCard);

  const allocations = [];
  const warnings = [RULES.warnings.duplicateDependent];

  input.children.forEach((child) => {
    const owner = recommendedChildOwner === '균형 배분' ? '배우자 A 우선(동률)' : recommendedChildOwner;
    const payerLabel = child.payer === 'A' ? '배우자 A' : child.payer === 'B' ? '배우자 B' : child.payer === 'child' ? '자녀 본인' : '모름';
    const mismatchMedical = child.medical > 0 && !['unknown', 'child'].includes(child.payer) && payerLabel !== owner;

    allocations.push({
      item: `기본공제(${child.name})`,
      current: `출생연도 ${child.birthYear || '-'} / 8세 이상 ${child.is8Plus == null ? '판단불가' : child.is8Plus ? '예' : '아니오'} / 미성년 ${child.isMinor == null ? '판단불가' : child.isMinor ? '예' : '아니오'}`,
      target: owner,
      reason: '소득 구간 기준으로 기본공제 귀속자를 먼저 정하면 연계 항목(교육비·보험료·기부금) 정리가 쉬워집니다.',
      caution: '최종 제출 전 자녀별 귀속 1인 확정 필요'
    });

    allocations.push({
      item: `교육비(${child.name})`,
      current: `${formatMoney(child.education)}원 / 실제 결제자 ${payerLabel}`,
      target: owner,
      reason: '자녀 교육비는 자녀 기본공제를 받는 사람에게 귀속 추천',
      caution: child.education > 0 ? '영수증 명의 및 귀속자 일치 여부 확인 필요' : '입력 없음'
    });

    allocations.push({
      item: `의료비(${child.name})`,
      current: `${formatMoney(child.medical)}원 / 실제 결제자 ${payerLabel}`,
      target: owner,
      reason: '의료비는 기본공제 귀속과 실제 지출자 기준이 엇갈리면 누락 위험이 커집니다.',
      caution: mismatchMedical ? RULES.warnings.payerMismatch : '실제 지출자 기준 증빙 확인 필요'
    });

    if (mismatchMedical) warnings.push(`자녀 ${child.name} 의료비는 결제자와 기본공제 추천 귀속자가 달라 누락 위험이 있습니다.`);
  });

  allocations.push({
    item: '배우자 의료비',
    current: `A ${formatMoney(input.spouseA.medical)}원 / B ${formatMoney(input.spouseB.medical)}원`,
    target: '실제 지출자 기준 분리',
    reason: '배우자 의료비는 실제 지출한 사람이 공제받을 수 있는 항목으로 분리 점검이 필요합니다.',
    caution: '각자 결제 내역 증빙 보관 필요'
  });

  allocations.push({
    item: '카드사용액 전략',
    current: `A 부족 ${formatMoney(aCard.shortfall)}원 / B 부족 ${formatMoney(bCard.shortfall)}원`,
    target: `${preferredCardHolder} 우선`,
    reason: '카드 공제는 부부 합산이 아니라 배우자별 총급여 대비 초과 구간을 각각 채우는 구조가 중요합니다.',
    caution: '계획 없는 소비 증가 대신 기존 지출 명의만 조정'
  });

  allocations.push({
    item: '연금저축/IRP',
    current: `A ${formatMoney(input.spouseA.pension + input.spouseA.irp)}원 / B ${formatMoney(input.spouseB.pension + input.spouseB.irp)}원`,
    target: '한도 여유가 큰 배우자 우선',
    reason: '연말 몰아넣기보다 부부 각각 자동이체를 유지하면 누락과 착오를 줄일 수 있습니다.',
    caution: `연간 가이드 ${formatMoney(RULES.irp.yearlyGuideLimit)}원은 변동 가능`
  });

  const rentOverlap = (input.spouseA.rent > 0 && input.spouseA.checkCash > 0) || (input.spouseB.rent > 0 && input.spouseB.checkCash > 0);
  allocations.push({
    item: '월세',
    current: `A 월세 ${formatMoney(input.spouseA.rent)}원 / B 월세 ${formatMoney(input.spouseB.rent)}원`,
    target: '월세 세액공제 또는 현금영수증 중 1개 선택',
    reason: '같은 지출에 대해 중복 적용을 피해야 합니다.',
    caution: RULES.warnings.rentCashOverlap
  });
  if (rentOverlap) warnings.push(RULES.warnings.rentCashOverlap);

  input.dependents.forEach((dep) => {
    const recommended = dep.payer === 'B' ? '배우자 B' : '배우자 A';
    allocations.push({
      item: `기타 부양가족(${dep.relation})`,
      current: `나이 ${dep.age} / 소득요건 ${dep.incomeEligible ? '충족' : '미충족 또는 미확인'} / 결제자 ${dep.payer === 'B' ? '배우자 B' : dep.payer === 'A' ? '배우자 A' : dep.payer === 'dependent' ? '부양가족 본인' : '모름'}`,
      target: recommended,
      reason: '중복공제를 피하려면 가족별로 귀속자를 한 사람으로 고정하는 것이 안전합니다.',
      caution: dep.incomeEligible ? '요건 충족 가정이므로 증빙 확인 필요' : '소득요건 미확인 시 공제 누락 가능성'
    });
  });

  const firstSummary =
    input.children.length > 0
      ? `우리 집 현재 기준 추천: 자녀 ${input.children.length}명 중 ${input.children.length}명 모두 ${recommendedChildOwner === '균형 배분' ? '배우자 A 우선(동률)' : recommendedChildOwner} 귀속이 유리할 가능성이 높습니다.`
      : '우리 집 현재 기준 추천: 자녀 입력이 없어 자녀 귀속 최적화는 제외하고 카드·월세·의료비 중심으로 점검했습니다.';

  const summary = [
    firstSummary,
    `카드 추가 사용은 ${preferredCardHolder} 명의 체크카드/현금영수증 위주로 먼저 배치하는 전략이 적합합니다.`,
    '월세는 세액공제와 현금영수증 중 하나만 선택해 중복 이슈를 피해야 합니다.',
    warnings.some((line) => line.includes('의료비'))
      ? '자녀 의료비에서 결제자와 기본공제 귀속이 달라 공제 누락 위험이 있습니다.'
      : '자녀 의료비는 실제 지출자 기준과 기본공제 귀속자 일치 여부를 최종 점검하세요.'
  ];

  const scenarioContent = {
    simple: [
      '자녀 기본공제 귀속은 한 번 정하면 연관 항목(교육비·보험료·기부금)도 같은 귀속자 기준으로 유지합니다.',
      `카드 전략은 ${preferredCardHolder} 부족 구간부터 먼저 채우고, 다른 배우자는 현재 패턴 유지를 권장합니다.`,
      '부양가족별로 누가 공제받는지 체크리스트 1장으로 정리해 중복공제를 방지합니다.'
    ],
    balanced: [
      '자녀 귀속은 소득·지출 증빙을 함께 보며 1명 단위로 재배분합니다.',
      '카드는 A/B 각각 부족 구간을 월 단위로 나눠 채우고, 생활 편의가 높은 결제수단을 우선 사용합니다.',
      '연금저축/IRP는 한도 여유가 큰 배우자부터 비중을 높이고, 다른 배우자는 최소 자동이체를 유지합니다.'
    ],
    max: [
      '부부 간 귀속을 항목별로 적극 최적화해 자녀/부양가족 항목을 최대한 정밀하게 배분합니다.',
      '카드는 부족분이 큰 배우자 명의로 계획 지출을 집중해 초과 구간을 우선 확보합니다.',
      '의료비·월세·기부금은 실제 지출자 증빙을 기준으로 연말 전에 귀속 충돌을 해소합니다.'
    ]
  };

  const todos = [
    input.children.length > 0
      ? `${input.children[0].name} 교육비를 기본공제 받을 배우자 명의 기준으로 다시 점검하기`
      : '자녀 귀속자가 확정됐다면 교육비/의료비/보험료 귀속도 같은 기준으로 맞추기',
    '월세는 세액공제로 갈지 현금영수증으로 갈지 하나만 선택하기',
    `카드 추가 사용은 ${preferredCardHolder} 체크카드로 우선 배치하기`,
    '홈택스 간소화 자료에서 부부 중복공제 여부 최종 확인하기'
  ];

  return {
    mode: 'couple',
    summary,
    allocations,
    warnings,
    scenarios: scenarioContent,
    todos,
    cardStats: { aCard, bCard }
  };
}

function renderSummary(lines) {
  summaryList.innerHTML = lines.map((line) => `<li>${line}</li>`).join('');
}

function renderAllocations(rows) {
  allocationBody.innerHTML = rows
    .map(
      (row) => `
      <tr>
        <td>${row.item}</td>
        <td>${row.current}</td>
        <td>${row.target}</td>
        <td>${row.reason}</td>
        <td>${row.caution}</td>
      </tr>
    `
    )
    .join('');
}

function renderScenario() {
  if (!latestResult) return;
  const conf = RULES.scenario[activeScenarioId];
  const actions = latestResult.scenarios[activeScenarioId] || [];
  const intro = latestResult.mode === 'couple' ? conf.coupleSummary : conf.singleSummary;

  scenarioPanel.innerHTML = `
    <p><strong>${conf.title}</strong> · ${intro}</p>
    <ul class="scenario-list">
      ${actions.map((line) => `<li>${line}</li>`).join('')}
    </ul>
  `;

  const activeTab = document.querySelector(`.tab-btn[data-tab="${activeScenarioId}"]`);
  if (activeTab) scenarioPanel.setAttribute('aria-labelledby', activeTab.id);
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

function renderTodos(items) {
  const storage = loadTodoState();
  const key = `${latestResult.mode}-${activeScenarioId}`;
  const checkedState = storage[key] || items.map(() => false);

  todoList.innerHTML = items
    .map(
      (item, idx) => `
      <li>
        <input type="checkbox" id="todo-${idx}" ${checkedState[idx] ? 'checked' : ''} />
        <label for="todo-${idx}" class="${checkedState[idx] ? 'done' : ''}">${item}</label>
      </li>
    `
    )
    .join('');

  items.forEach((_, idx) => {
    const input = document.getElementById(`todo-${idx}`);
    const label = document.querySelector(`label[for="todo-${idx}"]`);
    input.addEventListener('change', () => {
      const next = loadTodoState();
      const base = next[key] || items.map(() => false);
      base[idx] = input.checked;
      next[key] = base;
      saveTodoState(next);
      label.classList.toggle('done', input.checked);
    });
  });
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

function renderAll(result) {
  latestResult = result;
  renderSummary(result.summary);
  renderAllocations(result.allocations);
  renderScenario();
  renderTodos(result.todos);

  results.classList.remove('hidden');
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleMode(mode) {
  activeMode = mode;
  singleModeSection.classList.toggle('hidden', mode !== 'single');
  coupleModeSection.classList.toggle('hidden', mode !== 'couple');
  formError.textContent = '';
}

function activateScenarioTab(nextId) {
  activeScenarioId = nextId;
  const tabs = Array.from(document.querySelectorAll('.tab-btn'));

  tabs.forEach((btn) => {
    const isActive = btn.dataset.tab === nextId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  if (latestResult) {
    renderScenario();
    renderTodos(latestResult.todos);
  }
}

function setupTabsKeyboard() {
  const tabs = Array.from(document.querySelectorAll('.tab-btn'));
  tabs.forEach((tab, idx) => {
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const nextIdx = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
      tabs[nextIdx].focus();
      activateScenarioTab(tabs[nextIdx].dataset.tab);
    });
  });
}

function setupAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach((btn) => {
    const panelId = btn.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.classList.toggle('hidden', isOpen);
    });
  });
}

function setupMoneyInputs() {
  document.addEventListener('input', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (!target.hasAttribute('data-money')) return;

    const digits = target.value.replace(/[^0-9]/g, '');
    target.value = digits ? Number(digits).toLocaleString('ko-KR') : '';
  });
}

function bootstrapRepeatLists() {
  childrenCountInput.value = '0';

  document.getElementById('addChildBtn').addEventListener('click', () => {
    createChildCard();
    childrenCountInput.value = String(childList.children.length);
  });

  document.getElementById('syncChildrenBtn').addEventListener('click', syncChildrenCount);

  document.getElementById('addDependentBtn').addEventListener('click', () => {
    createDependentCard();
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formError.textContent = '';

  const input = activeMode === 'single' ? collectSingleInput() : collectCoupleInput();
  const error = validateInput(input);

  if (error) {
    formError.textContent = error;
    results.classList.add('hidden');
    return;
  }

  const result = input.mode === 'single' ? buildSingleRecommendation(input) : buildCoupleRecommendation(input);
  renderAll(result);
});

document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener('change', (e) => {
    toggleMode(e.target.value);
  });
});

document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => activateScenarioTab(btn.dataset.tab));
});

ruleUpdateDate.textContent = RULES.meta.updatedAt;
setupMoneyInputs();
setupTabsKeyboard();
setupAccordions();
bootstrapRepeatLists();
renderFaq();
