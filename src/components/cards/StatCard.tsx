import type { StatItem } from '@/data/homepage';

type StatCardProps = StatItem;

export function StatCard({ value, label, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 px-5 py-6 text-center shadow-card">
      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary-50 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary-700" />
      </div>
      <p className="text-h2 text-primary-900 leading-none mb-1.5">{value}</p>
      <p className="text-small text-neutral-500 font-medium">{label}</p>
    </div>
  );
}
