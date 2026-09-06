import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/sections/Section';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { Button } from '@/components/buttons/Button';

type PagePlaceholderProps = {
  title: string;
  eyebrow: string;
  description: string;
  children?: ReactNode;
  showApplyCta?: boolean;
};

export function PagePlaceholder({
  title,
  eyebrow,
  description,
  children,
  showApplyCta = false,
}: PagePlaceholderProps) {
  return (
    <Section background="default" className="py-20 md:py-30">
      <Container width="narrow">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />

        {children && (
          <div className="mt-10">
            <div className="rounded-xl border-2 border-dashed border-neutral-300 bg-white p-8 text-center">
              {children}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button as="link" to="/" variant="outline" size="md">
            Back to Home
          </Button>
          {showApplyCta && (
            <Button as="link" to="/admissions/apply" size="md">
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        <p className="mt-8 text-center text-caption text-neutral-400">
          <Link to="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          {' / '}
          <span className="text-neutral-500">{title}</span>
        </p>
      </Container>
    </Section>
  );
}
