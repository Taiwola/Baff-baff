'use client'

import React, { ReactNode, useState } from 'react'
import { Input, Select, SelectItem, Textarea } from '@heroui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

type BaseProps = {
  name: string
  label?: string
  value?: string | number
  placeholder?: string
  onChange?: (val: string) => void
  endContent?: string | ReactNode
  startContent?: string | ReactNode
  disabled?: boolean
  error?: string
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
  error
}: Props) {
  const id = React.useId()
  const [showPassword, setShowPassword] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const currentError = isTyping ? undefined : error


  const normalizedValue = value != null ? String(value) : ''

  const endContentComponent =
    typeof endContent === 'string' ? (
      <span className="text-xs text-black/70 pr-2">{endContent}</span>
    ) : (
      endContent
    )

  const startContentComponent =
    typeof startContent === 'string' ? (
      <span className="text-xs text-black/70 pr-2">{startContent}</span>
    ) : (
      startContent
    )

  const labelContent = label ? (
    <label htmlFor={id} className={`text-sm font-medium ${currentError ? "text-red-600" : "text-black"}`}>
      {label}
    </label>
  ) : null

  const handleChange = (val: string) => {
    // Clear internal error when user types
    setIsTyping(true) // user started typing → hide error
    onChange?.(val)
  }

  let inputContent: ReactNode = null

  const borderClass = currentError
    ? 'border-red-500'
    : 'border-black/50'

  const textClass = currentError
    ? 'text-red-600 placeholder:text-red-300'
    : 'text-black placeholder:text-brand-dark/40'

  if (type === 'select') {
    inputContent = (
      <Select
        id={id}
        name={name}
        defaultSelectedKeys={normalizedValue ? [normalizedValue] : []}
        onChange={(e) => handleChange(e.target.value)}
        classNames={{
          trigger: `border ${borderClass} rounded-md py-5 px-2.5 w-full text-sm ${textClass} min-h-[40px] flex items-center justify-between`,
          listbox:
            'border border-foreground rounded-md bg-light text-black text-sm py-2 w-full',
          listboxWrapper: 'w-full',
          selectorIcon:
            'absolute right-3 text-brand-dark w-5 h-5 pointer-events-none',
        }}
      >
        {options!.map((opt, idx) => (
          <SelectItem
            key={opt.key}
            textValue={opt.label}
            className={`${
              options!.length - 1 === idx ? 'border-none' : 'border-b border-foreground'
            }`}
          >
            {opt.label}
          </SelectItem>
        ))}
      </Select>
    )
  } else if (type === 'textarea') {
    inputContent = (
      <Textarea
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        disableAutosize
        defaultValue={normalizedValue}
        onChange={(e) => handleChange(e.target.value)}
        endContent={endContentComponent}
        startContent={startContentComponent}
        classNames={{
          inputWrapper: `border ${borderClass} rounded-md w-full ${
            disabled ? 'bg-[#EDECEC]' : ''
          }`,
          input: `outline-none p-2 ${textClass}`,
        }}
      />
    )
  } else {
    const isPassword = type === 'password'
    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type

    const passwordToggle = isPassword && (
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="icon-button focus:outline-none"
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
        type={resolvedType}
        placeholder={placeholder}
        disabled={disabled}
        value={normalizedValue}
        onChange={(e) => handleChange(e.target.value)}
        classNames={{
          inputWrapper: `border ${borderClass} rounded-md w-full ${
            disabled ? 'bg-[#EDECEC]' : ''
          }`,
          input: `outline-none p-2 ${textClass}`,
        }}
        endContent={isPassword ? passwordToggle : endContentComponent}
        startContent={startContentComponent}
      />
    )
  }

  return (
    <div className="flex flex-col gap-1 w-full h-auto">
      {labelContent}
      {inputContent}
      {currentError && <span className="text-xs text-red-500">{currentError}</span>}
    </div>
  )
}