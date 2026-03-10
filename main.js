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
        '30-60': { label: '30~60만원', default: 450000, options: [300000, 400000, 500000, 600000] },
        '60-100': { label: '60~100만원', default: 800000, options: [600000, 700000, 800000, 900000, 1000000] },
        '100-150': { label: '100~150만원', default: 1250000, options: [1000000, 1100000, 1200000, 1300000, 1400000, 1500000] },
        '150-200': { label: '150~200만원', default: 1750000, options: [1500000, 1600000, 1750000, 1900000, 2000000] },
        '200-300': { label: '200~300만원', default: 2500000, options: [2000000, 2200000, 2500000, 2800000, 3000000] },
        '300p': { label: '300만원 이상', default: 3500000, options: [3000000, 3500000, 4000000, 4500000] },
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
    q: '연말정산 환급을 많이 받으려면 무조건 카드를 더 써야 하나요?',
    a: '<p>그렇지는 않습니다. 카드 공제는 총급여의 일정 기준 사용액을 넘긴 뒤에야 효과가 생기기 때문에, 기준 전이라면 결제수단 조정이 중요하고 기준을 넘긴 뒤라면 추가 소비보다 증빙 정리가 더 중요할 수 있습니다.</p><p>이 도구도 “더 쓰기”보다 “어떤 수단으로 쓰는 게 유리한지”와 연금저축·인적공제 우선순위를 함께 보도록 설계했습니다.</p>'
  },
  {
    q: '신용카드보다 체크카드가 유리한 이유는 무엇인가요?',
    a: '<p>국세청 안내 기준으로 신용카드는 공제율이 낮고, 체크카드·현금영수증은 더 높은 공제율이 적용됩니다. 그래서 이미 기준 사용액을 넘긴 구간이라면 신용카드보다 체크카드·현금영수증 쪽이 유리하게 해석되는 경우가 많습니다.</p><p>다만 무조건 전환이 답은 아니고, 현재 총급여 대비 부족 구간과 남은 기간 소비 여력을 같이 봐야 합니다.</p>'
  },
  {
    q: '맞벌이 부부는 무엇부터 비교해야 하나요?',
    a: '<p>먼저 자녀·부양가족의 기본공제 귀속자를 정하고, 교육비·의료비·기부금이 그 귀속과 실제 지출자 흐름에 맞는지 확인하세요. 그다음 배우자별 카드 부족 구간과 월세·현금영수증 충돌 여부를 보면 실수를 크게 줄일 수 있습니다.</p><p>핵심은 합산 계산보다 “누가 어떤 항목을 가져가는 것이 안전한지”를 비교하는 것입니다.</p>'
  },
  {
    q: '월세 공제와 현금영수증은 같이 받을 수 있나요?',
    a: '<p>같은 월세 지출에 대해서는 중복 적용이 되지 않는 것으로 보는 것이 안전합니다. 그래서 월세 세액공제를 받을지, 현금영수증 성격의 공제로 갈지 먼저 방향을 정하고 증빙을 맞추는 편이 좋습니다.</p><p>결과 화면에서도 월세가 입력되면 다른 소비 전략보다 계약·전입·계좌이체 같은 요건 점검을 우선으로 띄우도록 보강했습니다.</p>'
  },
  {
    q: '주택청약은 연말정산에 어떤 도움이 되나요?',
    a: '<p>주택청약종합저축은 무주택 세대주 등 요건을 충족하면 소득공제 검토 대상이 될 수 있어, 납입 중이라면 연말에 빠뜨리기 쉬운 항목입니다. 특히 자동이체만 해두고 증빙이나 요건 확인을 놓치는 경우가 있어, 납입 중이면 올해도 꼭 확인할 항목으로 보는 편이 좋습니다.</p><p>이 서비스는 청약 자체를 계산하지는 않지만, 주거비 전략 가이드에서 “납입 중이면 반드시 다시 볼 항목”으로 따로 안내합니다.</p>'
  },
  {
    q: '의료비는 언제 효과가 큰가요?',
    a: '<p>의료비는 총급여 대비 기준을 넘겨야 세액공제 체감이 생기는 구조라, 무조건 많이 썼다고 바로 유리해지지는 않습니다. 대신 자주 놓치는 항목이 많고 실제 지출자 기준이 중요해서, 공제 대상자와 결제 흐름을 같이 정리하는 것이 핵심입니다.</p><p>맞벌이 부부라면 누가 냈는지에 따라 결과가 달라질 수 있어, 자녀 의료비는 특히 귀속자와 결제자를 같이 확인하는 편이 안전합니다.</p>'
  },
  {
    q: '교육비는 어떤 부분이 자주 헷갈리나요?',
    a: '<p>자녀 연령과 교육 단계에 따라 검토 포인트가 달라지고, 특히 미취학 아동의 학원비처럼 자주 헷갈리는 항목은 간소화 자료만 보고 끝내면 누락되기 쉽습니다. 그래서 자녀 카드에서는 생활단계와 교육비를 같이 보도록 했습니다.</p><p>먼저 자녀 기본공제 귀속자를 정한 뒤 교육비 영수증 흐름을 같은 사람 기준으로 맞추면 실수 가능성을 줄일 수 있습니다.</p>'
  },
  {
    q: '기부금은 기본공제대상자와 어떤 관계가 있나요?',
    a: '<p>기부금은 기본공제대상자 여부와 연결해서 보는 경우가 많아, 가족관계와 소득요건을 먼저 확인해야 오해를 줄일 수 있습니다. 특히 맞벌이 가구는 가족별 귀속자가 섞이면 기부금까지 함께 헷갈리기 쉬워서, 가족 공제표를 먼저 정리한 뒤 보는 편이 좋습니다.</p><p>이 서비스의 누락 점검 리스트도 교육비·의료비와 함께 기부금을 묶어 보여주도록 보강했습니다.</p>'
  },
  {
    q: '연금저축/IRP와 ISA는 어떤 순서로 보는 게 좋나요?',
    a: '<p>즉시 연말정산 효과가 급하면 연금저축·IRP를 먼저 보는 편이 보통 더 단순합니다. ISA는 즉시 환급형이 아니라 투자수익 절세와 만기 후 연금계좌 전환 전략까지 포함해 봐야 하므로, 연금계좌를 어느 정도 활용 중일 때 병행 가치가 커집니다.</p><p>그래서 결과에서는 환급 극대화 우선형, 장기 절세 병행형, 만기 점검형처럼 나눠 설명합니다.</p>'
  },
  {
    q: 'ISA는 연말정산 환급을 바로 늘려주나요?',
    a: '<p>보통은 그렇지 않습니다. 연금저축·IRP처럼 납입 자체가 연말정산 세액공제로 바로 연결되는 구조와 달리, ISA는 투자수익 과세를 줄이는 절세 투자 계좌로 이해하는 편이 맞습니다.</p><p>다만 ISA를 오래 유지한 뒤 만기 자금을 연금계좌 전환 전략과 연결하면 연말정산 전체 설계에는 영향을 줄 수 있으므로, “즉시 환급”이 아니라 “세제 구조 확장” 관점에서 보시는 것이 좋습니다.</p>'
  },
  {
    q: '올해 새로 챙길 수 있는 공제는 무엇인가요?',
    a: '<p>결혼세액공제, 자녀세액공제 구조, 산후조리원 의료비, 수영장·체력단련장 이용료 카드공제, 월세·주택청약 관련 확대 항목은 적용 연도와 개인 요건이 엇갈리기 쉬운 대표 항목입니다. 그래서 결과 하단 가이드에서 “확대·신설 공제 체크”로 따로 묶어 두었습니다.</p><p>이 항목들은 법 개정 보도자료와 국세청 FAQ의 적용 연도가 다를 수 있으니, 신고 직전에는 홈택스 문답과 공식 안내를 함께 확인하세요.</p>'
  },
  {
    q: '홈택스에서는 무엇을 먼저 봐야 하나요?',
    a: '<p>연말정산 미리보기로 남은 카드 전략과 예상 사용액을 먼저 보고, 맞춤형 안내 서비스에서 빠진 공제 후보가 있는지 확인하세요. 간소화 서비스는 편리하지만 자동으로 다 잡히는 것은 아니어서, 월세·의료비·교육비·기부금처럼 누락이 잦은 항목은 한 번 더 대조하는 편이 좋습니다.</p><p>특히 11~12월에는 남은 기간 행동을 바꾸기 좋으므로, 미리보기와 맞춤형 안내를 함께 보는 흐름이 실전적입니다.</p>'
  },
  {
    q: '실제 환급액과 결과가 다를 수 있는 이유는 무엇인가요?',
    a: '<p>회사 제출자료 반영 시점, 홈택스 간소화 데이터, 개인별 요건 해석, 귀속연도별 규정 변경에 따라 실제 결과는 달라질 수 있습니다. 이 도구는 확정 세액 계산기가 아니라 실행 행동을 정리하는 가이드이므로, 최종 신고 전 공식 자료 확인이 필요합니다.</p><p>그래서 결과도 “무조건 얼마 더 환급”이 아니라, 지금 무엇을 먼저 확인하면 실수를 줄일 수 있는지에 집중합니다.</p>'
  }
];

const STRATEGY_GUIDE_ITEMS = [
  {
    title: '카드 사용 전략',
    badge: '카드·체크카드·현금영수증',
    lines: [
      '신용카드보다 체크카드·현금영수증 공제율이 높아, 기준 사용액을 넘긴 뒤라면 결제수단 전환 효과가 더 크게 해석될 수 있습니다.',
      '전통시장과 대중교통은 별도 우대 구간이 있어, 이미 쓰는 지출을 그 항목으로 정확히 분류하는 것이 먼저입니다.',
      '무조건 더 쓰기보다 총급여 대비 부족 구간과 남은 기간을 보고 전환량을 정하세요.'
    ]
  },
  {
    title: '가족공제 전략',
    badge: '배우자·자녀·부모',
    lines: [
      '배우자와 부양가족은 소득요건과 나이요건을 먼저 보고, 기본공제 귀속자를 한 사람으로 정해야 연계 항목이 덜 꼬입니다.',
      '맞벌이 부부는 자녀 기본공제 귀속을 먼저 정한 뒤 교육비·의료비·기부금을 같은 흐름으로 맞추는 것이 안전합니다.',
      '부모·조부모는 60세 기준, 경로우대는 70세 기준을 함께 점검하세요.'
    ]
  },
  {
    title: '의료비·교육비·기부금 체크',
    badge: '누락 점검',
    lines: [
      '의료비는 총급여 대비 기준을 넘겨야 체감효과가 생기므로, 금액보다 실제 지출자와 대상자 정리가 중요합니다.',
      '교육비는 자녀 단계별로 확인 포인트가 달라서, 생활단계 입력과 영수증 귀속을 함께 보는 편이 좋습니다.',
      '기부금은 가족 공제와 같이 보면 헷갈리기 쉬우니, 기본공제 대상자 여부를 먼저 확인하세요.'
    ]
  },
  {
    title: '주거비 절세 포인트',
    badge: '월세·청약·주택자금',
    lines: [
      '월세는 대상 요건과 계약·전입·계좌이체 증빙을 같이 봐야 하고, 같은 지출을 현금영수증과 중복 적용하는 방식은 피하는 편이 안전합니다.',
      '주택청약종합저축은 납입 중이면 연말에 꼭 다시 봐야 할 항목입니다. 무주택 세대주 여부와 납입내역을 함께 확인하세요.',
      '주택자금 관련 공제는 항목이 나뉘어 있어, 월세·청약·대출을 한 번에 섞지 말고 각각 따로 확인하세요.'
    ]
  },
  {
    title: '연금저축·IRP·ISA 우선순위',
    badge: '계좌 전략',
    lines: [
      '연금저축·IRP는 즉시 연말정산 효과가 큰 세액공제형 계좌로 보고, ISA는 투자수익 절세와 만기 전략 중심으로 보세요.',
      '현금흐름이 빠듯하면 연금저축·IRP 자동이체를 먼저 점검하고, 투자 여력이 남으면 ISA 병행을 검토하는 흐름이 실전적입니다.',
      'ISA 만기 예정이라면 출금보다 연금계좌 전환 가능성을 먼저 보는 편이 좋습니다.'
    ]
  },
  {
    title: '올해 꼭 챙길 확대 공제',
    badge: '적용 연도 확인',
    lines: [
      '결혼세액공제, 자녀세액공제 구조, 산후조리원 의료비, 체육시설 이용료 카드공제, 월세·주택청약 확대는 공식 안내에서 적용 연도를 다시 확인하세요.',
      '정부 발표와 국세청 FAQ의 시점이 다를 수 있으니, 실제 신고에는 국세청 안내와 홈택스 문답을 우선 보세요.',
      '확대 항목은 “있다더라” 수준으로 넘기지 말고, 내가 올해 적용 대상인지 요건부터 확인하세요.'
    ]
  }
];

const HOMETAX_GUIDE_ITEMS = [
  '11~12월에는 홈택스 연말정산 미리보기로 남은 카드 전략과 카드/체크카드 비중을 먼저 점검하세요.',
  '맞춤형 안내 서비스에서는 내가 놓친 공제 후보가 없는지부터 확인하세요.',
  '간소화 서비스에 자동 반영되지 않는 월세·교육비·의료비·기부금은 별도로 대조해 보세요.'
];

const YEARLY_EXPANSION_ITEMS = [
  {
    title: '결혼세액공제',
    text: '혼인신고 연도와 생애 1회 여부처럼 적용 요건이 핵심입니다. 기사만 보지 말고 귀속연도 공식 안내를 같이 보세요.'
  },
  {
    title: '자녀세액공제',
    text: '손자녀 포함 여부, 출산·입양 공제, 자녀 수별 금액표는 귀속연도별로 바뀌기 쉬워 최신 FAQ를 먼저 확인하세요.'
  },
  {
    title: '산후조리원·의료비',
    text: '산후조리원 비용은 한도와 요건, 소득기준 완화 여부가 귀속연도에 따라 달라질 수 있어 공식 문답을 먼저 보세요.'
  },
  {
    title: '수영장·체력단련장 이용료',
    text: '카드 공제 반영 대상이 되는 시기와 세부 조건이 있어, 실제 결제내역을 업종 기준으로 확인하는 편이 안전합니다.'
  },
  {
    title: '월세·주택청약 확대',
    text: '대상자 범위와 주택 기준이 확대된 해가 있어도, 내가 그 연도 적용 대상인지 먼저 봐야 실수가 줄어듭니다.'
  }
];

const UPDATE_HISTORY_ITEMS = [
  '2026-03-10: 절세전략 가이드, 홈택스 행동 가이드, 확대 공제 체크, 결과 누락 점검 리스트 보강',
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
const deductionChecklistBox = document.getElementById('deductionChecklistBox');
const updateHistoryList = document.getElementById('updateHistoryList');
const footerUpdateDate = document.getElementById('footerUpdateDate');
const isaBadgeRow = document.getElementById('isaBadgeRow');
const isaSummaryCard = document.getElementById('isaSummaryCard');
const isaActionGuide = document.getElementById('isaActionGuide');
const isaMaturityAlert = document.getElementById('isaMaturityAlert');
const singleIsaCapacityHint = document.getElementById('singleIsaCapacityHint');
const coupleIsaCapacityHint = document.getElementById('coupleIsaCapacityHint');
const strategyGuideGrid = document.getElementById('strategyGuideGrid');
const hometaxActionGuide = document.getElementById('hometaxActionGuide');
const yearlyExpansionGrid = document.getElementById('yearlyExpansionGrid');

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

const SPEND_FIELD_MAP = {
  single: {
    creditCard: { band: 'singleCreditBand', sub: 'singleCreditSub', direct: 'singleCreditUseDirect', input: 'monthlyCreditCard', label: '월평균 신용카드' },
    checkCash: { band: 'singleCheckBand', sub: 'singleCheckSub', direct: 'singleCheckUseDirect', input: 'monthlyCheckCash', label: '월평균 체크카드+현금영수증' },
    traditionalMarket: { band: 'singleMarketBand', sub: 'singleMarketSub', direct: 'singleMarketUseDirect', input: 'monthlyTraditionalMarket', label: '월평균 전통시장' },
    transit: { band: 'singleTransitBand', sub: 'singleTransitSub', direct: 'singleTransitUseDirect', input: 'monthlyTransit', label: '월평균 대중교통' }
  },
  a: {
    creditCard: { band: 'aCreditBand', sub: 'aCreditSub', direct: 'aCreditUseDirect', input: 'aMonthlyCredit', label: '월평균 신용카드' },
    checkCash: { band: 'aCheckBand', sub: 'aCheckSub', direct: 'aCheckUseDirect', input: 'aMonthlyCheckCash', label: '월평균 체크카드+현금영수증' },
    traditionalMarket: { band: 'aMarketBand', sub: 'aMarketSub', direct: 'aMarketUseDirect', input: 'aMonthlyMarket', label: '월평균 전통시장' },
    transit: { band: 'aTransitBand', sub: 'aTransitSub', direct: 'aTransitUseDirect', input: 'aMonthlyTransit', label: '월평균 대중교통' }
  },
  b: {
    creditCard: { band: 'bCreditBand', sub: 'bCreditSub', direct: 'bCreditUseDirect', input: 'bMonthlyCredit', label: '월평균 신용카드' },
    checkCash: { band: 'bCheckBand', sub: 'bCheckSub', direct: 'bCheckUseDirect', input: 'bMonthlyCheckCash', label: '월평균 체크카드+현금영수증' },
    traditionalMarket: { band: 'bMarketBand', sub: 'bMarketSub', direct: 'bMarketUseDirect', input: 'bMonthlyMarket', label: '월평균 전통시장' },
    transit: { band: 'bTransitBand', sub: 'bTransitSub', direct: 'bTransitUseDirect', input: 'bMonthlyTransit', label: '월평균 대중교통' }
  }
};

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

function getSpendFieldRefs(prefix, kind) {
  return SPEND_FIELD_MAP[prefix]?.[kind] || null;
}

function labelSpendResolvedMode(mode) {
  if (mode === 'monthly-direct') return '직접 입력';
  if (mode === 'monthly-select') return '선택형';
  return '기본 선택';
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
  return aIncome > bIncome ? '본인' : '배우자';
}

function getPreferredCardHolder(aCard, bCard) {
  return aCard.shortfall >= bCard.shortfall ? '본인' : '배우자';
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

function setAssistButtonState(card, actionName, activeValue) {
  card.querySelectorAll(`[data-action="${actionName}"]`).forEach((button) => {
    const targetMode = button.dataset.mode || button.dataset.panel || '';
    button.classList.toggle('active', targetMode === activeValue);
    button.setAttribute('aria-expanded', String(targetMode === activeValue));
  });
}

function getChildReviewNotes(age) {
  if (age == null) return ['연령 확인 필요'];
  const notes = [];
  notes.push(age <= RULES.personalDeduction.childBasicMaxAge ? '기본공제 검토' : '기본공제 나이 재확인');
  notes.push(age >= RULES.personalDeduction.childTaxCreditAge ? '자녀세액공제 검토' : '자녀세액공제 시기 전');
  notes.push(age < 19 ? '미성년 가능성 높음' : '성년 기준 확인');
  return notes;
}

function getDependentReviewNotes({ age, incomeEligible, disabled, senior70 }) {
  const notes = [];
  if (incomeEligible) notes.push('소득요건 충족');
  else notes.push('소득요건 확인 필요');
  if (disabled) notes.push('장애인 추가공제 검토');
  if (senior70 || (age != null && age >= RULES.personalDeduction.seniorAge)) notes.push('경로우대 검토');
  if (age == null) notes.push('정확한 나이 확인 필요');
  return notes;
}

function updateChildCardUI(card) {
  const read = (field) => card.querySelector(`[data-field="${field}"]`);
  const ageMode = read('ageMode').value;
  const extraOpen = read('extraOpen').value === 'true';
  setFieldBlockHidden(card, 'lifeStage', ageMode !== 'lifeStage');
  setFieldBlockHidden(card, 'birthYear', ageMode !== 'birthYear');
  setFieldBlockHidden(card, 'exactAge', ageMode !== 'exactAge');
  setFieldBlockHidden(card, 'expensePanel', !extraOpen);
  setAssistButtonState(card, 'child-mode', ageMode === 'lifeStage' ? '' : ageMode);
  setAssistButtonState(card, 'child-panel', extraOpen ? 'expense' : '');

  const name = read('name').value.trim() || card.querySelector('.repeat-card-title strong')?.textContent || '자녀';
  const stageLabel =
    ageMode === 'lifeStage'
      ? read('lifeStage').options[read('lifeStage').selectedIndex]?.textContent || '생활단계 미선택'
      : ageMode === 'birthYear'
        ? `${sanitizeNumber(read('birthYear').value) || '-'}년생`
        : `${sanitizeNumber(read('exactAge').value) || '-'}세`;
  const modeLabel =
    ageMode === 'lifeStage' ? '생활단계 입력' : ageMode === 'birthYear' ? '세부 조정 사용' : '정확히 입력 사용';
  const age = getAgeFromQuick({
    ageMode,
    birthYear: sanitizeNumber(read('birthYear').value),
    age: sanitizeNumber(read('exactAge').value),
    lifeStage: read('lifeStage').value
  });
  const notes = getChildReviewNotes(age);
  const summary = card.querySelector('[data-role="summary"]');
  if (summary) summary.textContent = `${name} · ${stageLabel} · ${modeLabel}`;
  const insight = card.querySelector('[data-role="insight"]');
  if (insight) insight.textContent = `현재 판단: ${notes.join(' · ')}`;
}

function updateDependentCardUI(card) {
  const read = (field) => card.querySelector(`[data-field="${field}"]`);
  const ageMode = read('ageMode').value;
  const extraOpen = read('extraOpen').value === 'true';
  setFieldBlockHidden(card, 'ageBand', ageMode !== 'ageBand');
  setFieldBlockHidden(card, 'birthYear', ageMode !== 'birthYear');
  setFieldBlockHidden(card, 'exactAge', ageMode !== 'exactAge');
  setFieldBlockHidden(card, 'expensePanel', !extraOpen);
  setAssistButtonState(card, 'dependent-mode', ageMode === 'ageBand' ? '' : ageMode);
  setAssistButtonState(card, 'dependent-panel', extraOpen ? 'expense' : '');

  const relationLabel = read('relation').options[read('relation').selectedIndex]?.textContent || '관계 미선택';
  const ageLabel =
    ageMode === 'ageBand'
      ? read('ageBand').options[read('ageBand').selectedIndex]?.textContent || '연령구간 미선택'
      : ageMode === 'birthYear'
        ? `${sanitizeNumber(read('birthYear').value) || '-'}년생`
      : `${sanitizeNumber(read('exactAge').value) || '-'}세`;
  const modeLabel = ageMode === 'ageBand' ? '연령구간 입력' : ageMode === 'birthYear' ? '세부 조정 사용' : '정확히 입력 사용';
  const age = getAgeFromQuick({
    ageMode,
    ageBand: read('ageBand').value,
    birthYear: sanitizeNumber(read('birthYear').value),
    age: sanitizeNumber(read('exactAge').value)
  });
  const notes = getDependentReviewNotes({
    age,
    incomeEligible: read('incomeEligible').checked,
    disabled: read('disabled').checked,
    senior70: read('senior70').checked
  });
  const summary = card.querySelector('[data-role="summary"]');
  if (summary) summary.textContent = `${relationLabel} · ${ageLabel} · ${modeLabel}`;
  const insight = card.querySelector('[data-role="insight"]');
  if (insight) insight.textContent = `현재 판단: ${notes.join(' · ')}`;
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
  const ageMode = data.ageMode || 'lifeStage';
  const extraOpen = data.education || data.medical || data.insurance || data.donation || data.cardSpend || data.payer ? 'true' : 'false';
  const card = document.createElement('article');
  card.className = 'repeat-card';
  card.innerHTML = `
    <div class="repeat-card-title">
      <strong>자녀 ${index}</strong>
      <button type="button" class="remove-btn" data-remove="child">삭제</button>
    </div>
    <p class="repeat-card-summary" data-role="summary">입력 전</p>
    <p class="repeat-card-insight" data-role="insight">현재 판단: 연령 확인 필요</p>
    <input type="hidden" data-field="ageMode" value="${ageMode}" />
    <input type="hidden" data-field="extraOpen" value="${extraOpen}" />
    <div class="family-card-layout">
      <div>
        <label>이름/구분명</label>
        <input data-field="name" value="${data.name || ''}" placeholder="자녀${index}" />
      </div>
      <div data-block="lifeStage" class="family-card-main">
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
      <div class="family-card-actions">
        <button type="button" class="spend-link-btn" data-action="child-mode" data-mode="birthYear" aria-expanded="false">세부 조정</button>
        <button type="button" class="spend-link-btn" data-action="child-mode" data-mode="exactAge" aria-expanded="false">정확히 입력</button>
        <button type="button" class="spend-link-btn" data-action="child-panel" data-panel="expense" aria-expanded="false">관련 지출 입력</button>
      </div>
      <div data-block="birthYear" class="family-card-panel hidden">
        <label>출생연도 입력</label>
        <input data-field="birthYear" data-money inputmode="numeric" value="${data.birthYear || ''}" placeholder="예: 2016" />
        <p class="field-note">출생연도를 알고 있다면 생활단계보다 조금 더 정확하게 판정할 수 있습니다.</p>
      </div>
      <div data-block="exactAge" class="family-card-panel hidden">
        <label>정확한 나이 입력</label>
        <input data-field="exactAge" data-money inputmode="numeric" value="${data.exactAge || ''}" placeholder="예: 14" />
        <p class="field-note">정확한 나이를 입력하면 미성년 여부와 자녀세액공제 검토가 조금 더 명확해집니다.</p>
      </div>
      <div data-block="expensePanel" class="family-card-panel hidden">
        <div class="grid two-col">
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
              <option value="A" ${data.payer === 'A' ? 'selected' : ''}>본인</option>
              <option value="B" ${data.payer === 'B' ? 'selected' : ''}>배우자</option>
              <option value="child" ${data.payer === 'child' ? 'selected' : ''}>자녀 본인</option>
              <option value="unknown" ${data.payer === 'unknown' ? 'selected' : ''}>모름</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `;

  card.querySelector('[data-remove="child"]').addEventListener('click', () => {
    card.remove();
    renumberCards(childList, '자녀');
    childrenCountInput.value = String(childList.children.length);
  });

  card.querySelector('[data-field="lifeStage"]').addEventListener('change', () => {
    card.querySelector('[data-field="ageMode"]').value = 'lifeStage';
    updateChildCardUI(card);
  });
  card.querySelector('[data-field="birthYear"]').addEventListener('input', () => {
    card.querySelector('[data-field="ageMode"]').value = 'birthYear';
    updateChildCardUI(card);
  });
  card.querySelector('[data-field="exactAge"]').addEventListener('input', () => {
    card.querySelector('[data-field="ageMode"]').value = 'exactAge';
    updateChildCardUI(card);
  });
  card.querySelectorAll('[data-action="child-mode"]').forEach((button) => {
    button.addEventListener('click', () => {
      const modeInput = card.querySelector('[data-field="ageMode"]');
      modeInput.value = modeInput.value === button.dataset.mode ? 'lifeStage' : button.dataset.mode;
      updateChildCardUI(card);
    });
  });
  card.querySelector('[data-action="child-panel"][data-panel="expense"]').addEventListener('click', () => {
    const extraField = card.querySelector('[data-field="extraOpen"]');
    extraField.value = extraField.value === 'true' ? 'false' : 'true';
    updateChildCardUI(card);
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
  const ageMode = data.ageMode || 'ageBand';
  const extraOpen =
    data.coResident || data.livesTogether || data.senior70 || data.medical || data.donation || data.insurance || data.card || data.payer || data.birthYear
      ? 'true'
      : 'false';
  const card = document.createElement('article');
  card.className = 'repeat-card';
  card.innerHTML = `
    <div class="repeat-card-title">
      <strong>부양가족 ${index}</strong>
      <button type="button" class="remove-btn" data-remove="dependent">삭제</button>
    </div>
    <p class="repeat-card-summary" data-role="summary">입력 전</p>
    <p class="repeat-card-insight" data-role="insight">현재 판단: 소득요건 확인 필요</p>
    <input type="hidden" data-field="ageMode" value="${ageMode}" />
    <input type="hidden" data-field="extraOpen" value="${extraOpen}" />
    <div class="family-card-layout">
      <div>
        <label>관계</label>
        <select data-field="relation">
          <option value="부모" ${(data.relation || '부모') === '부모' ? 'selected' : ''}>부모</option>
          <option value="조부모" ${data.relation === '조부모' ? 'selected' : ''}>조부모</option>
          <option value="형제자매" ${data.relation === '형제자매' ? 'selected' : ''}>형제자매</option>
          <option value="기타" ${data.relation === '기타' ? 'selected' : ''}>기타</option>
        </select>
      </div>
      <div data-block="ageBand" class="family-card-main">
        <label>연령구간</label>
        <select data-field="ageBand">
          <option value="u60" ${data.ageBand === 'u60' ? 'selected' : ''}>60세 미만</option>
          <option value="60s" ${(data.ageBand || '60s') === '60s' ? 'selected' : ''}>60~69세</option>
          <option value="70p" ${data.ageBand === '70p' ? 'selected' : ''}>70세 이상</option>
        </select>
      </div>
      <label class="inline-check"><input type="checkbox" data-field="incomeEligible" ${data.incomeEligible ? 'checked' : ''} />소득요건 충족 여부</label>
      <label class="inline-check"><input type="checkbox" data-field="disabled" ${data.disabled ? 'checked' : ''} />장애인 여부</label>
      <div class="family-card-actions">
        <button type="button" class="spend-link-btn" data-action="dependent-mode" data-mode="birthYear" aria-expanded="false">세부 조정</button>
        <button type="button" class="spend-link-btn" data-action="dependent-mode" data-mode="exactAge" aria-expanded="false">정확히 입력</button>
        <button type="button" class="spend-link-btn" data-action="dependent-panel" data-panel="expense" aria-expanded="false">관련 지출 입력</button>
      </div>
      <div data-block="birthYear" class="family-card-panel hidden">
        <label>출생연도 입력</label>
        <input data-field="birthYear" data-money inputmode="numeric" value="${data.birthYear || ''}" placeholder="예: 1952" />
        <p class="field-note">출생연도를 알고 있다면 60세·70세 기준 판정을 더 안정적으로 볼 수 있습니다.</p>
      </div>
      <div data-block="exactAge" class="family-card-panel hidden">
        <label>정확한 나이 입력</label>
        <input data-field="exactAge" data-money inputmode="numeric" value="${data.exactAge || ''}" placeholder="0" />
        <p class="field-note">정확한 나이를 넣으면 경로우대 가능성과 연령요건 판정이 더 분명해집니다.</p>
      </div>
      <div data-block="expensePanel" class="family-card-panel hidden">
        <div class="grid two-col">
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
              <option value="A" ${data.payer === 'A' ? 'selected' : ''}>본인</option>
              <option value="B" ${data.payer === 'B' ? 'selected' : ''}>배우자</option>
              <option value="dependent" ${data.payer === 'dependent' ? 'selected' : ''}>부양가족 본인</option>
              <option value="unknown" ${data.payer === 'unknown' ? 'selected' : ''}>모름</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `;

  card.querySelector('[data-remove="dependent"]').addEventListener('click', () => {
    card.remove();
    renumberCards(dependentList, '부양가족');
  });

  card.querySelector('[data-field="ageBand"]').addEventListener('change', () => {
    card.querySelector('[data-field="ageMode"]').value = 'ageBand';
    updateDependentCardUI(card);
  });
  card.querySelector('[data-field="birthYear"]').addEventListener('input', () => {
    card.querySelector('[data-field="ageMode"]').value = 'birthYear';
    updateDependentCardUI(card);
  });
  card.querySelector('[data-field="exactAge"]').addEventListener('input', () => {
    card.querySelector('[data-field="ageMode"]').value = 'exactAge';
    updateDependentCardUI(card);
  });
  card.querySelectorAll('[data-action="dependent-mode"]').forEach((button) => {
    button.addEventListener('click', () => {
      const modeInput = card.querySelector('[data-field="ageMode"]');
      modeInput.value = modeInput.value === button.dataset.mode ? 'ageBand' : button.dataset.mode;
      updateDependentCardUI(card);
    });
  });
  card.querySelector('[data-action="dependent-panel"][data-panel="expense"]').addEventListener('click', () => {
    const extraField = card.querySelector('[data-field="extraOpen"]');
    extraField.value = extraField.value === 'true' ? 'false' : 'true';
    updateDependentCardUI(card);
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
    const birthYear = sanitizeNumber(read('birthYear').value);
    const exactAge = sanitizeNumber(read('exactAge').value);
    const age = getAgeFromQuick({ ageMode, ageBand, birthYear, age: exactAge });
    return {
      relation: read('relation').value.trim() || `부양가족${idx + 1}`,
      ageMode,
      ageBand,
      birthYear,
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
    <p>본인 연말 예상: ${formatMoney(a.projection.yearEndEstimate)}원 / 배우자 연말 예상: ${formatMoney(b.projection.yearEndEstimate)}원</p>
    <p>가구 연말 예상 총사용액: ${formatMoney(houseYearEnd)}원</p>
    <p>남은 ${a.projection.remainingMonths}개월 가구 추정 사용액: ${formatMoney(houseRemaining)}원</p>
    <p class="hint">현재 월평균 패턴 유지 기준의 추정치이며, 실제 신고값이 아닌 행동 가이드용입니다.</p>
  `;
  updateCoupleIsaCapacityHint();
}

function updateSpendItemSummary(prefix, kind) {
  const refs = getSpendFieldRefs(prefix, kind);
  if (!refs) return;
  const bandEl = document.getElementById(refs.band);
  const subEl = document.getElementById(refs.sub);
  const directEl = document.getElementById(refs.direct);
  const inputEl = document.getElementById(refs.input);
  const summaryEl = document.querySelector(`[data-spend-summary="${prefix}-${kind}"]`);
  if (!bandEl || !subEl || !directEl || !inputEl || !summaryEl) return;

  const resolved = resolveSpendValue(kind, bandEl, subEl, inputEl, directEl);
  const amountText = resolved.value ? `월 ${formatMoney(resolved.value)}원` : '거의 없음';
  summaryEl.textContent = `현재: ${amountText} · 입력 방식: ${labelSpendResolvedMode(resolved.mode)}`;
}

function updateSpendPanels(prefix, kind) {
  const refs = getSpendFieldRefs(prefix, kind);
  if (!refs) return;
  const bandEl = document.getElementById(refs.band);
  const subEl = document.getElementById(refs.sub);
  const directEl = document.getElementById(refs.direct);
  const detailPanel = document.querySelector(`[data-spend-detail="${prefix}-${kind}"]`);
  const directPanel = document.querySelector(`[data-spend-direct="${prefix}-${kind}"]`);
  const detailBtn = document.querySelector(`[data-spend-toggle="detail-${prefix}-${kind}"]`);
  const directBtn = document.querySelector(`[data-spend-toggle="direct-${prefix}-${kind}"]`);
  if (!bandEl || !subEl || !directEl) return;

  if (bandEl.value === 'direct') {
    directEl.checked = true;
    if (directPanel) directPanel.classList.remove('hidden');
    if (detailPanel) detailPanel.classList.add('hidden');
  }

  if (detailBtn && detailPanel) detailBtn.classList.toggle('active', !detailPanel.classList.contains('hidden'));
  if (directBtn && directPanel) directBtn.classList.toggle('active', !directPanel.classList.contains('hidden'));
  updateSpendItemSummary(prefix, kind);
}

function toggleSpendAssistPanel(prefix, kind, target) {
  const refs = getSpendFieldRefs(prefix, kind);
  if (!refs) return;
  const bandEl = document.getElementById(refs.band);
  const directEl = document.getElementById(refs.direct);
  const detailPanel = document.querySelector(`[data-spend-detail="${prefix}-${kind}"]`);
  const directPanel = document.querySelector(`[data-spend-direct="${prefix}-${kind}"]`);
  if (!bandEl || !directEl) return;

  if (target === 'detail' && detailPanel) {
    const willOpen = detailPanel.classList.contains('hidden');
    detailPanel.classList.toggle('hidden', !willOpen);
    if (directPanel) directPanel.classList.add('hidden');
    if (!willOpen) {
      // keep current sub selection, just close panel
    }
  }

  if (target === 'direct' && directPanel) {
    const willOpen = directPanel.classList.contains('hidden');
    directPanel.classList.toggle('hidden', !willOpen);
    if (detailPanel) detailPanel.classList.add('hidden');
    if (willOpen) {
      bandEl.dataset.previousBand = bandEl.value && bandEl.value !== 'direct' ? bandEl.value : '';
      directEl.checked = true;
      bandEl.value = 'direct';
    } else {
      directEl.checked = false;
      bandEl.value = bandEl.dataset.previousBand || '10-30';
    }
  }

  if (target !== 'direct' && bandEl.value !== 'direct' && directPanel?.classList.contains('hidden')) {
    directEl.checked = false;
  }

  updateSpendPanels(prefix, kind);
}

function buildSpendItemUI(prefix, kind) {
  const refs = getSpendFieldRefs(prefix, kind);
  if (!refs) return;
  const bandEl = document.getElementById(refs.band);
  const subEl = document.getElementById(refs.sub);
  const directEl = document.getElementById(refs.direct);
  const inputEl = document.getElementById(refs.input);
  const container = bandEl?.parentElement;
  if (!bandEl || !subEl || !directEl || !inputEl || !container || container.dataset.spendEnhanced === 'true') return;

  const bandLabel = container.querySelector(`label[for="${refs.band}"]`);
  const subLabel = container.querySelector(`label[for="${refs.sub}"]`);
  const directLabel = directEl.closest('label');
  const inputLabel = container.querySelector(`label[for="${refs.input}"]`);

  const shell = document.createElement('section');
  shell.className = 'spend-item-shell';
  shell.dataset.spendEnhanced = 'true';
  shell.innerHTML = `
    <div class="spend-item-head">
      <div>
        <p class="spend-item-title">${refs.label}</p>
        <p class="spend-item-caption">대략적인 월평균을 먼저 선택하세요.</p>
      </div>
      <p class="spend-item-summary" data-spend-summary="${prefix}-${kind}">현재: 입력 전</p>
    </div>
    <div class="spend-item-main"></div>
    <div class="spend-item-actions">
      <button type="button" class="spend-link-btn" data-spend-toggle="detail-${prefix}-${kind}">세부 조정</button>
      <button type="button" class="spend-link-btn" data-spend-toggle="direct-${prefix}-${kind}">직접 입력</button>
    </div>
    <div class="spend-subpanel hidden" data-spend-detail="${prefix}-${kind}"></div>
    <div class="spend-subpanel hidden" data-spend-direct="${prefix}-${kind}"></div>
  `;

  const mainWrap = shell.querySelector('.spend-item-main');
  const detailWrap = shell.querySelector(`[data-spend-detail="${prefix}-${kind}"]`);
  const directWrap = shell.querySelector(`[data-spend-direct="${prefix}-${kind}"]`);
  if (bandLabel) mainWrap.appendChild(bandLabel);
  mainWrap.appendChild(bandEl);
  if (subLabel) detailWrap.appendChild(subLabel);
  detailWrap.appendChild(subEl);
  if (inputLabel) directWrap.appendChild(inputLabel);
  directWrap.appendChild(inputEl);
  if (directLabel) {
    directLabel.classList.add('sr-only-toggle');
    directWrap.appendChild(directLabel);
  }

  container.innerHTML = '';
  container.appendChild(shell);
  container.dataset.spendEnhanced = 'true';

  shell.querySelector(`[data-spend-toggle="detail-${prefix}-${kind}"]`).addEventListener('click', () => toggleSpendAssistPanel(prefix, kind, 'detail'));
  shell.querySelector(`[data-spend-toggle="direct-${prefix}-${kind}"]`).addEventListener('click', () => toggleSpendAssistPanel(prefix, kind, 'direct'));

  [bandEl, subEl, inputEl, directEl].forEach((el) => {
    el.addEventListener('change', () => updateSpendPanels(prefix, kind));
    el.addEventListener('input', () => updateSpendPanels(prefix, kind));
  });

  bandEl.addEventListener('change', () => {
    if (bandEl.value !== 'direct') {
      directEl.checked = false;
      if (directWrap) directWrap.classList.add('hidden');
    }
    if (bandEl.value === 'direct' && directWrap) {
      directWrap.classList.remove('hidden');
    }
    updateSpendPanels(prefix, kind);
  });

  updateSpendPanels(prefix, kind);
}

function enhanceSpendInputUI() {
  Object.keys(SPEND_FIELD_MAP).forEach((prefix) => {
    Object.keys(SPEND_FIELD_MAP[prefix]).forEach((kind) => buildSpendItemUI(prefix, kind));
  });
}

function applySpendSelectionToInput(kind, prefix) {
  const refs = getSpendFieldRefs(prefix, kind);
  if (!refs) return { value: 0, mode: 'monthly-select' };
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
  updateSpendItemSummary(prefix, kind);
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

  if (!input.spouseA.income || !input.spouseB.income) return '맞벌이 모드에서는 본인과 배우자 연봉(총급여)을 모두 입력해 주세요.';
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
  const preferredShortfall = preferred === '본인' ? cardStats.aCard.shortfall : cardStats.bCard.shortfall;
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

function buildSingleTodoItems(input, personal, card, isaProfile) {
  const items = [];
  if (card.shortfall > 0) {
    items.push(
      input.projection.mode === 'monthly' && input.projection.remainingMonths > 0
        ? `체크카드/현금영수증으로 월 ${formatMoney(card.shortfall / input.projection.remainingMonths)}원 전환 계획 세우기`
        : '신용카드보다 체크카드/현금영수증 비중을 먼저 조정하기'
    );
  } else {
    items.push('추가 소비보다 결제수단 구분과 증빙 누락부터 점검하기');
  }

  if (input.monthlyRent > 0) items.push('월세 계약·전입·계좌이체 요건을 다시 확인하고 현금영수증과 중복 적용하지 않기');
  else if (personal.childTaxCount > 0) items.push('자녀 기본공제 귀속과 교육비·의료비 결제자를 같은 흐름으로 정리하기');
  else if (personal.seniorCount > 0) items.push('부모·조부모 소득요건과 70세 이상 여부를 다시 확인하기');
  else items.push('배우자·부양가족 소득요건과 나이요건을 다시 확인하기');

  if (input.pension + input.irp < RULES.pension.pensionSavingAnnualLimit) items.push('연금저축 또는 IRP 자동이체 금액을 정하고 한도 여유를 점검하기');
  else if (isaProfile.maturityNeeded) items.push('ISA 만기 자금은 출금 전에 연금계좌 전환 가능성을 먼저 비교하기');
  else items.push('홈택스 연말정산 미리보기에서 남은 카드 전략과 누락 공제 후보를 확인하기');

  return items.slice(0, 3);
}

function buildCoupleTodoItems(input, aCard, bCard, isaProfile, preferredCardHolder) {
  const items = [];
  const preferredShortfall = preferredCardHolder === '본인' ? aCard.shortfall : bCard.shortfall;
  items.push(
    input.projection && input.projection.mode === 'monthly' && input.projection.remainingMonths > 0
      ? `${preferredCardHolder} 기준 월 ${formatMoney(preferredShortfall / Math.max(1, input.projection.remainingMonths))}원 정도 체크카드/현금영수증 전환 계획 세우기`
      : `${preferredCardHolder} 부족 구간부터 먼저 채우고 다른 배우자는 추가 소비보다 증빙 정리하기`
  );

  if (input.children.length > 0) items.push('자녀별 기본공제 귀속자와 교육비·의료비 결제자를 한 표로 정리하기');
  else if (input.dependents.length > 0) items.push('부양가족 귀속자를 부부 중 1인으로 확정하고 중복공제 가능성 제거하기');
  else items.push('부부가 각자 가져갈 공제 항목을 먼저 정리하고 같은 항목을 중복 입력하지 않기');

  if ((input.spouseA.rent || 0) > 0 || (input.spouseB.rent || 0) > 0) items.push('월세는 배우자별 계약·전입·계좌이체 요건을 다시 확인하고 카드성 공제와 충돌이 없는지 보기');
  else if (isaProfile.maturityNeeded) items.push('가구 ISA 만기 자금은 단순 출금보다 연금계좌 전환 가능성을 먼저 확인하기');
  else items.push('홈택스 미리보기와 맞춤형 안내 서비스에서 빠진 공제 후보를 부부 각각 확인하기');

  return items.slice(0, 3);
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
    personal.childTaxCount > 0
      ? '지금은 카드 전략보다 자녀 공제와 교육비·의료비 귀속 점검 효과가 더 클 수 있습니다.'
      : personal.seniorCount > 0
        ? '부모·조부모 입력이 있다면 카드 추가 사용보다 가족공제와 경로우대 가능성을 먼저 확인하세요.'
        : input.monthlyRent > 0
          ? '월세가 있다면 카드 전략보다 월세 세액공제 요건과 중복 여부를 먼저 점검하는 편이 좋습니다.'
          : `현재 기준으로는 남은 목표 ${formatMoney(card.shortfall)}원을 계획 지출 안에서 ${preferredType} 위주로 배치하는 편이 유리할 가능성이 높습니다.`,
    card.shortfall > 0
      ? `현재 패턴이면 신용카드보다 체크카드/현금영수증 전환 효과가 더 큽니다. 남은 부족분은 ${formatMoney(card.shortfall)}원으로 봤습니다.`
      : '이미 기준 사용액을 어느 정도 넘긴 구간이라면 추가 소비보다 결제수단 구분과 증빙 정리가 더 중요합니다.',
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

  const scenarioContent = buildSingleScenarioSet(input, personal, card, isaProfile, totalCard);

  const todos = buildSingleTodoItems(input, personal, card, isaProfile);

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
  const hasParents = input.dependents.some((dep) => (dep.age != null && dep.age >= RULES.personalDeduction.elderFamilyMinAge) || dep.senior70);

  const allocations = [];
  const warnings = [RULES.warnings.duplicateDependent];

  input.children.forEach((child) => {
    const owner = recommendedChildOwner === '균형 배분' ? '본인 우선(동률)' : recommendedChildOwner;
    const payerLabel = child.payer === 'A' ? '본인' : child.payer === 'B' ? '배우자' : child.payer === 'child' ? '자녀 본인' : '모름';
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
    current: `본인 ${formatMoney(input.spouseA.medical)}원 / 배우자 ${formatMoney(input.spouseB.medical)}원`,
    target: '실제 지출자 기준 분리',
    reason: '배우자 의료비는 실제 지출자 기준으로 분리 점검이 필요합니다.',
    caution: '각자 결제 내역 증빙 보관 필요'
  });

  allocations.push({
    item: '카드사용액 전략',
    current: `본인 부족 ${formatMoney(aCard.shortfall)}원 / 배우자 부족 ${formatMoney(bCard.shortfall)}원`,
    target: `${preferredCardHolder} 우선`,
    reason: '카드 공제는 합산보다 배우자별 초과구간을 각각 채우는 구조가 중요합니다.',
    caution: '계획 없는 소비 증가 대신 명의/수단 조정 우선'
  });

  allocations.push({
    item: '연금저축/IRP',
    current: `본인 ${formatMoney(input.spouseA.pension + input.spouseA.irp)}원 / 배우자 ${formatMoney(input.spouseB.pension + input.spouseB.irp)}원`,
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
    current: `본인 월세 ${formatMoney(input.spouseA.rent)}원 / 배우자 월세 ${formatMoney(input.spouseB.rent)}원`,
    target: '월세 세액공제 또는 현금영수증 중 1개 선택',
    reason: '같은 지출 중복 적용을 피해야 합니다.',
    caution: RULES.warnings.rentCashOverlap
  });
  if (rentOverlap) warnings.push(RULES.warnings.rentCashOverlap);

  input.dependents.forEach((dep) => {
    const recommended = dep.payer === 'B' ? '배우자' : '본인';
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
      ? `자녀 ${input.children.length}명은 ${recommendedChildOwner === '균형 배분' ? '본인 우선(동률)' : recommendedChildOwner} 귀속이 유리할 가능성이 높습니다.`
      : '자녀 입력이 없어 카드·월세·의료비 중심으로 점검했습니다.';

  const preferredShortfall = preferredCardHolder === '본인' ? aCard.shortfall : bCard.shortfall;
  const monthlySwitchAction =
    input.projection && input.projection.mode === 'monthly' && input.projection.remainingMonths > 0
      ? `남은 ${input.projection.remainingMonths}개월 동안 ${preferredCardHolder} 기준 월 ${formatMoney(preferredShortfall / input.projection.remainingMonths)}원 수준으로 체크카드/현금영수증 전환을 검토해 보세요.`
      : `카드 추가 사용은 ${preferredCardHolder} 명의 체크카드/현금영수증 위주 배치가 적합합니다.`;

  const summary = [
    input.children.length > 0
      ? '맞벌이 부부라면 자녀 공제 귀속 비교가 가장 큰 변수입니다. 교육비·의료비 결제 흐름도 같이 보세요.'
      : hasParents
        ? '부모·조부모 부양가족이 있다면 카드 전략보다 기본공제와 경로우대 가능성을 먼저 확인하세요.'
        : firstSummary,
    monthlySwitchAction,
    `ISA 우선순위는 ${isaProfile.priority}으로 해석했습니다. ${isaProfile.relationship}`,
    '월세는 세액공제와 현금영수증 중 하나만 선택해 중복을 피해야 합니다.',
    warnings.some((line) => line.includes('의료비'))
      ? '자녀 의료비에서 결제자/귀속 엇갈림으로 누락 위험이 있습니다.'
      : '자녀 의료비는 실제 지출자 기준과 귀속자 일치 여부를 최종 점검하세요.',
    `입력 기준: 본인 연봉 ${labelIncomeMode(input.inputBasis.incomeA)}, 배우자 연봉 ${labelIncomeMode(input.inputBasis.incomeB)}, 소비 ${labelSpendMode(input.inputBasis.spending)}, 가족 ${input.inputBasis.family}`
  ];

  const scenarioContent = buildCoupleScenarioSet(input, aCard, bCard, isaProfile);

  const todos = buildCoupleTodoItems(input, aCard, bCard, isaProfile, preferredCardHolder);

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

function summarizePrimaryFactors(lines) {
  return lines.filter(Boolean).slice(0, 3);
}

function buildScenarioCard({
  type,
  audience,
  why,
  factors,
  thisMonth,
  yearEnd,
  cautions,
  accounts,
  summary
}) {
  return {
    type,
    audience,
    why,
    factors: summarizePrimaryFactors(factors),
    thisMonth: thisMonth.filter(Boolean),
    yearEnd: yearEnd.filter(Boolean),
    cautions: cautions.filter(Boolean),
    accounts: accounts.filter(Boolean),
    summary
  };
}

function buildSingleScenarioSet(input, personal, card, isaProfile, totalCard) {
  const hasChildren = personal.childTaxCount > 0;
  const hasSenior = personal.seniorCount > 0;
  const pensionTotal = input.pension + input.irp;
  const lowCashflow = input.isa.capacity === 'u10' || input.isa.capacity === 'unknown';
  const cardEfficiencyLow = totalCard > input.income * 0.22 && card.shortfall > input.income * 0.08;
  const pensionFirst = pensionTotal < 3000000 && card.shortfall <= input.income * 0.04;
  const isaFocused = isaProfile.maturityNeeded || isaProfile.priority.startsWith('C') || isaProfile.priority.startsWith('D');

  const coreType = hasChildren
    ? '자녀 공제 최적화형'
    : hasSenior
      ? '부모 부양가족 반영형'
      : isaFocused
        ? 'ISA 병행 또는 만기전환 점검형'
        : pensionFirst
          ? '연금저축/IRP 우선형'
          : cardEfficiencyLow
            ? '소비는 많지만 카드공제 효율이 낮은형'
            : lowCashflow
              ? '현금흐름이 빠듯한 실속형'
              : '1인 직장인 기본형';

  const topFactorLines = [
    `연봉 ${formatMoney(input.income)}원 기준 카드 부족분 ${formatMoney(card.shortfall)}원이 계산에 크게 작용했습니다.`,
    hasChildren ? `8세 이상 자녀세액공제 검토 대상 ${personal.childTaxCount}명이 반영됐습니다.` : '',
    hasSenior ? `70세 이상 경로우대 검토 대상 ${personal.seniorCount}명이 반영됐습니다.` : '',
    pensionTotal > 0 ? `연금저축·IRP 입력 합계 ${formatMoney(pensionTotal)}원이 세액공제 우선순위 판단에 반영됐습니다.` : '연금저축·IRP 입력이 작아 세액공제 여지 여부를 다시 볼 필요가 있습니다.',
    `ISA 상태는 ${labelIsaStatus(input.isa.status)} / ${labelInvestCapacity(input.isa.capacity)}로 해석했습니다.`
  ];

  return {
    simple: buildScenarioCard({
      type: coreType,
      audience:
        coreType === '자녀 공제 최적화형'
          ? '자녀를 입력했고 연령대에 따라 자녀세액공제·교육비 점검 우선순위가 생긴 사용자에게 맞습니다.'
          : coreType === '부모 부양가족 반영형'
            ? '부모님 또는 조부모 연령 구간이 공제 판단에 직접 영향을 주는 사용자에게 맞습니다.'
            : coreType === '현금흐름이 빠듯한 실속형'
              ? '월 여유자금이 크지 않아 큰 소비나 납입 변경보다 실수 방지가 중요한 사용자에게 맞습니다.'
              : '복잡한 조정보다 올해 놓치기 쉬운 항목부터 정리하려는 1인 직장인에게 맞습니다.',
      why:
        coreType === '자녀 공제 최적화형'
          ? '자녀 연령대가 입력되어 카드 공제보다 자녀세액공제와 교육비·의료비 귀속 점검의 우선순위가 높습니다.'
          : coreType === '부모 부양가족 반영형'
            ? '부모님 나이와 소득요건이 기본공제·경로우대 판단에 직접 연결되므로 가족 공제 점검이 먼저입니다.'
            : coreType === '연금저축/IRP 우선형'
              ? '카드 부족분보다 연금저축·IRP 세액공제 여력을 먼저 쓰는 편이 즉시 체감효과가 더 현실적일 수 있습니다.'
              : coreType === 'ISA 병행 또는 만기전환 점검형'
                ? 'ISA 자체는 즉시 환급형이 아니지만, 투자 절세와 만기 후 연금계좌 전환 전략이 동시에 중요해졌습니다.'
                : '큰 구조 변경 없이도 카드·인적공제·계좌 점검만으로 누락을 줄일 수 있는 입력 패턴입니다.',
      factors: topFactorLines,
      thisMonth: [
        card.shortfall > 0
          ? `이번 달 계획 지출 중 ${formatMoney(Math.max(0, card.shortfall))}원 범위는 체크카드/현금영수증 비중으로 먼저 옮겨 보세요.`
          : '카드 목표 구간은 어느 정도 채워진 것으로 보여 추가 소비보다 증빙 정리에 집중하세요.',
        hasChildren ? '자녀 카드에서 교육비·의료비 결제자와 귀속자를 먼저 맞춰 두세요.' : '',
        hasSenior ? '부모님 소득요건과 70세 이상 여부를 홈택스 제출 전 다시 확인하세요.' : '',
        pensionFirst ? '연금저축 또는 IRP 자동이체를 우선 한 번 점검해 올해 납입 여력을 확인하세요.' : ''
      ],
      yearEnd: [
        '누적 사용액이 크게 달라지면 월평균 대신 누적 입력으로 바꿔 다시 확인하세요.',
        hasChildren ? '자녀별로 기본공제 귀속과 교육비·의료비 영수증 흐름을 같은 사람 기준으로 유지하세요.' : '가족 공제는 소득요건과 나이요건 증빙을 연말까지 한 번 더 정리하세요.',
        isaFocused ? 'ISA는 장기 투자용 절세계좌로 보고, 만기 예정이면 단순 출금 전 연금계좌 전환 가능성을 먼저 비교하세요.' : 'ISA를 쓴다면 국내상장 해외지수 ETF 같은 카테고리 중심으로 구조를 이해한 뒤 소액 병행을 검토하세요.'
      ],
      cautions: [
        personal.overlapWarning ? '한부모 공제와 부녀자 공제는 동시에 적용되지 않으니 최종 선택을 하나로 정리해야 합니다.' : '',
        personal.ineligibleCount > 0 ? '소득요건이 불명확한 가족은 기본공제에서 빠질 수 있어 증빙이 필요합니다.' : '',
        input.monthlyRent > 0 && input.checkCash > 0 ? RULES.warnings.rentCashOverlap : ''
      ],
      accounts: [
        pensionFirst ? '연금저축/IRP: 카드 추가 사용보다 세액공제 한도 점검을 우선하세요.' : '연금저축/IRP: 월 자동이체를 유지하면서 한도 여유만 체크하는 편이 안정적입니다.',
        isaProfile.actions[0] || 'ISA: 즉시 환급보다 투자수익 절세와 만기 전략을 보는 계좌로 이해하세요.'
      ],
      summary: `${coreType}으로 보입니다. 지금은 ${card.shortfall > 0 ? '카드 수단 조정과 공제 귀속 정리' : '공제 누락 방지와 계좌 전략 점검'}가 우선입니다.`
    }),
    balanced: buildScenarioCard({
      type: hasChildren ? '자녀 공제 최적화형' : hasSenior ? '부모 부양가족 반영형' : lowCashflow ? '현금흐름이 빠듯한 실속형' : '1인 직장인 기본형',
      audience: '지금 당장 가능한 행동과 연말까지 유지할 행동을 같이 관리하려는 사용자에게 맞습니다.',
      why:
        hasChildren
          ? '자녀 연령대와 가족 입력이 들어와 있어 카드 공제만 보는 것보다 자녀 관련 귀속 정리가 훨씬 중요합니다.'
          : hasSenior
            ? '부모 부양가족 입력이 있어 연령·소득요건과 실제 지출자 정리가 핵심입니다.'
            : '카드, 인적공제, 계좌 전략을 한쪽으로 치우치지 않게 가져가는 편이 현실적입니다.',
      factors: topFactorLines,
      thisMonth: [
        card.shortfall > 0
          ? `남은 기간 기준 월 ${formatMoney(card.shortfall / Math.max(1, input.projection.remainingMonths || 1))}원 수준으로 체크카드/현금영수증 전환량을 잡아 보세요.`
          : '카드 공제는 과도하게 늘리지 말고, 이미 쓰는 지출의 결제수단만 정리하세요.',
        pensionTotal < RULES.pension.pensionSavingAnnualLimit ? '연금저축·IRP는 남은 한도 여유를 보고 자동이체 금액을 조금씩 맞추세요.' : '연금저축·IRP는 이미 꽤 활용 중이므로 무리한 추가 납입보다 유지 전략이 적합합니다.',
        hasChildren ? '자녀가 초등·중등으로 입력됐다면 교육비와 체험·학원비 증빙 흐름을 함께 점검하세요.' : '',
        hasSenior ? '부모님이 70세 이상으로 입력됐다면 경로우대 추가공제 가능성을 먼저 확인하세요.' : ''
      ],
      yearEnd: [
        '입력값 중 실제 값이 확정되면 선택형 대신 세부 조정 또는 직접 입력으로 업데이트하세요.',
        '카드, 연금저축/IRP, ISA를 동시에 늘리기보다 우선순위를 한 번 정해 현금흐름을 분리하세요.',
        isaProfile.actions[1] || 'ISA는 연금계좌를 어느 정도 활용한 뒤 남는 투자 여력으로 병행하는 편이 보통 더 현실적입니다.'
      ],
      cautions: [
        '의료비와 교육비는 실제 지출자와 귀속자가 어긋나면 누락 가능성이 높습니다.',
        personal.ineligibleCount > 0 ? '소득요건 미충족 가족이 있으면 기본공제 숫자부터 달라질 수 있습니다.' : '',
        input.monthlyRent > 0 && input.checkCash > 0 ? RULES.warnings.rentCashOverlap : ''
      ],
      accounts: [
        pensionTotal < RULES.irp.yearlyGuideLimit ? '연금저축/IRP: 세액공제 체감이 더 큰 경우가 많아 우선순위를 높게 보세요.' : '연금저축/IRP: 이미 어느 정도 활용 중이라면 유지 후 ISA 병행을 고려할 수 있습니다.',
        isaProfile.relationship,
        isaProfile.notes[0] || ''
      ],
      summary: '지금은 한쪽만 극단적으로 늘리기보다 카드 수단, 가족 공제 귀속, 계좌 자동이체를 같이 정리하는 균형형이 적합합니다.'
    }),
    max: buildScenarioCard({
      type: isaFocused ? 'ISA 병행 또는 만기전환 점검형' : pensionFirst ? '연금저축/IRP 우선형' : cardEfficiencyLow ? '소비는 많지만 카드공제 효율이 낮은형' : '1인 직장인 기본형',
      audience: '연말까지 행동을 적극 조정해 절세 여지를 최대한 챙기려는 사용자에게 맞습니다.',
      why:
        isaFocused
          ? '이미 ISA 활용도가 높거나 만기 검토 구간이라 연금계좌와의 연결 전략까지 같이 보는 편이 유리합니다.'
          : pensionFirst
            ? '연금저축·IRP 세액공제 여지가 남아 있어 카드보다 계좌 전략이 더 즉시성 있는 변수입니다.'
            : cardEfficiencyLow
              ? '지출은 적지 않은데 공제 효율이 낮아 카드 수단 재배치가 핵심입니다.'
              : '입력값을 보면 카드, 계좌, 가족 공제 모두 일부 조정 여지가 남아 있습니다.',
      factors: topFactorLines,
      thisMonth: [
        card.shortfall > 0 ? `부족분 ${formatMoney(card.shortfall)}원을 월별 목표로 쪼개 결제수단을 재배치하세요.` : '카드 공제는 추가 소비보다 증빙 누락 제거 쪽이 더 효율적입니다.',
        `연금저축+IRP ${formatMoney(pensionTotal)}원은 연간 가이드 ${formatMoney(RULES.irp.yearlyGuideLimit)}원과 비교해 남은 여지를 계산해 보세요.`,
        isaProfile.maturityNeeded ? 'ISA 만기 예정이라면 출금 전에 연금계좌 전환 가능성과 조건부터 확인하세요.' : 'ISA를 쓴다면 투자수익 절세 계좌로 보고 월 투자 여력을 분리해 두세요.'
      ],
      yearEnd: [
        '가족별로 기본공제 귀속 1인을 먼저 확정하고, 교육비·의료비·보험료도 같은 축으로 정리하세요.',
        '월세, 현금영수증, 카드 사용액처럼 충돌 가능성이 있는 항목은 중복 적용 여부를 미리 분리하세요.',
        isaProfile.notes[isaProfile.notes.length - 1] || 'ISA에서는 해외 상장 ETF 직접매수처럼 보이게 설명하지 말고 국내상장 해외지수 ETF 활용 구조로 이해하세요.'
      ],
      cautions: [
        '맞는 전략이어도 무리한 추가 소비는 절세보다 현금흐름 악화가 먼저일 수 있습니다.',
        personal.overlapWarning ? '한부모/부녀자 공제는 둘 중 하나만 적용될 수 있습니다.' : '',
        personal.ineligibleCount > 0 ? '기본공제 대상이 바뀌면 전체 추천 우선순위도 달라집니다.' : ''
      ],
      accounts: [
        '연금저축/IRP: 세액공제형 계좌로 우선순위를 먼저 판단하세요.',
        isaProfile.relationship,
        isaProfile.warning
      ],
      summary: '절세 극대화 관점에서는 카드보다 귀속 정리, 계좌 한도, ISA 만기 전략 같은 구조적 변수부터 정리하는 편이 효과가 큽니다.'
    })
  };
}

function buildCoupleScenarioSet(input, aCard, bCard, isaProfile) {
  const hasChildren = input.children.length > 0;
  const hasParents = input.dependents.some((dep) => (dep.age != null && dep.age >= RULES.personalDeduction.elderFamilyMinAge) || dep.senior70);
  const lowCashflow = input.isa.capacity === 'u10' || input.isa.capacity === 'unknown';
  const isaFocused = isaProfile.maturityNeeded || isaProfile.priority.startsWith('C') || isaProfile.priority.startsWith('D');
  const preferredCardHolder = getPreferredCardHolder(aCard, bCard);
  const combinedPension = input.spouseA.pension + input.spouseA.irp + input.spouseB.pension + input.spouseB.irp;
  const coreType = hasChildren
    ? '맞벌이 부부 공제 배분형'
    : hasParents
      ? '부모 부양가족 반영형'
      : isaFocused
        ? 'ISA 병행 또는 만기전환 점검형'
        : lowCashflow
          ? '현금흐름이 빠듯한 실속형'
          : '맞벌이 부부 공제 배분형';
  const factorLines = [
    `본인 부족분 ${formatMoney(aCard.shortfall)}원, 배우자 부족분 ${formatMoney(bCard.shortfall)}원으로 카드 공제 여지가 갈립니다.`,
    hasChildren ? `자녀 ${input.children.length}명 입력으로 자녀 공제와 교육비·의료비 귀속 정리가 핵심 변수입니다.` : '',
    hasParents ? '부모 또는 조부모 입력이 있어 기본공제와 경로우대 판단이 함께 작동합니다.' : '',
    `부부 연금저축·IRP 합계 ${formatMoney(combinedPension)}원이 계좌 전략 우선순위에 반영됐습니다.`,
    `ISA 상태는 ${labelIsaStatus(input.isa.status)} / ${labelInvestCapacity(input.isa.capacity)}로 해석했습니다.`
  ];

  return {
    simple: buildScenarioCard({
      type: coreType,
      audience: hasChildren ? '자녀와 생활비를 함께 관리하는 맞벌이 부부에게 맞습니다.' : '각자 연말정산은 하되, 겹치는 공제만 정리하려는 맞벌이 부부에게 맞습니다.',
      why:
        hasChildren
          ? '맞벌이에서는 자녀 공제 귀속자를 먼저 정해야 교육비·의료비까지 같은 기준으로 묶을 수 있습니다.'
          : hasParents
            ? '부모 부양가족은 부부 중 한 사람에게만 귀속해야 하므로 중복공제 방지가 우선입니다.'
            : '부부는 합산보다 각자 공제구간과 가족 귀속을 따로 보는 구조라 입력값 배분이 중요합니다.',
      factors: factorLines,
      thisMonth: [
        hasChildren ? '자녀별로 기본공제 귀속자를 먼저 정하고, 교육비·의료비 영수증 명의도 같은 축으로 맞춰 두세요.' : '가족 공제는 부부 중 한 사람에게만 귀속되도록 먼저 표를 정리하세요.',
        `카드는 ${preferredCardHolder} 부족 구간을 먼저 채우는 쪽으로 계획 지출을 배치하세요.`,
        isaFocused ? 'ISA 만기 또는 3년 경과 구간이면 단순 출금보다 연금계좌 전환 가능성부터 확인하세요.' : ''
      ],
      yearEnd: [
        '부부가 같은 자녀·부양가족을 동시에 넣지 않도록 제출 전 최종 귀속자를 다시 확인하세요.',
        '의료비는 실제 지출자 기준이 중요하므로 가족별 결제자 흐름을 한 번 더 정리하세요.',
        isaProfile.actions[0] || 'ISA는 즉시 환급형이 아니라 투자 절세 계좌라는 점을 결과 해설과 함께 보세요.'
      ],
      cautions: [
        RULES.warnings.duplicateDependent,
        input.children.some((child) => child.medical > 0 && !['unknown', 'child'].includes(child.payer)) ? '자녀 의료비는 결제자와 귀속자가 다르면 누락 위험이 커집니다.' : '',
        (input.spouseA.rent > 0 && input.spouseA.checkCash > 0) || (input.spouseB.rent > 0 && input.spouseB.checkCash > 0) ? RULES.warnings.rentCashOverlap : ''
      ],
      accounts: [
        '연금저축/IRP: 한도 여유가 큰 배우자부터 우선 확인하는 편이 보통 효율적입니다.',
        isaProfile.relationship
      ],
      summary: '맞벌이 모드에서는 합산보다 귀속자 정리와 배우자별 카드 구간 확인이 먼저입니다.'
    }),
    balanced: buildScenarioCard({
      type: hasChildren ? '자녀 공제 최적화형' : coreType,
      audience: '부부가 서로 다른 소득·소비 구조를 갖고 있어, 한쪽에만 몰지 않고 비교하려는 경우에 맞습니다.',
      why:
        hasChildren
          ? '자녀 공제는 소득이 더 높은 쪽이 유리한 경우가 많지만, 의료비와 카드 사용액 흐름에 따라 달라질 수 있습니다.'
          : hasParents
            ? '부모님 공제는 연령·소득요건과 결제자 흐름을 함께 봐야 하므로 단순 분배보다 확인 포인트가 많습니다.'
            : '카드 부족분, 연금 활용도, ISA 상태를 같이 보면 한쪽에만 몰기보다 병행 전략이 현실적입니다.',
      factors: factorLines,
      thisMonth: [
        hasChildren ? '자녀별로 교육비·보험료·의료비를 누가 냈는지 한 번 정리한 뒤 귀속자를 비교해 보세요.' : '부양가족별로 소득요건 충족 여부부터 체크해 중복공제 대상을 줄이세요.',
        `카드는 ${preferredCardHolder} 쪽 부족분을 먼저 채우되, 다른 배우자는 추가 소비보다 증빙 정리 중심으로 가세요.`,
        combinedPension < RULES.irp.yearlyGuideLimit * 1.3 ? '연금저축/IRP는 부부 중 납입 여지가 큰 쪽 자동이체를 먼저 손보세요.' : '연금저축/IRP는 이미 일정 수준 활용 중이라면 유지 후 ISA 병행 여부를 검토하세요.'
      ],
      yearEnd: [
        '배우자별로 같은 지출을 중복해서 넣지 않도록 가족별 증빙 귀속표를 유지하세요.',
        '카드와 현금영수증은 배우자별 초과구간을 따로 보는 구조라, 한 사람의 부족분부터 끝내는 편이 이해하기 쉽습니다.',
        isaProfile.actions[1] || 'ISA는 연금계좌와 병행하되 투자 절세용이라는 성격을 구분해서 보세요.'
      ],
      cautions: [
        '의료비와 신용카드 사용액은 실제 지출자 기준이 달라지면 결과가 바뀔 수 있습니다.',
        hasParents ? '부모님이 70세 이상이라면 경로우대 추가공제는 기본공제 귀속자 기준으로 다시 확인해야 합니다.' : '',
        RULES.warnings.duplicateDependent
      ],
      accounts: [
        '연금저축/IRP: 부부 중 한도 여유가 큰 사람부터 채우는 편이 실무적으로 단순합니다.',
        isaProfile.notes[0] || 'ISA: 국내상장 해외지수 ETF 같은 카테고리 중심 이해가 적절합니다.',
        isaProfile.warning
      ],
      summary: '균형형에서는 자녀·부양가족 귀속, 카드 부족분, 계좌 자동이체를 배우자별로 나눠 보는 것이 핵심입니다.'
    }),
    max: buildScenarioCard({
      type: isaFocused ? 'ISA 병행 또는 만기전환 점검형' : hasChildren ? '맞벌이 부부 공제 배분형' : '현금흐름이 빠듯한 실속형',
      audience: '부부가 역할을 분리해 적극적으로 절세 구조를 최적화하려는 경우에 맞습니다.',
      why:
        isaFocused
          ? '연금계좌 활용과 ISA 상태를 함께 보면, 단순히 카드만 조정하는 것보다 계좌 전략이 더 큰 변수가 됩니다.'
          : hasChildren
            ? '자녀가 있는 맞벌이는 귀속자 배분이 잘못되면 교육비·의료비·기본공제가 동시에 엇갈릴 수 있습니다.'
            : '카드 부족분과 연금 납입 여지를 모두 같이 조정할 여지가 남아 있습니다.',
      factors: factorLines,
      thisMonth: [
        `부족분이 더 큰 ${preferredCardHolder} 명의에 체크카드/현금영수증 전환 계획을 먼저 집중하세요.`,
        hasChildren ? '자녀별 귀속자를 1명 단위로 확정하고, 의료비·교육비 영수증도 같은 사람 기준으로 재정리하세요.' : '부양가족 귀속자를 한 번 확정한 뒤 부부 중복 입력을 제거하세요.',
        isaProfile.maturityNeeded ? 'ISA 만기 전환 전략은 연금계좌 전환 여부를 먼저 비교한 뒤 출금 여부를 결정하세요.' : 'ISA와 연금저축/IRP 자동이체를 동시에 늘릴지, 현금흐름 기준으로 우선순위를 나누세요.'
      ],
      yearEnd: [
        '제출 직전에는 자녀·부양가족 귀속표, 실제 결제자, 월세/현금영수증 충돌 여부를 한 번에 점검하세요.',
        '부부가 각자 카드 공제 구간을 넘겼는지 별도로 보고, 넘긴 뒤에는 추가 소비보다 증빙 보정에 집중하세요.',
        isaProfile.notes[isaProfile.notes.length - 1] || 'ISA는 해외 상장 ETF 직접매수처럼 오해되지 않게 국내상장 해외지수 ETF 활용 개념으로 이해하세요.'
      ],
      cautions: [
        RULES.warnings.duplicateDependent,
        '무리하게 지출을 늘리면 절세 효과보다 가계 현금흐름 부담이 더 커질 수 있습니다.',
        (input.spouseA.rent > 0 && input.spouseA.checkCash > 0) || (input.spouseB.rent > 0 && input.spouseB.checkCash > 0) ? RULES.warnings.rentCashOverlap : ''
      ],
      accounts: [
        '연금저축/IRP: 세액공제형 계좌로서 즉시 체감효과가 큰지 먼저 판단하세요.',
        isaProfile.relationship,
        isaProfile.warning
      ],
      summary: '절세 극대화형에서는 배우자별 귀속과 카드 구간, 연금계좌, ISA 만기 전략까지 하나의 표로 관리하는 편이 안전합니다.'
    })
  };
}

function renderScenario() {
  if (!latestResult) return;
  const conf = RULES.scenario[activeScenarioId];
  const scenario = latestResult.scenarios[activeScenarioId];
  const intro = latestResult.mode === 'couple' ? conf.coupleSummary : conf.singleSummary;

  if (!scenario) {
    scenarioPanel.innerHTML = '';
    return;
  }

  scenarioPanel.innerHTML = `
    <div class="scenario-shell">
      <p class="scenario-lead"><strong>${conf.title}</strong> · ${intro}</p>
      <div class="scenario-summary-line">
        <span class="scenario-type">${scenario.type}</span>
        <p>${scenario.summary}</p>
      </div>
      <div class="scenario-grid">
        <section class="scenario-block">
          <h4>누구에게 맞는 시나리오인지</h4>
          <p>${scenario.audience}</p>
        </section>
        <section class="scenario-block">
          <h4>왜 이 시나리오가 추천됐는지</h4>
          <p>${scenario.why}</p>
        </section>
        <section class="scenario-block">
          <h4>가장 크게 작용한 입력값</h4>
          <ul class="scenario-list">
            ${scenario.factors.map((line) => `<li>${line}</li>`).join('')}
          </ul>
        </section>
        <section class="scenario-block">
          <h4>이번 달 바로 할 일</h4>
          <ul class="scenario-list">
            ${scenario.thisMonth.map((line) => `<li>${line}</li>`).join('')}
          </ul>
        </section>
        <section class="scenario-block">
          <h4>연말까지 유지할 행동</h4>
          <ul class="scenario-list">
            ${scenario.yearEnd.map((line) => `<li>${line}</li>`).join('')}
          </ul>
        </section>
        <section class="scenario-block">
          <h4>주의할 중복공제·누락 포인트</h4>
          <ul class="scenario-list">
            ${scenario.cautions.map((line) => `<li>${line}</li>`).join('')}
          </ul>
        </section>
        <section class="scenario-block">
          <h4>관련 계좌 전략</h4>
          <ul class="scenario-list">
            ${scenario.accounts.map((line) => `<li>${line}</li>`).join('')}
          </ul>
        </section>
      </div>
    </div>
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

function renderStrategyContent() {
  if (strategyGuideGrid) {
    strategyGuideGrid.innerHTML = STRATEGY_GUIDE_ITEMS.map(
      (item) => `
        <article class="strategy-guide-card">
          <span class="strategy-badge">${item.badge}</span>
          <h3>${item.title}</h3>
          ${item.lines.map((line) => `<p>${line}</p>`).join('')}
        </article>
      `
    ).join('');
  }

  if (hometaxActionGuide) {
    hometaxActionGuide.innerHTML = `
      <ul class="content-list">
        ${HOMETAX_GUIDE_ITEMS.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    `;
  }

  if (yearlyExpansionGrid) {
    yearlyExpansionGrid.innerHTML = YEARLY_EXPANSION_ITEMS.map(
      (item) => `
        <article class="strategy-guide-card compact">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    ).join('');
  }
}

function collectDeductionChecklist(result, input) {
  const checklist = [
    '간소화 서비스에 자동 반영되지 않는 항목이 없는지 홈택스 자료와 실제 영수증을 한 번 더 대조하세요.'
  ];

  if (result.mode === 'single') {
    if (input.monthlyRent > 0) checklist.push('월세 계약서, 전입 상태, 계좌이체 증빙을 다시 확인하고 같은 지출을 현금영수증과 중복 적용하지 마세요.');
    if (result.personal?.childTaxCount > 0) checklist.push('자녀 기본공제 귀속과 교육비·의료비 결제자가 같은 흐름인지 확인하세요.');
    if (result.personal?.seniorCount > 0) checklist.push('부모·조부모는 소득요건과 70세 이상 여부를 함께 확인해 경로우대 누락을 줄이세요.');
    if (input.pension + input.irp > 0) checklist.push('연금저축·IRP 납입증명과 실제 납입액이 일치하는지 확인하세요.');
    if (result.isa?.maturityNeeded) checklist.push('ISA 만기 자금은 출금 전에 연금계좌 전환 가능성과 적용 요건을 먼저 비교하세요.');
  } else {
    if (input.children.length > 0) checklist.push('맞벌이 부부는 자녀별 기본공제 귀속자와 교육비·의료비 지출자를 한 표로 정리하세요.');
    if (input.dependents.length > 0) checklist.push('부양가족은 부부가 동시에 중복 공제하지 않도록 귀속자를 1인으로 확정하세요.');
    if ((input.spouseA.rent || 0) > 0 || (input.spouseB.rent || 0) > 0) checklist.push('월세 공제는 배우자별 계약·전입·계좌이체 증빙을 다시 보고, 카드성 공제와 충돌이 없는지 확인하세요.');
    if (result.isa?.maturityNeeded) checklist.push('가구 ISA가 만기 구간이면 단순 출금보다 연금계좌 전환 가능성을 먼저 비교하세요.');
  }

  checklist.push('수영장·체력단련장 이용료, 산후조리원, 주택청약처럼 확대·신설 항목은 귀속연도 공식 안내로 다시 확인하세요.');
  return checklist.slice(0, 5);
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
      ? result.personal?.childTaxCount > 0
        ? '지금은 카드 전략만 보는 것보다 자녀 공제 귀속과 교육비·의료비 점검 효과가 더 크게 작용할 가능성이 있습니다.'
        : result.personal?.seniorCount > 0
          ? '부모·조부모 입력이 있어 카드보다 가족공제와 경로우대 검토가 결과에 더 크게 반영됐습니다.'
          : input.monthlyRent > 0
            ? '월세가 입력되어 있어 카드 추가 사용보다 월세 요건과 중복 여부 점검이 더 중요한 축으로 반영됐습니다.'
            : `입력한 소득(${formatMoney(input.income)}원)과 소비 패턴(${spendModeLabel})을 기준으로 카드 전략·납입 전략·인적공제·ISA 우선순위를 함께 해석했습니다.`
      : input.children.length > 0
        ? '맞벌이 부부에서는 자녀 공제 귀속과 교육비·의료비 결제 흐름이 핵심이라, 단순 합산보다 가족 배분 전략을 더 크게 반영했습니다.'
        : `배우자별 소득과 소비를 분리해 각자 부족 구간을 추정하고, 중복공제 위험·결제자 불일치 위험·ISA 병행 우선순위를 함께 반영했습니다.`;
  const impactList =
    result.mode === 'single'
      ? [
          `연봉과 ${spendModeLabel} 소비 입력으로 카드 부족 구간을 추정했습니다.`,
          result.personal?.childTaxCount > 0 ? `8세 이상 자녀세액공제 검토 대상 ${result.personal.childTaxCount}명이 우선순위에 반영됐습니다.` : '',
          result.personal?.seniorCount > 0 ? `70세 이상 가족 ${result.personal.seniorCount}명이 있어 경로우대 점검이 강화됐습니다.` : '',
          input.pension + input.irp > 0 ? '연금저축·IRP 납입액이 있어 카드 전략과 계좌 전략을 함께 비교했습니다.' : '연금저축·IRP 입력이 적어 세액공제 여지 점검 문구를 더 앞에 배치했습니다.',
          input.isa.status !== 'none' ? `ISA 상태(${labelIsaStatus(input.isa.status)})를 함께 반영했습니다.` : ''
        ]
      : [
          '본인과 배우자의 연봉·카드 사용 패턴을 각각 나눠서 부족 구간을 계산했습니다.',
          input.children.length > 0 ? `자녀 ${input.children.length}명 입력으로 자녀 공제 귀속 비교를 강화했습니다.` : '',
          input.dependents.length > 0 ? `부양가족 ${input.dependents.length}명 입력으로 중복공제와 경로우대 가능성을 같이 봤습니다.` : '',
          input.isa.status !== 'none' ? `가구 ISA 상태(${labelIsaStatus(input.isa.status)})를 함께 반영했습니다.` : ''
        ];

  whyRecommendationBox.innerHTML = `
    <p><strong>왜 이런 추천이 나왔나요?</strong></p>
    <p>${topReason}</p>
    <ul class="content-list">
      ${impactList.filter(Boolean).map((line) => `<li>${line}</li>`).join('')}
    </ul>
    <p>이 추천은 확정 세액이 아니라 실행 행동의 우선순위를 정하기 위한 참고용 해석입니다. 실제 신고 전에는 홈택스 미리보기와 국세청 문답으로 다시 확인하세요.</p>
  `;

  if (deductionChecklistBox) {
    deductionChecklistBox.innerHTML = `
      <p><strong>누락 점검 리스트</strong></p>
      <ul class="content-list">
        ${collectDeductionChecklist(result, input).map((line) => `<li>${line}</li>`).join('')}
      </ul>
    `;
  }
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

function openAccordionForTarget(target) {
  if (!(target instanceof HTMLElement)) return;
  const panel = target.classList.contains('accordion-panel') ? target : target.closest('.accordion-panel');
  if (!panel) return;
  const trigger = document.querySelector(`.accordion-trigger[aria-controls="${panel.id}"]`);
  if (!trigger) return;
  trigger.setAttribute('aria-expanded', 'true');
  panel.classList.remove('hidden');
}

function syncAccordionWithHash() {
  const hash = window.location.hash;
  if (!hash) return;
  const target = document.querySelector(hash);
  if (!target) return;
  openAccordionForTarget(target);
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

enhanceSpendInputUI();
ruleUpdateDate.textContent = RULES.meta.updatedAt;
if (footerUpdateDate) footerUpdateDate.textContent = RULES.meta.updatedAt;
setupMoneyInputs();
setupTabsKeyboard();
setupAccordions();
bootstrapRepeatLists();
renderFaq();
renderStrategyContent();
renderUpdateHistory();
syncAccordionWithHash();
window.addEventListener('hashchange', syncAccordionWithHash);
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
