import React from 'react'
// import SeperatedButton from '@/components/ui/button/SeperatedButton'
import GoBackHeader from '@/components/layouts/GoBackHeader'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoBackHeader title="코디 요청" />
      {children}
    </>
  )
}
