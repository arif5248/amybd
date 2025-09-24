'use client'

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Reusable slider section
 * - variant: "default" | "soft"   (soft applies .section-surface background)
 */
export default function CarouselSection({
  title,
  subtitle,
  items = [],
  variant = 'default',
}) {
  const autoplay = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [autoplay.current]
  )

  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi])
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  // choose wrapper class based on variant
  const wrapperClass = ['relative', variant === 'soft' ? 'section-surface' : '']
    .join(' ')
    .trim()

  return (
    <section className='container py-10'>
      {/* header */}
      <div className='mb-4'>
        <h2 className='text-2xl font-semibold'>{title}</h2>
        {subtitle && (
          <p className='text-slate-600 mt-2 max-w-3xl'>{subtitle}</p>
        )}
      </div>

      <div className={wrapperClass}>
        {/* viewport */}
        <div ref={emblaRef} className='overflow-hidden'>
          {/* track */}
          <div className='flex gap-4'>
            {items.map((item, i) => {
              const card = (
                <div className='relative h-48 sm:h-56 md:h-64 rounded-2xl border border-slate-200 shadow-md overflow-hidden bg-white'>
                  <Image
                    src={item.src}
                    alt={item.title || 'Slide'}
                    fill
                    priority={i === 0}
                    className='object-cover'
                    sizes='(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 25vw'
                  />
                  {(item.title || item.caption) && (
                    <div className='absolute inset-x-0 bottom-0 p-3 text-white bg-gradient-to-t from-black/60 to-transparent'>
                      {item.title && (
                        <div className='text-sm font-semibold tracking-wide'>
                          {item.title}
                        </div>
                      )}
                      {item.caption && (
                        <div className='text-[11px] opacity-90'>
                          {item.caption}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )

              return (
                <div
                  key={i}
                  className='relative flex-none basis-[85%] md:basis-[calc(50%-0.5rem)] lg:basis-[calc(25%-0.75rem)]'
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className='block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl'
                    >
                      {card}
                    </a>
                  ) : (
                    card
                  )}
                </div>
              )
            })}
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
          {snaps.map((_, i) => (
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
