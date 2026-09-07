import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/buttons/Button';
import { ImageFrame } from '@/components/cards/ImageFrame';

export function PurposeSection() {
  return (
    <section className="py-16 md:py-22 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <ImageFrame
              label="[Placeholder for school photo]"
              aspect="tall"
              className="shadow-card"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-4">Our Mission</p>
            <h2 className="text-h2 text-neutral-900 mb-5">
              [Placeholder for a section heading about purpose and prayer]
            </h2>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-5">
              [Placeholder for a paragraph describing how the school leads with
              purpose and prayer, integrating faith into daily life and
              learning.]
            </p>
            <p className="text-body text-neutral-500 leading-relaxed mb-8">
              [Placeholder for a second paragraph with additional detail about
              the school\'s approach to education and character formation.]
            </p>
            <Button as="link" to="/about" variant="outline" size="md">
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
