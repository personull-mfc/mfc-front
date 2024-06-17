'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkPayment } from '@/actions/user/Payments'
import LoadingModal from '@/components/common/LoadingModal'
import useToast from '@/stores/toast'

export default function PaymentProcess({
  paymentId,
  value,
  callback,
}: {
  paymentId: string
  value: string
  callback: string
}) {
  const { showToast } = useToast()
  const router = useRouter()
  const [payStatus, setPayStatus] = useState<number | null>(null)

  // 주문 데이터의 가격과 실제 지불된 금액을 비교합니다.
  useEffect(() => {
    if (!value || !paymentId) return
    const authPayment = async () => {
      const result = await checkPayment(Number(value), paymentId || '')
      setPayStatus(result)
    }

    authPayment()
  }, [value])

  useEffect(() => {
    if (payStatus === null) return

    if (payStatus === 200) {
      showToast({ content: '충전이 완료되었습니다.', type: 'success' })
    } else {
      showToast({ content: '결제에 실패했습니다.', type: 'error' })
    }

    router.replace(`${callback}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payStatus])

  return <LoadingModal message={`결제 진행중 입니다\n 잠시만 기다려주세요`} />
}
