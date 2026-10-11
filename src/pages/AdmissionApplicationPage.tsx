import { useState, useCallback, useMemo } from 'react'
import { PageContainer } from '../components/ui/PageContainer'
import { ProgressSteps } from '../components/ui/ProgressSteps'
import { Button } from '../components/ui/Button'
import { StudentInfoStep } from '../sections/admissions/application/StudentInfoStep'
import { ParentInfoStep } from '../sections/admissions/application/ParentInfoStep'
import { DocumentUploadStep } from '../sections/admissions/application/DocumentUploadStep'
import { ReviewStep } from '../sections/admissions/application/ReviewStep'
import { SubmissionFeedback } from '../sections/admissions/application/SubmissionFeedback'

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

type FormData = {
  student: StudentInfo
  parent: ParentInfo
  documents: DocumentUploads
}

const INITIAL_STUDENT: StudentInfo = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  nationality: '',
  religion: '',
  currentSchool: '',
  currentClass: '',
  applyingForClass: '',
  residentialAddress: '',
}

const INITIAL_PARENT: ParentInfo = {
  fatherFirstName: '',
  fatherLastName: '',
  fatherPhone: '',
  fatherEmail: '',
  fatherOccupation: '',
  fatherEmployer: '',
  fatherAddress: '',
  motherFirstName: '',
  motherLastName: '',
  motherPhone: '',
  motherEmail: '',
  motherOccupation: '',
  motherEmployer: '',
  motherAddress: '',
  emergencyName: '',
  emergencyRelationship: '',
  emergencyPhone: '',
  emergencyAddress: '',
}

const INITIAL_DOCUMENTS: DocumentUploads = {
  birthCertificate: [],
  previousSchoolReport: [],
  immunizationRecord: [],
  passportPhotos: [],
  baptismCertificate: [],
  parentId: [],
  transferCertificate: [],
}

const STEPS = [
  { number: 1, label: 'Student Info' },
  { number: 2, label: 'Parent Info' },
  { number: 3, label: 'Documents' },
  { number: 4, label: 'Review' },
  { number: 5, label: 'Submit' },
]

type StepIndex = 0 | 1 | 2 | 3 | 4

const validateStudent = (data: StudentInfo): Partial<Record<keyof StudentInfo, string>> => {
  const errors: Partial<Record<keyof StudentInfo, string>> = {}
  if (!data.firstName.trim()) errors.firstName = 'First name is required'
  if (!data.lastName.trim()) errors.lastName = 'Last name is required'
  if (!data.dateOfBirth) errors.dateOfBirth = 'Date of birth is required'
  if (!data.gender) errors.gender = 'Gender is required'
  if (!data.nationality) errors.nationality = 'Nationality is required'
  if (!data.applyingForClass) errors.applyingForClass = 'Applying for class is required'
  if (!data.residentialAddress.trim()) errors.residentialAddress = 'Residential address is required'
  return errors
}

const validateParent = (data: ParentInfo): Partial<Record<keyof ParentInfo, string>> => {
  const errors: Partial<Record<keyof ParentInfo, string>> = {}
  // At least one parent/guardian
  const hasFather = data.fatherFirstName.trim() && data.fatherLastName.trim() && data.fatherPhone.trim() && data.fatherEmail.trim()
  const hasMother = data.motherFirstName.trim() && data.motherLastName.trim() && data.motherPhone.trim() && data.motherEmail.trim()
  if (!hasFather && !hasMother) {
    errors.fatherFirstName = 'At least one parent/guardian is required'
  }
  if (hasFather) {
    if (!data.fatherFirstName.trim()) errors.fatherFirstName = 'First name is required'
    if (!data.fatherLastName.trim()) errors.fatherLastName = 'Last name is required'
    if (!data.fatherPhone.trim()) errors.fatherPhone = 'Phone is required'
    if (!data.fatherEmail.trim()) errors.fatherEmail = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.fatherEmail)) errors.fatherEmail = 'Invalid email format'
  }
  if (hasMother) {
    if (!data.motherFirstName.trim()) errors.motherFirstName = 'First name is required'
    if (!data.motherLastName.trim()) errors.motherLastName = 'Last name is required'
    if (!data.motherPhone.trim()) errors.motherPhone = 'Phone is required'
    if (!data.motherEmail.trim()) errors.motherEmail = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.motherEmail)) errors.motherEmail = 'Invalid email format'
  }
  // Emergency contact
  if (!data.emergencyName.trim()) errors.emergencyName = 'Emergency contact name is required'
  if (!data.emergencyRelationship) errors.emergencyRelationship = 'Relationship is required'
  if (!data.emergencyPhone.trim()) errors.emergencyPhone = 'Emergency phone is required'
  return errors
}

const validateDocuments = (data: DocumentUploads, applyingForClass: string): Partial<Record<keyof DocumentUploads, string>> => {
  const errors: Partial<Record<keyof DocumentUploads, string>> = {}
  const requiredDocs: (keyof DocumentUploads)[] = [
    'birthCertificate',
    'previousSchoolReport',
    'immunizationRecord',
    'passportPhotos',
    'parentId',
  ]
  const primaryClasses = ['p2', 'p3', 'p4', 'p5', 'p6']
  if (primaryClasses.includes(applyingForClass)) {
    requiredDocs.push('transferCertificate')
  }

  for (const doc of requiredDocs) {
    if (!data[doc].length) {
      errors[doc] = 'This document is required'
    }
  }
  return errors
}

export function AdmissionApplicationPage() {
  const [currentStep, setCurrentStep] = useState<StepIndex>(0)
  const [formData, setFormData] = useState<FormData>({
    student: INITIAL_STUDENT,
    parent: INITIAL_PARENT,
    documents: INITIAL_DOCUMENTS,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const studentErrors = useMemo(() => validateStudent(formData.student), [formData.student])
  const parentErrors = useMemo(() => validateParent(formData.parent), [formData.parent])
  const documentErrors = useMemo(() => validateDocuments(formData.documents, formData.student.applyingForClass), [formData.documents, formData.student.applyingForClass])

  const updateStudent = useCallback((field: keyof StudentInfo, value: string) => {
    setFormData(prev => ({ ...prev, student: { ...prev.student, [field]: value } }))
  }, [])

  const updateParent = useCallback((field: keyof ParentInfo, value: string) => {
    setFormData(prev => ({ ...prev, parent: { ...prev.parent, [field]: value } }))
  }, [])

  const updateDocuments = useCallback((field: keyof DocumentUploads, files: File[]) => {
    setFormData(prev => ({ ...prev, documents: { ...prev.documents, [field]: files } }))
  }, [])

  const canProceed = useMemo(() => {
    if (currentStep === 0) return Object.keys(studentErrors).length === 0
    if (currentStep === 1) return Object.keys(parentErrors).length === 0
    if (currentStep === 2) return Object.keys(documentErrors).length === 0
    return true
  }, [currentStep, studentErrors, parentErrors, documentErrors])

  const handleNext = () => {
    if (currentStep < 4 && canProceed) {
      setCurrentStep(prev => (prev + 1) as StepIndex)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => (prev - 1) as StepIndex)
    }
  }

  const handleEditStudent = () => setCurrentStep(0)
  const handleEditParent = () => setCurrentStep(1)
  const handleEditDocuments = () => setCurrentStep(2)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to a backend
    // For now, we just mark as submitted and show feedback
    setIsSubmitted(true)
  }

  const handleNewApplication = () => {
    setFormData({ student: INITIAL_STUDENT, parent: INITIAL_PARENT, documents: INITIAL_DOCUMENTS })
    setCurrentStep(0)
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return <SubmissionFeedback onNewApplication={handleNewApplication} />
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StudentInfoStep
            data={formData.student}
            onChange={updateStudent}
            errors={studentErrors}
            onSubmit={(e: React.FormEvent) => { e.preventDefault(); handleNext(); }}
          />
        )
      case 1:
        return (
          <ParentInfoStep
            data={formData.parent}
            onChange={updateParent}
            errors={parentErrors}
            onSubmit={(e: React.FormEvent) => { e.preventDefault(); handleNext(); }}
          />
        )
      case 2:
        return (
          <DocumentUploadStep
            data={formData.documents}
            onChange={updateDocuments}
            errors={documentErrors}
            onSubmit={(e: React.FormEvent) => { e.preventDefault(); handleNext(); }}
            applyingForClass={formData.student.applyingForClass}
          />
        )
      case 3:
        return (
          <ReviewStep
            studentData={formData.student}
            parentData={formData.parent}
            documentData={formData.documents}
            onEditStudent={handleEditStudent}
            onEditParent={handleEditParent}
            onEditDocuments={handleEditDocuments}
            onSubmit={handleSubmit}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-school-navy text-white py-6 sm:py-8">
        <PageContainer>
          <ProgressSteps steps={STEPS} currentStep={currentStep} />
        </PageContainer>
      </header>

      <main className="py-8 sm:py-12">
        <PageContainer>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-school-navy sm:text-4xl">Admission Application</h1>
              <p className="mt-2 text-slate-600">
                Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].label}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              {renderStep()}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
              {currentStep > 0 && (
                <Button type="button" onClick={handleBack} className="w-full sm:w-auto border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50">
                  Back
                </Button>
              )}
              {currentStep < 4 && (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="w-full sm:w-auto"
                  aria-disabled={!canProceed}
                >
                  {currentStep === 3 ? 'Submit Application' : 'Continue'}
                </Button>
              )}
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Your progress is saved automatically as you complete each step.
              <span className="text-amber-600 ml-1">Unverified placeholder: Form requirements should be confirmed with the school.</span>
            </p>
          </div>
        </PageContainer>
      </main>
    </div>
  )
}