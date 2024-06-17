'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MemberStyleType } from '@/types/commonTypes'
import StretchedRoundedButton from '@/components/ui/button/StretchedRoundedButton'

export default function PreferrenceStyleList({
  styleList,
  favoriteStyle,
}: {
  styleList: MemberStyleType[]
  favoriteStyle: number[]
}) {
  const router = useRouter()
  const [selectedStyle, setSelectedStyle] = useState<number[]>([])

  useEffect(() => {
    setSelectedStyle(favoriteStyle)
  }, [favoriteStyle])

  const handleStyleClick = (style: number) => {
    if (selectedStyle.includes(style)) {
      return setSelectedStyle(
        selectedStyle.filter((selected: number) => selected !== style),
      )
    }
    // 값 저장되는 부분 수정 필요
    setSelectedStyle([...selectedStyle, style])
  }

  const saveHandler = () => {
    console.log('저장')
    console.log(selectedStyle)
    router.replace('/user/mypage/profile')
  }
  return (
    <section className="grid grid-cols-3 gap-3 mt-5 m-4">
      {styleList.map((style) => (
        <div
          key={style.styleId}
          className="flex flex-col justify-center items-center"
        >
          <div
            role="presentation"
            onClick={() => handleStyleClick(style.styleId)}
            className="w-[90px] h-[90px] relative my-4"
          >
            <Image
              src={style.imageUrl}
              alt={style.alt}
              fill
              priority
              sizes="(max-width: 100px) 100vw, 100px"
              className={`object-cover rounded-full ${selectedStyle?.includes(style.styleId) ? 'ring-4 ring-black ring-offset-base-100 ring-offset-2' : ''}`}
            />
          </div>
          <span className="text-center font-semibold text-sm">
            {style.name}
          </span>
        </div>
      ))}
      <div className="fixed bottom-0 h-[90px] w-full left-0 right-0 px-6 bg-white">
        <StretchedRoundedButton comment="저장" clickHandler={saveHandler} />
      </div>
    </section>
  )
}