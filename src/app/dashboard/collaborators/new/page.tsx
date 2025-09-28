import { Button, Input } from '@components/ui'
import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import { AddImage } from '../_components'
import { Instagram, Twitter, Facebook, Music2 } from "lucide-react"

export default function AddNewCollaboratorPage() {
   async function handleSubmit() {
      'use server'
   }


   return (
      <div className="w-full h-auto">
         <form className='w-full h-auto' action={handleSubmit}>
            <div className='w-full flex justify-between items-start'>
               <Button as={'link'} href={'/dashboard/collaborators'} className='bg-transparent text-brand-dark p-0 hover:p-2 hover:text-white gap-5 font-bold'>
                  <ArrowLeftIcon className='w-5 h-5' />
                  <span className='font-bold'>Add Collaborator</span>
               </Button>

               <Button
                  size='sm'
                  type='submit'
                  rounded='sm'
                  className='text-sm'
               >
                  Save
               </Button>
            </div>

            <hr className='border border-brand-dark/40 my-5' />

            <section className='w-full rounded-xl px-5 pt-2.5 pb-10 bg-white'>
               <div className='w-full'>
                  <h6 className='text-sm text-brand-dark/40 mb-2.5 uppercase'>Collaborator</h6>
                  <hr className='border border-brand-dark/40 mb-5' />
                  <AddImage />
                  <div className='w-3/5 mt-7.5'>
                     <Input label='NAME' name='name' />
                  </div>
               </div>

               <div className='w-full mt-7.5'>
                  <h6 className='text-sm text-brand-dark/40 mb-2.5'>SOCIALS</h6>
                  <hr className='border border-brand-dark/40 mb-5' />

                  <div className="grid grid-cols-4 gap-5">
                     <div className="flex flex-col justify-start items-start">
                        <label htmlFor="instagram" className="flex items-center gap-1 text-brand-dark text-sm">
                           <Instagram className="w-[14px] h-[14px]" />
                           <span>Instagram</span>
                        </label>
                        <Input name="instagram" placeholder="Enter Handle" />
                     </div>

                     <div className="flex flex-col justify-start items-start">
                        <label htmlFor="x" className="flex items-center gap-1 text-brand-dark text-sm">
                           <Twitter className="w-[14px] h-[14px]" />
                           <span>X</span>
                        </label>
                        <Input name="x" placeholder="Enter Handle" />
                     </div>

                     <div className="flex flex-col justify-start items-start">
                        <label htmlFor="facebook" className="flex items-center gap-1 text-brand-dark text-sm">
                           <Facebook className="w-[14px] h-[14px]" />
                           <span>Facebook</span>
                        </label>
                        <Input name="facebook" placeholder="Enter Handle" />
                     </div>

                     <div className="flex flex-col justify-start items-start">
                        <label htmlFor="tiktok" className="flex items-center gap-1 text-brand-dark text-sm">
                           <Music2 className="w-[14px] h-[14px]" />
                           <span>TikTok</span>
                        </label>
                        <Input name="tiktok" placeholder="Enter Handle" />
                     </div>
                  </div>
               </div>
            </section>

            {/* 

             
               

        
               <div className='w-full mt-7.5'>
                  <h6 className='text-sm text-brand-dark/40 mb-2.5'>PRODUCT DETAILS</h6>
                  <hr className='border border-brand-dark/40 mb-5' />

                  <div className='grid grid-cols-3 gap-5 w-full'>
                     <Input
                        label='CATEGORY'
                        name='category'
                        type='select'
                        options={[]}
                     />
                     <Input
                        label='MATERIAL'
                        name='material'
                        type='select'
                        options={[]}
                     />
                     <Input
                        label='PRODUCT NAME'
                        name='name'
                     />
                     <Input
                        label='YARD ALLOCATION'
                        name='yard'
                     />
                  </div>
               </div>

               <div className='w-full mt-7.5'>
                  <h6 className='text-sm text-brand-dark/40 mb-2.5'>SIZE</h6>
                  <hr className='border border-brand-dark/40 mb-5' />

                  <div className='grid grid-cols-2 gap-5 mb-5'>
                     <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
                     <Input name='price' label='Price' placeholder='NGN' />
                  </div>

                  <div className='grid grid-cols-2 gap-5 mb-5'>
                     <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
                     <Input name='price' label='Price' placeholder='NGN' />
                  </div>

                  <div className='grid grid-cols-2 gap-5 mb-5'>
                     <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
                     <Input name='price' label='Price' placeholder='NGN' />
                  </div>

                  <div className='grid grid-cols-2 gap-5 mb-5'>
                     <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
                     <Input name='price' label='Price' placeholder='NGN' />
                  </div>

                  <div className='grid grid-cols-2 gap-5 mb-5'>
                     <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
                     <Input name='price' label='Price' placeholder='NGN' />
                  </div>

                  <div className='grid grid-cols-2 gap-5 mb-5'>
                     <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
                     <Input name='price' label='Price' placeholder='NGN' />
                  </div>

                  <div className='grid grid-cols-2 gap-5'>
                     <Input name='small' label='QUANTITY (SIZE : SMALL)' placeholder='Enter Quantity' />
                     <Input name='price' label='Price' placeholder='NGN' />
                  </div>
               </div>

       
               <div className='w-full mt-7.5'>
                  <h6 className='text-sm text-brand-dark/40 mb-2.5'>PRODUCT DESCRIPTION</h6>
                  <hr className='border border-brand-dark/40 mb-5' />

                  <Input type='textarea' name='description' />
               </div>
            </section> */}
         </form>
      </div>
   )
}
