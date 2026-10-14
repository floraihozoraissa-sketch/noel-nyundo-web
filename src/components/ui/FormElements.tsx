import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, LabelHTMLAttributes } from 'react'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode
  htmlFor: string
}

export function Label({ children, htmlFor, className = '', ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-school-navy mb-1.5 ${className}`.trim()}
      {...props}
    >
      {children}
    </label>
  )
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  hint?: string
}

export function Input({ label, error, hint, id, className = '', ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`

  return (
    <div className="w-full">
      <Label htmlFor={inputId}>{label}</Label>
      <input
        id={inputId}
        className={`w-full rounded-md border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-2 focus:outline-offset-2 ${
          error
            ? 'border-red-500 focus:outline-red-500'
            : 'border-slate-300 focus:outline-school-gold'
        } ${className}`.trim()}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-sm text-slate-500">
          {hint}
        </p>
      )}
    </div>
  )
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
  hint?: string
}

export function Textarea({ label, error, hint, id, className = '', ...props }: TextareaProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`

  return (
    <div className="w-full">
      <Label htmlFor={inputId}>{label}</Label>
      <textarea
        id={inputId}
        className={`w-full rounded-md border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-2 focus:outline-offset-2 resize-y min-h-[100px] ${
          error
            ? 'border-red-500 focus:outline-red-500'
            : 'border-slate-300 focus:outline-school-gold'
        } ${className}`.trim()}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-sm text-slate-500">
          {hint}
        </p>
      )}
    </div>
  )
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
  hint?: string
  options: { value: string; label: string }[]
}

export function Select({ label, error, hint, options, id, className = '', ...props }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  const errorId = `${selectId}-error`
  const hintId = `${selectId}-hint`

  return (
    <div className="w-full">
      <Label htmlFor={selectId}>{label}</Label>
      <select
        id={selectId}
        className={`w-full rounded-md border px-3 py-2.5 text-sm text-slate-900 bg-white transition-colors focus:outline-2 focus:outline-offset-2 appearance-none ${
          error
            ? 'border-red-500 focus:outline-red-500'
            : 'border-slate-300 focus:outline-school-gold'
        } ${className}`.trim()}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-sm text-slate-500">
          {hint}
        </p>
      )}
    </div>
  )
}

type FileUploadProps = {
  label: string
  accept: string
  maxSizeMB: number
  multiple?: boolean
  value: File[]
  onChange: (files: File[], errors?: string[]) => void
  error?: string
  hint?: string
  required?: boolean
  id?: string
}

export function FileUpload({ label, accept, maxSizeMB, multiple = false, value, onChange, error, hint, required, id }: FileUploadProps) {
  const inputId = id ?? `file-upload-${label.toLowerCase().replace(/\s+/g, '-')}`
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const validFiles: File[] = []
    const errors: string[] = []

    for (const file of files) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        errors.push(`${file.name} exceeds ${maxSizeMB}MB limit`)
        continue
      }
      const acceptedTypes = accept.split(',').map(t => t.trim())
      const isValidType = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.slice(0, -1))
        }
        return file.type === type
      })
      if (!isValidType) {
        errors.push(`${file.name} has an invalid file type`)
        continue
      }
      validFiles.push(file)
    }

    if (errors.length > 0) {
      // Errors will be surfaced via the error prop on next render
      console.warn('File upload validation errors:', errors)
    }

    onChange([...value, ...validFiles], errors)
  }

  const removeFile = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full">
      <Label htmlFor={inputId}>{label} {required && <span className="text-red-500" aria-hidden="true">*</span>}</Label>
      <div className="mt-1">
        <input
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={handleChange}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          aria-invalid={error ? 'true' : 'false'}
        />
        <button
          type="button"
          onClick={() => document.getElementById(inputId)?.click()}
          className={`w-full flex items-center justify-center gap-3 rounded-md border-2 border-dashed p-4 text-center transition-colors ${
            error
              ? 'border-red-500 bg-red-50 text-red-700'
              : 'border-slate-300 hover:border-school-gold hover:bg-school-gold/5'
          }`}
          aria-label={`Upload ${label}`}
        >
          <svg className="size-8 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm text-slate-600">
            {value.length > 0
              ? `${value.length} file${value.length > 1 ? 's' : ''} selected`
              : 'Click to upload or drag and drop'}
          </span>
        </button>
      </div>

      {value.length > 0 && (
        <ul className="mt-3 space-y-2" role="list" aria-label="Selected files">
          {value.map((file, index) => (
            <li key={`${file.name}-${index}`} className="flex items-center justify-between rounded-md bg-slate-50 p-2.5">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <svg className="size-5 text-slate-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
                <span className="text-sm text-slate-700 truncate">{file.name}</span>
                <span className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
                aria-label={`Remove ${file.name}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-sm text-slate-500">
          {hint}
        </p>
      )}
    </div>
  )
}

type FieldsetProps = {
  children: React.ReactNode
  legend: string
  className?: string
}

export function Fieldset({ children, legend, className = '' }: FieldsetProps) {
  return (
    <fieldset className={`${className}`.trim()}>
      <legend className="text-lg font-semibold text-school-navy mb-4 pb-2 border-b border-slate-200">
        {legend}
      </legend>
      <div className="space-y-4">{children}</div>
    </fieldset>
  )
}