import React from 'react'
import Link from 'next/link'

export default function SettingsPage() {

  async function handleDelete() {
    'use server'
  }

  return (
    <div className='flex flex-col justify-start items-start gap-6 text-sm text-brand-dark'>
      <Link className='text-sm font-normal' href={'/dashboard/settings/manage'}>Manage Admins</Link>
      <Link className='text-sm font-normal' href={'/dashboard/settings/change-password'}>Change Password</Link>
      <form action={handleDelete}>
        <button className='text-danger text-sm' type='submit'>Delete Account</button>
      </form>
    </div>
  )
}
