
import { useState, type FormEvent, type ChangeEvent } from 'react'
import { PageContainer } from '../../components/ui/PageContainer'
import { Input, Textarea, Select } from '../../components/ui/FormElements'
import { Button } from '../../components/ui/Button'
import { Check, AlertCircle } from 'lucide-react'
import { submitContactMessage } from '../../services/contactApi'

type ContactFormProps = {
  title: string
  description: string
  subjects: { value: string; label: string }[]
  submitLabel: string
  submittingLabel: string
  successTitle: string
  successDescription: string
  errorTitle: string
  errorDescription: string
  backendAvailable: boolean
  placeholder?: boolean
}

type FormData = {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

export function ContactFormSection({
  title,
  description,
  subjects,
  submitLabel,
  submittingLabel,
  successTitle,
  successDescription,
  errorTitle,
  errorDescription,
  backendAvailable,
  placeholder,
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')

  const [submissionError, setSubmissionError] = useState('')

  const validate = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {}

    if (!data.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (data.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must contain at least 2 characters'
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
    ) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (data.phone.trim().length > 30) {
      newErrors.phone = 'Phone number must not exceed 30 characters'
    }

    if (!data.subject.trim()) {
      newErrors.subject = 'Please select a subject'
    }

    if (!data.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (data.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (data.message.trim().length > 5000) {
      newErrors.message = 'Message must not exceed 5000 characters'
    }

    return newErrors
  }

  const handleChange =
    (field: keyof FormData) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value,
      }))

      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: undefined,
        }))
      }
    }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const newErrors = validate(formData)

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (!backendAvailable) {
      setSubmissionError(
        'The contact service is currently unavailable. Please try again later.'
      )
      setStatus('error')
      return
    }

    setStatus('submitting')
    setSubmissionError('')

    try {
      await submitContactMessage({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
      })

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })

      setErrors({})
      setStatus('success')
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : 'Unable to send your message. Please try again.'
      )

      setStatus('error')
    }
  }

  const handleDismiss = () => {
    setStatus('idle')
    setSubmissionError('')
  }

  if (status === 'success') {
    return (
      <section
        aria-label="Contact form result"
        className="bg-white py-16 sm:py-20"
        id="contact-form"
      >
        <PageContainer>
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Check className="size-8" aria-hidden="true" />
            </div>

            <h2 className="text-3xl font-bold text-school-navy sm:text-4xl">
              {successTitle}
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              {successDescription}
            </p>

            <Button
              type="button"
              onClick={handleDismiss}
              className="mt-8"
            >
              Send Another Message
            </Button>
          </div>
        </PageContainer>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section
        aria-label="Contact form error"
        className="bg-white py-16 sm:py-20"
        id="contact-form"
      >
        <PageContainer>
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertCircle className="size-8" aria-hidden="true" />
            </div>

            <h2 className="text-3xl font-bold text-school-navy sm:text-4xl">
              {errorTitle}
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              {submissionError || errorDescription}
            </p>

            <Button
              type="button"
              onClick={handleDismiss}
              className="mt-8"
            >
              Try Again
            </Button>
          </div>
        </PageContainer>
      </section>
    )
  }

  return (
    <section
      aria-label="Contact form"
      className="bg-white py-16 sm:py-20"
      id="contact-form"
    >
      <PageContainer>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight text-school-navy">
              {title}
            </h2>

            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              {description}
            </p>

            {placeholder && (
              <p className="mt-4 inline-block text-[10px] uppercase tracking-wide text-amber-600">
                Unverified placeholder
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                label="Full Name *"
                value={formData.fullName}
                onChange={handleChange('fullName')}
                error={errors.fullName}
                required
                autoComplete="name"
                placeholder="Your full name"
              />

              <Input
                label="Email Address *"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                error={errors.email}
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>

            <Input
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={handleChange('phone')}
              error={errors.phone}
              autoComplete="tel"
              placeholder="+250 XXX XXX XXX"
            />

            <Select
              label="Subject *"
              value={formData.subject}
              onChange={handleChange('subject')}
              error={errors.subject}
              options={subjects}
              required
            />

            <Textarea
              label="Message *"
              value={formData.message}
              onChange={handleChange('message')}
              error={errors.message}
              required
              rows={5}
              placeholder="Tell us how we can help you..."
            />

            <Button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full sm:w-auto"
            >
              {status === 'submitting' ? submittingLabel : submitLabel}
            </Button>
          </form>
        </div>
      </PageContainer>
    </section>
  )
}
