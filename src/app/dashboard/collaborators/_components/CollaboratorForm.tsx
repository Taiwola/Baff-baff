'use client'

import { ArrowLeftIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { SiFacebook, SiInstagram, SiTiktok, SiX } from "react-icons/si";

import { Button, ImageInput, Input } from '@components/ui'
import { UpdateCollaboratorValues } from '@validations/collaborators';
import { useRouter } from 'next/navigation';

interface Props {
   type?: 'create' | 'edit'
   pending: boolean
   initialState: UpdateCollaboratorValues
   errors: Partial<Record<keyof UpdateCollaboratorValues, string | undefined>>
   action: (payload: FormData) => void
}

export default function CollaboratorForm({ type = 'create', pending, initialState, errors, action }: Props) {
   const router = useRouter()
   const fileInputRef = useRef<HTMLInputElement>(null)
   const [image, setImage] = useState(initialState.image);

   function handleImageClick() {
      fileInputRef.current?.click()
   }

   function handleDelete() {
      setImage('')
   }

   function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (!event.target.files?.length) return
      setImage(event.target.files[0])
   }

   return (
      <form className='w-full h-auto' action={action}>
         <div className='w-full flex justify-between items-start'>
            <Button as={'button'} onClick={() => router.back()} className='bg-transparent text-brand-dark p-0 hover:p-2 hover:text-white gap-5 font-bold'>
               <ArrowLeftIcon className='w-5 h-5' />
               <span className='font-bold'>{type === 'create' ? 'Add Collaborator' : 'Edit Collaborator'}</span>
            </Button>

            <Button
               size='sm'
               type='submit'
               rounded='sm'
               className='text-sm'
            >
               {pending ? 'Saving...' : 'Save'}
            </Button>
         </div>

         <hr className='border border-brand-dark/40 my-5' />

         <section className='w-full rounded-xl px-5 pt-2.5 pb-10 bg-white'>
            <div className='w-full'>
               <h6 className='text-sm text-brand-dark/40 mb-2.5 uppercase'>Collaborator</h6>
               <hr className='border border-brand-dark/40 mb-5' />
               <ImageInput
                  ref={fileInputRef}
                  name='image'
                  accept="image/*"
                  image={image}
                  onClick={handleImageClick}
                  onChange={handleChange}
                  onDelete={handleDelete}
               />
               {errors.image && <span className="text-xs text-red-500">{errors.image}</span>}

               <div className='w-full md:w-3/5 mt-7.5'>
                  <Input
                     label='NAME'
                     name='name'
                     value={initialState.name}
                     error={errors.name}
                  />
               </div>
            </div>

            <div className='w-full mt-7.5'>
               <h6 className='text-sm text-brand-dark/40 mb-2.5'>SOCIALS</h6>
               <hr className='border border-brand-dark/40 mb-5' />

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="flex flex-col justify-start items-start">
                     <label htmlFor="instagram" className="flex items-center gap-1 text-brand-dark text-sm">
                        <SiInstagram className="w-[14px] h-[14px]" />
                        <span>Instagram</span>
                     </label>

                     <Input
                        name="instagram"
                        placeholder="Enter Handle"
                        value={initialState.instagram}
                        error={errors.instagram}
                     />
                  </div>

                  <div className="flex flex-col justify-start items-start">
                     <label htmlFor="x" className="flex items-center gap-1 text-brand-dark text-sm">
                        <SiX className="w-[14px] h-[14px]" />
                        <span>X</span>
                     </label>

                     <Input
                        name="x"
                        placeholder="Enter Handle"
                        value={initialState.x}
                        error={errors.x}
                     />
                  </div>

                  <div className="flex flex-col justify-start items-start">
                     <label htmlFor="facebook" className="flex items-center gap-1 text-brand-dark text-sm">
                        <SiFacebook className="w-[14px] h-[14px]" />
                        <span>Facebook</span>
                     </label>

                     <Input
                        name="facebook"
                        placeholder="Enter Handle"
                        value={initialState.facebook}
                        error={errors.facebook}
                     />
                  </div>

                  <div className="flex flex-col justify-start items-start">
                     <label htmlFor="tiktok" className="flex items-center gap-1 text-brand-dark text-sm">
                        <SiTiktok className="w-[14px] h-[14px]" />
                        <span>TikTok</span>
                     </label>

                     <Input
                        name="tikTok"
                        placeholder="Enter Handle"
                        value={initialState.tikTok}
                        error={errors.tikTok}
                     />
                  </div>
               </div>
            </div>
         </section>
      </form>
   )
}
