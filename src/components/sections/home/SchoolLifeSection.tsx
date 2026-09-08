import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ImageFrame } from '@/components/cards/ImageFrame';
import { Button } from '@/components/buttons/Button';
import { schoolLifeTiles } from '@/data/homepage';

export function SchoolLifeSection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Student Life"
          title="School Life"
          description="Learning extends far beyond the classroom. Our students grow through sports, arts, faith, and community."
          align="center"
          className="mb-10"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {schoolLifeTiles.map((tile, i) => (
            <ImageFrame
              key={i}
              label={tile.label}
              aspect={tile.aspect}
              className="h-full"
            />
          ))}
        </div>
        <div className="text-center">
          <Button as="link" to="/gallery" variant="outline" size="md">
            Explore Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
