'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import getChatRoomId from '@/actions/chat/Chatroom'
import { getStyleGuide } from '@/actions/partner/Coordinates'

export default function PartnerChatBoxButton({
  status,
  userId,
  requestId,
  partnerId,
}: {
  status: string
  userId: string
  requestId: string
  partnerId: string
}) {
  const router = useRouter()
  const [roomNumber, setRoomNumber] = useState<string>('')
  const [unreadMessage, setUnreadMessage] = useState<number>(0)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const availableStatus = ['CONFIRMED', 'CLOSING']

  useEffect(() => {
    if (status === 'NONERESPONSE') return

    const getRoomId = async () => {
      const { roomId, unreadCount } = await getChatRoomId(requestId, partnerId)
      setUnreadMessage(unreadCount)
      setRoomNumber(roomId)
    }

    const getSubmitStatus = async () => {
      const data = await getStyleGuide(requestId)
      const submitStatus = !!data
      setIsSubmit(submitStatus)
    }

    getRoomId()
    getSubmitStatus()
  }, [status])

  return (
    <div className="h-[50px] w-full border-t">
      {status === 'NONERESPONSE' ? (
        <div className="h-full flex items-center justify-center">
          <button
            type="button"
            onClick={() =>
              router.push(`/partner/reqcoordi/${requestId}?status=nonresponse`)
            }
          >
            요청 상세보기
          </button>
        </div>
      ) : (
        <div className="h-full flex items-center justify-around">
          <button
            type="button"
            onClick={() =>
              router.push(`/partner/reqcoordi/${requestId}?status=accept`)
            }
            className="flex justify-center items-center border-r basis-1/3 h-full"
          >
            요청 상세보기
          </button>
          {availableStatus.includes(status) && (
            <Link
              href={`/partner/styleguide/${requestId}?type=${isSubmit ? 'view' : 'new'}`}
              className="flex justify-center items-center border-r basis-1/3 h-full"
            >
              코디
            </Link>
          )}

          {/* 채팅 버튼 */}
          <Link
            href={`/partner/chatroom/${roomNumber}?userId=${userId}&requestId=${requestId}`}
            className="flex justify-center items-center basis-1/3 h-full"
          >
            <div className="relative">
              <Image
                src="https://personull-bucket.s3.ap-northeast-2.amazonaws.com/icon/square-chat.svg"
                alt="chat"
                width={23}
                height={23}
              />
              {/* 안 읽음 표시 추가 */}
              {unreadMessage > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full h-4 w-4" />
              )}
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}
