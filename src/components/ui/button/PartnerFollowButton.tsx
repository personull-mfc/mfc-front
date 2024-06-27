'use client'

import React from 'react'
import { updateFollow } from '@/actions/user/Follow'
import useRole from '@/hooks/useRole'

export default function PartnerFollowButton({
  partnerId,
  isFollow,
}: {
  partnerId: string
  isFollow: boolean
}) {
  const role = useRole()

  const followHandler = async () => {
    // 팔로우중인 경우
    if (isFollow) {
      await updateFollow(partnerId, 'DELETE')
    }
    // 팔로우중이 아닌 경우
    else {
      await updateFollow(partnerId, 'POST')
    }
  }

  if (role === 'PARTNER') return null

  return (
    <button
      type="button"
      onClick={followHandler}
      className={`rounded-full ${isFollow ? 'bg-gray-200 text-black' : 'bg-black text-white'} font-semibold w-[120px] h-[42px]`}
    >
      {isFollow ? 'Following' : 'Follow'}
    </button>
  )
}
