import React from 'react'
import CircleProfile from '@/components/ui/avatar/CircleProfile'
import Steps from '@/components/ui/step/Step'
import { formatDday } from '@/utils/formatTime'
import { PartnerChatListType } from '@/types/requestType'
import PartnerChatBoxButton from '@/components/pages/chats/box/PartnerChatBoxButton'

export default function PartnerChatBox({
  requestData,
}: {
  requestData: PartnerChatListType
}) {
  console.log(requestData)
  const roomId = 1
  const steps = ['요청', '거래대기', '거래확정', '코디완료']

  const getCurrentStep = (status: string) => {
    switch (status) {
      case 'NONERESPONSE':
        return 1
      case 'RESPONSEACCEPT':
        return 2
      case 'CONFIRMED':
        return 3
      case 'CLOSING':
        return 4
      default:
        return 0
    }
  }

  const currentStep = getCurrentStep(requestData.status)

  return (
    <div className="border-y-2 border-y-gray-100 bg-white relative">
      <div className="p-5">
        {/* 유저정보 */}
        <section className="flex items-center">
          <CircleProfile size={50} imageUrl={requestData.userImageUrl} />
          <h1 className="ml-2 font-semibold">{requestData.userNickName}</h1>
          <div className="ml-2 text-gray-500 flex gap-1">
            <span>{requestData.userGender ? '여성' : '남성'}</span>
            <span>|</span>
            <span>{requestData.userAge}</span>
          </div>
          <h1 className="text-gray-700 font-bold text-[20px] absolute right-4">
            {formatDday(requestData.deadline)}
          </h1>
        </section>

        {/* 진행률 */}
        <section className="mt-3 mb-4">
          <Steps steps={steps} currentStep={currentStep} />
        </section>

        {/* 요청서명&일시 */}
        <div className="relative h-[50px]">
          <p className="mb-3">{requestData.title}</p>
          <span className="text-gray-400 flex text-[14px] absolute right-0 bottom-0">
            요청일시: {requestData.createdDate}
          </span>
        </div>
      </div>

      {/* 액션 */}
      <PartnerChatBoxButton
        status={requestData.status}
        roomId={roomId}
        userId={requestData.userId}
        requestId={requestData.requestId}
      />
    </div>
  )
}