'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { Input, Select, SelectItem, Textarea } from '@heroui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

type BaseProps = {
  name: string
  label?: string
  value?: string | number | null
  placeholder?: string
  onChange?: (val: string) => void
  endContent?: string | ReactNode
  startContent?: string | ReactNode
  disabled?: boolean
  error?: string
  isClearable?: boolean
}

type TextOrNumberProps = BaseProps & {
  type?: 'text' | 'number' | 'email' | 'password' | 'textarea'
  options?: never
}

type SelectProps = BaseProps & {
  type: 'select'
  options: { key: string; label: string }[]
}

type Props = TextOrNumberProps | SelectProps

export default function DynamicInput({
  name,
  label,
  type = 'text',
  options,
  value,
  placeholder,
  onChange,
  endContent,
  startContent,
  disabled,
  error,
  isClearable
}: Props) {
  const id = React.useId()
  const normalizedValue = value != null ? String(value) : ''

  const [currentError, setCurrentError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(!!value)
  const [selectValue, setSelectValue] = useState(normalizedValue)

  useEffect(() => {
    if (error) setCurrentError(error)
  }, [error])


  const handleChange = (val: string) => {
    onChange?.(val)
    setSelectValue(val)
    const filled = val.trim().length > 0
    setIsFilled(filled)
    if (filled) setCurrentError('')
  }


  const hasError = !!currentError && !isFocused && !isFilled

  const borderClass = hasError
    ? 'border-red-500'
    : isFocused
      ? 'border-brand-dark shadow-[0_0_0_2px_rgba(0,0,0,0.05)]'
      : 'border-black/40'

  const bgClass = disabled
    ? 'bg-[#EDECEC]'
    : isFocused
      ? 'bg-white'
      : isFilled
        ? 'bg-[#fafafa]'
        : 'bg-transparent'

  const textClass = hasError
    ? 'text-red-600 placeholder:text-red-300'
    : 'text-black placeholder:text-brand-dark/40'


  const commonHandlers = {
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  }


  // End / Start Content normalization
  const renderContent = (content?: string | ReactNode, position?: 'start' | 'end') => {
    if (!content) return null
    return typeof content === 'string' ? (
      <span className={`text-xs text-black/70 ${position === 'end' ? 'pr-2' : 'pl-2'}`}>
        {content}
      </span>
    ) : (
      content
    )
  }

  // Floating label effect
  const labelContent = label && (
    <label
      htmlFor={id}
      className={`
        text-xs font-medium transition-all duration-200 
        ${isFocused || isFilled ? 'text-brand-dark' : currentError ? 'text-red-600' : 'text-black'}
      `}
    >
      {label}
    </label>
  )

  let inputContent: ReactNode = null

  // SELECT INPUT
  if (type === 'select' && options) {
    inputContent = (
      <Select
        id={id}
        name={name}
        aria-label={name}
        isDisabled={disabled}
        isClearable={isClearable}
        selectedKeys={selectValue && options.length ? [selectValue] : []}
        onSelectionChange={(keys) => handleChange(String(Array.from(keys)[0]))}
        {...commonHandlers}
        classNames={{
          trigger: `
          border ${borderClass} ${bgClass} rounded-md py-5 px-2.5 w-full text-sm ${textClass}
          transition-all duration-200 ease-in-out
          ${hasError ? '' : 'hover:border-brand-dark/70'}
          data-[open=true]:scale-[1.02]
        `,
          listbox: `
          border-foreground rounded-md bg-light text-black text-sm py-2 w-full 
          animate-fadeIn max-h-[250px] overflow-y-auto p-0
        `,
          listboxWrapper: 'w-full',
          selectorIcon: `
          ${hasError ? 'text-red-500' : isFocused ? 'text-brand-dark' : 'text-brand-dark/70'}
          absolute right-3 w-5 h-5 pointer-events-none
          transition-transform duration-200 data-[open=true]:rotate-180
        `
        }}
        renderValue={(items) => {
          const selected = items?.[0]
          return selected ? (
            <span className="text-black text-sm">{selected.textValue}</span>
          ) : (
            <span className="text-brand-dark/40 text-sm">{placeholder}</span>
          )
        }}
      >
        {options.map((opt, idx) => (
          <SelectItem
            key={opt.key}
            textValue={opt.label}
            className={`
            ${options.length - 1 === idx ? 'border-none' : 'border-b border-foreground'}
            py-2 px-3 cursor-pointer transition-all duration-150
            hover:bg-foreground data-[selected=true]:bg-brand-dark/10
          `}
          >
            {opt.label}
          </SelectItem>
        ))}
      </Select>
    )
  }

  // TEXTAREA INPUT
  else if (type === 'textarea') {
    inputContent = (
      <Textarea
        id={id}
        name={name}
        aria-label={name}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={normalizedValue}
        onChange={(e) => handleChange(e.target.value)}
        {...commonHandlers}
        startContent={renderContent(startContent, 'start')}
        endContent={renderContent(endContent, 'end')}
        classNames={{
          inputWrapper: `
            border ${borderClass} ${bgClass} rounded-md w-full p-0 resize-none
            transition-all duration-200 ease-in-out
            ${hasError ? '' : 'hover:border-brand-dark/70'}
          `,
          input: `outline-none ${textClass} h-full p-2`
        }}
      />
    )
  }

  // TEXT / NUMBER / EMAIL / PASSWORD INPUT
  else {
    const isPassword = type === 'password'
    const resolvedType = isPassword && showPassword ? 'text' : type

    const passwordToggle = isPassword && (
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="focus:outline-none transition-transform duration-200 hover:scale-110"
      >
        {showPassword ? (
          <EyeSlashIcon className="text-[#B5B5B5] w-6 h-6" />
        ) : (
          <EyeIcon className="text-[#B5B5B5] w-6 h-6" />
        )}
      </button>
    )

    inputContent = (
      <Input
        id={id}
        name={name}
        aria-label={name}
        type={resolvedType}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={normalizedValue}
        onChange={(e) => handleChange(e.target.value)}
        {...commonHandlers}
        startContent={renderContent(startContent, 'start')}
        endContent={isPassword ? passwordToggle : renderContent(endContent, 'end')}
        classNames={{
          inputWrapper: `
            border ${borderClass} ${bgClass} rounded-md w-full transition-all duration-200 ease-in-out
            ${hasError ? '' : 'hover:border-brand-dark/70'} hover:bg-[#f9f9f9]
          `,
          input: `outline-none p-2 ${textClass}`
        }}
      />
    )
  }

  return (
    <div className="flex flex-col gap-1 w-full h-auto transition-all duration-300">
      {labelContent}
      {inputContent}
      {hasError && <span className="text-xs text-red-500">{currentError}</span>}
    </div>
  )
}