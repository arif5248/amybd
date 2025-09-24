import Hero from '@/components/hero/Hero'
import PromoSlider from '@/components/slider/PromoSlider'
import CarouselSection from '@/components/sections/CarouselSection'

const HOTELS_COX = [
  { src: '/sections/hotels/h1.jpg', title: 'WINDY TERRACE HOTEL' },
  { src: '/sections/hotels/h2.jpg', title: 'BEST WESTERN HERITAGE' },
  { src: '/sections/hotels/h3.jpg', title: 'SAYEMAN BEACH RESORT' },
  { src: '/sections/hotels/h4.jpg', title: 'OCEAN PARADISE' },
]

const TRANSIT_HOTELS = [
  {
    src: '/sections/transit/a1.jpg',
    title: 'MUMBAI',
    caption: 'Chhatrapati Shivaji International',
  },
  {
    src: '/sections/transit/a2.jpg',
    title: 'SINGAPORE',
    caption: 'Changi Airport',
  },
  {
    src: '/sections/transit/a3.jpg',
    title: 'BANGKOK',
    caption: 'Suvarnabhumi Airport',
  },
  {
    src: '/sections/transit/a4.jpg',
    title: 'DUBAI',
    caption: 'Dubai International Airport',
  },
]

const TOP_DESTINATIONS = [
  { src: '/sections/destinations/td1.png', title: 'Singapore' },
  { src: '/sections/destinations/td2.jpg', title: 'Venice' },
  { src: '/sections/destinations/td3.jpg', title: 'Maldives' },
  { src: '/sections/destinations/td4.jpg', title: 'Dubai' },
]

export default function Page() {
  return (
    <main className=''>
      <Hero />
      <PromoSlider />
      <CarouselSection
        title="Hotels in Cox's Bazar"
        subtitle='Discover the vibrant culture of Bangladesh and the breathtaking beauty of Cox’s Bazar. Start planning your journey today!'
        items={HOTELS_COX}
      />

      <CarouselSection
        variant='soft'
        title='Airport Transit Hotels'
        subtitle='Relax and recharge with comfort and convenience just steps from your terminal. Book your transit stay today!'
        items={TRANSIT_HOTELS}
      />

      <CarouselSection
        variant='soft'
        title='Top Destinations'
        subtitle='From iconic landmarks to hidden gems, discover the places that make every journey memorable.'
        items={TOP_DESTINATIONS}
      />
    </main>
  )
}
