import type { StatItem } from '@/data/homepage';

type StatCardProps = StatItem;

export function StatCard({ value, label, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 px-4 py-5 text-center shadow-soft">
      <div className="w-9 h-9 mx-auto mb-3 rounded-lg bg-primary-50 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary-700" />
      </div>
      <p className="text-h3 text-primary-900 leading-none mb-1">{value}</p>
      <p className="text-caption text-neutral-500 font-medium">{label}</p>
    </div>
  );
}
