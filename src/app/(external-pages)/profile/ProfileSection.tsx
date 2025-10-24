import { notFound } from 'next/navigation'

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
         {/* Key / Value rows */}
         <div className="w-full flex flex-col gap-4">
            <Row label="First Name" value={user.firstName} />
            <Row label="Last Name" value={user.lastName} />
            <Row label="Email Address" value={user.email} />
            <Row label="Gender" value={user.gender || ''} />
            <Row label="Phone Number" value={user.phoneNumber || ''} />
         </div>

         <div className="border-t mt-6 pt-4 flex justify-end gap-3 w-full">
            <Button as="link" href="/profile/edit" variant="bordered">Edit Profile</Button>
            <Button as="link" href="/profile/change-password" variant="bordered">Change Password</Button>
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
