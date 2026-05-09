type ProgressBarProps = {
  label: string;
  value: number;
};

export function ProgressBar({ label, value }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="motion-reveal-up rounded-[16px] bg-white px-3 py-3 shadow-[0_8px_22px_rgba(92,116,164,0.12)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6e7f9f]">{label}</p>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#e8eefb]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#6e95ff] to-[#5e83e8] transition-all duration-500"
          style={{ width: `${clampedValue}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
