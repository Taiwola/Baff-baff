'use client'

import { useState, useEffect } from 'react'

export function CountdownOverlay() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isTimerActive, setIsTimerActive] = useState(true)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth()
      
      // Calculate target date (March 15 of next month)
      let targetYear = currentYear
      let targetMonth = currentMonth + 1 // Next month
      
      if (targetMonth > 11) {
        targetMonth = 0 // January
        targetYear += 1
      }
      
      const targetDate = new Date(targetYear, targetMonth, 15)
      
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        setIsTimerActive(false)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Prevent body scroll when timer is active
  useEffect(() => {
    if (isTimerActive) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isTimerActive])

  if (!isTimerActive) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Blurred Background Overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/40" />
      
      {/* Countdown Modal */}
      <div className="relative h-full flex items-center justify-center">
        <div className="bg-white rounded-none border-2 border-black p-8 md:p-12 max-w-3xl w-full mx-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 uppercase tracking-wider">
              Coming Soon
            </h2>
            <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
            <p className="text-gray-600 mb-8 text-lg font-light">
              Something amazing is on its way. Stay tuned!
            </p>
            
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              <div className="text-center">
                <div className="bg-black border-2 border-black p-4 md:p-6">
                  <span className="text-3xl md:text-5xl font-mono font-bold text-white">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs md:text-sm font-medium text-black uppercase tracking-wider mt-3 block">
                  Days
                </span>
              </div>
              
              <div className="text-center">
                <div className="bg-black border-2 border-black p-4 md:p-6">
                  <span className="text-3xl md:text-5xl font-mono font-bold text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs md:text-sm font-medium text-black uppercase tracking-wider mt-3 block">
                  Hours
                </span>
              </div>
              
              <div className="text-center">
                <div className="bg-black border-2 border-black p-4 md:p-6">
                  <span className="text-3xl md:text-5xl font-mono font-bold text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs md:text-sm font-medium text-black uppercase tracking-wider mt-3 block">
                  Minutes
                </span>
              </div>
              
              <div className="text-center">
                <div className="bg-black border-2 border-black p-4 md:p-6">
                  <span className="text-3xl md:text-5xl font-mono font-bold text-white">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs md:text-sm font-medium text-black uppercase tracking-wider mt-3 block">
                  Seconds
                </span>
              </div>
            </div>
            
            <div className="border-t-2 border-gray-200 mt-8 pt-6">
              <p className="text-black font-mono text-sm">
                We&apos;ll be back on <span className="font-bold">March 15th</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}