const RULES = {
  year: 2025,
  meta: {
    updatedAt: '2026-03-09',
    modeLabelSingle: '1인',
    modeLabelCouple: '맞벌이 부부 최적화'
  },
  ui: {
    incomeBands: {
      3000: { label: '3천만원대', default: 35000000, options: [30000000, 32000000, 34000000, 36000000, 38000000] },
      4000: { label: '4천만원대', default: 45000000, options: [40000000, 42000000, 44000000, 46000000, 48000000] },
      5000: { label: '5천만원대', default: 55000000, options: [50000000, 52000000, 54000000, 56000000, 58000000] },
      6000: { label: '6천만원대', default: 65000000, options: [60000000, 62000000, 64000000, 66000000, 68000000] },
      7000: { label: '7천만원대', default: 75000000, options: [70000000, 72000000, 74000000, 76000000, 78000000] },
      8000: { label: '8천만원대', default: 85000000, options: [80000000, 82000000, 84000000, 86000000, 88000000] },
      9000: { label: '9천만원대', default: 95000000, options: [90000000, 92000000, 94000000, 96000000, 98000000] },
      '10000+': { label: '1억원 이상', default: 110000000, options: [100000000, 105000000, 110000000, 115000000, 120000000] }
    },
    spendBands: {
      standard: {
        none: { label: '거의 없음', default: 0, options: [0] },
        u10: { label: '10만원 미만', default: 50000, options: [30000, 50000, 70000, 90000] },
        '10-30': { label: '10~30만원', default: 200000, options: [100000, 150000, 200000, 250000, 300000] },
        '30-50': { label: '30~50만원', default: 400000, options: [300000, 350000, 400000, 450000, 500000] },
        '50-70': { label: '50~70만원', default: 600000, options: [500000, 550000, 600000, 650000, 700000] },
        '70-100': { label: '70~100만원', default: 850000, options: [700000, 800000, 900000, 1000000] },
        '100-150': { label: '100~150만원', default: 1250000, options: [1000000, 1100000, 1200000, 1300000, 1400000, 1500000] },
        '150p': { label: '150만원 이상', default: 1700000, options: [1500000, 1700000, 1900000, 2100000] },
        direct: { label: '직접 입력', default: 0, options: [] }
      },
      market: {
        none: { label: '거의 없음', default: 0, options: [0] },
        u10: { label: '10만원 미만', default: 50000, options: [30000, 50000, 70000, 90000] },
        '10-30': { label: '10~30만원', default: 200000, options: [100000, 150000, 200000, 250000, 300000] },
        '30-50': { label: '30~50만원', default: 400000, options: [300000, 350000, 400000, 450000, 500000] },
        '50-70': { label: '50~70만원', default: 600000, options: [500000, 550000, 600000, 650000, 700000] },
        '70p': { label: '70만원 이상', default: 800000, options: [700000, 800000, 900000, 1000000] },
        direct: { label: '직접 입력', default: 0, options: [] }
      },
      transit: {
        none: { label: '거의 없음', default: 0, options: [0] },
        u5: { label: '5만원 미만', default: 30000, options: [20000, 30000, 40000, 50000] },
        '5-10': { label: '5~10만원', default: 70000, options: [50000, 60000, 70000, 80000, 90000, 100000] },
        '10-20': { label: '10~20만원', default: 150000, options: [100000, 120000, 150000, 180000, 200000] },
        '20-30': { label: '20~30만원', default: 250000, options: [200000, 220000, 250000, 280000, 300000] },
        '30p': { label: '30만원 이상', default: 350000, options: [300000, 350000, 400000, 450000] },
        direct: { label: '직접 입력', default: 0, options: [] }
      }
    },
    defaultIncomeBandValue: {
      3000: 35000000,
      4000: 45000000,
      5000: 55000000,
      6000: 65000000,
      7000: 75000000,
      8000: 85000000,
      9000: 95000000,
      '10000+': 110000000
    }
  },
  estimation: {
    useAverageProjection: true
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
  isa: {
    taxFreeLimitLabel: '비과세 한도',
    lowTaxLabel: '초과분 저율 분리과세'
  },
  personalDeduction: {
    basicDeductionPerPerson: 1500000,
    incomeLimit: 1000000,
    wageOnlyTotalPayLimit: 5000000,
    elderFamilyMinAge: 60,
    childBasicMaxAge: 20,
    seniorAge: 70,
    childTaxCreditAge: 8,
    femaleDeductionAmount: 500000,
    singleParentDeductionAmount: 1000000,
    disabledDeductionAmount: 2000000
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

const state = {
  inputMode: {
    spendMode: 'monthly',
    incomeMode: 'quick',
    coupleSpendMode: 'monthly',
    coupleIncomeModeA: 'quick',
    coupleIncomeModeB: 'quick'
  },
  income: {
    mode: 'quickBand',
    quickBand: '5000',
    subBandValue: null,
    exactAnnualIncome: 55000000
  },
  spending: {
    mode: 'monthly-select',
    creditCard: { band: '10-30', subValue: null, exactValue: null },
    checkCash: { band: '10-30', subValue: null, exactValue: null },
    traditionalMarket: { band: 'u10', subValue: null, exactValue: null },
    transit: { band: 'u5', subValue: null, exactValue: null },
    monthlyCreditCard: 0,
    monthlyCheckCash: 0,
    monthlyTraditionalMarket: 0,
    monthlyTransit: 0,
    currentCreditCard: 0,
    currentCheckCash: 0,
    currentTraditionalMarket: 0,
    currentTransit: 0
  },
  family: {
    dependents: [],
    simpleInputs: {},
    detailedPersonalDeductions: {
      worker: {},
      spouse: {},
      dependents: []
    }
  }
};

const FAQ_ITEMS = [
  {
    q: '맞벌이 부부는 부부합산으로 신고하나요?',
    a: '<p>일반적으로 근로소득 연말정산은 개인 단위로 진행됩니다. 그래서 이 서비스도 “합산 신고”를 전제로 하지 않고, 부부가 같은 항목을 중복 공제하지 않도록 배분과 점검 순서를 안내합니다.</p><p>즉, 맞벌이 모드의 핵심은 신고 방식 변경이 아니라 누가 어떤 항목을 점검하면 실수를 줄일 수 있는지 정리하는 것입니다.</p>'
  },
  {
    q: '맞벌이 부부는 무엇을 먼저 점검해야 하나요?',
    a: '<p>먼저 자녀·부양가족의 기본공제 귀속자를 확정하고, 실제 결제자와 증빙 흐름이 일치하는지 확인하는 것이 좋습니다. 이 순서를 정하면 교육비·의료비·기부금 점검이 쉬워집니다.</p><p>그 다음 카드 사용 전략과 월세·현금영수증 선택처럼 충돌 가능성이 있는 항목을 정리하면 누락 위험을 크게 줄일 수 있습니다.</p>'
  },
  {
    q: '월평균 입력은 얼마나 정확한가요?',
    a: '<p>월평균 입력은 “지금 소비 패턴이 연말까지 이어진다”는 가정으로 만든 추정치입니다. 실제 월별 지출 변동을 완전히 반영하지는 않지만, 남은 기간에 어떤 행동을 할지 결정하는 데는 충분히 유용합니다.</p><p>정확도를 높이고 싶다면 누적 입력 모드로 전환해 현재 실적을 직접 입력해도 됩니다.</p>'
  },
  {
    q: '연봉을 대략 입력해도 되나요?',
    a: '<p>가능합니다. 빠른 선택은 입력 피로도를 줄이기 위한 기능이며 내부 계산에는 기준금액이 자동 매핑됩니다.</p><p>다만 경계 구간에 있는 경우에는 정확 입력으로 전환해 총급여를 직접 넣으면 추천의 민감도가 더 좋아질 수 있습니다.</p>'
  },
  {
    q: '자녀 나이를 정확히 몰라도 입력 가능한가요?',
    a: '<p>상세 인적공제 입력에서는 출생연도 외에도 연령대와 생활단계(미취학/초등/중고등/성인)로 빠르게 입력할 수 있습니다.</p><p>정확한 생년월일을 몰라도 점검을 시작할 수 있고, 필요할 때만 세부값을 보완하면 됩니다.</p>'
  },
  {
    q: '실제 환급액과 결과가 다를 수 있는 이유는 무엇인가요?',
    a: '<p>회사 제출자료 반영 시점, 홈택스 간소화 데이터, 개인별 요건 해석, 연도별 규정 변경에 따라 실제 결과는 달라질 수 있습니다.</p><p>이 도구는 확정 세액 계산기가 아니라 실행 행동을 정리하는 가이드이므로, 최종 신고 전 공식 자료 확인이 필요합니다.</p>'
  },
  {
    q: '카드보다 연금저축이 더 중요한 경우는 언제인가요?',
    a: '<p>이미 카드 관련 목표 구간을 충분히 채웠거나, 남은 기간이 짧아 소비 구조를 크게 바꾸기 어려운 경우에는 연금저축·IRP 같은 납입 전략 점검이 더 현실적일 수 있습니다.</p><p>반대로 현재 카드 부족 구간이 큰 경우에는 결제수단 비중 조정이 먼저일 수 있어, 결과 요약의 우선순위를 함께 확인해 주세요.</p>'
  },
  {
    q: 'ISA는 연말정산 환급을 바로 늘려주나요?',
    a: '<p>보통은 그렇지 않습니다. 연금저축·IRP처럼 납입 자체가 연말정산 세액공제로 바로 연결되는 구조와 달리, ISA는 투자수익 과세를 줄이는 절세 투자 계좌로 이해하는 편이 맞습니다.</p><p>다만 ISA를 오래 유지한 뒤 만기 자금을 연금계좌 전환 전략과 연결하면 연말정산 전체 설계에는 영향을 줄 수 있으므로, “즉시 환급”이 아니라 “세제 구조 확장” 관점에서 보시는 것이 좋습니다.</p>'
  },
  {
    q: '연금저축/IRP와 ISA는 무엇이 다른가요?',
    a: '<p>연금저축·IRP는 연말정산에서 세액공제 효과를 먼저 보는 계좌이고, ISA는 손익통산과 비과세 한도, 초과분 저율 분리과세를 통해 투자수익 과세를 줄이는 계좌입니다.</p><p>즉시 환급이 급하면 연금저축·IRP가 먼저일 수 있고, 이미 연금계좌를 어느 정도 활용 중이거나 장기 투자 절세가 중요하면 ISA 병행 또는 강화가 현실적일 수 있습니다.</p>'
  },
  {
    q: 'ISA에서 S&P500에 투자한다는 말은 무슨 뜻인가요?',
    a: '<p>이 사이트에서는 ISA 안에서 미국 상장 ETF를 직접 매수하는 의미로 단순화하지 않습니다. 보통은 국내상장 해외지수 ETF를 활용해 S&amp;P500, 나스닥100 등 글로벌 지수에 간접적으로 노출되는 구조를 설명합니다.</p><p>핵심은 특정 종목 추천이 아니라, ISA를 장기 투자용 절세계좌로 쓰면서 글로벌 지수형 자산을 어떤 방식으로 담을지 이해하는 데 있습니다.</p>'
  },
  {
    q: 'ISA에서 미국 상장 ETF를 직접 살 수 있나요?',
    a: '<p>이 가이드에서는 그 방향으로 안내하지 않습니다. 사용자 오해를 줄이기 위해 ISA에서는 국내상장 해외지수 ETF 활용 개념을 우선 설명하고, 미국 상장 ETF 직접매수처럼 받아들여질 표현은 피합니다.</p><p>따라서 결과 화면에서도 S&amp;P500형 노출이 필요하다면 “국내상장 해외지수 ETF 카테고리 활용” 수준으로만 제안합니다.</p>'
  },
  {
    q: 'ISA를 3년 보유한 뒤에는 무엇을 확인해야 하나요?',
    a: '<p>계좌를 오래 유지했다면 단순히 출금할지 여부만 보지 말고, 만기 시점과 세제 혜택 구조, 연금계좌 전환 가능성을 함께 확인해야 합니다. 특히 이미 연금저축·IRP를 활용 중이라면 만기 자금을 어떤 순서로 연계할지 점검할 가치가 있습니다.</p><p>결과 화면의 만기 알림은 바로 그 체크포인트를 놓치지 않도록 돕기 위한 장치입니다.</p>'
  },
  {
    q: 'ISA 만기 자금은 그냥 출금하면 되나요?',
    a: '<p>무조건 바로 출금하는 흐름으로 보기는 어렵습니다. 만기 시점에는 연금계좌 전환을 포함한 세제 연계 전략을 먼저 확인하고, 단순 출금이 더 나은지 비교하는 편이 안전합니다.</p><p>계좌 유지기간, 현재 연금계좌 활용도, 이후 투자 계획을 같이 봐야 하므로, 만기 직전에는 “출금 전 점검”이 우선입니다.</p>'
  },
  {
    q: '연금저축/IRP를 먼저 채우고 ISA를 해야 하나요?',
    a: '<p>즉시 연말정산 환급 효과가 더 중요하고 아직 연금저축·IRP 한도 여유가 크다면, 보통은 연금계좌 우선이 더 단순하고 실전적일 수 있습니다. 반대로 이미 연금계좌를 꽤 활용 중이거나 투자수익 절세 니즈가 분명하면 ISA를 병행하거나 우선 강화하는 전략도 가능합니다.</p><p>이 도구는 연봉, 월평균 지출, 연금 활용 상태, ISA 보유 상태를 함께 보고 그 우선순위를 행동 문장으로 정리합니다.</p>'
  }
];

const UPDATE_HISTORY_ITEMS = [
  '2026-03-10: ISA 입력, ISA 우선순위 엔진, 만기 알림, ISA FAQ/가이드 섹션 추가',
  '2026-03-09: 월평균 입력 기본 전환, 맞벌이 모드 월평균/누적 토글 보강, 연봉 빠른 선택 개선',
  '2026-03-09: 인적공제 상세 입력(반복 카드, 자동 판정, 충돌 배지) 확장',
  '2026-03-09: 정보형 콘텐츠 섹션, 정책 페이지 링크, FAQ 확장, 신뢰/면책 안내 강화'
];

const TODO_STORAGE_KEY = 'moneyback-action-guide-v5';

const form = document.getElementById('planner-form');
const results = document.getElementById('results');
const formError = document.getElementById('formError');
const ruleUpdateDate = document.getElementById('ruleUpdateDate');
const summaryList = document.getElementById('summaryList');
const allocationBody = document.getElementById('allocationBody');
const scenarioPanel = document.getElementById('scenarioPanel');
const todoList = document.getElementById('todoList');
const personalDeductionSummary = document.getElementById('personalDeductionSummary');
const spendEstimationSummary = document.getElementById('spendEstimationSummary');
const detailPriorityBadge = document.getElementById('detailPriorityBadge');
const whyRecommendationBox = document.getElementById('whyRecommendationBox');
const updateHistoryList = document.getElementById('updateHistoryList');
const footerUpdateDate = document.getElementById('footerUpdateDate');
const isaBadgeRow = document.getElementById('isaBadgeRow');
const isaSummaryCard = document.getElementById('isaSummaryCard');
const isaActionGuide = document.getElementById('isaActionGuide');
const isaMaturityAlert = document.getElementById('isaMaturityAlert');
const singleIsaCapacityHint = document.getElementById('singleIsaCapacityHint');
const coupleIsaCapacityHint = document.getElementById('coupleIsaCapacityHint');

const singleModeSection = document.getElementById('singleModeSection');
const coupleModeSection = document.getElementById('coupleModeSection');
const childList = document.getElementById('childList');
const dependentList = document.getElementById('dependentList');
const childrenCountInput = document.getElementById('childrenCount');

const personalDependentList = document.getElementById('personalDependentList');
const personalDependentWarning = document.getElementById('personalDependentWarning');
const spouseEligibilityText = document.getElementById('spouseEligibilityText');
const hasSpouseInput = document.getElementById('hasSpouse');
const detailHasSpouseInput = document.getElementById('detailHasSpouse');

const incomeInputMode = document.getElementById('incomeInputMode');
const incomeQuickBand = document.getElementById('incomeQuickBand');
const incomeQuickSubBand = document.getElementById('incomeQuickSubBand');
const incomeUseDirect = document.getElementById('incomeUseDirect');
const quickIncomeWrap = document.getElementById('quickIncomeWrap');
const quickIncomeValueText = document.getElementById('quickIncomeValueText');
const annualIncomeInput = document.getElementById('annualIncome');

const spendInputMode = document.getElementById('spendInputMode');
const monthlySpendWrap = document.getElementById('monthlySpendWrap');
const cumulativeSpendWrap = document.getElementById('cumulativeSpendWrap');
const estimationPreview = document.getElementById('estimationPreview');
const coupleSpendInputMode = document.getElementById('coupleSpendInputMode');
const coupleEstimationPreview = document.getElementById('coupleEstimationPreview');

const aIncomeInputMode = document.getElementById('aIncomeInputMode');
const aIncomeQuickBand = document.getElementById('aIncomeQuickBand');
const aIncomeQuickSubBand = document.getElementById('aIncomeQuickSubBand');
const aIncomeUseDirect = document.getElementById('aIncomeUseDirect');
const aQuickIncomeWrap = document.getElementById('aQuickIncomeWrap');
const aQuickIncomeValueText = document.getElementById('aQuickIncomeValueText');
const aIncomeInput = document.getElementById('aIncome');
const bIncomeInputMode = document.getElementById('bIncomeInputMode');
const bIncomeQuickBand = document.getElementById('bIncomeQuickBand');
const bIncomeQuickSubBand = document.getElementById('bIncomeQuickSubBand');
const bIncomeUseDirect = document.getElementById('bIncomeUseDirect');
const bQuickIncomeWrap = document.getElementById('bQuickIncomeWrap');
const bQuickIncomeValueText = document.getElementById('bQuickIncomeValueText');
const bIncomeInput = document.getElementById('bIncome');

const aMonthlySpendWrap = document.getElementById('aMonthlySpendWrap');
const aCumulativeSpendWrap = document.getElementById('aCumulativeSpendWrap');
const bMonthlySpendWrap = document.getElementById('bMonthlySpendWrap');
const bCumulativeSpendWrap = document.getElementById('bCumulativeSpendWrap');

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

function labelIncomeMode(mode) {
  if (mode === 'exact') return '직접 입력';
  if (mode === 'subBand') return '세부 선택';
  return '구간 선택';
}

function labelSpendMode(mode) {
  if (mode === 'cumulative') return '누적 입력';
  if (mode === 'monthly-direct') return '직접 입력';
  return '선택형 입력';
}

function getMoneyInputValue(id) {
  const el = document.getElementById(id);
  return el ? sanitizeNumber(el.value) : 0;
}

function getIncomeByPriority({ directInputEl, subSelectEl, bandSelectEl, allowDirect }) {
  const direct = sanitizeNumber(directInputEl.value);
  if (allowDirect && direct > 0) return { value: direct, mode: 'exact' };
  const sub = sanitizeNumber(subSelectEl.value);
  if (sub > 0) return { value: sub, mode: 'subBand' };
  const band = bandSelectEl.value;
  const base = RULES.ui.incomeBands[band]?.default || RULES.ui.defaultIncomeBandValue[band] || 0;
  return { value: base, mode: 'quickBand' };
}

function getBandRulesForSpend(kind) {
  if (kind === 'traditionalMarket') return RULES.ui.spendBands.market;
  if (kind === 'transit') return RULES.ui.spendBands.transit;
  return RULES.ui.spendBands.standard;
}

function fillSubOptions(selectEl, values) {
  const previousValue = selectEl.value;
  selectEl.innerHTML = `<option value="">기본값</option>${values
    .map((v) => `<option value="${v}">${formatMoney(v)}원</option>`)
    .join('')}`;
  if (previousValue && values.map(String).includes(String(previousValue))) {
    selectEl.value = String(previousValue);
  }
}

function resolveSpendValue(kind, bandEl, subEl, directInputEl, directToggleEl) {
  const direct = sanitizeNumber(directInputEl.value);
  const bandKey = bandEl.value;
  const rules = getBandRulesForSpend(kind);
  const bandInfo = rules[bandKey] || rules.none;

  if (bandKey === 'direct' || directToggleEl.checked) {
    return { value: direct, mode: 'monthly-direct', band: bandKey, subValue: null, exactValue: direct };
  }
  const sub = sanitizeNumber(subEl.value);
  if (sub > 0) {
    return { value: sub, mode: 'monthly-select', band: bandKey, subValue: sub, exactValue: null };
  }
  return { value: bandInfo.default, mode: 'monthly-select', band: bandKey, subValue: null, exactValue: null };
}

function getNowMonths() {
  const now = new Date();
  const elapsedMonths = now.getMonth();
  const remainingMonths = Math.max(1, 12 - elapsedMonths);
  return { elapsedMonths, remainingMonths };
}

function computeMonthlyProjection(monthly) {
  const { elapsedMonths, remainingMonths } = getNowMonths();
  const currentEstimate = monthly * elapsedMonths;
  const yearEndEstimate = monthly * 12;
  const remainingEstimate = monthly * remainingMonths;
  return { elapsedMonths, remainingMonths, currentEstimate, yearEndEstimate, remainingEstimate };
}

function estimateMonthlyInvestCapacity({ annualIncome = 0, monthlySpend = 0, monthlyPension = 0, monthlyIrp = 0 }) {
  const monthlyIncome = annualIncome > 0 ? annualIncome / 12 : 0;
  const reserved = monthlySpend + monthlyPension + monthlyIrp;
  const raw = Math.max(0, monthlyIncome * 0.35 - reserved);
  if (raw <= 100000) return 'u10';
  if (raw <= 300000) return '10-30';
  if (raw <= 500000) return '30-50';
  return '50p';
}

function labelInvestCapacity(capacity) {
  if (capacity === 'u10') return '월 10만원 이하';
  if (capacity === '10-30') return '월 10~30만원';
  if (capacity === '30-50') return '월 30~50만원';
  if (capacity === '50p') return '월 50만원 이상';
  return '아직 정하기 어려움';
}

function labelIsaStatus(status) {
  if (status === 'active') return '이미 보유 중';
  if (status === 'seasoned') return '보유 중이며 3년 이상 유지';
  if (status === 'maturitySoon') return '곧 만기 예정';
  if (status === 'maturityDecision') return '만기 처리 고민 중';
  return '아직 없음';
}

function labelIsaPurpose(purpose) {
  if (purpose === 'income') return '배당/인컴형 투자';
  if (purpose === 'stable') return '예적금·채권 포함 안정형 운용';
  if (purpose === 'unknown') return '아직 목적 미정';
  return '미국/글로벌 지수 장기투자';
}

function resolvePensionLinkStatus(selected, pensionAmount, irpAmount) {
  if (selected && selected !== 'unknown') return selected;
  const total = pensionAmount + irpAmount;
  if (total >= RULES.pension.combinedAnnualLimit * 0.8) return 'high';
  if (total >= RULES.pension.combinedAnnualLimit * 0.35) return 'mid';
  return 'low';
}

function labelPensionLinkStatus(status) {
  if (status === 'high') return '연금저축/IRP를 거의 채우는 중';
  if (status === 'mid') return '연금저축/IRP를 어느 정도 활용 중';
  if (status === 'unknown') return '연금계좌 활용 상태 미정';
  return '연금저축/IRP 활용 여지 큼';
}

function buildIsaInput({ status, purpose, pensionLinkStatus, selectedCapacity, estimatedCapacity, holder = '본인' }) {
  return {
    status,
    purpose,
    pensionLinkStatus,
    capacity: selectedCapacity === 'auto' ? estimatedCapacity : selectedCapacity,
    selectedCapacity,
    estimatedCapacity,
    holder
  };
}

function getIsaPriorityProfile(isa, metrics) {
  const reasons = [];
  const actions = [];
  const notes = [
    'ISA는 당장 연말정산 세액공제를 크게 늘리는 계좌라기보다 투자수익 절세 중심 계좌입니다.',
    'ISA에서는 해외 상장 ETF 직접매수보다 국내상장 해외지수 ETF 활용 설명이 더 적절합니다.',
    '손익통산, 비과세 한도, 초과분 저율 분리과세, 만기 후 연금계좌 전환 가능성을 함께 보세요.'
  ];
  let priority = 'B. 연금 + ISA 병행형';

  if (isa.status === 'seasoned' || isa.status === 'maturitySoon' || isa.status === 'maturityDecision') {
    priority = 'D. 만기전환 전략형';
    reasons.push('이미 ISA를 오래 보유했거나 만기 시점 판단이 가까워서 만기 후 행동이 핵심입니다.');
    actions.push('현재는 ISA를 장기 투자용 절세계좌로 쓰고, 만기 시점에는 연금계좌 전환 여부를 반드시 점검하세요.');
    actions.push('ISA 만기 후 연금계좌 전환이 가능한 시점이라면, 단순 출금보다 세제연계 전략을 먼저 확인하는 편이 좋습니다.');
  } else if (isa.pensionLinkStatus === 'low' && (isa.capacity === 'u10' || metrics.pensionRatio < 0.35)) {
    priority = 'A. 연금저축/IRP 우선형';
    reasons.push('즉시 연말정산 환급 효과가 더 중요하고, 연금저축·IRP 활용 여지가 아직 큽니다.');
    actions.push('지금은 ISA보다 연금저축/IRP 세액공제 여력을 먼저 활용하는 편이 더 유리할 수 있습니다.');
    actions.push('ISA는 보조 계좌로 두고, 연금저축 자동이체를 먼저 안정화한 뒤 병행 여부를 보세요.');
  } else if (isa.pensionLinkStatus === 'high' && (isa.capacity === '30-50' || isa.capacity === '50p' || metrics.income >= 70000000)) {
    priority = 'C. ISA 우선 강화형';
    reasons.push('연금계좌를 이미 충분히 활용 중이거나 장기 투자 절세 니즈가 더 큽니다.');
    actions.push('연금계좌를 어느 정도 채운 뒤 남는 투자 여력은 ISA로 분산하는 전략이 현실적입니다.');
    actions.push('ISA에서는 국내상장 해외지수 ETF 중심으로 장기 투자 구조를 잡는 설명이 더 적절합니다.');
  } else {
    reasons.push('세액공제와 투자 절세를 함께 챙길 수 있는 중간 구간으로 보입니다.');
    actions.push('연금저축 자동이체와 ISA를 병행해 현금흐름을 분리하는 전략이 현실적입니다.');
    actions.push('월 투자 여력이 크지 않다면 ISA는 소액 분할, 연금계좌는 세액공제 우선 순서로 보세요.');
  }

  if (isa.purpose === 'global') {
    notes.push('S&P500 노출을 원한다면 ISA에서는 국내시장에 상장된 해외지수 추종 ETF를 활용하는 방식으로 안내합니다.');
  } else if (isa.purpose === 'stable') {
    notes.push('안정형 운용 목적이라면 예적금·채권 중심의 절세 운용 계좌로 해석하는 편이 맞습니다.');
  } else if (isa.purpose === 'income') {
    notes.push('배당/인컴형 목적이라면 계좌 안에서 장기 보유와 과세 구조를 함께 점검하세요.');
  }

  return {
    priority,
    reasons,
    actions,
    notes,
    relationship:
      isa.pensionLinkStatus === 'low'
        ? '연금저축·IRP 세액공제가 먼저이고 ISA는 다음 단계 보완축에 가깝습니다.'
        : isa.pensionLinkStatus === 'high'
          ? '연금계좌를 어느 정도 활용 중이므로 ISA 비중을 올릴 근거가 있습니다.'
          : '연금저축·IRP와 ISA를 병행해 세액공제와 투자 절세를 나누는 구조가 적합합니다.',
    warning:
      isa.status === 'maturitySoon' || isa.status === 'maturityDecision'
        ? '만기 전 단순 출금 여부보다 연금계좌 전환 가능성과 세제 효과를 먼저 확인하세요.'
        : 'ISA는 즉시 환급형 계좌가 아니므로 연말 직전 납입만으로 환급이 커진다고 보기 어렵습니다.',
    maturityNeeded: ['seasoned', 'maturitySoon', 'maturityDecision'].includes(isa.status)
  };
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
  return { threshold, target, shortfall, baseLimit };
}

function yearsOldFromBirthYear(birthYear) {
  if (!birthYear) return null;
  return RULES.year - birthYear;
}

function isMinor(birthYear) {
  const age = yearsOldFromBirthYear(birthYear);
  return age != null ? age <= RULES.personalDeduction.childBasicMaxAge : null;
}

function isChildCreditEligibleAge(age) {
  return age != null && age >= RULES.personalDeduction.childTaxCreditAge;
}

function getSpouseLabelByIncome(aIncome, bIncome) {
  if (aIncome === bIncome) return '균형 배분';
  return aIncome > bIncome ? '배우자 A' : '배우자 B';
}

function getPreferredCardHolder(aCard, bCard) {
  return aCard.shortfall >= bCard.shortfall ? '배우자 A' : '배우자 B';
}

function computeIncomeEligible(annualIncome, wageOnly, totalPay) {
  if (wageOnly) {
    if (!totalPay) return null;
    return totalPay <= RULES.personalDeduction.wageOnlyTotalPayLimit;
  }
  if (!annualIncome) return null;
  return annualIncome <= RULES.personalDeduction.incomeLimit;
}

function getAgeFromQuick(dep) {
  if (dep.ageMode === 'exactAge' && dep.age) return dep.age;
  if (dep.ageMode === 'birthYear' && dep.birthYear) return yearsOldFromBirthYear(dep.birthYear);
  if (dep.ageMode === 'ageBand') {
    if (dep.ageBand === 'u60') return 55;
    if (dep.ageBand === '60s') return 65;
    if (dep.ageBand === '70p') return 72;
  }
  if (dep.ageMode === 'lifeStage') {
    if (dep.lifeStage === 'infant') return 2;
    if (dep.lifeStage === 'preschool') return 6;
    if (dep.lifeStage === 'elementary') return 10;
    if (dep.lifeStage === 'middle') return 14;
    if (dep.lifeStage === 'high') return 17;
    if (dep.lifeStage === 'adult') return 22;
  }
  if (dep.birthYear) return yearsOldFromBirthYear(dep.birthYear);
  if (dep.age) return dep.age;
  if (dep.lifeStage === 'infant') return 2;
  if (dep.lifeStage === 'preschool') return 6;
  if (dep.lifeStage === 'elementary') return 10;
  if (dep.lifeStage === 'middle') return 14;
  if (dep.lifeStage === 'high') return 17;
  if (dep.lifeStage === 'middlehigh') return 15;
  if (dep.lifeStage === 'adult') return 22;
  if (dep.ageBand === 'u60') return 55;
  if (dep.ageBand === '60s') return 65;
  if (dep.ageBand === '70p') return 72;
  return null;
}

function isChildLikeRelation(relation) {
  return relation === 'child' || relation === 'grandchild';
}

function setFieldBlockHidden(card, field, hidden) {
  const block = card.querySelector(`[data-block="${field}"]`);
  if (block) block.classList.toggle('hidden', hidden);
}

function updateChildCardUI(card) {
  const read = (field) => card.querySelector(`[data-field="${field}"]`);
  const ageMode = read('ageMode').value;
  setFieldBlockHidden(card, 'lifeStage', ageMode !== 'lifeStage');
  setFieldBlockHidden(card, 'birthYear', ageMode !== 'birthYear');
  setFieldBlockHidden(card, 'exactAge', ageMode !== 'exactAge');

  const name = read('name').value.trim() || card.querySelector('.repeat-card-title strong')?.textContent || '자녀';
  const stageLabel =
    ageMode === 'lifeStage'
      ? read('lifeStage').options[read('lifeStage').selectedIndex]?.textContent || '생활단계 미선택'
      : ageMode === 'birthYear'
        ? `${sanitizeNumber(read('birthYear').value) || '-'}년생`
        : `${sanitizeNumber(read('exactAge').value) || '-'}세`;
  const payerLabel = read('payer').options[read('payer').selectedIndex]?.textContent || '결제자 미선택';
  const summary = card.querySelector('[data-role="summary"]');
  if (summary) summary.textContent = `${name} · ${stageLabel} · ${payerLabel}`;
}

function updateDependentCardUI(card) {
  const read = (field) => card.querySelector(`[data-field="${field}"]`);
  const ageMode = read('ageMode').value;
  setFieldBlockHidden(card, 'ageBand', ageMode !== 'ageBand');
  setFieldBlockHidden(card, 'exactAge', ageMode !== 'exactAge');

  const relationLabel = read('relation').options[read('relation').selectedIndex]?.textContent || '관계 미선택';
  const ageLabel =
    ageMode === 'ageBand'
      ? read('ageBand').options[read('ageBand').selectedIndex]?.textContent || '연령구간 미선택'
      : `${sanitizeNumber(read('exactAge').value) || '-'}세`;
  const badges = [];
  if (read('incomeEligible').checked) badges.push('소득요건 충족');
  if (read('disabled').checked) badges.push('장애인');
  if (read('senior70').checked) badges.push('70세 이상');
  const summary = card.querySelector('[data-role="summary"]');
  if (summary) summary.textContent = `${relationLabel} · ${ageLabel}${badges.length ? ` · ${badges.join(', ')}` : ''}`;
}

function updatePersonalDependentCardUI(card) {
  const read = (field) => card.querySelector(`[data-field="${field}"]`);
  const relation = read('relation').value;
  const ageMode = read('ageMode').value;
  const isChildLike = isChildLikeRelation(relation);

  setFieldBlockHidden(card, 'ageBand', ageMode !== 'ageBand');
  setFieldBlockHidden(card, 'lifeStage', ageMode !== 'lifeStage' || !isChildLike);
  setFieldBlockHidden(card, 'birthYear', ageMode !== 'birthYear');
  setFieldBlockHidden(card, 'age', ageMode !== 'exactAge');

  if (isChildLike && ageMode === 'ageBand' && !read('ageBand').value) read('ageBand').value = 'u60';
  const relationLabel = read('relation').options[read('relation').selectedIndex]?.textContent || '관계 미선택';
  const ageLabel =
    ageMode === 'lifeStage'
      ? read('lifeStage').options[read('lifeStage').selectedIndex]?.textContent || '생활단계 미선택'
      : ageMode === 'ageBand'
        ? read('ageBand').options[read('ageBand').selectedIndex]?.textContent || '연령구간 미선택'
        : ageMode === 'birthYear'
          ? `${sanitizeNumber(read('birthYear').value) || '-'}년생`
          : `${sanitizeNumber(read('age').value) || '-'}세`;
  const name = read('name').value.trim() || relationLabel;
  const summary = card.querySelector('[data-role="summary"]');
  if (summary) summary.textContent = `${name} · ${relationLabel} · ${ageLabel}`;
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
    <p class="repeat-card-summary" data-role="summary">입력 전</p>
    <div class="grid two-col">
      <div>
        <label>이름/구분명</label>
        <input data-field="name" value="${data.name || ''}" placeholder="자녀${index}" />
      </div>
      <div>
        <label>나이 입력 방식(권장: 생활단계)</label>
        <select data-field="ageMode">
          <option value="lifeStage" ${(data.ageMode || 'lifeStage') === 'lifeStage' ? 'selected' : ''}>생활단계 선택</option>
          <option value="birthYear" ${data.ageMode === 'birthYear' ? 'selected' : ''}>출생연도 선택</option>
          <option value="exactAge" ${data.ageMode === 'exactAge' ? 'selected' : ''}>나이 직접 입력</option>
        </select>
      </div>
      <div data-block="lifeStage">
        <label>생활단계</label>
        <select data-field="lifeStage">
          <option value="infant" ${data.lifeStage === 'infant' ? 'selected' : ''}>영유아</option>
          <option value="preschool" ${data.lifeStage === 'preschool' ? 'selected' : ''}>미취학</option>
          <option value="elementary" ${(data.lifeStage || 'elementary') === 'elementary' ? 'selected' : ''}>초등</option>
          <option value="middle" ${data.lifeStage === 'middle' ? 'selected' : ''}>중등</option>
          <option value="high" ${data.lifeStage === 'high' ? 'selected' : ''}>고등</option>
          <option value="adult" ${data.lifeStage === 'adult' ? 'selected' : ''}>성인</option>
        </select>
      </div>
      <div data-block="birthYear">
        <label>출생연도(보조)</label>
        <input data-field="birthYear" data-money inputmode="numeric" value="${data.birthYear || ''}" placeholder="예: 2016" />
      </div>
      <div data-block="exactAge">
        <label>나이 직접 입력(보조)</label>
        <input data-field="exactAge" data-money inputmode="numeric" value="${data.exactAge || ''}" placeholder="예: 14" />
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
        <label>실제 결제자</label>
        <select data-field="payer">
          <option value="A" ${data.payer === 'A' ? 'selected' : ''}>배우자 A</option>
          <option value="B" ${data.payer === 'B' ? 'selected' : ''}>배우자 B</option>
          <option value="child" ${data.payer === 'child' ? 'selected' : ''}>자녀 본인</option>
          <option value="unknown" ${data.payer === 'unknown' ? 'selected' : ''}>모름</option>
        </select>
      </div>
    </div>
  `;

  card.querySelector('[data-remove="child"]').addEventListener('click', () => {
    card.remove();
    renumberCards(childList, '자녀');
    childrenCountInput.value = String(childList.children.length);
  });

  card.querySelectorAll('input, select').forEach((el) => {
    el.addEventListener('input', () => updateChildCardUI(card));
    el.addEventListener('change', () => updateChildCardUI(card));
  });

  childList.appendChild(card);
  updateChildCardUI(card);
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
    <p class="repeat-card-summary" data-role="summary">입력 전</p>
    <div class="grid two-col">
      <div>
        <label>관계</label>
        <select data-field="relation">
          <option value="부모" ${(data.relation || '부모') === '부모' ? 'selected' : ''}>부모</option>
          <option value="조부모" ${data.relation === '조부모' ? 'selected' : ''}>조부모</option>
          <option value="형제자매" ${data.relation === '형제자매' ? 'selected' : ''}>형제자매</option>
          <option value="기타" ${data.relation === '기타' ? 'selected' : ''}>기타</option>
        </select>
      </div>
      <div>
        <label>연령 입력 방식</label>
        <select data-field="ageMode">
          <option value="ageBand" ${(data.ageMode || 'ageBand') === 'ageBand' ? 'selected' : ''}>연령구간 선택</option>
          <option value="exactAge" ${data.ageMode === 'exactAge' ? 'selected' : ''}>정확한 나이 입력</option>
        </select>
      </div>
      <div data-block="ageBand">
        <label>연령구간</label>
        <select data-field="ageBand">
          <option value="u60" ${data.ageBand === 'u60' ? 'selected' : ''}>60세 미만</option>
          <option value="60s" ${(data.ageBand || '60s') === '60s' ? 'selected' : ''}>60~69세</option>
          <option value="70p" ${data.ageBand === '70p' ? 'selected' : ''}>70세 이상</option>
        </select>
      </div>
      <div data-block="exactAge">
        <label>정확한 나이(보조)</label>
        <input data-field="exactAge" data-money inputmode="numeric" value="${data.exactAge || ''}" placeholder="0" />
      </div>
      <label class="inline-check"><input type="checkbox" data-field="incomeEligible" ${data.incomeEligible ? 'checked' : ''} />소득요건 충족 여부</label>
      <label class="inline-check"><input type="checkbox" data-field="disabled" ${data.disabled ? 'checked' : ''} />장애인 여부</label>
      <label class="inline-check"><input type="checkbox" data-field="coResident" ${data.coResident ? 'checked' : ''} />동거 여부</label>
      <label class="inline-check"><input type="checkbox" data-field="livesTogether" ${data.livesTogether ? 'checked' : ''} />생계 같이함</label>
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

  card.querySelectorAll('input, select').forEach((el) => {
    el.addEventListener('input', () => updateDependentCardUI(card));
    el.addEventListener('change', () => updateDependentCardUI(card));
  });

  dependentList.appendChild(card);
  updateDependentCardUI(card);
}

function createPersonalDependentCard(data = {}) {
  const index = personalDependentList.children.length + 1;
  const card = document.createElement('article');
  card.className = 'repeat-card';
  card.innerHTML = `
    <div class="repeat-card-title">
      <strong>인적공제 부양가족 ${index}</strong>
      <button type="button" class="remove-btn" data-remove="personal-dependent">삭제</button>
    </div>
    <p class="repeat-card-summary" data-role="summary">입력 전</p>
    <div class="grid two-col">
      <div>
        <label>이름/구분명</label>
        <input data-field="name" value="${data.name || ''}" placeholder="자녀1, 어머니 등" />
      </div>
      <div>
        <label>관계</label>
        <select data-field="relation">
          <option value="child" ${data.relation === 'child' ? 'selected' : ''}>자녀</option>
          <option value="grandchild" ${data.relation === 'grandchild' ? 'selected' : ''}>손자녀</option>
          <option value="parent" ${data.relation === 'parent' ? 'selected' : ''}>부모</option>
          <option value="grandparent" ${data.relation === 'grandparent' ? 'selected' : ''}>조부모</option>
          <option value="sibling" ${data.relation === 'sibling' ? 'selected' : ''}>형제자매</option>
          <option value="other" ${data.relation === 'other' ? 'selected' : ''}>기타</option>
        </select>
      </div>
      <div>
        <label>나이 입력 방식</label>
        <select data-field="ageMode">
          <option value="lifeStage" ${(data.ageMode || 'lifeStage') === 'lifeStage' ? 'selected' : ''}>생활단계 선택</option>
          <option value="ageBand" ${data.ageMode === 'ageBand' ? 'selected' : ''}>연령구간 선택</option>
          <option value="birthYear" ${data.ageMode === 'birthYear' ? 'selected' : ''}>출생연도 입력</option>
          <option value="exactAge" ${data.ageMode === 'exactAge' ? 'selected' : ''}>정확한 나이 입력</option>
        </select>
      </div>
      <div data-block="ageBand">
        <label>연령구간 선택</label>
        <select data-field="ageBand">
          <option value="">선택 안 함</option>
          <option value="u60" ${data.ageBand === 'u60' ? 'selected' : ''}>60세 미만</option>
          <option value="60s" ${data.ageBand === '60s' ? 'selected' : ''}>60~69세</option>
          <option value="70p" ${data.ageBand === '70p' ? 'selected' : ''}>70세 이상</option>
        </select>
      </div>
      <div data-block="lifeStage">
        <label>자녀 생활단계</label>
        <select data-field="lifeStage">
          <option value="">선택 안 함</option>
          <option value="infant" ${data.lifeStage === 'infant' ? 'selected' : ''}>영유아</option>
          <option value="preschool" ${data.lifeStage === 'preschool' ? 'selected' : ''}>미취학</option>
          <option value="elementary" ${data.lifeStage === 'elementary' ? 'selected' : ''}>초등</option>
          <option value="middle" ${data.lifeStage === 'middle' ? 'selected' : ''}>중학생</option>
          <option value="high" ${data.lifeStage === 'high' ? 'selected' : ''}>고등학생</option>
          <option value="middlehigh" ${data.lifeStage === 'middlehigh' ? 'selected' : ''}>중고등(통합)</option>
          <option value="adult" ${data.lifeStage === 'adult' ? 'selected' : ''}>성인</option>
        </select>
      </div>
      <div data-block="birthYear">
        <label>출생연도(보조)</label>
        <input data-field="birthYear" data-money inputmode="numeric" value="${data.birthYear || ''}" placeholder="예: 2016" />
      </div>
      <div data-block="age">
        <label>나이 직접 입력(보조)</label>
        <input data-field="age" data-money inputmode="numeric" value="${data.age || ''}" placeholder="직접 입력" />
      </div>
      <label class="inline-check"><input type="checkbox" data-field="coResident" ${data.coResident ? 'checked' : ''} />동거 여부</label>
      <label class="inline-check"><input type="checkbox" data-field="livesTogether" ${data.livesTogether ? 'checked' : ''} />생계 같이함</label>
      <label class="inline-check"><input type="checkbox" data-field="disabled" ${data.disabled ? 'checked' : ''} />장애인 여부</label>
      <label class="inline-check"><input type="checkbox" data-field="seniorManual" ${data.seniorManual ? 'checked' : ''} />70세 이상 수동 확인</label>
      <div>
        <label>연간 소득금액(원)</label>
        <input data-field="annualIncome" data-money inputmode="numeric" value="${data.annualIncome || ''}" placeholder="0" />
      </div>
      <label class="inline-check"><input type="checkbox" data-field="wageOnly" ${data.wageOnly ? 'checked' : ''} />근로소득만 있음</label>
      <div>
        <label>총급여액(원)</label>
        <input data-field="totalPay" data-money inputmode="numeric" value="${data.totalPay || ''}" placeholder="0" />
      </div>
      <div>
        <label>비고/메모</label>
        <input data-field="memo" value="${data.memo || ''}" placeholder="선택" />
      </div>
    </div>
    <p class="hint" data-status="auto">자동 판정: 기본공제 미판정 / 추가공제 미판정 / 자녀세액공제 미판정</p>
  `;

  card.querySelector('[data-remove="personal-dependent"]').addEventListener('click', () => {
    card.remove();
    renumberCards(personalDependentList, '인적공제 부양가족');
    updatePersonalDependentStatuses();
  });

  card.querySelectorAll('input, select').forEach((el) => {
    el.addEventListener('input', () => {
      updatePersonalDependentCardUI(card);
      updatePersonalDependentStatuses();
    });
    el.addEventListener('change', () => {
      updatePersonalDependentCardUI(card);
      updatePersonalDependentStatuses();
    });
  });

  personalDependentList.appendChild(card);
  updatePersonalDependentCardUI(card);
  updatePersonalDependentStatuses();
}

function renumberCards(container, label) {
  Array.from(container.children).forEach((card, idx) => {
    const title = card.querySelector('.repeat-card-title strong');
    if (title) title.textContent = `${label} ${idx + 1}`;
    if (container === childList) updateChildCardUI(card);
    if (container === dependentList) updateDependentCardUI(card);
    if (container === personalDependentList) updatePersonalDependentCardUI(card);
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
    const ageMode = read('ageMode').value;
    const birthYear = sanitizeNumber(read('birthYear').value);
    const exactAge = sanitizeNumber(read('exactAge').value);
    const lifeStage = read('lifeStage').value;
    const age = getAgeFromQuick({ ageMode, birthYear, age: exactAge, lifeStage });
    return {
      name: read('name').value.trim() || `자녀${idx + 1}`,
      ageMode,
      lifeStage,
      birthYear,
      exactAge,
      isMinor: age != null ? age <= RULES.personalDeduction.childBasicMaxAge : null,
      is8Plus: isChildCreditEligibleAge(age),
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
    const ageMode = read('ageMode').value;
    const ageBand = read('ageBand').value;
    const exactAge = sanitizeNumber(read('exactAge').value);
    const age = getAgeFromQuick({ ageMode, ageBand, age: exactAge });
    return {
      relation: read('relation').value.trim() || `부양가족${idx + 1}`,
      ageMode,
      ageBand,
      exactAge,
      age,
      incomeEligible: read('incomeEligible').checked,
      disabled: read('disabled').checked,
      coResident: read('coResident').checked,
      livesTogether: read('livesTogether').checked,
      senior70: read('senior70').checked,
      medical: sanitizeNumber(read('medical').value),
      donation: sanitizeNumber(read('donation').value),
      insurance: sanitizeNumber(read('insurance').value),
      card: sanitizeNumber(read('card').value),
      payer: read('payer').value
    };
  });
}

function parsePersonalDependentCards() {
  return Array.from(personalDependentList.children).map((card, idx) => {
    const read = (field) => card.querySelector(`[data-field="${field}"]`);
    return {
      name: read('name').value.trim() || `가족${idx + 1}`,
      relation: read('relation').value,
      ageMode: read('ageMode').value,
      ageBand: read('ageBand').value,
      lifeStage: read('lifeStage').value,
      birthYear: sanitizeNumber(read('birthYear').value),
      age: sanitizeNumber(read('age').value),
      coResident: read('coResident').checked,
      livesTogether: read('livesTogether').checked,
      disabled: read('disabled').checked,
      seniorManual: read('seniorManual').checked,
      annualIncome: sanitizeNumber(read('annualIncome').value),
      wageOnly: read('wageOnly').checked,
      totalPay: sanitizeNumber(read('totalPay').value),
      memo: read('memo').value.trim()
    };
  });
}

function setIncomeByQuickBand() {
  const band = incomeQuickBand.value;
  const bandRule = RULES.ui.incomeBands[band] || RULES.ui.incomeBands['5000'];
  const mapped = bandRule.default;
  fillSubOptions(incomeQuickSubBand, bandRule.options);
  state.income.quickBand = band;
  state.income.subBandValue = sanitizeNumber(incomeQuickSubBand.value) || null;
  state.income.exactAnnualIncome = mapped;
  if (!incomeUseDirect.checked) annualIncomeInput.value = formatMoney(mapped);
  quickIncomeValueText.textContent = `${formatMoney(mapped)}원`;
}

function setCoupleIncomeByQuickBand(spouse) {
  const isA = spouse === 'A';
  const bandEl = isA ? aIncomeQuickBand : bIncomeQuickBand;
  const subEl = isA ? aIncomeQuickSubBand : bIncomeQuickSubBand;
  const directToggle = isA ? aIncomeUseDirect : bIncomeUseDirect;
  const inputEl = isA ? aIncomeInput : bIncomeInput;
  const textEl = isA ? aQuickIncomeValueText : bQuickIncomeValueText;
  const bandRule = RULES.ui.incomeBands[bandEl.value] || RULES.ui.incomeBands['5000'];
  const mapped = bandRule.default;
  fillSubOptions(subEl, bandRule.options);
  if (!directToggle.checked) inputEl.value = formatMoney(mapped);
  textEl.textContent = `${formatMoney(mapped)}원`;
}

function updateIncomeModeUI() {
  state.inputMode.incomeMode = incomeInputMode.value;
  const isQuick = incomeInputMode.value === 'quick';
  quickIncomeWrap.classList.toggle('hidden', !isQuick);
  annualIncomeInput.readOnly = isQuick && !incomeUseDirect.checked;
  if (isQuick) {
    setIncomeByQuickBand();
    const sub = sanitizeNumber(incomeQuickSubBand.value);
    if (sub > 0 && !incomeUseDirect.checked) annualIncomeInput.value = formatMoney(sub);
    state.income.mode = incomeUseDirect.checked ? 'exact' : sub > 0 ? 'subBand' : 'quickBand';
  } else {
    state.income.mode = 'exact';
  }
  updateSingleIsaCapacityHint();
}

function updateCoupleIncomeModeUI(spouse) {
  const isA = spouse === 'A';
  const modeEl = isA ? aIncomeInputMode : bIncomeInputMode;
  const quickWrapEl = isA ? aQuickIncomeWrap : bQuickIncomeWrap;
  const inputEl = isA ? aIncomeInput : bIncomeInput;
  const mode = modeEl.value;
  const isQuick = mode === 'quick';
  quickWrapEl.classList.toggle('hidden', !isQuick);
  const directToggle = isA ? aIncomeUseDirect : bIncomeUseDirect;
  const subEl = isA ? aIncomeQuickSubBand : bIncomeQuickSubBand;
  inputEl.readOnly = isQuick && !directToggle.checked;
  if (isQuick) {
    setCoupleIncomeByQuickBand(spouse);
    const sub = sanitizeNumber(subEl.value);
    if (sub > 0 && !directToggle.checked) inputEl.value = formatMoney(sub);
  }
  state.inputMode[isA ? 'coupleIncomeModeA' : 'coupleIncomeModeB'] = mode;
  updateCoupleIsaCapacityHint();
}

function updateSpendModeUI() {
  state.inputMode.spendMode = spendInputMode.value;
  const isMonthly = spendInputMode.value === 'monthly';
  monthlySpendWrap.classList.toggle('hidden', !isMonthly);
  cumulativeSpendWrap.classList.toggle('hidden', isMonthly);
  estimationPreview.classList.toggle('hidden', !isMonthly);
  if (isMonthly) {
    applyAllSingleSpendSelections();
    refreshEstimationPreview();
  }
  updateSingleIsaCapacityHint();
}

function updateCoupleSpendModeUI() {
  const isMonthly = coupleSpendInputMode.value === 'monthly';
  state.inputMode.coupleSpendMode = coupleSpendInputMode.value;
  aMonthlySpendWrap.classList.toggle('hidden', !isMonthly);
  bMonthlySpendWrap.classList.toggle('hidden', !isMonthly);
  aCumulativeSpendWrap.classList.toggle('hidden', isMonthly);
  bCumulativeSpendWrap.classList.toggle('hidden', isMonthly);
  coupleEstimationPreview.classList.toggle('hidden', !isMonthly);
  if (isMonthly) {
    applyAllCoupleSpendSelections('a');
    applyAllCoupleSpendSelections('b');
    refreshCoupleEstimationPreview();
  }
  updateCoupleIsaCapacityHint();
}

function refreshEstimationPreview() {
  applyAllSingleSpendSelections();
  const monthly = {
    credit: getMoneyInputValue('monthlyCreditCard'),
    checkCash: getMoneyInputValue('monthlyCheckCash'),
    market: getMoneyInputValue('monthlyTraditionalMarket'),
    transit: getMoneyInputValue('monthlyTransit')
  };
  const totalMonthly = monthly.credit + monthly.checkCash + monthly.market + monthly.transit;
  const projection = computeMonthlyProjection(totalMonthly);

  state.spending.monthlyCreditCard = monthly.credit;
  state.spending.monthlyCheckCash = monthly.checkCash;
  state.spending.monthlyTraditionalMarket = monthly.market;
  state.spending.monthlyTransit = monthly.transit;

  estimationPreview.innerHTML = `
    <p><strong>월평균 입력 기준 추정</strong></p>
    <p>올해 누적 추정액: ${formatMoney(projection.currentEstimate)}원</p>
    <p>연말 예상 총사용액: ${formatMoney(projection.yearEndEstimate)}원</p>
    <p>남은 ${projection.remainingMonths}개월 예상 사용액: ${formatMoney(projection.remainingEstimate)}원</p>
    <p class="hint">현재 월평균 패턴을 그대로 유지한다고 가정한 예상/추정 값입니다.</p>
  `;
  updateSingleIsaCapacityHint();
}

function calculateCategoryProjectionByPrefix(prefix) {
  const monthlyCredit = getMoneyInputValue(`${prefix}MonthlyCredit`);
  const monthlyCheck = getMoneyInputValue(`${prefix}MonthlyCheckCash`);
  const monthlyMarket = getMoneyInputValue(`${prefix}MonthlyMarket`);
  const monthlyTransit = getMoneyInputValue(`${prefix}MonthlyTransit`);
  const pCredit = computeMonthlyProjection(monthlyCredit);
  const pCheck = computeMonthlyProjection(monthlyCheck);
  const pMarket = computeMonthlyProjection(monthlyMarket);
  const pTransit = computeMonthlyProjection(monthlyTransit);

  return {
    credit: pCredit.currentEstimate,
    checkCash: pCheck.currentEstimate,
    market: pMarket.currentEstimate,
    transit: pTransit.currentEstimate,
    projection: {
      elapsedMonths: pCredit.elapsedMonths,
      remainingMonths: pCredit.remainingMonths,
      currentEstimate: pCredit.currentEstimate + pCheck.currentEstimate + pMarket.currentEstimate + pTransit.currentEstimate,
      yearEndEstimate: pCredit.yearEndEstimate + pCheck.yearEndEstimate + pMarket.yearEndEstimate + pTransit.yearEndEstimate,
      remainingEstimate: pCredit.remainingEstimate + pCheck.remainingEstimate + pMarket.remainingEstimate + pTransit.remainingEstimate,
      monthlyTotal: monthlyCredit + monthlyCheck + monthlyMarket + monthlyTransit
    }
  };
}

function refreshCoupleEstimationPreview() {
  applyAllCoupleSpendSelections('a');
  applyAllCoupleSpendSelections('b');
  const a = calculateCategoryProjectionByPrefix('a');
  const b = calculateCategoryProjectionByPrefix('b');
  const houseYearEnd = a.projection.yearEndEstimate + b.projection.yearEndEstimate;
  const houseRemaining = a.projection.remainingEstimate + b.projection.remainingEstimate;

  coupleEstimationPreview.innerHTML = `
    <p><strong>맞벌이 월평균 입력 기준 추정</strong></p>
    <p>A 연말 예상: ${formatMoney(a.projection.yearEndEstimate)}원 / B 연말 예상: ${formatMoney(b.projection.yearEndEstimate)}원</p>
    <p>가구 연말 예상 총사용액: ${formatMoney(houseYearEnd)}원</p>
    <p>남은 ${a.projection.remainingMonths}개월 가구 추정 사용액: ${formatMoney(houseRemaining)}원</p>
    <p class="hint">현재 월평균 패턴 유지 기준의 추정치이며, 실제 신고값이 아닌 행동 가이드용입니다.</p>
  `;
  updateCoupleIsaCapacityHint();
}

function applySpendSelectionToInput(kind, prefix) {
  const fieldMapByPrefix = {
    single: {
      creditCard: { band: 'singleCreditBand', sub: 'singleCreditSub', direct: 'singleCreditUseDirect', input: 'monthlyCreditCard' },
      checkCash: { band: 'singleCheckBand', sub: 'singleCheckSub', direct: 'singleCheckUseDirect', input: 'monthlyCheckCash' },
      traditionalMarket: { band: 'singleMarketBand', sub: 'singleMarketSub', direct: 'singleMarketUseDirect', input: 'monthlyTraditionalMarket' },
      transit: { band: 'singleTransitBand', sub: 'singleTransitSub', direct: 'singleTransitUseDirect', input: 'monthlyTransit' }
    },
    a: {
      creditCard: { band: 'aCreditBand', sub: 'aCreditSub', direct: 'aCreditUseDirect', input: 'aMonthlyCredit' },
      checkCash: { band: 'aCheckBand', sub: 'aCheckSub', direct: 'aCheckUseDirect', input: 'aMonthlyCheckCash' },
      traditionalMarket: { band: 'aMarketBand', sub: 'aMarketSub', direct: 'aMarketUseDirect', input: 'aMonthlyMarket' },
      transit: { band: 'aTransitBand', sub: 'aTransitSub', direct: 'aTransitUseDirect', input: 'aMonthlyTransit' }
    },
    b: {
      creditCard: { band: 'bCreditBand', sub: 'bCreditSub', direct: 'bCreditUseDirect', input: 'bMonthlyCredit' },
      checkCash: { band: 'bCheckBand', sub: 'bCheckSub', direct: 'bCheckUseDirect', input: 'bMonthlyCheckCash' },
      traditionalMarket: { band: 'bMarketBand', sub: 'bMarketSub', direct: 'bMarketUseDirect', input: 'bMonthlyMarket' },
      transit: { band: 'bTransitBand', sub: 'bTransitSub', direct: 'bTransitUseDirect', input: 'bMonthlyTransit' }
    }
  };
  const fieldMap = fieldMapByPrefix[prefix];
  if (!fieldMap) return { value: 0, mode: 'monthly-select' };
  const refs = fieldMap[kind];
  const bandEl = document.getElementById(refs.band);
  const subEl = document.getElementById(refs.sub);
  const directEl = document.getElementById(refs.direct);
  const inputEl = document.getElementById(refs.input);
  if (!bandEl || !subEl || !directEl || !inputEl) return { value: 0, mode: 'monthly-select' };

  const rules = getBandRulesForSpend(kind);
  const bandInfo = rules[bandEl.value] || rules.none;
  fillSubOptions(subEl, bandInfo.options || []);
  const resolved = resolveSpendValue(kind, bandEl, subEl, inputEl, directEl);
  if (!directEl.checked && bandEl.value !== 'direct') inputEl.value = resolved.value ? formatMoney(resolved.value) : '';
  inputEl.readOnly = !(directEl.checked || bandEl.value === 'direct');
  state.spending.mode = resolved.mode;
  state.spending[kind] = {
    band: resolved.band,
    subValue: resolved.subValue,
    exactValue: resolved.exactValue
  };
  return resolved;
}

function applyAllSingleSpendSelections() {
  applySpendSelectionToInput('creditCard', 'single');
  applySpendSelectionToInput('checkCash', 'single');
  applySpendSelectionToInput('traditionalMarket', 'single');
  applySpendSelectionToInput('transit', 'single');
}

function applyAllCoupleSpendSelections(prefix) {
  applySpendSelectionToInput('creditCard', prefix);
  applySpendSelectionToInput('checkCash', prefix);
  applySpendSelectionToInput('traditionalMarket', prefix);
  applySpendSelectionToInput('transit', prefix);
}

function collectSingleInput() {
  const simple = {
    hasSpouse: hasSpouseInput.checked,
    minorChildrenCount: getMoneyInputValue('minorChildrenCount'),
    childTaxCreditEligibleCount: getMoneyInputValue('childTaxCreditEligibleCount'),
    elderFamilyCount: getMoneyInputValue('elderFamilyCount'),
    seniorCount: getMoneyInputValue('seniorCount'),
    disabledCount: getMoneyInputValue('disabledCount'),
    isSingleParent: document.getElementById('isSingleParent').checked,
    isDependentIncomeEligible: document.getElementById('isDependentIncomeEligible').checked
  };

  const detailed = {
    worker: {
      gender: document.getElementById('workerGender').value,
      maritalStatus: document.getElementById('workerMaritalStatus').value
    },
    spouse: {
      hasSpouse: detailHasSpouseInput.checked,
      annualIncome: getMoneyInputValue('spouseAnnualIncome'),
      wageOnly: document.getElementById('spouseWageOnly').checked,
      totalPay: getMoneyInputValue('spouseTotalPay'),
      disabled: document.getElementById('spouseDisabled').checked
    },
    dependents: parsePersonalDependentCards()
  };

  const spendMode = spendInputMode.value;
  const incomeResolved = getIncomeByPriority({
    directInputEl: annualIncomeInput,
    subSelectEl: incomeQuickSubBand,
    bandSelectEl: incomeQuickBand,
    allowDirect: incomeInputMode.value === 'exact' || incomeUseDirect.checked
  });
  let credit;
  let checkCash;
  let market;
  let transit;
  let projection;

  if (spendMode === 'monthly') {
    const creditResolved = applySpendSelectionToInput('creditCard', 'single');
    const checkResolved = applySpendSelectionToInput('checkCash', 'single');
    const marketResolved = applySpendSelectionToInput('traditionalMarket', 'single');
    const transitResolved = applySpendSelectionToInput('transit', 'single');
    const monthlyCredit = creditResolved.value;
    const monthlyCheck = checkResolved.value;
    const monthlyMarket = marketResolved.value;
    const monthlyTransit = transitResolved.value;
    const pCredit = computeMonthlyProjection(monthlyCredit);
    const pCheck = computeMonthlyProjection(monthlyCheck);
    const pMarket = computeMonthlyProjection(monthlyMarket);
    const pTransit = computeMonthlyProjection(monthlyTransit);
    credit = pCredit.currentEstimate;
    checkCash = pCheck.currentEstimate;
    market = pMarket.currentEstimate;
    transit = pTransit.currentEstimate;
    projection = {
      mode: 'monthly',
      elapsedMonths: pCredit.elapsedMonths,
      remainingMonths: pCredit.remainingMonths,
      currentEstimate: credit + checkCash + market + transit,
      yearEndEstimate: pCredit.yearEndEstimate + pCheck.yearEndEstimate + pMarket.yearEndEstimate + pTransit.yearEndEstimate,
      remainingEstimate: pCredit.remainingEstimate + pCheck.remainingEstimate + pMarket.remainingEstimate + pTransit.remainingEstimate,
      monthlyTotal: monthlyCredit + monthlyCheck + monthlyMarket + monthlyTransit
    };
  } else {
    credit = getMoneyInputValue('currentCreditCard');
    checkCash = getMoneyInputValue('currentCheckCash');
    market = getMoneyInputValue('currentTraditionalMarket');
    transit = getMoneyInputValue('currentTransit');
    const { remainingMonths } = getNowMonths();
    projection = {
      mode: 'cumulative',
      remainingMonths,
      currentEstimate: credit + checkCash + market + transit,
      yearEndEstimate: credit + checkCash + market + transit,
      remainingEstimate: 0,
      monthlyTotal: 0
    };
  }

  state.inputMode.spendMode = spendMode;
  state.family.simpleInputs = simple;
  state.family.detailedPersonalDeductions = detailed;
  const monthlySpend = spendMode === 'monthly' ? projection.monthlyTotal : projection.currentEstimate / Math.max(1, getNowMonths().elapsedMonths);
  const estimatedCapacity = estimateMonthlyInvestCapacity({
    annualIncome: incomeResolved.value,
    monthlySpend,
    monthlyPension: getMoneyInputValue('singlePension') / 12,
    monthlyIrp: getMoneyInputValue('singleIrp') / 12
  });

  return {
    mode: 'single',
    income: incomeResolved.value,
    inputBasis: {
      income: incomeResolved.mode,
      spending:
        spendMode === 'monthly'
          ? ['singleCreditUseDirect', 'singleCheckUseDirect', 'singleMarketUseDirect', 'singleTransitUseDirect'].some((id) => document.getElementById(id).checked)
            ? 'monthly-direct'
            : 'monthly-select'
          : 'cumulative',
      family: detailed.dependents.length > 0 ? '생활단계/연령구간 선택 또는 직접 입력 혼합' : '간편 입력'
    },
    monthlyRent: getMoneyInputValue('singleMonthlyRent'),
    pension: getMoneyInputValue('singlePension'),
    irp: getMoneyInputValue('singleIrp'),
    isa: buildIsaInput({
      status: document.getElementById('singleIsaStatus').value,
      purpose: document.getElementById('singleIsaPurpose').value,
      pensionLinkStatus: resolvePensionLinkStatus(document.getElementById('singlePensionLinkStatus').value, getMoneyInputValue('singlePension'), getMoneyInputValue('singleIrp')),
      selectedCapacity: document.getElementById('singleInvestCapacity').value,
      estimatedCapacity
    }),
    credit,
    checkCash,
    market,
    transit,
    simple,
    detailed,
    spendMode,
    projection
  };
}

function collectCoupleInput() {
  const aIncomeResolved = getIncomeByPriority({
    directInputEl: aIncomeInput,
    subSelectEl: aIncomeQuickSubBand,
    bandSelectEl: aIncomeQuickBand,
    allowDirect: aIncomeInputMode.value === 'exact' || aIncomeUseDirect.checked
  });
  const bIncomeResolved = getIncomeByPriority({
    directInputEl: bIncomeInput,
    subSelectEl: bIncomeQuickSubBand,
    bandSelectEl: bIncomeQuickBand,
    allowDirect: bIncomeInputMode.value === 'exact' || bIncomeUseDirect.checked
  });
  const spendMode = coupleSpendInputMode.value;
  if (spendMode === 'monthly') {
    applyAllCoupleSpendSelections('a');
    applyAllCoupleSpendSelections('b');
  }
  const aMonthlyProjection = calculateCategoryProjectionByPrefix('a');
  const bMonthlyProjection = calculateCategoryProjectionByPrefix('b');
  const remainingMonths = aMonthlyProjection.projection.remainingMonths;

  const spouseAUsage =
    spendMode === 'monthly'
      ? {
          credit: aMonthlyProjection.credit,
          checkCash: aMonthlyProjection.checkCash,
          market: aMonthlyProjection.market,
          transit: aMonthlyProjection.transit
        }
      : {
          credit: getMoneyInputValue('aCredit'),
          checkCash: getMoneyInputValue('aCheckCash'),
          market: getMoneyInputValue('aMarket'),
          transit: getMoneyInputValue('aTransit')
        };

  const spouseBUsage =
    spendMode === 'monthly'
      ? {
          credit: bMonthlyProjection.credit,
          checkCash: bMonthlyProjection.checkCash,
          market: bMonthlyProjection.market,
          transit: bMonthlyProjection.transit
        }
      : {
          credit: getMoneyInputValue('bCredit'),
          checkCash: getMoneyInputValue('bCheckCash'),
          market: getMoneyInputValue('bMarket'),
          transit: getMoneyInputValue('bTransit')
        };

  const projection =
    spendMode === 'monthly'
      ? {
          mode: 'monthly',
          remainingMonths,
          yearEndEstimate: aMonthlyProjection.projection.yearEndEstimate + bMonthlyProjection.projection.yearEndEstimate,
          remainingEstimate: aMonthlyProjection.projection.remainingEstimate + bMonthlyProjection.projection.remainingEstimate,
          a: aMonthlyProjection.projection,
          b: bMonthlyProjection.projection
        }
      : {
          mode: 'cumulative',
          remainingMonths: getNowMonths().remainingMonths,
          yearEndEstimate: spouseAUsage.credit + spouseAUsage.checkCash + spouseAUsage.market + spouseAUsage.transit + spouseBUsage.credit + spouseBUsage.checkCash + spouseBUsage.market + spouseBUsage.transit,
          remainingEstimate: 0
        };

  const householdMonthlySpend =
    spendMode === 'monthly'
      ? (aMonthlyProjection.projection.yearEndEstimate + bMonthlyProjection.projection.yearEndEstimate) / 12
      : projection.yearEndEstimate / Math.max(1, 12 - projection.remainingMonths || 1);
  const estimatedCapacity = estimateMonthlyInvestCapacity({
    annualIncome: aIncomeResolved.value + bIncomeResolved.value,
    monthlySpend: householdMonthlySpend,
    monthlyPension: (getMoneyInputValue('aPension') + getMoneyInputValue('bPension')) / 12,
    monthlyIrp: (getMoneyInputValue('aIrp') + getMoneyInputValue('bIrp')) / 12
  });

  return {
    mode: 'couple',
    spendMode,
    inputBasis: {
      incomeA: aIncomeResolved.mode,
      incomeB: bIncomeResolved.mode,
      spending:
        spendMode === 'monthly'
          ? ['aCreditUseDirect', 'aCheckUseDirect', 'aMarketUseDirect', 'aTransitUseDirect', 'bCreditUseDirect', 'bCheckUseDirect', 'bMarketUseDirect', 'bTransitUseDirect']
              .some((id) => document.getElementById(id).checked)
            ? 'monthly-direct'
            : 'monthly-select'
          : 'cumulative',
      family: '생활단계/연령구간 선택 또는 직접 입력 혼합'
    },
    projection,
    isa: buildIsaInput({
      status: document.getElementById('coupleIsaStatus').value,
      purpose: document.getElementById('coupleIsaPurpose').value,
      pensionLinkStatus: resolvePensionLinkStatus(document.getElementById('couplePensionLinkStatus').value, getMoneyInputValue('aPension') + getMoneyInputValue('bPension'), getMoneyInputValue('aIrp') + getMoneyInputValue('bIrp')),
      selectedCapacity: document.getElementById('coupleInvestCapacity').value,
      estimatedCapacity,
      holder: getSpouseLabelByIncome(aIncomeResolved.value, bIncomeResolved.value) === '균형 배분' ? '부부 병행' : `${getSpouseLabelByIncome(aIncomeResolved.value, bIncomeResolved.value)} 우선`
    }),
    isMarriedRegistered: document.getElementById('isMarriedRegistered').checked,
    spouseA: {
      income: aIncomeResolved.value,
      credit: spouseAUsage.credit,
      checkCash: spouseAUsage.checkCash,
      market: spouseAUsage.market,
      transit: spouseAUsage.transit,
      pension: getMoneyInputValue('aPension'),
      irp: getMoneyInputValue('aIrp'),
      rent: getMoneyInputValue('aRent'),
      medical: getMoneyInputValue('aMedical'),
      donation: getMoneyInputValue('aDonation')
    },
    spouseB: {
      income: bIncomeResolved.value,
      credit: spouseBUsage.credit,
      checkCash: spouseBUsage.checkCash,
      market: spouseBUsage.market,
      transit: spouseBUsage.transit,
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

function analyzePersonalDeduction(singleInput) {
  const simple = singleInput.simple;
  const detailed = singleInput.detailed;

  const hasDetailedInput =
    detailed.worker.gender ||
    detailed.worker.maritalStatus ||
    detailed.spouse.hasSpouse ||
    detailed.spouse.annualIncome ||
    detailed.spouse.totalPay ||
    detailed.spouse.disabled ||
    detailed.dependents.length > 0;

  if (!hasDetailedInput) {
    const baseCount = 1 + (simple.hasSpouse ? 1 : 0) + simple.minorChildrenCount + simple.elderFamilyCount;
    return {
      usesDetailed: false,
      baseCount,
      spouseEligible: simple.hasSpouse && simple.isDependentIncomeEligible,
      childTaxCount: simple.childTaxCreditEligibleCount,
      seniorCount: simple.seniorCount,
      disabledCount: simple.disabledCount,
      femaleReview: false,
      singleParentReview: simple.isSingleParent,
      overlapWarning: false,
      ineligibleCount: simple.isDependentIncomeEligible ? 0 : simple.minorChildrenCount + simple.elderFamilyCount,
      conflict: false,
      lines: [
        `본인 포함 기본공제 대상: 총 ${baseCount}명`,
        `배우자 기본공제: ${simple.hasSpouse ? (simple.isDependentIncomeEligible ? '가능성이 높습니다' : '소득요건 확인 필요') : '해당 없음'}`,
        `자녀세액공제 대상(8세 이상): ${simple.childTaxCreditEligibleCount}명`,
        `경로우대 추가공제 대상: ${simple.seniorCount}명`,
        `장애인 추가공제 대상: ${simple.disabledCount}명`,
        '부녀자 공제: 해당 없음',
        `한부모 공제: ${simple.isSingleParent ? '검토 가능' : '해당 없음'}`,
        '주의: 한부모 공제와 부녀자 공제는 중복 적용되지 않음',
        '주의: 소득요건 미충족 가족은 기본공제 대상에서 제외됨'
      ]
    };
  }

  const spouseIncomeEligible = computeIncomeEligible(detailed.spouse.annualIncome, detailed.spouse.wageOnly, detailed.spouse.totalPay);
  const spouseEligible = detailed.spouse.hasSpouse && spouseIncomeEligible === true;

  const evaluatedDependents = detailed.dependents.map((dep) => {
    const age = getAgeFromQuick(dep);
    const incomeEligible = computeIncomeEligible(dep.annualIncome, dep.wageOnly, dep.totalPay);
    const childLike = isChildLikeRelation(dep.relation);
    const ageEligible = childLike
      ? age != null && age <= RULES.personalDeduction.childBasicMaxAge
      : age != null && age >= RULES.personalDeduction.elderFamilyMinAge;

    const basicEligible = incomeEligible === true && ageEligible;
    const senior = dep.seniorManual || (age != null && age >= RULES.personalDeduction.seniorAge);
    const childTax = childLike && age != null && age >= RULES.personalDeduction.childTaxCreditAge;

    return { ...dep, age, incomeEligible, basicEligible, senior, childTax };
  });

  const eligibleDependents = evaluatedDependents.filter((dep) => dep.basicEligible);
  const childTaxCount = evaluatedDependents.filter((dep) => dep.childTax).length;
  const seniorCount = evaluatedDependents.filter((dep) => dep.senior).length;
  const disabledCount = evaluatedDependents.filter((dep) => dep.disabled).length + (detailed.spouse.disabled && spouseEligible ? 1 : 0);
  const ineligibleCount = evaluatedDependents.filter((dep) => dep.incomeEligible === false).length;

  const femaleReview = detailed.worker.gender === 'female' && (detailed.worker.maritalStatus === 'married' || eligibleDependents.length > 0);
  const singleParentReview = simple.isSingleParent || (detailed.worker.maritalStatus && detailed.worker.maritalStatus !== 'married' && childTaxCount > 0);
  const overlapWarning = femaleReview && singleParentReview;

  const simpleDerived = {
    spouse: simple.hasSpouse ? 1 : 0,
    child: simple.minorChildrenCount,
    childTax: simple.childTaxCreditEligibleCount,
    senior: simple.seniorCount,
    disabled: simple.disabledCount
  };
  const detailDerived = {
    spouse: spouseEligible ? 1 : 0,
    child: evaluatedDependents.filter((dep) => isChildLikeRelation(dep.relation)).length,
    childTax: childTaxCount,
    senior: seniorCount,
    disabled: disabledCount
  };
  const conflict =
    simpleDerived.spouse !== detailDerived.spouse ||
    simpleDerived.child !== detailDerived.child ||
    simpleDerived.childTax !== detailDerived.childTax ||
    simpleDerived.senior !== detailDerived.senior ||
    simpleDerived.disabled !== detailDerived.disabled;

  const baseCount = 1 + (spouseEligible ? 1 : 0) + eligibleDependents.length;

  return {
    usesDetailed: true,
    baseCount,
    spouseEligible,
    childTaxCount,
    seniorCount,
    disabledCount,
    femaleReview,
    singleParentReview,
    overlapWarning,
    ineligibleCount,
    conflict,
    lines: [
      `본인 포함 기본공제 대상: 총 ${baseCount}명`,
      `배우자 기본공제: ${spouseEligible ? '가능' : detailed.spouse.hasSpouse ? '불가 또는 확인 필요' : '해당 없음'}`,
      `자녀세액공제 대상(8세 이상): ${childTaxCount}명`,
      `경로우대 추가공제 대상: ${seniorCount}명`,
      `장애인 추가공제 대상: ${disabledCount}명`,
      `부녀자 공제: ${femaleReview ? '검토 가능' : '해당 없음'}`,
      `한부모 공제: ${singleParentReview ? '검토 가능' : '해당 없음'}`,
      '주의: 한부모 공제와 부녀자 공제는 중복 적용되지 않음',
      '주의: 소득요건 미충족 가족은 기본공제 대상에서 제외됨'
    ],
    evaluatedDependents
  };
}

function validateInput(input) {
  if (input.mode === 'single') {
    if (!input.income) return '연봉(총급여)을 입력해 주세요.';
    for (const dep of input.detailed.dependents) {
      if (dep.birthYear && (dep.birthYear < 1900 || dep.birthYear > RULES.year)) return `부양가족(${dep.name}) 출생연도를 확인해 주세요.`;
      if (dep.age && (dep.age < 0 || dep.age > 120)) return `부양가족(${dep.name}) 나이를 확인해 주세요.`;
    }
    return '';
  }

  if (!input.spouseA.income || !input.spouseB.income) return '맞벌이 모드에서는 배우자 A/B 연봉(총급여)을 모두 입력해 주세요.';
  if (!input.isMarriedRegistered) return '혼인신고 여부가 체크되지 않았습니다. 맞벌이 부부 최적화 모드 사용 전 상태를 확인해 주세요.';
  return '';
}

function renderPersonalSummary(analysis, mode) {
  if (mode !== 'single') {
    personalDeductionSummary.innerHTML = '<p>맞벌이 모드에서는 부부 배분 추천표를 우선 확인해 주세요.</p>';
    detailPriorityBadge.classList.add('hidden');
    return;
  }

  personalDeductionSummary.innerHTML = analysis.lines.map((line) => `<p>${line}</p>`).join('');
  if (analysis.overlapWarning) {
    personalDeductionSummary.innerHTML += '<p><strong>경고:</strong> 한부모 공제와 부녀자 공제가 동시에 검토되어 하나만 적용 가능성을 확인해야 합니다.</p>';
  }

  if (analysis.usesDetailed && analysis.conflict) detailPriorityBadge.classList.remove('hidden');
  else detailPriorityBadge.classList.add('hidden');
}

function renderSpendEstimationSummary(input, card) {
  if (!input.projection) {
    spendEstimationSummary.innerHTML = '<p>소비 추정 요약 없음</p>';
    return;
  }

  const p = input.projection;
  const actionText =
    card.shortfall > 0
      ? `앞으로 남은 기간에는 월 약 ${formatMoney(card.shortfall / Math.max(1, p.remainingMonths))}원 수준으로 체크카드/현금영수증 전환을 검토해 보세요.`
      : '현재 패턴이면 카드 공제 구간 도달 가능성이 높아 무리한 추가 소비보다 결제수단 정리와 연금저축/IRP 검토가 유리할 수 있습니다.';

  spendEstimationSummary.innerHTML = `
    <p><strong>소비 추정 요약</strong></p>
    <p>입력 기준: ${p.mode === 'monthly' ? '월평균 입력' : '누적 입력'}</p>
    <p>연말 예상 총사용액: ${formatMoney(p.yearEndEstimate)}원</p>
    <p>남은 기간 추정 사용액: ${formatMoney(p.remainingEstimate)}원</p>
    <p>현재 결과는 선택형 입력을 기준으로 한 추정 가이드입니다. 정확한 계산이 필요하면 직접 입력을 사용하세요.</p>
    <p>${actionText}</p>
  `;
}

function renderCoupleSpendEstimationSummary(input, cardStats) {
  if (!input.projection) {
    spendEstimationSummary.innerHTML = '<p>맞벌이 소비 추정 요약 없음</p>';
    return;
  }

  const preferred = getPreferredCardHolder(cardStats.aCard, cardStats.bCard);
  const preferredShortfall = preferred === '배우자 A' ? cardStats.aCard.shortfall : cardStats.bCard.shortfall;
  const p = input.projection;
  const actionText =
    p.mode === 'monthly' && p.remainingMonths > 0
      ? `${preferred} 기준으로 남은 ${p.remainingMonths}개월 동안 월 약 ${formatMoney(preferredShortfall / p.remainingMonths)}원 수준의 체크카드/현금영수증 전환을 검토해 보세요.`
      : `${preferred} 부족 구간을 먼저 채우고, 추가 소비보다 결제수단과 귀속 점검을 우선하세요.`;

  spendEstimationSummary.innerHTML = `
    <p><strong>소비 추정 요약</strong></p>
    <p>입력 기준: ${p.mode === 'monthly' ? '월평균 입력' : '누적 입력'}</p>
    <p>가구 연말 예상 총사용액: ${formatMoney(p.yearEndEstimate)}원</p>
    <p>남은 기간 추정 사용액: ${formatMoney(p.remainingEstimate)}원</p>
    <p>현재 결과는 선택형 입력을 기준으로 한 추정 가이드입니다. 정확한 계산이 필요하면 직접 입력을 사용하세요.</p>
    <p>${actionText}</p>
  `;
}

function updateSingleIsaCapacityHint() {
  if (!singleIsaCapacityHint) return;
  const incomeResolved = getIncomeByPriority({
    directInputEl: annualIncomeInput,
    subSelectEl: incomeQuickSubBand,
    bandSelectEl: incomeQuickBand,
    allowDirect: incomeInputMode.value === 'exact' || incomeUseDirect.checked
  });
  const monthlySpend =
    spendInputMode.value === 'monthly'
      ? ['monthlyCreditCard', 'monthlyCheckCash', 'monthlyTraditionalMarket', 'monthlyTransit'].reduce((sum, id) => sum + getMoneyInputValue(id), 0)
      : ['currentCreditCard', 'currentCheckCash', 'currentTraditionalMarket', 'currentTransit'].reduce((sum, id) => sum + getMoneyInputValue(id), 0) / Math.max(1, getNowMonths().elapsedMonths);
  const estimate = estimateMonthlyInvestCapacity({
    annualIncome: incomeResolved.value,
    monthlySpend,
    monthlyPension: getMoneyInputValue('singlePension') / 12,
    monthlyIrp: getMoneyInputValue('singleIrp') / 12
  });
  singleIsaCapacityHint.textContent = `자동 추정 월 투자 여력: ${labelInvestCapacity(estimate)}`;
}

function updateCoupleIsaCapacityHint() {
  if (!coupleIsaCapacityHint) return;
  const aIncomeResolved = getIncomeByPriority({
    directInputEl: aIncomeInput,
    subSelectEl: aIncomeQuickSubBand,
    bandSelectEl: aIncomeQuickBand,
    allowDirect: aIncomeInputMode.value === 'exact' || aIncomeUseDirect.checked
  });
  const bIncomeResolved = getIncomeByPriority({
    directInputEl: bIncomeInput,
    subSelectEl: bIncomeQuickSubBand,
    bandSelectEl: bIncomeQuickBand,
    allowDirect: bIncomeInputMode.value === 'exact' || bIncomeUseDirect.checked
  });
  const monthlySpend =
    coupleSpendInputMode.value === 'monthly'
      ? ['aMonthlyCredit', 'aMonthlyCheckCash', 'aMonthlyMarket', 'aMonthlyTransit', 'bMonthlyCredit', 'bMonthlyCheckCash', 'bMonthlyMarket', 'bMonthlyTransit'].reduce((sum, id) => sum + getMoneyInputValue(id), 0)
      : ['aCredit', 'aCheckCash', 'aMarket', 'aTransit', 'bCredit', 'bCheckCash', 'bMarket', 'bTransit'].reduce((sum, id) => sum + getMoneyInputValue(id), 0) / Math.max(1, getNowMonths().elapsedMonths);
  const estimate = estimateMonthlyInvestCapacity({
    annualIncome: aIncomeResolved.value + bIncomeResolved.value,
    monthlySpend,
    monthlyPension: (getMoneyInputValue('aPension') + getMoneyInputValue('bPension')) / 12,
    monthlyIrp: (getMoneyInputValue('aIrp') + getMoneyInputValue('bIrp')) / 12
  });
  coupleIsaCapacityHint.textContent = `자동 추정 월 투자 여력: ${labelInvestCapacity(estimate)}`;
}

function buildSingleRecommendation(input) {
  const personal = analyzePersonalDeduction(input);
  const isaProfile = getIsaPriorityProfile(input.isa, {
    income: input.income,
    pensionRatio: (input.pension + input.irp) / Math.max(1, RULES.pension.combinedAnnualLimit)
  });

  const totalCard = input.credit + input.checkCash + input.market + input.transit;
  const card = computeCardTargetByPerson(input.income, totalCard, input.checkCash > input.credit ? 'check' : 'balanced');
  const preferredType = card.shortfall > 0 ? (input.checkCash >= input.credit ? '체크카드/현금영수증' : '체크카드') : '추가 사용보다 증빙 점검';

  const warnings = [];
  if (input.monthlyRent > 0 && input.checkCash > 0) warnings.push(RULES.warnings.rentCashOverlap);
  if (personal.overlapWarning) warnings.push('한부모 공제와 부녀자 공제는 중복 적용되지 않으므로 최종 선택 확인이 필요합니다.');
  if (personal.ineligibleCount > 0) warnings.push('소득요건 미충족 부양가족이 있어 기본공제 대상에서 제외될 수 있습니다.');

  const summary = [
    `현재 기준으로는 남은 목표 ${formatMoney(card.shortfall)}원을 계획 지출 안에서 ${preferredType} 위주로 배치하는 편이 유리할 가능성이 높습니다.`,
    `연금저축+IRP 입력 합계는 ${formatMoney(input.pension + input.irp)}원입니다. 연간 가이드 상한 ${formatMoney(RULES.irp.yearlyGuideLimit)}원 대비 여유를 확인해 자동이체 금액을 조정해 보세요.`,
    `ISA 우선순위는 ${isaProfile.priority}으로 해석했습니다. ${isaProfile.relationship}`,
    input.monthlyRent > 0
      ? '월세는 세액공제와 현금영수증 중 하나만 선택해 점검하는 방식이 안전합니다.'
      : '월세 입력이 없으므로 카드/현금영수증 증빙 누락 점검에 집중하는 전략이 적합합니다.',
    `인적공제 기준으로는 기본공제 대상 ${personal.baseCount}명, 8세 이상 자녀세액공제 대상 ${personal.childTaxCount}명입니다.`,
    `입력 기준: 연봉 ${labelIncomeMode(input.inputBasis.income)}, 소비 ${labelSpendMode(input.inputBasis.spending)}, 가족 ${input.inputBasis.family}`
  ];

  const allocations = [
    {
      item: '카드사용액 전략',
      current: `누적 추정 ${formatMoney(totalCard)}원`,
      target: '본인',
      reason: `총급여 ${formatMoney(input.income)}원 기준 목표 대비 부족분 ${formatMoney(card.shortfall)}원을 우선 확인`,
      caution: card.shortfall > 0 ? '무리한 추가소비보다 결제수단 전환 우선' : '목표 구간 도달 가능성이 높아 증빙 정리 우선'
    },
    {
      item: '연금저축/IRP',
      current: `연금저축 ${formatMoney(input.pension)} / IRP ${formatMoney(input.irp)}`,
      target: '본인',
      reason: '월 자동이체 유지가 연말 몰입금보다 실행 안정성이 높습니다.',
      caution: '한도는 연도별로 변동될 수 있어 최종 확인 필요'
    },
    {
      item: 'ISA',
      current: `${labelIsaStatus(input.isa.status)} / ${labelInvestCapacity(input.isa.capacity)}`,
      target: '본인',
      reason: isaProfile.priority,
      caution: isaProfile.warning
    },
    {
      item: '인적공제 점검',
      current: personal.usesDetailed ? '상세 입력 기준' : '간편 입력 기준',
      target: '본인',
      reason: `기본공제 ${personal.baseCount}명, 경로우대 ${personal.seniorCount}명, 장애인 ${personal.disabledCount}명 반영`,
      caution: personal.overlapWarning ? '한부모/부녀자 중복 불가 확인 필요' : '소득요건/연령요건 증빙 점검 필요'
    },
    {
      item: '월세',
      current: input.monthlyRent > 0 ? `월 ${formatMoney(input.monthlyRent)}원` : '입력 없음',
      target: '본인',
      reason: '월세 증빙 방식 선택 누락 방지',
      caution: RULES.warnings.rentCashOverlap
    }
  ];

  const scenarioContent = {
    simple: [
      '올해 남은 기간이 짧다면 큰 소비 증액보다 결제수단 전환부터 진행하세요.',
      '월평균 지출 중 고정비를 체크카드/현금영수증으로 우선 배치하세요.',
      '인적공제는 배우자/자녀 소득요건만 먼저 확인하세요.',
      isaProfile.actions[0] || 'ISA는 소액 자동이체로 시작하세요.'
    ],
    balanced: [
      '신용카드 비중 일부를 체크카드로 이동해 공제 효율 균형을 맞추세요.',
      '연금저축/IRP는 월 자동이체를 유지하며 분기별 한도 여유를 확인하세요.',
      '인적공제 상세 입력으로 8세 이상 자녀/70세 이상 인원 자동판정을 활용하세요.',
      isaProfile.actions[1] || '월평균 소비가 빠듯하면 추가 소비보다 명의/수단 조정이 우선입니다.'
    ],
    max: [
      '남은 기간 목표치를 월 단위로 쪼개 체크카드/현금영수증 전환량을 명확히 정하세요.',
      '연금저축/IRP/ISA 자동이체 금액을 함께 설정해 연말 부담을 분산하세요.',
      '기본공제 제외 가능 가족(소득요건 미충족)을 미리 정리해 누락을 줄이세요.',
      isaProfile.notes[isaProfile.notes.length - 1]
    ]
  };

  const monthlyAction = input.projection.mode === 'monthly' && input.projection.remainingMonths > 0
    ? `앞으로 월 ${formatMoney(card.shortfall / input.projection.remainingMonths)}원 수준으로 체크카드/현금영수증 전환 계획 세우기`
    : '지출 구조(카드/현금영수증 비중) 점검하기';

  const todos = [
    monthlyAction,
    '배우자 또는 가족 공제 요건 다시 점검하기',
    '연금저축 자동이체 가능 금액과 월세/의료비/교육비 누락 항목 확인하기',
    isaProfile.maturityNeeded
      ? 'ISA 만기 전 연금계좌 전환 가능성과 단순 출금 대안을 비교하기'
      : 'ISA를 쓴다면 국내상장 해외지수 ETF 등 활용 구조를 먼저 이해하기'
  ];

  return {
    mode: 'single',
    summary,
    allocations,
    warnings,
    scenarios: scenarioContent,
    todos,
    cardStats: { self: card },
    personal,
    isa: isaProfile
  };
}

function buildCoupleRecommendation(input) {
  const isaProfile = getIsaPriorityProfile(input.isa, {
    income: input.spouseA.income + input.spouseB.income,
    pensionRatio:
      (input.spouseA.pension + input.spouseA.irp + input.spouseB.pension + input.spouseB.irp) /
      Math.max(1, RULES.pension.combinedAnnualLimit * 2)
  });
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
      current: `연령입력 ${child.ageMode === 'lifeStage' ? `생활단계(${child.lifeStage || '-'})` : child.ageMode === 'birthYear' ? `출생연도(${child.birthYear || '-'})` : `직접나이(${child.exactAge || '-'})`} / 8세 이상 ${child.is8Plus == null ? '판단불가' : child.is8Plus ? '예' : '아니오'}`,
      target: owner,
      reason: '기본공제 귀속자를 먼저 확정하면 연계 항목 정리가 쉬워집니다.',
      caution: '최종 제출 전 자녀별 귀속 1인 확정 필요'
    });

    allocations.push({
      item: `교육비(${child.name})`,
      current: `${formatMoney(child.education)}원 / 결제자 ${payerLabel}`,
      target: owner,
      reason: '자녀 교육비는 기본공제 귀속자 기준으로 점검하는 편이 안전합니다.',
      caution: child.education > 0 ? '영수증 명의/귀속자 일치 확인' : '입력 없음'
    });

    allocations.push({
      item: `의료비(${child.name})`,
      current: `${formatMoney(child.medical)}원 / 결제자 ${payerLabel}`,
      target: owner,
      reason: '의료비는 귀속과 실제 지출자가 엇갈리면 누락 위험이 큽니다.',
      caution: mismatchMedical ? RULES.warnings.payerMismatch : '실제 지출자 기준 증빙 확인 필요'
    });

    if (mismatchMedical) warnings.push(`자녀 ${child.name} 의료비는 결제자와 기본공제 귀속자가 달라 누락 위험이 있습니다.`);
  });

  allocations.push({
    item: '배우자 의료비',
    current: `A ${formatMoney(input.spouseA.medical)}원 / B ${formatMoney(input.spouseB.medical)}원`,
    target: '실제 지출자 기준 분리',
    reason: '배우자 의료비는 실제 지출자 기준으로 분리 점검이 필요합니다.',
    caution: '각자 결제 내역 증빙 보관 필요'
  });

  allocations.push({
    item: '카드사용액 전략',
    current: `A 부족 ${formatMoney(aCard.shortfall)}원 / B 부족 ${formatMoney(bCard.shortfall)}원`,
    target: `${preferredCardHolder} 우선`,
    reason: '카드 공제는 합산보다 배우자별 초과구간을 각각 채우는 구조가 중요합니다.',
    caution: '계획 없는 소비 증가 대신 명의/수단 조정 우선'
  });

  allocations.push({
    item: '연금저축/IRP',
    current: `A ${formatMoney(input.spouseA.pension + input.spouseA.irp)}원 / B ${formatMoney(input.spouseB.pension + input.spouseB.irp)}원`,
    target: '한도 여유가 큰 배우자 우선',
    reason: '연말 몰아넣기보다 자동이체 유지가 누락 방지에 유리합니다.',
    caution: `연간 가이드 ${formatMoney(RULES.irp.yearlyGuideLimit)}원은 변동 가능`
  });

  allocations.push({
    item: 'ISA',
    current: `${labelIsaStatus(input.isa.status)} / ${labelInvestCapacity(input.isa.capacity)}`,
    target: input.isa.holder,
    reason: isaProfile.priority,
    caution: isaProfile.warning
  });

  const rentOverlap = (input.spouseA.rent > 0 && input.spouseA.checkCash > 0) || (input.spouseB.rent > 0 && input.spouseB.checkCash > 0);
  allocations.push({
    item: '월세',
    current: `A 월세 ${formatMoney(input.spouseA.rent)}원 / B 월세 ${formatMoney(input.spouseB.rent)}원`,
    target: '월세 세액공제 또는 현금영수증 중 1개 선택',
    reason: '같은 지출 중복 적용을 피해야 합니다.',
    caution: RULES.warnings.rentCashOverlap
  });
  if (rentOverlap) warnings.push(RULES.warnings.rentCashOverlap);

  input.dependents.forEach((dep) => {
    const recommended = dep.payer === 'B' ? '배우자 B' : '배우자 A';
    allocations.push({
      item: `기타 부양가족(${dep.relation})`,
      current: `나이 ${dep.age} / 소득요건 ${dep.incomeEligible ? '충족' : '미충족 또는 미확인'}`,
      target: recommended,
      reason: '중복공제 방지를 위해 가족별 귀속자 1인 고정이 안전합니다.',
      caution: dep.incomeEligible ? '요건 충족 가정, 증빙 확인 필요' : '소득요건 미확인 시 공제 누락 가능성'
    });
  });

  const firstSummary =
    input.children.length > 0
      ? `자녀 ${input.children.length}명은 ${recommendedChildOwner === '균형 배분' ? '배우자 A 우선(동률)' : recommendedChildOwner} 귀속이 유리할 가능성이 높습니다.`
      : '자녀 입력이 없어 카드·월세·의료비 중심으로 점검했습니다.';

  const preferredShortfall = preferredCardHolder === '배우자 A' ? aCard.shortfall : bCard.shortfall;
  const monthlySwitchAction =
    input.projection && input.projection.mode === 'monthly' && input.projection.remainingMonths > 0
      ? `남은 ${input.projection.remainingMonths}개월 동안 ${preferredCardHolder} 기준 월 ${formatMoney(preferredShortfall / input.projection.remainingMonths)}원 수준으로 체크카드/현금영수증 전환을 검토해 보세요.`
      : `카드 추가 사용은 ${preferredCardHolder} 명의 체크카드/현금영수증 위주 배치가 적합합니다.`;

  const summary = [
    firstSummary,
    monthlySwitchAction,
    `ISA 우선순위는 ${isaProfile.priority}으로 해석했습니다. ${isaProfile.relationship}`,
    '월세는 세액공제와 현금영수증 중 하나만 선택해 중복을 피해야 합니다.',
    warnings.some((line) => line.includes('의료비'))
      ? '자녀 의료비에서 결제자/귀속 엇갈림으로 누락 위험이 있습니다.'
      : '자녀 의료비는 실제 지출자 기준과 귀속자 일치 여부를 최종 점검하세요.',
    `입력 기준: 연봉 A ${labelIncomeMode(input.inputBasis.incomeA)}, 연봉 B ${labelIncomeMode(input.inputBasis.incomeB)}, 소비 ${labelSpendMode(input.inputBasis.spending)}, 가족 ${input.inputBasis.family}`
  ];

  const scenarioContent = {
    simple: [
      '귀속자는 크게 바꾸지 말고 중복공제 방지부터 정리하세요.',
      `카드는 ${preferredCardHolder} 부족 구간 우선 채우세요.`,
      isaProfile.actions[0] || '월세/의료비 증빙 경로를 먼저 확정하세요.'
    ],
    balanced: [
      '자녀 귀속을 1명 단위로 재점검해 교육비/의료비를 맞추세요.',
      '카드는 A/B 부족 구간을 월 단위로 나눠 채우세요.',
      isaProfile.actions[1] || '연금저축/IRP/ISA 자동이체를 분산 설정하세요.'
    ],
    max: [
      '부부 귀속을 항목별로 적극 최적화해 누락 가능성을 줄이세요.',
      '부족분 큰 배우자 명의에 계획 지출을 집중하세요.',
      isaProfile.notes[isaProfile.notes.length - 1]
    ]
  };

  const todos = [
    input.children.length > 0
      ? `${input.children[0].name} 교육비를 기본공제 받을 배우자 기준으로 점검하기`
      : '자녀 귀속자가 확정됐다면 교육비/의료비/보험료 귀속도 같은 기준으로 맞추기',
    '월세는 세액공제로 갈지 현금영수증으로 갈지 하나만 선택하기',
    input.projection && input.projection.mode === 'monthly' && input.projection.remainingMonths > 0
      ? `${preferredCardHolder} 체크카드/현금영수증으로 월 ${formatMoney(preferredShortfall / input.projection.remainingMonths)}원 전환 계획 세우기`
      : `카드 추가 사용은 ${preferredCardHolder} 체크카드로 우선 배치하기`,
    isaProfile.maturityNeeded
      ? 'ISA 만기 자금은 출금 전에 연금계좌 전환 가능성부터 확인하기'
      : '연금계좌와 ISA 자동이체를 병행할지 월 현금흐름 기준으로 결정하기'
  ];

  return {
    mode: 'couple',
    summary,
    allocations,
    warnings,
    scenarios: scenarioContent,
    todos,
    cardStats: { aCard, bCard },
    isa: isaProfile
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

function saveTodoState(stateObj) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(stateObj));
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
        ${item.a}
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
      acceptedAnswer: { '@type': 'Answer', text: item.a.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() }
    }))
  };
  document.getElementById('faq-jsonld').textContent = JSON.stringify(faqLd);
}

function renderIsaSummary(result, input) {
  if (!result.isa || !isaSummaryCard || !isaActionGuide || !isaBadgeRow || !isaMaturityAlert) return;
  const profile = result.isa;
  const isaInput = input.isa;

  isaBadgeRow.innerHTML = [
    `<span class="isa-pill">${profile.priority}</span>`,
    `<span class="isa-pill">${labelIsaStatus(isaInput.status)}</span>`,
    `<span class="isa-pill">${labelInvestCapacity(isaInput.capacity)}</span>`,
    profile.maturityNeeded ? '<span class="isa-pill alert">만기 전략 점검 필요</span>' : ''
  ].join('');

  isaSummaryCard.innerHTML = [
    { title: '현재 ISA 우선순위', text: profile.priority },
    { title: '연금계좌와의 관계', text: profile.relationship },
    { title: '추천 활용 방식', text: `${labelIsaPurpose(isaInput.purpose)} · ${isaInput.holder || '본인'} 기준` },
    { title: '주의할 점', text: profile.warning },
    { title: '만기 전략 필요 여부', text: profile.maturityNeeded ? '필요' : '현재는 장기 운용 설명 우선' }
  ]
    .map((item) => `<article class="isa-summary-item"><strong>${item.title}</strong><p>${item.text}</p></article>`)
    .join('');

  isaActionGuide.innerHTML = `
    <p><strong>ISA 활용 방식 안내</strong></p>
    ${profile.actions.map((line) => `<p>${line}</p>`).join('')}
    ${profile.notes.map((line) => `<p>${line}</p>`).join('')}
  `;

  if (profile.maturityNeeded) {
    isaMaturityAlert.classList.remove('hidden');
    isaMaturityAlert.innerHTML = `
      <p>ISA 만기 전략 점검 필요</p>
      <p>연금계좌 전환 검토 구간에 들어왔을 수 있으니, 단순 출금 전 세제 혜택 확인을 권장합니다.</p>
    `;
  } else {
    isaMaturityAlert.classList.add('hidden');
    isaMaturityAlert.innerHTML = '';
  }
}

function renderWhyRecommendation(result, input) {
  if (!whyRecommendationBox) return;
  const spendModeLabel = input.spendMode === 'cumulative' || (input.projection && input.projection.mode === 'cumulative') ? '누적 입력' : '월평균 입력';
  const topReason =
    result.mode === 'single'
      ? `입력한 소득(${formatMoney(input.income)}원)과 소비 패턴(${spendModeLabel})을 기준으로 카드 전략·납입 전략·인적공제·ISA 우선순위를 조합했습니다.`
      : `배우자별 소득과 소비를 분리해 각자 부족 구간을 추정하고, 중복공제 위험·결제자 불일치 위험·ISA 병행 우선순위를 함께 반영했습니다.`;
  const impact =
    result.mode === 'single'
      ? '영향이 큰 입력값: 연봉, 카드/체크카드 비중, 인적공제(간편 또는 상세) 정보, 연금저축·IRP·ISA 상태'
      : '영향이 큰 입력값: 배우자 A/B 연봉, 배우자별 소비 패턴, 자녀/부양가족 입력, 결제자 정보, 가구 ISA 상태';

  whyRecommendationBox.innerHTML = `
    <p><strong>왜 이런 추천이 나왔나요?</strong></p>
    <p>${topReason}</p>
    <p>${impact}</p>
    <p>이 추천은 확정 세액이 아니라 실행 행동의 우선순위를 정하기 위한 참고용 해석입니다.</p>
  `;
}

function renderUpdateHistory() {
  if (!updateHistoryList) return;
  updateHistoryList.innerHTML = UPDATE_HISTORY_ITEMS.map((item) => `<li>${item}</li>`).join('');
}

function renderAll(result, input) {
  latestResult = result;
  renderSummary(result.summary);
  renderAllocations(result.allocations);
  renderScenario();
  renderTodos(result.todos);
  renderWhyRecommendation(result, input);
  renderIsaSummary(result, input);

  if (result.mode === 'single') {
    renderPersonalSummary(result.personal, 'single');
    renderSpendEstimationSummary(input, result.cardStats.self);
  } else {
    renderPersonalSummary(null, 'couple');
    renderCoupleSpendEstimationSummary(input, result.cardStats);
  }

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

function syncSpouseInputs(fromDetailed) {
  if (fromDetailed) hasSpouseInput.checked = detailHasSpouseInput.checked;
  else detailHasSpouseInput.checked = hasSpouseInput.checked;
  updateSpouseEligibilityText();
}

function detectDuplicateDependentNames(list) {
  const seen = new Set();
  const duplicated = new Set();
  list.forEach((dep) => {
    const key = dep.name.trim();
    if (!key) return;
    if (seen.has(key)) duplicated.add(key);
    seen.add(key);
  });
  return Array.from(duplicated);
}

function updatePersonalDependentStatuses() {
  const deps = parsePersonalDependentCards();
  const duplicates = detectDuplicateDependentNames(deps);
  personalDependentWarning.textContent = duplicates.length ? `중복 등록 경고: ${duplicates.join(', ')} 이름이 중복되었습니다.` : '';

  Array.from(personalDependentList.children).forEach((card, idx) => {
    const dep = deps[idx];
    const status = card.querySelector('[data-status="auto"]');
    const age = getAgeFromQuick(dep);
    const incomeEligible = computeIncomeEligible(dep.annualIncome, dep.wageOnly, dep.totalPay);
    const childLike = isChildLikeRelation(dep.relation);
    const ageEligible = childLike
      ? age != null && age <= RULES.personalDeduction.childBasicMaxAge
      : age != null && age >= RULES.personalDeduction.elderFamilyMinAge;

    const basicEligible = incomeEligible === true && ageEligible;
    const additional = dep.disabled || dep.seniorManual || (age != null && age >= RULES.personalDeduction.seniorAge);
    const childTax = childLike && age != null && age >= RULES.personalDeduction.childTaxCreditAge;

    status.textContent = `자동 판정: 기본공제 ${basicEligible ? '가능' : '불가/확인 필요'} / 추가공제 ${additional ? '대상' : '해당 없음'} / 자녀세액공제 ${childTax ? '대상' : '해당 없음'}`;
  });
}

function updateSpouseEligibilityText() {
  const eligible = computeIncomeEligible(
    getMoneyInputValue('spouseAnnualIncome'),
    document.getElementById('spouseWageOnly').checked,
    getMoneyInputValue('spouseTotalPay')
  );
  if (!detailHasSpouseInput.checked) {
    spouseEligibilityText.textContent = '해당 없음';
    return;
  }
  spouseEligibilityText.textContent = eligible === true ? '가능' : eligible === false ? '불가' : '확인 필요';
}

function bootstrapRepeatLists() {
  childrenCountInput.value = '0';

  document.getElementById('addChildBtn').addEventListener('click', () => {
    createChildCard();
    childrenCountInput.value = String(childList.children.length);
  });
  document.getElementById('syncChildrenBtn').addEventListener('click', syncChildrenCount);
  document.getElementById('addDependentBtn').addEventListener('click', () => createDependentCard());
  document.getElementById('addParentDependentBtn').addEventListener('click', () => createDependentCard({ relation: '부모', ageMode: 'ageBand', ageBand: '60s' }));
  document.getElementById('addGrandParentDependentBtn').addEventListener('click', () => createDependentCard({ relation: '조부모', ageMode: 'ageBand', ageBand: '70p' }));

  document.getElementById('addPersonalDependentBtn').addEventListener('click', () => createPersonalDependentCard());
  document.getElementById('addPersonalChildQuickBtn').addEventListener('click', () => createPersonalDependentCard({ relation: 'child', ageMode: 'lifeStage', lifeStage: 'elementary' }));
  document.getElementById('addPersonalParentQuickBtn').addEventListener('click', () => createPersonalDependentCard({ relation: 'parent', ageMode: 'ageBand', ageBand: '70p' }));
  document.getElementById('addPersonalGrandParentQuickBtn').addEventListener('click', () => createPersonalDependentCard({ relation: 'grandparent', ageMode: 'ageBand', ageBand: '70p' }));
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
  renderAll(result, input);
});

document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener('change', (e) => toggleMode(e.target.value));
});

document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => activateScenarioTab(btn.dataset.tab));
});

hasSpouseInput.addEventListener('change', () => syncSpouseInputs(false));
detailHasSpouseInput.addEventListener('change', () => syncSpouseInputs(true));
document.getElementById('spouseAnnualIncome').addEventListener('input', updateSpouseEligibilityText);
document.getElementById('spouseWageOnly').addEventListener('change', updateSpouseEligibilityText);
document.getElementById('spouseTotalPay').addEventListener('input', updateSpouseEligibilityText);

incomeInputMode.addEventListener('change', updateIncomeModeUI);
incomeQuickBand.addEventListener('change', updateIncomeModeUI);
incomeQuickSubBand.addEventListener('change', updateIncomeModeUI);
incomeUseDirect.addEventListener('change', updateIncomeModeUI);
spendInputMode.addEventListener('change', updateSpendModeUI);
['monthlyCreditCard', 'monthlyCheckCash', 'monthlyTraditionalMarket', 'monthlyTransit'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', refreshEstimationPreview);
});
['currentCreditCard', 'currentCheckCash', 'currentTraditionalMarket', 'currentTransit', 'singlePension', 'singleIrp', 'annualIncome'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', updateSingleIsaCapacityHint);
});
[
  'singleCreditBand', 'singleCreditSub', 'singleCreditUseDirect',
  'singleCheckBand', 'singleCheckSub', 'singleCheckUseDirect',
  'singleMarketBand', 'singleMarketSub', 'singleMarketUseDirect',
  'singleTransitBand', 'singleTransitSub', 'singleTransitUseDirect'
].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', refreshEstimationPreview);
});
['singleIsaStatus', 'singleIsaPurpose', 'singlePensionLinkStatus', 'singleInvestCapacity'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', updateSingleIsaCapacityHint);
});

coupleSpendInputMode.addEventListener('change', updateCoupleSpendModeUI);
['aMonthlyCredit', 'aMonthlyCheckCash', 'aMonthlyMarket', 'aMonthlyTransit', 'bMonthlyCredit', 'bMonthlyCheckCash', 'bMonthlyMarket', 'bMonthlyTransit'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', refreshCoupleEstimationPreview);
});
['aCredit', 'aCheckCash', 'aMarket', 'aTransit', 'bCredit', 'bCheckCash', 'bMarket', 'bTransit', 'aPension', 'aIrp', 'bPension', 'bIrp', 'aIncome', 'bIncome'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', updateCoupleIsaCapacityHint);
});
[
  'aCreditBand', 'aCreditSub', 'aCreditUseDirect',
  'aCheckBand', 'aCheckSub', 'aCheckUseDirect',
  'aMarketBand', 'aMarketSub', 'aMarketUseDirect',
  'aTransitBand', 'aTransitSub', 'aTransitUseDirect',
  'bCreditBand', 'bCreditSub', 'bCreditUseDirect',
  'bCheckBand', 'bCheckSub', 'bCheckUseDirect',
  'bMarketBand', 'bMarketSub', 'bMarketUseDirect',
  'bTransitBand', 'bTransitSub', 'bTransitUseDirect'
].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', refreshCoupleEstimationPreview);
});
['coupleIsaStatus', 'coupleIsaPurpose', 'couplePensionLinkStatus', 'coupleInvestCapacity'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', updateCoupleIsaCapacityHint);
});

aIncomeInputMode.addEventListener('change', () => updateCoupleIncomeModeUI('A'));
aIncomeQuickBand.addEventListener('change', () => updateCoupleIncomeModeUI('A'));
aIncomeQuickSubBand.addEventListener('change', () => updateCoupleIncomeModeUI('A'));
aIncomeUseDirect.addEventListener('change', () => updateCoupleIncomeModeUI('A'));
bIncomeInputMode.addEventListener('change', () => updateCoupleIncomeModeUI('B'));
bIncomeQuickBand.addEventListener('change', () => updateCoupleIncomeModeUI('B'));
bIncomeQuickSubBand.addEventListener('change', () => updateCoupleIncomeModeUI('B'));
bIncomeUseDirect.addEventListener('change', () => updateCoupleIncomeModeUI('B'));

ruleUpdateDate.textContent = RULES.meta.updatedAt;
if (footerUpdateDate) footerUpdateDate.textContent = RULES.meta.updatedAt;
setupMoneyInputs();
setupTabsKeyboard();
setupAccordions();
bootstrapRepeatLists();
renderFaq();
renderUpdateHistory();
updateSpouseEligibilityText();
updateIncomeModeUI();
updateSpendModeUI();
refreshEstimationPreview();
updateCoupleIncomeModeUI('A');
updateCoupleIncomeModeUI('B');
updateCoupleSpendModeUI();
refreshCoupleEstimationPreview();
updateSingleIsaCapacityHint();
updateCoupleIsaCapacityHint();
