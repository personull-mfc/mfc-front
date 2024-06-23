import React from 'react'
import PartnerPostImage from '@/components/pages/partner/mypage/style/PartnerPostImage'
import { getPartnerPostDetail } from '@/actions/partner/PartnerPost'
import { getPartnerProfileBasic } from '@/actions/partner/PartnerProfile'
import PartnerPostLikeCount from '@/components/pages/partner/mypage/style/PartnerPostLikeCount'
import PartnerPostTagList from '@/components/pages/partner/mypage/style/PartnerPostTagList'
import PartnerPostTop from '@/components/pages/partner/mypage/style/PartnerPostTop'
import CoordiRequestButton from '@/components/ui/button/CoordiRequestButton'

interface TagType {
  tagId: number
  value: string
}

export default async function PartnerPostDetailPage({
  params,
}: {
  params: { postId: number; partnerId: string }
}) {
  const { partnerId, postId } = params
  const { imageUrl, tags, bookmarkCnt } = await getPartnerPostDetail(postId)
  const { nickname, profileImage } = await getPartnerProfileBasic(partnerId)

  return (
    <>
      <PartnerPostTop
        nickname={nickname}
        profileImage={profileImage}
        postId={postId}
        imageUrl={imageUrl}
        tags={tags.map((tag: TagType) => tag.tagId)}
      />
      <PartnerPostImage imageUrl={imageUrl} />
      <PartnerPostLikeCount likeCount={bookmarkCnt} postId={postId} />
      <PartnerPostTagList tags={tags} />
      <CoordiRequestButton partnerId={partnerId} />
    </>
  )
}
