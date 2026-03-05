export type RecommendInput = {
  income: number;
  isWorker: boolean;
  hasPension: boolean;
  highCardSpend: boolean;
};

export type StrategyCard = {
  id: 'card-cash' | 'pension-irp' | 'isa';
  title: string;
  icon: string;
  bullets: string[];
  monthlyGuide: {
    conservative: string;
    taxFocused: string;
  };
  rationale: string[];
};

export type RecommendResult = {
  tone: string;
  cards: StrategyCard[];
  todayTodos: string[];
};

type IncomeBand = 'low' | 'mid' | 'high';

const getIncomeBand = (income: number): IncomeBand => {
  if (income < 30_000_000) return 'low';
  if (income <= 70_000_000) return 'mid';
  return 'high';
};

const monthlyPlanByBand: Record<IncomeBand, { conservative: number; taxFocused: number }> = {
  low: { conservative: 50_000, taxFocused: 150_000 },
  mid: { conservative: 80_000, taxFocused: 220_000 },
  high: { conservative: 100_000, taxFocused: 300_000 }
};

const formatKrw = (value: number): string => `${Math.round(value / 10_000)}만원`;

export const getRecommendations = ({
  income,
  isWorker,
  hasPension,
  highCardSpend
}: RecommendInput): RecommendResult => {
  const band = getIncomeBand(income);
  const monthly = monthlyPlanByBand[band];

  const toneByBand: Record<IncomeBand, string> = {
    low: '올해는 무리한 납입보다 누락 방지와 기본 공제 점검이 더 중요합니다.',
    mid: '연금계좌 중심으로 페이스를 잡으면 체감 절세 가능성이 높아집니다.',
    high: '연금계좌 납입 페이스를 강하게 가져가되 현금흐름을 함께 관리하는 전략이 유리합니다.'
  };

  const cardCashBullets = [
    highCardSpend
      ? '소비를 더 늘리기보다 현금영수증/영수증 누락 방지에 집중하세요.'
      : '고정지출 결제수단을 한 번 정리해 공제 누락 가능성을 줄이세요.',
    '이번 달 안에 홈택스 현금영수증 발급수단 등록 여부를 확인하세요.',
    '연말 직전에 결제 몰아쓰기보다 월별 분산 사용이 관리에 유리합니다.'
  ];

  const pensionBullets = hasPension
    ? [
        '이미 연금저축/IRP를 하고 있다면 자동이체 금액과 납입일을 먼저 점검하세요.',
        '남은 개월 수를 기준으로 월 납입 페이스를 재설정하세요.',
        '월 납입 후 생활비 압박이 생기면 즉시 보수적 플랜으로 낮추세요.'
      ]
    : [
        '연금저축 또는 IRP 중 하나부터 소액 자동이체로 시작해 습관을 만드세요.',
        '이번 달에 계좌 개설 후 다음 달부터 자동이체를 켜두는 흐름이 가장 간단합니다.',
        '한 번에 크게 넣기보다 월별 분할 납입이 부담을 줄입니다.'
      ];

  const pensionRationaleByBand: Record<IncomeBand, string> = {
    low: '소득 구간상 큰 절세 체감이 제한적일 수 있어도, 소액 자동이체로 습관을 만들면 내년 계획이 쉬워집니다.',
    mid: '중간 소득 구간은 연금계좌를 통한 절세 체감을 노리기 좋은 편이라 월 자동이체 전략이 효과적입니다.',
    high: '높은 소득 구간은 연금계좌 활용 우선순위가 더 높아질 수 있어, 납입 페이스 점검의 가치가 큽니다.'
  };

  const isaBullets = [
    'ISA는 단기 절세보다 중장기 자금 통장으로 접근하세요.',
    '입출금 여유자금 범위 안에서만 월 납입을 설정하세요.',
    highCardSpend
      ? '소비가 큰 달엔 ISA 납입을 줄이고, 고정비가 낮은 달에 늘리는 방식이 현실적입니다.'
      : '월급일 다음날 소액 자동이체로 시작하면 지속성이 높아집니다.'
  ];

  const workerNote = isWorker
    ? '근로소득 기준 체크리스트를 중심으로 추천했습니다.'
    : '근로소득 외 소득 구조는 공제 항목이 달라질 수 있어 세부 확인이 필요합니다.';

  return {
    tone: `${toneByBand[band]} ${workerNote}`,
    cards: [
      {
        id: 'card-cash',
        title: '카드/현금 전략',
        icon: '💳',
        bullets: cardCashBullets,
        monthlyGuide: {
          conservative: `보수적 플랜: 추가 소비 유도 없이 증빙 관리에 집중`,
          taxFocused: `절세형 플랜: 월 지출 리뷰 시간을 2회 확보해 누락 가능성 최소화`
        },
        rationale: [
          '카드 사용액 자체를 인위적으로 늘리는 전략은 효율이 떨어질 수 있어, 누락 방지 중심이 안전합니다.',
          '증빙 정리와 결제수단 점검만으로도 실수 비용을 줄이는 데 도움이 됩니다.'
        ]
      },
      {
        id: 'pension-irp',
        title: '연금저축/IRP 전략',
        icon: '🏦',
        bullets: pensionBullets,
        monthlyGuide: {
          conservative: `보수적 플랜: 월 ${formatKrw(monthly.conservative)} 자동이체`,
          taxFocused: `절세형 플랜: 월 ${formatKrw(monthly.taxFocused)} 자동이체`
        },
        rationale: [
          pensionRationaleByBand[band],
          '개인 현금흐름을 우선하며 무리하지 않는 범위에서 조정하는 것이 핵심입니다.'
        ]
      },
      {
        id: 'isa',
        title: 'ISA 전략',
        icon: '📈',
        bullets: isaBullets,
        monthlyGuide: {
          conservative: `보수적 플랜: 월 ${formatKrw(Math.round(monthly.conservative * 0.6))} 적립`,
          taxFocused: `절세형 플랜: 월 ${formatKrw(Math.round(monthly.taxFocused * 0.7))} 적립`
        },
        rationale: [
          'ISA는 즉시 환급액 계산보다 자산 형성 흐름을 유지하는 데 의미가 있습니다.',
          '연말정산 대비와 장기 투자 루틴을 동시에 고려할 수 있는 보조 축으로 활용하세요.'
        ]
      }
    ],
    todayTodos: [
      '홈택스에서 현금영수증 발급수단 등록 상태 확인하기',
      '연금저축/IRP 자동이체 금액과 이체일 캘린더에 등록하기',
      '이번 달 고정지출 결제수단 3개만 먼저 점검하기'
    ]
  };
};
