'use client'

import React, { useState } from 'react'

export default function ReqCodiBudget() {
  const [value, setValue] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value.replace(/,/g, '')))
  }
  return (
    <div>
      <p className="text-xs pb-1">
        코디 예산
        <span className="text-red-500 text-lg align-middle">*</span>
      </p>
      <div className="flex items-center gap-1">
        <input
          required
          name="budget"
          value={value ? value.toLocaleString() : ''}
          onChange={handleChange}
          type="text"
          className="form-input text-end"
          style={{ width: '35%' }}
        />
        <p>₩</p>
      </div>
    </div>
  )
}
