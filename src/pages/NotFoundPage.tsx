import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/sections/Section';
import { Button } from '@/components/buttons/Button';

export function NotFoundPage() {
  return (
    <Section background="default" className="py-20 md:py-30">
      <Container width="narrow">
        <div className="text-center">
          <p className="font-serif text-display text-primary-700 mb-4">404</p>
          <h1 className="text-h2 text-neutral-900 mb-4">Page Not Found</h1>
          <p className="text-body-lg text-neutral-600 mb-8 max-w-md mx-auto">
            The page you are looking for may have been moved or no longer exists.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button as="link" to="/" size="md">
              Return Home
            </Button>
            <Link
              to="/contact"
              className="text-body font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
