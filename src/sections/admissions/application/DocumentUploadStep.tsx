import type { FormEvent } from 'react'
import { Fieldset, FileUpload } from '../../../components/ui/FormElements'

type DocumentUploads = {
  birthCertificate: File[]
  previousSchoolReport: File[]
  immunizationRecord: File[]
  passportPhotos: File[]
  baptismCertificate: File[]
  parentId: File[]
  transferCertificate: File[]
}

type DocumentUploadStepProps = {
  data: DocumentUploads
  onChange: (field: keyof DocumentUploads, files: File[]) => void
  errors: Partial<Record<keyof DocumentUploads, string>>
  onSubmit: (e: FormEvent) => void
  applyingForClass: string
}

const DOCUMENT_CONFIG = {
  birthCertificate: {
    label: 'Birth Certificate *',
    accept: 'application/pdf,image/jpeg,image/png',
    maxSizeMB: 5,
    required: true,
    hint: 'Official birth certificate showing date of birth',
  },
  previousSchoolReport: {
    label: 'Previous School Report / Transcript *',
    accept: 'application/pdf,image/jpeg,image/png',
    maxSizeMB: 5,
    required: true,
    hint: 'Most recent academic report or transcript from previous school',
  },
  immunizationRecord: {
    label: 'Immunization Record *',
    accept: 'application/pdf,image/jpeg,image/png',
    maxSizeMB: 5,
    required: true,
    hint: 'Up-to-date vaccination/immunization record',
  },
  passportPhotos: {
    label: 'Passport Photos (2 recent) *',
    accept: 'image/jpeg,image/png',
    maxSizeMB: 2,
    required: true,
    hint: 'Two recent passport-sized photographs (white background)',
    multiple: true,
  },
  baptismCertificate: {
    label: 'Baptism Certificate (Catholic applicants)',
    accept: 'application/pdf,image/jpeg,image/png',
    maxSizeMB: 5,
    required: false,
    hint: 'Required for Catholic applicants only',
  },
  parentId: {
    label: 'Parent/Guardian ID Copy *',
    accept: 'application/pdf,image/jpeg,image/png',
    maxSizeMB: 5,
    required: true,
    hint: 'Valid national ID or passport of parent/guardian',
  },
  transferCertificate: {
    label: 'Transfer Certificate (P2-P6 only)',
    accept: 'application/pdf,image/jpeg,image/png',
    maxSizeMB: 5,
    required: false,
    hint: 'Required for students applying to Primary 2 and above',
  },
} as const

const PRIMARY_CLASSES = ['p2', 'p3', 'p4', 'p5', 'p6']

export function DocumentUploadStep({ data, onChange, errors, onSubmit, applyingForClass }: DocumentUploadStepProps) {
  const handleChange = (field: keyof DocumentUploads) => (files: File[]) => {
    onChange(field, files)
  }

  const isPrimaryClass = applyingForClass && PRIMARY_CLASSES.includes(applyingForClass)

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
        <h3 className="text-lg font-semibold text-school-navy mb-2">Required Documents</h3>
        <p className="text-sm text-slate-600 mb-4">
          Please upload clear, legible copies of the following documents. Maximum file size: 5MB per document (2MB for photos).
          Accepted formats: PDF, JPEG, PNG. {applyingForClass && isPrimaryClass && <span className="text-school-gold font-medium">*Transfer certificate required for Primary 2+ applicants.</span>}
        </p>
      </div>

      <Fieldset legend="Mandatory Documents">
        <div className="space-y-6">
          <FileUpload
            {...DOCUMENT_CONFIG.birthCertificate}
            value={data.birthCertificate}
            onChange={handleChange('birthCertificate')}
            error={errors.birthCertificate}
          />

          <FileUpload
            {...DOCUMENT_CONFIG.previousSchoolReport}
            value={data.previousSchoolReport}
            onChange={handleChange('previousSchoolReport')}
            error={errors.previousSchoolReport}
          />

          <FileUpload
            {...DOCUMENT_CONFIG.immunizationRecord}
            value={data.immunizationRecord}
            onChange={handleChange('immunizationRecord')}
            error={errors.immunizationRecord}
          />

          <FileUpload
            {...DOCUMENT_CONFIG.passportPhotos}
            value={data.passportPhotos}
            onChange={handleChange('passportPhotos')}
            error={errors.passportPhotos}
          />

          <FileUpload
            {...DOCUMENT_CONFIG.parentId}
            value={data.parentId}
            onChange={handleChange('parentId')}
            error={errors.parentId}
          />
        </div>
      </Fieldset>

      <Fieldset legend="Conditional Documents">
        <div className="space-y-6">
          <FileUpload
            {...DOCUMENT_CONFIG.baptismCertificate}
            value={data.baptismCertificate}
            onChange={handleChange('baptismCertificate')}
            error={errors.baptismCertificate}
          />

          <FileUpload
            {...DOCUMENT_CONFIG.transferCertificate}
            value={data.transferCertificate}
            onChange={handleChange('transferCertificate')}
            error={errors.transferCertificate}
          />
        </div>
      </Fieldset>

      <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
        <h4 className="font-medium text-amber-900 mb-2">Document Requirements Notice</h4>
        <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
          <li>All documents must be clear, complete, and legible.</li>
          <li>Certified copies are preferred for official documents.</li>
          <li>Incomplete applications will not be processed.</li>
          <li>Original documents must be presented for verification upon admission.</li>
          <li className="text-amber-600"><strong>Unverified placeholder:</strong> Specific document requirements should be confirmed with the school administration.</li>
        </ul>
      </div>
    </form>
  )
}