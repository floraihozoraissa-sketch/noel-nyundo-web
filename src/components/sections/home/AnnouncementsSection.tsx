import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { AnnouncementCard } from '@/components/cards/AnnouncementCard';
import { Button } from '@/components/buttons/Button';
import { homepageAnnouncements } from '@/data/homepage';

export function AnnouncementsSection() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="News & Notices"
            title="Latest Announcements"
            description="Stay informed about the latest news, events, and official communications from the school."
          />
          <Button as="link" to="/notices" variant="ghost" size="md" className="shrink-0">
            View all
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {homepageAnnouncements.slice(0, 6).map((item) => (
            <AnnouncementCard key={item.to} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
