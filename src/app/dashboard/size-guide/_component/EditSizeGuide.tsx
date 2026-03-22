'use client'

import React, { useActionState, useEffect, useMemo } from 'react'
import { useToast } from '@hooks/useToast'

import SizeGuideForm from './SizeGuideForm'
import SizeGuideFormModal from './SizeGuideFormModal'
import { upsertSizeGuide } from '@actions/size-guide.actions'
import { UpsertSizeGuideFormState } from '@validations/size-guide'
import { useRouter } from 'next/navigation'

type Props = {
  guide: SizeGuide
  isOpen: boolean
  onOpenChange: () => void
}

export default function EditSizeGuide({ guide, isOpen, onOpenChange }: Props) {
  const toast = useToast()
  const router = useRouter()

  const initialState: UpsertSizeGuideFormState = useMemo(
    () => ({
      errors: {},
      error: '',
      values: {
        gender: guide.gender,
        entries: guide.entries
      }
    }),
    [guide]
  )

  const [{ error, errors, values, success }, action, pending] = useActionState(upsertSizeGuide, initialState)


  useEffect(() => {
    if (error) toast.error({ description: error })
  }, [toast, error])

   useEffect(() => {
    if (success) {
      toast.success({ description: `${guide.gender === 'women' ? "Women's" : "Men's"} size guide updated successfully.` })
      router.refresh()
      onOpenChange()
    }
  }, [success, toast, guide.gender, onOpenChange])

  return (
    <SizeGuideFormModal title={`Edit ${guide.gender === 'women' ? "Women's" : "Men's"} Size Guide`} isOpen={isOpen} onOpenChange={onOpenChange}>
      <SizeGuideForm errors={errors} gender={guide.gender} initialState={values ?? initialState.values} pending={pending} action={action} />
    </SizeGuideFormModal>
  )
}
