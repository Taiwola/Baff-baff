import { notFound } from 'next/navigation'
import { PencilIcon } from '@heroicons/react/24/outline'

import { verifySession } from '@lib/dal'
import { getUser } from '@actions/users.action'

import { Button } from '@components/ui'

export default async function ProfileSection() {
   const session = await verifySession()
   if (!session) return notFound()

   const user = await getUser(session.userId)
   if (!user) return notFound()

   return (
      <section className="mx-auto w-full md:max-w-[85%] flex flex-col gap-8 justify-center items-start font-montserrat border border-foreground rounded-xl p-6 relative">
         {/* Edit Icon */}
         <Button as={'link'} href={'/profile/edit'} variant='bordered' className="absolute top-4 right-4 cursor-pointer flex justify-between items-center gap-2.5 rounded-[48px] font-bold">
            <span>Edit</span>
            <PencilIcon className="w-6 h-6 text-brand-dark hover:opacity-70" />
         </Button>

         {/* Key / Value rows */}
         <div className="w-full flex flex-col gap-4">
            <Row label="First Name" value={user.firstName} />
            <Row label="Last Name" value={user.lastName} />
            <Row label="Email Address" value={user.email} />
            <Row label="Gender" value={user.gender || ''} />
            <Row label="Phone Number" value={user.phoneNumber || ''} />
         </div>
      </section>
   )
}

function Row({ label, value }: { label: string; value: string }) {
   return (
      <div className="grid grid-cols-2 w-full">
         <span className="text-sm font-medium text-gray-600">{label}</span>
         <span className="text-base text-black">{value}</span>
      </div>
   )
}
