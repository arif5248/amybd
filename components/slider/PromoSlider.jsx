'use client'

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  { src: '/banners/b1.jpeg', alt: 'Umrah Standard Package' },
  { src: '/banners/b2.jpg', alt: 'Makkah & Madinah Offer' },
  { src: '/banners/b3.jpg', alt: 'Taif Day Tour' },
  { src: '/banners/b4.png', alt: 'Special Religious Tour' },
  { src: '/banners/b5.jpg', alt: 'Special Religious Tour' },
  { src: '/banners/b6.jpeg', alt: 'Special Religious Tour' },
]

export default function PromoSlider() {
  const autoplay = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [autoplay.current]
  )

  const [selected, setSelected] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const scrollTo = useCallback(
    (i) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  )
  const prev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className='container py-8'>
      <div className='relative'>
        {/* viewport */}
        <div ref={emblaRef} className='overflow-hidden'>
          {/* track */}
          <div className='flex gap-4'>
            {slides.map((s, i) => (
              <div
                key={i}
                className='
                  relative
                  flex-none
                  basis-[85%]                         /* mobile: 1 with peek */
                  md:basis-[calc(50%-0.5rem)]         /* md+: exactly two */
                  lg:basis-[calc(50%-0.5rem)]
                '
              >
                <div className='relative h-44 sm:h-48 md:h-56 lg:h-60 rounded-2xl border border-slate-200 shadow-md overflow-hidden bg-white'>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    priority={i === 0}
                    className='object-cover'
                    sizes='(max-width: 768px) 85vw, 50vw'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* arrows */}
        <button
          type='button'
          onClick={prev}
          aria-label='Previous'
          className='absolute -left-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-white border shadow-sm hover:bg-slate-50'
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type='button'
          onClick={next}
          aria-label='Next'
          className='absolute -right-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-white border shadow-sm hover:bg-slate-50'
        >
          <ChevronRight size={18} />
        </button>

        {/* dots */}
        <div className='mt-3 flex justify-center gap-2'>
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type='button'
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-2 rounded-full transition ${
                selected === i ? 'bg-blue-600 scale-110' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
