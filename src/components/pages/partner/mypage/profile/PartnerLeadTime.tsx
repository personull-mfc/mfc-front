'use client'

import React, { useEffect, useState } from 'react'
import Modal from '@/components/common/Modal'
import PartnerProfileTitleAndEdit from '@/components/pages/partner/mypage/profile/PartnerProfileTitleAndEdit'
import StretchedRoundedButton from '@/components/ui/button/StretchedRoundedButton'
import LeadTimePicker from '@/components/ui/picker/LeadTimePicker'
import useToast from '@/stores/toast'
import { updateLeadTime } from '@/actions/partner/PartnerProfileUpdate'

export default function PartnerLeadTime({ leadTime }: { leadTime: number }) {
  const { showToast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [sameDay, setSameDay] = useState<boolean>(false)
  const [day, setDay] = useState<number>(1)

  const saveHandler = async () => {
    if (day < 0) {
      showToast({ content: '코디 소요기간을 선택해주세요.', type: 'warning' })
      return
    }

    const result = await updateLeadTime(sameDay ? 0 : day)
    if (result.isSuccess) {
      setIsModalOpen(false)
      showToast({ content: '저장되었습니다.', type: 'success' })
      return
    }

    showToast({ content: result.message, type: 'error' })
  }

  const editHandler = () => {
    setIsModalOpen(true)
  }

  const getLadTime = () => {
    if (leadTime === null)
      return '파트너님의 평균적인 코디 소요기간을 알려주세요.'
    if (leadTime === 0) return '당일 가능'
    return `${leadTime}일`
  }

  useEffect(() => {
    if (leadTime === 0) setSameDay(true)
    else setDay(leadTime)
  }, [leadTime])

  return (
    <div>
      {isModalOpen && (
        <Modal title="코디 소요기간" closeModal={() => setIsModalOpen(false)}>
          <div className="m-5">
            <h1 className="font-semibold">
              파트너님의 평균적인 코디 소요기간을 알려주세요.
            </h1>

            <div className="mt-10 flex items-center">
              <input
                type="checkbox"
                id="common-checkbox"
                className="common-checkbox mr-2 "
                checked={sameDay}
                onChange={() => setSameDay(!sameDay)}
              />
              <label htmlFor="common-checkbox" className="font-semibold">
                당일 가능
              </label>
            </div>

            {!sameDay && (
              <div className="flex items-center justify-center mt-10 gap-2">
                <LeadTimePicker leadTime={day} setLeadTime={setDay} />
                <h1 className="font-bold">일</h1>
              </div>
            )}
            <div className="fixed bottom-7 w-full left-0 right-0 px-6">
              <StretchedRoundedButton
                comment="저장"
                clickHandler={saveHandler}
              />
            </div>
          </div>
        </Modal>
      )}
      <PartnerProfileTitleAndEdit
        title="평균 코디 소요기간"
        clickHandler={editHandler}
        content={
          <div>
            <p className="text-[14px]">{getLadTime()}</p>
          </div>
        }
      />
    </div>
  )
}
