'use client'

import React, { useActionState, useEffect, useState } from 'react'
import { useDisclosure } from '@heroui/react'

import { Button } from '@components/ui'
import SizeGuideForm from './SizeGuideForm'
import SizeGuideFormModal from './SizeGuideFormModal'

import { useToast } from '@hooks/useToast'
import { upsertSizeGuide } from '@actions/size-guide.actions'
import { UpsertSizeGuideFormState } from '@validations/size-guide'
import { useRouter } from 'next/navigation'

const initialState: UpsertSizeGuideFormState = {
  errors: {},
  error: '',
  values: { gender: 'women', entries: [] }
}

export default function AddNewSizeGuide() {
  const toast = useToast()
  const router = useRouter()
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  const [gender, setGender] = useState<'men' | 'women'>('women')

  const [{ error, errors, values, success }, action, pending] = useActionState(upsertSizeGuide, initialState)


  useEffect(() => {
    if (error) toast.error({ description: error })
  }, [toast, error])

    useEffect(() => {
    if (success) {
      toast.success({ description: `${gender === 'women' ? "Women's" : "Men's"} size guide saved successfully.` })
      router.refresh()
      onOpenChange()
    }
  }, [success, toast, gender, onOpenChange])

  return (
    <>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="flex border border-[#202020] rounded overflow-hidden">
          {(['women', 'men'] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGender(g)}
              className={`px-4 py-2 text-[10px] font-bold tracking-[0.18em] uppercase transition-all border-none ${
                gender === g ? 'bg-[#202020] text-white' : 'bg-transparent text-[#202020]/40 hover:text-[#202020]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <Button rounded="sm" onClick={onOpen} className="w-full md:w-auto">
          Add / Edit
        </Button>
      </div>

      <SizeGuideFormModal
        title={`${gender === 'women' ? "Women's" : "Men's"} Size Guide`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <SizeGuideForm
          key={gender}                            
          errors={errors}
          gender={gender}                          
          initialState={values}
          pending={pending}
          action={action}
        />
      </SizeGuideFormModal>
    </>
  )
}