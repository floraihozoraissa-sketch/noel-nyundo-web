import type { ChangeEvent, FormEvent } from 'react'
import { Fieldset, Input, Select, Textarea } from '../../../components/ui/FormElements'

type StudentInfo = {
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  gender: string
  nationality: string
  religion: string
  currentSchool: string
  currentClass: string
  applyingForClass: string
  residentialAddress: string
}

type StudentInfoStepProps = {
  data: StudentInfo
  onChange: (field: keyof StudentInfo, value: string) => void
  errors: Partial<Record<keyof StudentInfo, string>>
  onSubmit: (e: FormEvent) => void
}

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

const CLASS_OPTIONS = [
  { value: 'n1', label: 'Nursery 1 (N1)' },
  { value: 'n2', label: 'Nursery 2 (N2)' },
  { value: 'n3', label: 'Nursery 3 (N3)' },
  { value: 'p1', label: 'Primary 1 (P1)' },
  { value: 'p2', label: 'Primary 2 (P2)' },
  { value: 'p3', label: 'Primary 3 (P3)' },
  { value: 'p4', label: 'Primary 4 (P4)' },
  { value: 'p5', label: 'Primary 5 (P5)' },
  { value: 'p6', label: 'Primary 6 (P6)' },
]

const NATIONALITY_OPTIONS = [
  { value: 'rwandan', label: 'Rwandan' },
  { value: 'other', label: 'Other' },
]

const RELIGION_OPTIONS = [
  { value: 'catholic', label: 'Catholic' },
  { value: 'protestant', label: 'Protestant' },
  { value: 'muslim', label: 'Muslim' },
  { value: 'other', label: 'Other' },
  { value: 'none', label: 'None / Prefer not to say' },
]

export function StudentInfoStep({ data, onChange, errors, onSubmit }: StudentInfoStepProps) {
  const handleChange = (field: keyof StudentInfo) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onChange(field, e.target.value)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <Fieldset legend="Personal Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input
            label="First Name *"
            value={data.firstName}
            onChange={handleChange('firstName')}
            error={errors.firstName}
            required
            autoComplete="given-name"
          />
          <Input
            label="Middle Name"
            value={data.middleName}
            onChange={handleChange('middleName')}
            error={errors.middleName}
            autoComplete="additional-name"
          />
          <Input
            label="Last Name *"
            value={data.lastName}
            onChange={handleChange('lastName')}
            error={errors.lastName}
            required
            autoComplete="family-name"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Date of Birth *"
            type="date"
            value={data.dateOfBirth}
            onChange={handleChange('dateOfBirth')}
            error={errors.dateOfBirth}
            required
            max={new Date().toISOString().split('T')[0]}
            autoComplete="bday"
          />
          <Select
            label="Gender *"
            value={data.gender}
            onChange={handleChange('gender')}
            error={errors.gender}
            options={GENDER_OPTIONS}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Select
            label="Nationality *"
            value={data.nationality}
            onChange={handleChange('nationality')}
            error={errors.nationality}
            options={NATIONALITY_OPTIONS}
            required
          />
          <Select
            label="Religion"
            value={data.religion}
            onChange={handleChange('religion')}
            error={errors.religion}
            options={RELIGION_OPTIONS}
          />
        </div>
      </Fieldset>

      <Fieldset legend="Academic Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Current School"
            value={data.currentSchool}
            onChange={handleChange('currentSchool')}
            error={errors.currentSchool}
            placeholder="Name of current/previous school"
            autoComplete="organization"
          />
          <Select
            label="Current Class"
            value={data.currentClass}
            onChange={handleChange('currentClass')}
            error={errors.currentClass}
            options={CLASS_OPTIONS}
          />
        </div>

        <Select
          label="Applying for Class *"
          value={data.applyingForClass}
          onChange={handleChange('applyingForClass')}
          error={errors.applyingForClass}
          options={CLASS_OPTIONS}
          required
        />
      </Fieldset>

      <Fieldset legend="Contact Information">
        <Textarea
          label="Residential Address *"
          value={data.residentialAddress}
          onChange={handleChange('residentialAddress')}
          error={errors.residentialAddress}
          placeholder="Physical address where the student resides"
          required
          rows={3}
        />
      </Fieldset>

      <p className="text-sm text-slate-500">
        * Required fields. All information provided will be kept confidential and used solely for admission purposes.
      </p>
    </form>
  )
}