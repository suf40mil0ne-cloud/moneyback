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
  simpleInputs: {},
  detailedPersonalDeductions: {
    worker: {},
    spouse: {},
    dependents: []
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

const TODO_STORAGE_KEY = 'moneyback-action-guide-v4';

const form = document.getElementById('planner-form');
const results = document.getElementById('results');
const formError = document.getElementById('formError');
const ruleUpdateDate = document.getElementById('ruleUpdateDate');
const summaryList = document.getElementById('summaryList');
const allocationBody = document.getElementById('allocationBody');
const scenarioPanel = document.getElementById('scenarioPanel');
const todoList = document.getElementById('todoList');
const personalDeductionSummary = document.getElementById('personalDeductionSummary');
const detailPriorityBadge = document.getElementById('detailPriorityBadge');

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

function getAgeFromDependent(dep) {
  if (dep.birthYear) return yearsOldFromBirthYear(dep.birthYear);
  if (dep.age) return dep.age;
  return null;
}

function isChildLikeRelation(relation) {
  return relation === 'child' || relation === 'grandchild';
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

function createPersonalDependentCard(data = {}) {
  const index = personalDependentList.children.length + 1;
  const card = document.createElement('article');
  card.className = 'repeat-card';
  card.innerHTML = `
    <div class="repeat-card-title">
      <strong>인적공제 부양가족 ${index}</strong>
      <button type="button" class="remove-btn" data-remove="personal-dependent">삭제</button>
    </div>
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
        <label>기타 관계 입력</label>
        <input data-field="relationEtc" value="${data.relationEtc || ''}" placeholder="기타 관계" />
      </div>
      <div>
        <label>출생연도</label>
        <input data-field="birthYear" data-money inputmode="numeric" value="${data.birthYear || ''}" placeholder="예: 1958" />
      </div>
      <div>
        <label>나이</label>
        <input data-field="age" data-money inputmode="numeric" value="${data.age || ''}" placeholder="출생연도 미입력 시" />
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
    el.addEventListener('input', updatePersonalDependentStatuses);
    el.addEventListener('change', updatePersonalDependentStatuses);
  });

  personalDependentList.appendChild(card);
  updatePersonalDependentStatuses();
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

    return {
      name: read('name').value.trim() || `자녀${idx + 1}`,
      birthYear,
      isMinor: isMinor(birthYear),
      is8Plus: isChildCreditEligibleAge(yearsOldFromBirthYear(birthYear)),
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

function parsePersonalDependentCards() {
  return Array.from(personalDependentList.children).map((card, idx) => {
    const read = (field) => card.querySelector(`[data-field="${field}"]`);
    return {
      name: read('name').value.trim() || `가족${idx + 1}`,
      relation: read('relation').value,
      relationEtc: read('relationEtc').value.trim(),
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

  state.simpleInputs = simple;
  state.detailedPersonalDeductions = detailed;

  return {
    mode: 'single',
    income: getMoneyInputValue('annualIncome'),
    monthlyRent: getMoneyInputValue('singleMonthlyRent'),
    pension: getMoneyInputValue('singlePension'),
    irp: getMoneyInputValue('singleIrp'),
    credit: getMoneyInputValue('currentCreditCard'),
    checkCash: getMoneyInputValue('currentCheckCash'),
    market: getMoneyInputValue('currentTraditionalMarket'),
    transit: getMoneyInputValue('currentTransit'),
    simple,
    detailed
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
    const baseCount =
      1 +
      (simple.hasSpouse ? 1 : 0) +
      simple.minorChildrenCount +
      simple.elderFamilyCount;

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
        `부녀자 공제: 해당 없음`,
        `한부모 공제: ${simple.isSingleParent ? '검토 가능' : '해당 없음'}`,
        '주의: 한부모 공제와 부녀자 공제는 중복 적용되지 않음',
        '주의: 소득요건 미충족 가족은 기본공제 대상에서 제외됨'
      ]
    };
  }

  const spouseIncomeEligible = computeIncomeEligible(
    detailed.spouse.annualIncome,
    detailed.spouse.wageOnly,
    detailed.spouse.totalPay
  );
  const spouseEligible = detailed.spouse.hasSpouse && spouseIncomeEligible === true;

  const evaluatedDependents = detailed.dependents.map((dep) => {
    const age = getAgeFromDependent(dep);
    const incomeEligible = computeIncomeEligible(dep.annualIncome, dep.wageOnly, dep.totalPay);
    const relation = dep.relation;
    const childLike = isChildLikeRelation(relation);
    const ageEligible = childLike
      ? age != null && age <= RULES.personalDeduction.childBasicMaxAge
      : age != null && age >= RULES.personalDeduction.elderFamilyMinAge;

    const basicEligible = incomeEligible === true && ageEligible;
    const senior = dep.seniorManual || (age != null && age >= RULES.personalDeduction.seniorAge);
    const childTax = childLike && age != null && age >= RULES.personalDeduction.childTaxCreditAge;

    return {
      ...dep,
      age,
      incomeEligible,
      basicEligible,
      senior,
      childTax
    };
  });

  const eligibleDependents = evaluatedDependents.filter((dep) => dep.basicEligible);
  const childTaxCount = evaluatedDependents.filter((dep) => dep.childTax).length;
  const seniorCount = evaluatedDependents.filter((dep) => dep.senior).length;
  const disabledCount = evaluatedDependents.filter((dep) => dep.disabled).length + (detailed.spouse.disabled && spouseEligible ? 1 : 0);
  const ineligibleCount = evaluatedDependents.filter((dep) => dep.incomeEligible === false).length;

  const femaleReview =
    detailed.worker.gender === 'female' &&
    (detailed.worker.maritalStatus === 'married' || eligibleDependents.length > 0);
  const singleParentReview =
    simple.isSingleParent ||
    (detailed.worker.maritalStatus && detailed.worker.maritalStatus !== 'married' && childTaxCount > 0);
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
    Math.abs(simpleDerived.child - detailDerived.child) > 0 ||
    Math.abs(simpleDerived.childTax - detailDerived.childTax) > 0 ||
    Math.abs(simpleDerived.senior - detailDerived.senior) > 0 ||
    Math.abs(simpleDerived.disabled - detailDerived.disabled) > 0 ||
    Math.abs(simpleDerived.spouse - detailDerived.spouse) > 0;

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
      if (dep.birthYear && (dep.birthYear < 1900 || dep.birthYear > RULES.year)) {
        return `부양가족(${dep.name}) 출생연도를 확인해 주세요.`;
      }
      if (dep.age && (dep.age < 0 || dep.age > 120)) {
        return `부양가족(${dep.name}) 나이를 확인해 주세요.`;
      }
    }

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

  if (analysis.usesDetailed && analysis.conflict) {
    detailPriorityBadge.classList.remove('hidden');
  } else {
    detailPriorityBadge.classList.add('hidden');
  }
}

function buildSingleRecommendation(input) {
  const personal = analyzePersonalDeduction(input);

  const totalCard = input.credit + input.checkCash + input.market + input.transit;
  const card = computeCardTargetByPerson(input.income, totalCard, input.checkCash > input.credit ? 'check' : 'balanced');
  const preferredType = card.shortfall > 0 ? (input.checkCash >= input.credit ? '체크카드/현금영수증' : '체크카드') : '추가 사용보다 증빙 점검';

  const warnings = [];
  if (input.monthlyRent > 0 && input.checkCash > 0) warnings.push(RULES.warnings.rentCashOverlap);
  if (personal.overlapWarning) warnings.push('한부모 공제와 부녀자 공제는 중복 적용되지 않으므로 최종 선택 확인이 필요합니다.');
  if (personal.ineligibleCount > 0) warnings.push('소득요건 미충족 부양가족이 있어 기본공제 대상에서 제외될 수 있습니다.');

  const summary = [
    `현재 기준으로는 카드 사용을 무리하게 늘리기보다, 남은 목표 ${formatMoney(card.shortfall)}원을 계획 지출 안에서 ${preferredType} 위주로 배치하는 편이 유리할 가능성이 높습니다.`,
    `연금저축+IRP 입력 합계는 ${formatMoney(input.pension + input.irp)}원입니다. 연간 가이드 상한 ${formatMoney(RULES.irp.yearlyGuideLimit)}원 대비 여유를 확인해 자동이체 금액을 조정해 보세요.`,
    input.monthlyRent > 0
      ? '월세 지출을 입력하셨으므로, 월세 세액공제와 현금영수증 처리 중 어떤 방식으로 갈지 하나만 확정하는 점검이 필요합니다.'
      : '월세 입력이 없으므로 카드/현금영수증 증빙 누락 점검에 집중하는 전략이 적합합니다.',
    `인적공제 점검 기준으로는 기본공제 대상 ${personal.baseCount}명, 8세 이상 자녀세액공제 대상 ${personal.childTaxCount}명으로 보는 것이 적절합니다.`
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
      item: 'ISA',
      current: '입력 없음(선택)',
      target: '본인',
      reason: '세제혜택 계좌는 연말 직전보다 월 분할 납입이 관리에 유리합니다.',
      caution: '상품/한도는 연도별 정책 변경 확인 필요'
    },
    {
      item: '인적공제 점검',
      current: personal.usesDetailed ? '상세 입력 기준' : '간편 입력 기준',
      target: '본인',
      reason: `기본공제 ${personal.baseCount}명, 경로우대 ${personal.seniorCount}명, 장애인 ${personal.disabledCount}명 기준으로 추천 반영`,
      caution: personal.overlapWarning ? '한부모/부녀자 중복 불가 확인 필요' : '소득요건/연령요건 증빙 점검 필요'
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
      '인적공제는 배우자/자녀 소득요건 체크만 먼저 확인합니다.',
      'ISA는 소액 자동이체로 습관만 먼저 만드는 전략을 권장합니다.'
    ],
    balanced: [
      '신용카드 비중이 높다면 일부를 체크카드로 이동해 공제 효율 균형을 맞춥니다.',
      '연금저축/IRP는 월 자동이체를 유지하면서 분기별로 한도 여유를 확인합니다.',
      '인적공제 상세 입력을 활용해 8세 이상 자녀/70세 이상 인원을 자동 점검합니다.',
      'ISA는 월 납입 금액을 무리하지 않는 선에서 고정합니다.'
    ],
    max: [
      '연말 전까지 부족분을 월 단위로 쪼개 결제수단을 적극 최적화합니다.',
      '연금저축/IRP를 우선순위로 배치해 연말 급납입 리스크를 줄입니다.',
      '인적공제 상세 입력으로 기본공제 제외 대상(소득요건 미충족)을 미리 정리합니다.',
      'ISA/연금/카드 증빙 경로를 한 장표로 묶어 누락을 줄입니다.'
    ]
  };

  const todos = [
    '배우자 소득요건 충족 여부를 다시 확인하기',
    '부모님/가족 연간 소득금액이 기본공제 기준을 넘는지 점검하기',
    '자녀세액공제 대상 연령(8세 이상)과 한부모/부녀자 적용 가능성을 확인하기'
  ];

  return {
    mode: 'single',
    summary,
    allocations,
    warnings,
    scenarios: scenarioContent,
    todos,
    cardStats: { self: card },
    personal
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

  allocations.push({
    item: 'ISA',
    current: '부부 공통 관리(선택)',
    target: '현금흐름 여유 큰 배우자 우선',
    reason: '연말 직전 몰입금보다 월 분할 납입이 실행 안정성이 높습니다.',
    caution: '계좌별 요건과 한도는 최신 기준 확인 필요'
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
      'ISA는 무리 없는 소액 자동이체로 시작합니다.'
    ],
    balanced: [
      '자녀 귀속은 소득·지출 증빙을 함께 보며 1명 단위로 재배분합니다.',
      '카드는 A/B 각각 부족 구간을 월 단위로 나눠 채우고, 생활 편의가 높은 결제수단을 우선 사용합니다.',
      '연금저축/IRP와 ISA는 자동이체 금액을 나눠 운영합니다.'
    ],
    max: [
      '부부 간 귀속을 항목별로 적극 최적화해 자녀/부양가족 항목을 최대한 정밀하게 배분합니다.',
      '카드는 부족분이 큰 배우자 명의로 계획 지출을 집중해 초과 구간을 우선 확보합니다.',
      '의료비·월세·기부금·ISA 납입 흐름을 연말 전에 최종 점검합니다.'
    ]
  };

  const todos = [
    input.children.length > 0
      ? `${input.children[0].name} 교육비를 기본공제 받을 배우자 명의 기준으로 다시 점검하기`
      : '자녀 귀속자가 확정됐다면 교육비/의료비/보험료 귀속도 같은 기준으로 맞추기',
    '월세는 세액공제로 갈지 현금영수증으로 갈지 하나만 선택하기',
    `카드 추가 사용은 ${preferredCardHolder} 체크카드로 우선 배치하기`
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

  if (result.mode === 'single') {
    renderPersonalSummary(result.personal, 'single');
  } else {
    renderPersonalSummary(null, 'couple');
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
  if (fromDetailed) {
    hasSpouseInput.checked = detailHasSpouseInput.checked;
  } else {
    detailHasSpouseInput.checked = hasSpouseInput.checked;
  }
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

  personalDependentWarning.textContent = duplicates.length
    ? `중복 등록 경고: ${duplicates.join(', ')} 이름이 중복되었습니다.`
    : '';

  Array.from(personalDependentList.children).forEach((card, idx) => {
    const dep = deps[idx];
    const status = card.querySelector('[data-status="auto"]');
    const age = getAgeFromDependent(dep);
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

  document.getElementById('addDependentBtn').addEventListener('click', () => {
    createDependentCard();
  });

  document.getElementById('addPersonalDependentBtn').addEventListener('click', () => {
    createPersonalDependentCard();
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

hasSpouseInput.addEventListener('change', () => syncSpouseInputs(false));
detailHasSpouseInput.addEventListener('change', () => syncSpouseInputs(true));
document.getElementById('spouseAnnualIncome').addEventListener('input', updateSpouseEligibilityText);
document.getElementById('spouseWageOnly').addEventListener('change', updateSpouseEligibilityText);
document.getElementById('spouseTotalPay').addEventListener('input', updateSpouseEligibilityText);

ruleUpdateDate.textContent = RULES.meta.updatedAt;
setupMoneyInputs();
setupTabsKeyboard();
setupAccordions();
bootstrapRepeatLists();
renderFaq();
updateSpouseEligibilityText();
