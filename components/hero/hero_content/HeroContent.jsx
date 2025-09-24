'use client'

import SearchTabs from './SearchTabs'
import FlightSearchCard from './FlightSearchCard'

export default function HeroContent() {
  return (
    <div className='container mt-16'>
      {/* Card wrapper */}
      <div className='relative'>
        {/* Floating pill tabs */}
        <div
          className='flex justify-center '
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <SearchTabs />
        </div>

        {/* Main card */}
        <div className='mt-4 rounded-2xl bg-white shadow-xl border border-slate-200 pt-8 pl-4 pb-4 pr-4 '>
          <FlightSearchCard />
        </div>
      </div>
    </div>
  )
}
