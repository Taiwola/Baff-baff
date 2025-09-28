'use client'

import React, { ReactNode } from 'react'
import { Input, Select, SelectItem, Textarea } from '@heroui/react'

type BaseProps = {
  name: string
  label?: string
  value?: string | number
  placeholder?: string
  onChange?: (val: string) => void
  endContent?: string | ReactNode
  startContent?: string | ReactNode
  disabled?: boolean
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
  disabled
}: Props) {
  const id = React.useId()
  const normalizedValue = value != null ? String(value) : undefined
  const endContentComponent = typeof endContent === 'string' ? (<span className="text-xs text-black/70 pr-2">{endContent}</span>) : endContent
  const startContentComponent = typeof startContent === 'string' ? (<span className="text-xs text-black/70 pr-2">{startContent}</span>) : startContent

  let labelContent = null
  let inputContent = (
    <Input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      defaultValue={normalizedValue}
      onChange={(e) => onChange?.(e.target.value)}
      classNames={{
        inputWrapper:
          `border border-black/50 rounded-md w-full ${disabled ? 'bg-[#EDECEC]' : ''}`,
        input:
          'text-black placeholder:text-brand-dark/40 outline-none p-2',
      }}
      endContent={endContentComponent}
      startContent={startContentComponent}
    />
  )

  if (label) {
    labelContent = (
      <label htmlFor={id} className="text-sm font-medium text-black">
        {label}
      </label>
    )
  }

  if (type === 'select') {
    inputContent = (
      <Select
        id={id}
        name={name}
        defaultSelectedKeys={normalizedValue ? [normalizedValue] : []}
        onChange={(e) => onChange?.(e.target.value)}
        classNames={{
          trigger:
            'border border-black/50 rounded-md py-5 px-2.5 w-full text-sm text-black min-h-[40px] flex items-center justify-between',
          listbox: 'border border-foreground rounded-md bg-light text-black text-sm py-2 w-full',
          listboxWrapper: 'w-full',
          selectorIcon: 'absolute right-3 text-brand-dark w-5 h-5 pointer-events-none',
        }}
      >
        {options!.map((opt, idx) => (
          <SelectItem
            key={opt.key}
            textValue={opt.label}
            className={`${options!.length - 1 === idx ? 'border-none' : 'border-b border-foreground'
              }`}
          >
            {opt.label}
          </SelectItem>
        ))}
      </Select>
    )
  }

  if (type === 'textarea') {
    inputContent = (
      <Textarea
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        disableAutosize
        defaultValue={normalizedValue}
        onChange={(e) => onChange?.(e.target.value)}
        endContent={endContentComponent}
        startContent={startContentComponent}
        classNames={{
          inputWrapper:
            `border border-black/50 rounded-md w-full ${disabled ? 'bg-[#EDECEC]' : ''}`,
          input:
            'text-black placeholder:text-transparent outline-none p-2',
        }}
      />
    )
  }


  return (
    <div className="flex flex-col gap-2 w-full h-auto">
     {labelContent}
     {inputContent}
    </div>
  )
}
