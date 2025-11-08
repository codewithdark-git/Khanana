'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Image as ImageIcon, Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  label?: string
  className?: string
  aspectRatio?: number
  disabled?: boolean
  accept?: Record<string, string[]>
  maxSize?: number
}

const DEFAULT_ACCEPT = {
  'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.avif']
}

export function ImageUpload({
  value,
  onChange,
  label = 'Upload Image',
  className = '',
  aspectRatio = 1,
  disabled = false,
  accept = DEFAULT_ACCEPT,
  maxSize = 5 * 1024 * 1024, // 5MB
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null)
      
      // Handle rejected files
      if (rejectedFiles?.length) {
        const { errors } = rejectedFiles[0]
        if (errors[0]?.code === 'file-too-large') {
          setError('File is too large. Max size is 5MB.')
        } else if (errors[0]?.code === 'file-invalid-type') {
          setError('Invalid file type. Please upload an image.')
        } else {
          setError('Error uploading file. Please try again.')
        }
        return
      }

      const file = acceptedFiles[0]
      if (!file) return

      // Check file size
      if (file.size > maxSize) {
        setError(`File is too large. Max size is ${maxSize / 1024 / 1024}MB.`)
        return
      }

      setIsUploading(true)
      
      // In a real app, you would upload the file to your server here
      // and get back a URL. For now, we'll just create a local URL.
      const fileUrl = URL.createObjectURL(file)
      
      // Simulate upload
      setTimeout(() => {
        setPreview(fileUrl)
        onChange(fileUrl)
        setIsUploading(false)
      }, 1000)
    },
    [onChange, maxSize]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    multiple: false,
    maxSize,
    disabled: disabled || isUploading,
  })

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview(null)
    setError(null)
    onChange('')
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-4 transition-colors',
          isDragActive ? 'border-accent bg-accent/10' : 'border-muted-foreground/20',
          (isUploading || disabled) && 'opacity-70 pointer-events-none',
          'cursor-pointer',
          error && 'border-destructive/50',
          'relative'
        )}
        style={{
          aspectRatio: aspectRatio.toString(),
        }}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative w-full h-full rounded overflow-hidden group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {!disabled && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                aria-label="Remove image"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            {isUploading ? (
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-10 h-10 mb-2 bg-muted rounded-full flex items-center justify-center">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 mb-2 bg-muted rounded-full flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Object.values(accept)
                    .flat()
                    .map((ext) => ext.toUpperCase().replace('.', ''))
                    .join(', ')}{' '}
                  (max. {maxSize / 1024 / 1024}MB)
                </p>
              </>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
