import type { ChangeEvent, FormEvent } from 'react'
import { Fieldset, Input, Select, Textarea } from '../../../components/ui/FormElements'

type ParentInfo = {
  // Father/Guardian 1
  fatherFirstName: string
  fatherLastName: string
  fatherPhone: string
  fatherEmail: string
  fatherOccupation: string
  fatherEmployer: string
  fatherAddress: string

  // Mother/Guardian 2
  motherFirstName: string
  motherLastName: string
  motherPhone: string
  motherEmail: string
  motherOccupation: string
  motherEmployer: string
  motherAddress: string

  // Emergency Contact
  emergencyName: string
  emergencyRelationship: string
  emergencyPhone: string
  emergencyAddress: string
}

type ParentInfoStepProps = {
  data: ParentInfo
  onChange: (field: keyof ParentInfo, value: string) => void
  errors: Partial<Record<keyof ParentInfo, string>>
  onSubmit: (e: FormEvent) => void
}

const RELATIONSHIP_OPTIONS = [
  { value: 'father', label: 'Father' },
  { value: 'mother', label: 'Mother' },
  { value: 'guardian', label: 'Legal Guardian' },
  { value: 'grandparent', label: 'Grandparent' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'other', label: 'Other' },
]

export function ParentInfoStep({ data, onChange, errors, onSubmit }: ParentInfoStepProps) {
  const handleChange = (field: keyof ParentInfo) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onChange(field, e.target.value)
  }

  const renderGuardianSection = (prefix: 'father' | 'mother', title: string) => (
    <Fieldset legend={title} key={prefix}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="First Name *"
          value={data[`${prefix}FirstName` as keyof ParentInfo]}
          onChange={handleChange(`${prefix}FirstName` as keyof ParentInfo)}
          error={errors[`${prefix}FirstName` as keyof ParentInfo]}
          required
          autoComplete={`${prefix === 'father' ? 'given-name' : 'given-name'}`}
        />
        <Input
          label="Last Name *"
          value={data[`${prefix}LastName` as keyof ParentInfo]}
          onChange={handleChange(`${prefix}LastName` as keyof ParentInfo)}
          error={errors[`${prefix}LastName` as keyof ParentInfo]}
          required
          autoComplete={`${prefix === 'father' ? 'family-name' : 'family-name'}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Phone Number *"
          type="tel"
          value={data[`${prefix}Phone` as keyof ParentInfo]}
          onChange={handleChange(`${prefix}Phone` as keyof ParentInfo)}
          error={errors[`${prefix}Phone` as keyof ParentInfo]}
          required
          placeholder="+250 XXX XXX XXX"
          autoComplete="tel"
        />
        <Input
          label="Email Address *"
          type="email"
          value={data[`${prefix}Email` as keyof ParentInfo]}
          onChange={handleChange(`${prefix}Email` as keyof ParentInfo)}
          error={errors[`${prefix}Email` as keyof ParentInfo]}
          required
          placeholder="parent@example.com"
          autoComplete="email"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Occupation"
          value={data[`${prefix}Occupation` as keyof ParentInfo]}
          onChange={handleChange(`${prefix}Occupation` as keyof ParentInfo)}
          error={errors[`${prefix}Occupation` as keyof ParentInfo]}
          placeholder="Job title or profession"
          autoComplete="organization-title"
        />
        <Input
          label="Employer"
          value={data[`${prefix}Employer` as keyof ParentInfo]}
          onChange={handleChange(`${prefix}Employer` as keyof ParentInfo)}
          error={errors[`${prefix}Employer` as keyof ParentInfo]}
          placeholder="Company or organization name"
          autoComplete="organization"
        />
      </div>

      <Textarea
        label="Address (if different from student)"
        value={data[`${prefix}Address` as keyof ParentInfo]}
        onChange={handleChange(`${prefix}Address` as keyof ParentInfo)}
        error={errors[`${prefix}Address` as keyof ParentInfo]}
        placeholder="Physical address"
        rows={2}
      />
    </Fieldset>
  )

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {renderGuardianSection('father', 'Father / Guardian 1')}

      {renderGuardianSection('mother', 'Mother / Guardian 2')}

      <Fieldset legend="Emergency Contact (different from above)">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Full Name *"
            value={data.emergencyName}
            onChange={handleChange('emergencyName')}
            error={errors.emergencyName}
            required
            autoComplete="name"
          />
          <Select
            label="Relationship to Student *"
            value={data.emergencyRelationship}
            onChange={handleChange('emergencyRelationship')}
            error={errors.emergencyRelationship}
            options={RELATIONSHIP_OPTIONS}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Phone Number *"
            type="tel"
            value={data.emergencyPhone}
            onChange={handleChange('emergencyPhone')}
            error={errors.emergencyPhone}
            required
            placeholder="+250 XXX XXX XXX"
            autoComplete="tel"
          />
        </div>

        <Textarea
          label="Address"
          value={data.emergencyAddress}
          onChange={handleChange('emergencyAddress')}
          error={errors.emergencyAddress}
          placeholder="Physical address of emergency contact"
          rows={2}
        />
      </Fieldset>

      <p className="text-sm text-slate-500">
        * Required fields. At least one parent/guardian and an emergency contact are required.
        The school will contact these individuals for official communications and emergencies.
      </p>
    </form>
  )
}