type SectionHeadingProps = {
  title: string
  description?: string
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-school-navy sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          {description}
        </p>
      )}
    </div>
  )
}
