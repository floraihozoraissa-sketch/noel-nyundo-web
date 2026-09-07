import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { AnnouncementCard } from '@/components/cards/AnnouncementCard';
import { Button } from '@/components/buttons/Button';

const announcements = [
  {
    date: '[Date]',
    category: '[Category]',
    title: '[Placeholder for announcement title]',
    excerpt:
      '[Placeholder for a short excerpt of the announcement. Replace with real content.]',
    to: '/notices/1',
  },
  {
    date: '[Date]',
    category: '[Category]',
    title: '[Placeholder for announcement title]',
    excerpt:
      '[Placeholder for a short excerpt of the announcement. Replace with real content.]',
    to: '/notices/2',
  },
  {
    date: '[Date]',
    category: '[Category]',
    title: '[Placeholder for announcement title]',
    excerpt:
      '[Placeholder for a short excerpt of the announcement. Replace with real content.]',
    to: '/notices/3',
  },
];

export function AnnouncementsSection() {
  return (
    <section className="py-16 md:py-22 bg-neutral-50">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="News & Notices"
            title="[Placeholder for announcements section heading]"
            description="[Placeholder for a short paragraph about school news and announcements.]"
          />
          <Button as="link" to="/notices" variant="ghost" size="md" className="shrink-0">
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {announcements.map((item) => (
            <AnnouncementCard key={item.to} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
