'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import PaxPicker from './PaxPicker'
import { Search } from 'lucide-react'

export default function FlightSearchCard() {
  const router = useRouter()

  // trip controls
  const [trip, setTrip] = useState('oneway') // "oneway" | "round" | "multicity"
  const [cabin, setCabin] = useState('Economy')
  const [umrah, setUmrah] = useState(false)

  // passengers (ADT/CHD/INF)
  const [pax, setPax] = useState({ adult: 1, child: 0, infant: 0 })

  // fields
  const [from, setFrom] = useState('DAC')
  const [to, setTo] = useState('DXB')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))

  function swap() {
    setFrom(to)
    setTo(from)
  }

  function onSubmit(e) {
    e.preventDefault()
    const qs = new URLSearchParams({
      from,
      to,
      date,
      cabin,
      trip,
      umrah: String(umrah),
      adt: String(pax.adult),
      chd: String(pax.child),
      inf: String(pax.infant),
    }).toString()
    router.push(`/flights?${qs}`)
  }

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      {/* Top controls: trip type + right-side selectors */}
      <div className='flex flex-wrap items-center gap-4'>
        <div className='flex items-center gap-4'>
          <label className='inline-flex items-center gap-2'>
            <input
              type='radio'
              name='trip'
              value='oneway'
              checked={trip === 'oneway'}
              onChange={() => setTrip('oneway')}
            />
            <span>One Way</span>
          </label>

          <label className='inline-flex items-center gap-2'>
            <input
              type='radio'
              name='trip'
              value='round'
              checked={trip === 'round'}
              onChange={() => setTrip('round')}
            />
            <span>Round Trip</span>
          </label>

          <label className='inline-flex items-center gap-2'>
            <input
              type='radio'
              name='trip'
              value='multicity'
              checked={trip === 'multicity'}
              onChange={() => setTrip('multicity')}
            />
            <span>Multi City</span>
          </label>
        </div>

        <div className='ml-auto flex flex-wrap items-center gap-3'>
          {/* Cabin class */}
          <label className='text-slate-700'>
            <select
              className='border rounded-md px-3 py-2'
              value={cabin}
              onChange={(e) => setCabin(e.target.value)}
              aria-label='Cabin class'
            >
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First</option>
            </select>
          </label>

          {/* Passengers popover */}
          <PaxPicker value={pax} onChange={setPax} />

          {/* Umrah */}
          <label className='inline-flex items-center gap-2'>
            <input
              type='checkbox'
              checked={umrah}
              onChange={(e) => setUmrah(e.target.checked)}
            />
            <span>Umrah</span>
          </label>
        </div>
      </div>

      {/* Fields row */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
        {/* From + To with swap */}
        <div className='md:col-span-2 grid grid-cols-[1fr_auto_1fr]'>
          {/* From */}
          <div className='rounded-l-md border border-slate-300 px-3 py-2'>
            <label className='block text-xs text-slate-500'>Journey From</label>
            <Input
              className='border-0 p-0 focus:ring-0'
              value={from}
              onChange={(e) => setFrom(e.target.value.toUpperCase())}
              placeholder='Airport / City'
              aria-label='From'
            />
            <div className='text-xs text-slate-400'>Airport Info</div>
          </div>

          {/* Swap */}
          <button
            type='button'
            onClick={swap}
            className='flex items-center justify-center px-3 border-t border-b border-slate-300'
            aria-label='Swap origin and destination'
            title='Swap'
          >
            <ArrowLeftRight size={18} />
          </button>

          {/* To */}
          <div className='rounded-r-md border border-slate-300 px-3 py-2'>
            <label className='block text-xs text-slate-500'>Journey To</label>
            <Input
              className='border-0 p-0 focus:ring-0'
              value={to}
              onChange={(e) => setTo(e.target.value.toUpperCase())}
              placeholder='Airport / City'
              aria-label='To'
            />
            <div className='text-xs text-slate-400'>Airport Info</div>
          </div>
        </div>

        {/* Date */}
        <div className='rounded-md border border-slate-300 px-3 py-2'>
          <label className='block text-xs text-slate-500'>Departing</label>
          <Input
            type='date'
            className='border-0 p-0 focus:ring-0'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label='Departing date'
          />
          <div className='text-xs text-slate-400'>Flight Schedule</div>
        </div>
      </div>

      {/* Submit */}
      <div className='flex justify-center pt-2'>
        <Button type='submit' className='bg-blue-600 hover:bg-blue-700 px-5'>
          <Search size={16} />
          Search Now
        </Button>
      </div>
    </form>
  )
}
