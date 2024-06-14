'use client'

import React, { useState } from 'react'
import type { ZodIssue } from 'zod'
import RequestContents from '@/components/pages/user/createRequest/RequestContents'
import ReqAddImage from '@/components/pages/user/createRequest/ReqAddImage'
import ReqAddInfo from '@/components/pages/user/createRequest/ReqAddInfo'
import ReqCodiBudget from '@/components/pages/user/createRequest/ReqCodiBudget'
import ReqCodiOptions from '@/components/pages/user/createRequest/ReqCodiOptions'
import ReqCodiSituation from '@/components/pages/user/createRequest/ReqCodiSituation'
import ReqPreferredBrands from '@/components/pages/user/createRequest/ReqPreferredBrands'
import RequestTitle from './RequestTitle'

export default function RequestForm({
  action,
}: {
  action: (formData: FormData) => Promise<{ error: ZodIssue[] } | undefined>
}) {
  const [errors, setErrors] = useState<
    { [key: string]: ZodIssue[] } | undefined
  >(undefined)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await action(new FormData(event.currentTarget))
    if (result?.error) {
      const newErrors: { [key: string]: ZodIssue[] } = {}
      result.error.forEach((error) => {
        const key = error.path[0]
        if (!newErrors[key]) {
          newErrors[key] = []
        }
        newErrors[key].push({
          ...error,
          message: error.message,
        })
      })
      setErrors(newErrors)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="grid gap-7 w-full px-5 pb-4">
      <RequestTitle />
      {errors?.title && (
        <p className="text-xs text-red-500 font-bold -mt-6">
          {errors?.title[0].message}
        </p>
      )}
      <RequestContents />
      {errors?.description && (
        <p className="text-xs text-red-500 font-bold -mt-6">
          {errors?.description[0].message}
        </p>
      )}
      <ReqCodiSituation />
      {errors?.situation && (
        <p className="text-xs text-red-500 font-bold -mt-6">
          {errors?.situation[0].message}
        </p>
      )}
      <ReqPreferredBrands />
      <ReqCodiOptions />
      {errors?.category && (
        <p className="text-xs text-red-500 font-bold -mt-6">
          {errors?.category[0].message}
        </p>
      )}
      <ReqCodiBudget />
      {errors?.budget && (
        <p className="text-xs text-red-500 font-bold -mt-6">
          {errors?.budget[0].message}
        </p>
      )}
      <ReqAddImage title="참고 스타일" id="refImgFile" />
      <ReqAddImage title="내 이미지" id="userImgFile" />
      <ReqAddInfo />
      <button
        type="submit"
        className="sticky bottom-5 rounded-full w-full h-[50px] bg-black"
      >
        <span className="text-white">저장</span>
      </button>
    </form>
  )
}