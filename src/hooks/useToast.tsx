"use client"

import Lottie from "lottie-react"
import { useCallback } from "react"
import { toast as hotToast, ToastOptions } from 'react-hot-toast'

import errorAnimation from '@lib/failed-task.json'
import successAnimation from '@lib/success-animation.json'

interface ToastContentProps {
   title?: string
   description?: string
}


export function useToast() {
   const success = useCallback((data: ToastContentProps, options?: ToastOptions) => {
      toast.success(data, options)
   }, [])

   const error = useCallback((data: ToastContentProps, options?: ToastOptions) => {
      toast.error(data, options)
   }, [])

   return { success, error }
}

export const toast = {
   success: ({ title, description }: ToastContentProps, options?: ToastOptions) =>
      hotToast.custom(
         <div
            className="
          font-lexend
          flex items-center gap-4
          bg-white text-brand-purple
          border border-brand-purple
          px-5 py-3
          rounded-xl shadow-lg
          w-full max-w-xl mx-auto
          relative overflow-hidden
        "
            style={{ zIndex: 9999 }}
         >
            {/* Purple accent stripe */}
            <span className="absolute left-0 top-0 bottom-0 w-2 rounded-l-xl bg-brand-purple"></span>

            {/* Lottie Icon */}
            <Lottie
               animationData={successAnimation}
               loop
               style={{ width: 80, height: 80 }}
            />

            {/* Text content */}
            <div className="flex flex-col ml-2">
               <span className="text-lg font-semibold">{title}</span>
               {description && <span className="text-sm font-medium text-gray-600">{description}</span>}
            </div>
         </div>,
         {
            position: 'top-center',
            duration: 4000,
            ...options,
         }
      ),

   error: ({ title = 'An Error Occured', description }: ToastContentProps, options?: ToastOptions) =>
      hotToast.custom(
         <div
            className="
          font-lexend
          flex items-center gap-4
          bg-white text-red-600
          border border-red-600
          px-5 py-3
          rounded-xl shadow-lg
          w-full max-w-xl mx-auto
          relative overflow-hidden
        "
            style={{ zIndex: 9999 }}
         >
            {/* Purple accent stripe */}
            <span className="absolute left-0 top-0 bottom-0 w-2 rounded-l-xl bg-brand-purple"></span>

            {/* Lottie Icon */}
            <Lottie
               animationData={errorAnimation}
               loop
               style={{ width: 80, height: 80 }}
            />

            {/* Text content */}
            <div className="flex flex-col ml-2">
               <span className="text-lg font-semibold">{title}</span>
               {description && <span className="text-sm font-medium text-gray-600">{description}</span>}
            </div>
         </div>,
         {
            position: 'top-center',
            duration: 5000,
            ...options,
         }
      ),
}

