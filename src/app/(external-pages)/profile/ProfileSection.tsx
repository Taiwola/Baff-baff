'use client'
import { Button } from '@components/ui'
import { PencilIcon } from '@heroicons/react/24/outline'

type ProfileDetails = {
   firstName: string
   lastName: string
   email: string
   gender: string
   phoneNumber: string
}

const profile: ProfileDetails = {
   firstName: 'John',
   lastName: 'Doe',
   email: 'john.doe@example.com',
   gender: 'Male',
   phoneNumber: '+44 123 456 7890',
}

export default function ProfileSection() {

   return (
      <section className="mx-auto w-full md:max-w-[85%] flex flex-col gap-8 justify-center items-start font-montserrat border border-foreground rounded-xl p-6 relative">
         {/* Edit Icon */}
         <Button as={'link'} href={'/profile/edit'} variant='bordered' className="absolute top-4 right-4 cursor-pointer flex justify-between items-center gap-2.5 rounded-[48px] font-bold">
            <span>Edit</span>
            <PencilIcon className="w-6 h-6 text-brand-dark hover:opacity-70" />
         </Button>

         {/* Key / Value rows */}
         <div className="w-full flex flex-col gap-4">
            <Row label="First Name" value={profile.firstName} />
            <Row label="Last Name" value={profile.lastName} />
            <Row label="Email Address" value={profile.email} />
            <Row label="Gender" value={profile.gender} />
            <Row label="Phone Number" value={profile.phoneNumber} />
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
