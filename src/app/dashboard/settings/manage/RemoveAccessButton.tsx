'use client'

import { useState } from 'react'
import { useToast } from '@hooks/useToast'
import { updateRole } from '@actions/users.action'
import { useRouter } from 'next/navigation'

export default function RemoveAccessButton({ admin }: { admin: User }) {
   const toast = useToast()
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(false)

   async function handleRemoveAccess() {
      try {
         setIsLoading(true)
         await updateRole(admin, 'user')
         toast.success({ title: 'Success', description: `${admin.fullName}'s admin access removed` })
         router.refresh()
      } catch (err: unknown) {
         toast.error({ title: 'An Error Occured', description: (err as Error)?.message || 'Failed to remove access' })
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <button
         onClick={handleRemoveAccess}
         disabled={isLoading}
         className='text-sm text-danger font-medium disabled:opacity-50 text-button'
      >
         {isLoading ? 'Removing...' : 'Remove Access'}
      </button>
   )
}
