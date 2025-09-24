import Image from 'next/image'
import logo from '@/public/brand/amy_logo.png'

export default function Logo({ size, className = '' }) {
  return (
    <Image
      src={logo} // or /brand/logo.png
      alt='Amy BD'
      width='auto'
      height={size}
      priority // load early (above-the-fold)
      className={className + ' h-9 w-auto'}
      //   sizes='(max-width: 768px) 28px, 32px' // improve responsive perf
    />
  )
}
