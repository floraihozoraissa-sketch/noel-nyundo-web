import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ImageFrame } from '@/components/cards/ImageFrame';

const tiles = [
  { label: '[Placeholder photo label]', aspect: 'wide' as const },
  { label: '[Placeholder photo label]', aspect: 'square' as const },
  { label: '[Placeholder photo label]', aspect: 'square' as const },
  { label: '[Placeholder photo label]', aspect: 'wide' as const },
];

export function SchoolLifeSection() {
  return (
    <section className="py-16 md:py-22 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Student Life"
          title="[Placeholder for student life section heading]"
          description="[Placeholder for a short paragraph about daily life and activities at the school.]"
          align="center"
          className="mb-12"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tiles.map((tile, i) => (
            <ImageFrame
              key={i}
              label={tile.label}
              aspect={tile.aspect}
              className="h-full"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
