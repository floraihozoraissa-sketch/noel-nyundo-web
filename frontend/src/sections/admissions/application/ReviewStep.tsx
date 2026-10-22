import { useState, type FormEvent } from 'react'
import { Card } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'

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

type ParentInfo = {
  fatherFirstName: string
  fatherLastName: string
  fatherPhone: string
  fatherEmail: string
  fatherOccupation: string
  fatherEmployer: string
  fatherAddress: string
  motherFirstName: string
  motherLastName: string
  motherPhone: string
  motherEmail: string
  motherOccupation: string
  motherEmployer: string
  motherAddress: string
  emergencyName: string
  emergencyRelationship: string
  emergencyPhone: string
  emergencyAddress: string
}

type DocumentUploads = {
  birthCertificate: File[]
  previousSchoolReport: File[]
  immunizationRecord: File[]
  passportPhotos: File[]
  baptismCertificate: File[]
  parentId: File[]
  transferCertificate: File[]
}

type ReviewStepProps = {
  studentData: StudentInfo
  parentData: ParentInfo
  documentData: DocumentUploads
  onEditStudent: () => void
  onEditParent: () => void
  onEditDocuments: () => void
  onSubmit: (e: FormEvent) => void
}

const CLASS_LABELS: Record<string, string> = {
  n1: 'Nursery 1 (N1)',
  n2: 'Nursery 2 (N2)',
  n3: 'Nursery 3 (N3)',
  p1: 'Primary 1 (P1)',
  p2: 'Primary 2 (P2)',
  p3: 'Primary 3 (P3)',
  p4: 'Primary 4 (P4)',
  p5: 'Primary 5 (P5)',
  p6: 'Primary 6 (P6)',
}

const GENDER_LABELS: Record<string, string> = {
  male: 'Male',
  female: 'Female',
}

const RELATIONSHIP_LABELS: Record<string, string> = {
  father: 'Father',
  mother: 'Mother',
  guardian: 'Legal Guardian',
  grandparent: 'Grandparent',
  sibling: 'Sibling',
  other: 'Other',
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'Not provided'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
}

const formatFiles = (files: File[]) => {
  if (!files.length) return 'Not uploaded'
  return files.map(f => `${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join(', ')
}

function ReviewSection({ title, children, onEdit, editLabel = 'Edit' }: { title: string; children: React.ReactNode; onEdit: () => void; editLabel?: string }) {
  return (
    <Card className="relative">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-school-navy">{title}</h3>
        <Button
          type="button"
          onClick={onEdit}
          className="text-sm px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          {editLabel}
        </Button>
      </div>
      <div className="space-y-3">{children}</div>
    </Card>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value || value === 'Not provided' || value === 'Not uploaded') return null
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <dt className="text-sm font-medium text-slate-500 w-full sm:w-48 flex-shrink-0">{label}</dt>
      <dd className="text-sm text-slate-900">{value}</dd>
    </div>
  )
}

export function ReviewStep({ studentData, parentData, documentData, onEditStudent, onEditParent, onEditDocuments, onSubmit }: ReviewStepProps) {
  const [declarationAccepted, setDeclarationAccepted] = useState(false)
  const [declarationError, setDeclarationError] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!declarationAccepted) {
      setDeclarationError(true)
      return
    }
    setDeclarationError(false)
    onSubmit(e)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
        <h3 className="font-semibold text-amber-900 mb-2">Application Review</h3>
        <p className="text-sm text-amber-800">
          Please carefully review all information below before completing. You can edit any section by clicking the "Edit" button.
          This is a <strong>frontend prototype</strong> — no data will be sent to the school until a backend is connected.
          Clicking "Complete Application (Demo)" will not send data anywhere; it only demonstrates the flow.
        </p>
      </div>

      <ReviewSection title="Student Information" onEdit={onEditStudent}>
        <ReviewRow label="Full Name" value={`${studentData.firstName} ${studentData.middleName ? studentData.middleName + ' ' : ''}${studentData.lastName}`} />
        <ReviewRow label="Date of Birth" value={formatDate(studentData.dateOfBirth)} />
        <ReviewRow label="Gender" value={GENDER_LABELS[studentData.gender] ?? studentData.gender} />
        <ReviewRow label="Nationality" value={studentData.nationality} />
        <ReviewRow label="Religion" value={studentData.religion} />
        <ReviewRow label="Current School" value={studentData.currentSchool} />
        <ReviewRow label="Current Class" value={CLASS_LABELS[studentData.currentClass] ?? studentData.currentClass} />
        <ReviewRow label="Applying For" value={CLASS_LABELS[studentData.applyingForClass] ?? studentData.applyingForClass} />
        <ReviewRow label="Residential Address" value={studentData.residentialAddress} />
      </ReviewSection>

      <ReviewSection title="Father / Guardian 1" onEdit={onEditParent} editLabel="Edit Parents">
        <ReviewRow label="Full Name" value={`${parentData.fatherFirstName} ${parentData.fatherLastName}`} />
        <ReviewRow label="Phone" value={parentData.fatherPhone} />
        <ReviewRow label="Email" value={parentData.fatherEmail} />
        <ReviewRow label="Occupation" value={parentData.fatherOccupation} />
        <ReviewRow label="Employer" value={parentData.fatherEmployer} />
        <ReviewRow label="Address" value={parentData.fatherAddress} />
      </ReviewSection>

      <ReviewSection title="Mother / Guardian 2" onEdit={onEditParent} editLabel="Edit Parents">
        <ReviewRow label="Full Name" value={`${parentData.motherFirstName} ${parentData.motherLastName}`} />
        <ReviewRow label="Phone" value={parentData.motherPhone} />
        <ReviewRow label="Email" value={parentData.motherEmail} />
        <ReviewRow label="Occupation" value={parentData.motherOccupation} />
        <ReviewRow label="Employer" value={parentData.motherEmployer} />
        <ReviewRow label="Address" value={parentData.motherAddress} />
      </ReviewSection>

      <ReviewSection title="Emergency Contact" onEdit={onEditParent} editLabel="Edit Parents">
        <ReviewRow label="Full Name" value={parentData.emergencyName} />
        <ReviewRow label="Relationship" value={RELATIONSHIP_LABELS[parentData.emergencyRelationship] ?? parentData.emergencyRelationship} />
        <ReviewRow label="Phone" value={parentData.emergencyPhone} />
        <ReviewRow label="Address" value={parentData.emergencyAddress} />
      </ReviewSection>

      <ReviewSection title="Documents" onEdit={onEditDocuments}>
        <ReviewRow label="Birth Certificate" value={formatFiles(documentData.birthCertificate)} />
        <ReviewRow label="Previous School Report" value={formatFiles(documentData.previousSchoolReport)} />
        <ReviewRow label="Immunization Record" value={formatFiles(documentData.immunizationRecord)} />
        <ReviewRow label="Passport Photos" value={formatFiles(documentData.passportPhotos)} />
        <ReviewRow label="Baptism Certificate" value={formatFiles(documentData.baptismCertificate)} />
        <ReviewRow label="Parent/Guardian ID" value={formatFiles(documentData.parentId)} />
        <ReviewRow label="Transfer Certificate" value={formatFiles(documentData.transferCertificate)} />
      </ReviewSection>

      <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
        <h4 className="font-semibold text-slate-900 mb-3">Declaration</h4>
        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
          <li>I declare that all information provided in this application is true and accurate to the best of my knowledge.</li>
          <li>I understand that providing false information may result in the application being rejected or admission being revoked.</li>
          <li>I authorize the school to verify the information provided and contact the references listed.</li>
          <li>I understand this is a frontend prototype — clicking "Complete Application (Demo)" does not send data to the school.</li>
        </ul>
        <label className="flex items-start gap-2 mt-4">
          <input
            type="checkbox"
            checked={declarationAccepted}
            onChange={(e) => {
              setDeclarationAccepted(e.target.checked)
              if (e.target.checked) setDeclarationError(false)
            }}
            className={`mt-1 h-4 w-4 rounded border-slate-300 text-school-gold focus:ring-school-gold ${declarationError ? 'border-red-500' : ''}`}
            aria-describedby="declaration-desc"
            aria-invalid={declarationError}
          />
          <span id="declaration-desc" className="text-sm text-slate-700">
            I agree to the above declaration and confirm all information is correct.
          </span>
        </label>
        {declarationError && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            You must accept the declaration to complete the application.
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button type="button" onClick={onEditDocuments} className="w-full sm:w-auto border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50">
          Back
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          Complete Application (Demo)
        </Button>
      </div>
    </form>
  )
}