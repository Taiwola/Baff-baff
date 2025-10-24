"use client"

import Form from "next/form"
import React, { useState } from "react"
import { SearchIcon, XIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { Input } from "@components/ui"
import Button from "@components/ui/Button"

type Props = {
   action: string
   replace?: boolean
   placeholder?: string
   label?: string
   showButton?: boolean
}

export default function Search({ action, placeholder, label, replace = true, showButton = false }: Props) {
   const router = useRouter()
   const pathname = usePathname()
   const [query, setQuery] = useState("")

   function handleClear() {
      setQuery('')
      router.replace(pathname)
   }

   function handleChange(value: string) {
      setQuery(value)
      if (value === "") {
         router.replace(pathname)
      }
   }

   const endContent = (
      <button
         type="button"
         onClick={handleClear}
         className="icon-buttton"
      >
         <XIcon
            className="w-4 h-4 mr-1 text-brand-dark"
         />
      </button>
   )

   return (
      <Form action={action} replace={replace} className="flex items-center gap-2">
         <Input
            name="query"
            value={query}
            placeholder={placeholder}
            aria-label={label}
            onChange={(e) => handleChange(e)}
            startContent={<SearchIcon className="w-5 h-5 text-gray-400" />}
            endContent={query ? endContent : null}
         />

         {showButton && (
            <Button type="submit" variant="filled" size="sm" rounded="md">
               Search
            </Button>
         )}
      </Form>
   )
}
