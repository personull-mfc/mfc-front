'use server'

import { RequestType } from '@/types/requestType'
import getFetchHeader from '@/utils/getFetchHeader'

export default async function createNewRequest({
  registerData,
}: {
  registerData: RequestType
}) {
  const header = await getFetchHeader()

  if (!header) {
    console.log('session not found')
    return
  }

  // 500 에러 발생
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/coordinating-service/requests`,
    {
      method: 'POST',
      headers: {
        uuid: header.UUID,
        Authorization: `${header.Authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ registerData }),
    },
  )
  const data = await response.json()
  if (data.isSuccess) {
    console.log(data)
  } else {
    console.log('Failed to save new request', data)
  }
}
