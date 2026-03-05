type AdSlotProps = {
  label: string;
  size?: 'banner' | 'rectangle';
};

export default function AdSlot({ label, size = 'banner' }: AdSlotProps) {
  const heightClass = size === 'banner' ? 'h-[90px]' : 'h-[250px]';

  return (
    <div
      className={`w-full ${heightClass} rounded-xl border border-dashed border-slate-300 bg-slate-100 text-slate-500 flex items-center justify-center text-sm`}
      role="complementary"
      aria-label={label}
    >
      광고 영역 Placeholder · {label}
    </div>
  );
}
