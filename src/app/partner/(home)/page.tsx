import React from 'react'
import {
  getPartnerProfile,
  getSnsData,
  getPartnerProfileBasic,
  getFavoriteStyle,
  getCareer,
} from '@/actions/partner/PartnerProfile'
import PartnerWelcome from '@/components/pages/partner/home/PartnerWelcome'
import ProfileProgress from '@/components/pages/partner/home/ProfileProgress'
import CoordinatingSummary from '@/components/pages/partner/home/CoordinatingSummary'
import DeadlineReminder from '@/components/pages/partner/home/DeadlineReminder'
import ServiceGuide from '@/components/pages/partner/home/ServiceGuide'

// import useFcmToken from '@/hooks/useFcmToken'
const basicImage =
  'https://personull-bucket.s3.ap-northeast-2.amazonaws.com/profile/default-profile.svg'

export default async function PartnerHome() {
  const favoritStyle = await getFavoriteStyle()
  const { description, startTime, endTime, averageDate, averagePrice } =
    await getPartnerProfile()
  const { nickname, profileImage } = await getPartnerProfileBasic()
  const snsList = await getSnsData()
  const careers = await getCareer()

  // 프로필이미지, 소개, 채팅시간, 리드타임, SNS, 경력, 주력스타일, 가격 총8개
  const fields = [
    profileImage === basicImage ? null : profileImage,
    description,
    startTime && endTime,
    averageDate,
    snsList.length > 0,
    careers.length > 0,
    favoritStyle.length > 0,
    averagePrice,
  ]
  const completedFields = fields.filter(Boolean).length
  const totalFields = 8
  const progressPercent = Math.round((completedFields / totalFields) * 100)

  // const { fcmToken } = useFcmToken(
  return (
    <main className="min-h-screen w-full px-4 pt-5 flex flex-col bg-gradient-to-b from-white via-gray-200 to-white">
      <div className="flex flex-col gap-4 flex-grow pb-[120px]">
        <PartnerWelcome nickname={nickname} />
        <ProfileProgress progressPercent={progressPercent} />
        <CoordinatingSummary />
        <DeadlineReminder />
        <ServiceGuide />
      </div>
    </main>
  )
}
