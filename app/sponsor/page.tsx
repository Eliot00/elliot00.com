import { Metadata } from 'next'
import Image from 'next/image'
import wechatSponsor from './wechat-sponsor.png'

export const metadata: Metadata = {
  title: '赞助 - Elliot',
}

export default function Sponsor() {
  return <Image src={wechatSponsor} alt="Wechat sponsor qrcode" />
}
