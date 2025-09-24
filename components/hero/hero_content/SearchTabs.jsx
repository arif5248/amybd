'use client'

import { useState } from 'react'
import { Plane, BedDouble, Stamp, Building2, Map, Compass } from 'lucide-react'

const TABS = [
  { key: 'flights', label: 'Flights', icon: Plane },
  { key: 'hotels', label: 'Hotels', icon: BedDouble },
  { key: 'visa', label: 'Visa', icon: Stamp },
  { key: 'umrah', label: 'Umrah', icon: Building2 },
  { key: 'tours', label: 'Tours', icon: Map },
  { key: 'explore', label: 'Explore', icon: Compass },
]

export default function SearchTabs() {
  const [active, setActive] = useState('flights')

  return (
    <nav
      className='
        -translate-y-6 md:-translate-y-8
        bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        border border-slate-200 px-3 sm:px-4 py-2 sm:py-3
      '
    >
      <ul className='flex gap-4 sm:gap-6'>
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key
          return (
            <li key={key}>
              <button
                type='button'
                onClick={() => setActive(key)}
                className={[
                  'flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'text-blue-600'
                    : 'text-slate-700 hover:text-slate-900',
                ].join(' ')}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
