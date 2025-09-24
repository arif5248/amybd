'use client'

import { useEffect, useRef, useState } from 'react'
import { UserRound, Plus, Minus } from 'lucide-react'

const clamp = (n, min, max) => Math.min(Math.max(n, min), max)

export default function PaxPicker({
  value = { adult: 1, child: 0, infant: 0 },
  onChange = () => {},
  maxTotal = 9, // cap like many airlines
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  const total = value.adult + value.child + value.infant

  function set(type, next) {
    const v = { ...value, [type]: next }

    // constraints
    v.adult = clamp(v.adult, 1, maxTotal) // at least 1 adult
    v.child = clamp(v.child, 0, maxTotal)
    v.infant = clamp(v.infant, 0, v.adult) // infants <= adults

    // total max
    const t = v.adult + v.child + v.infant
    if (t > maxTotal) return // ignore if over cap

    // if reducing adults below infants, trim infants
    if (v.infant > v.adult) v.infant = v.adult

    onChange(v)
  }

  function inc(type) {
    set(type, value[type] + 1)
  }
  function dec(type) {
    set(type, value[type] - 1)
  }

  // close on outside click
  useEffect(() => {
    function onDoc(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  // close on Escape
  useEffect(() => {
    function onEsc(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open])

  return (
    <div className='relative inline-block' ref={rootRef}>
      {/* trigger */}
      <button
        type='button'
        onClick={() => setOpen((o) => !o)}
        className='border rounded-md px-3 py-2 inline-flex items-center gap-2 hover:bg-slate-50'
        aria-haspopup='dialog'
        aria-expanded={open}
        aria-label='Select passengers'
        title='Passengers'
      >
        <UserRound size={16} />
        <span>{total}</span>
      </button>

      {/* panel */}
      {open && (
        <div
          role='dialog'
          aria-label='Passenger selection'
          className='absolute z-50 right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl p-4'
        >
          <Row
            title='Adult'
            subtitle='12 years and above'
            value={value.adult}
            onDec={() => dec('adult')}
            onInc={() => inc('adult')}
            disableDec={value.adult <= 1}
            disableInc={total >= maxTotal}
          />
          <Row
            title='Children'
            subtitle='2-11 years at time of travel'
            value={value.child}
            onDec={() => dec('child')}
            onInc={() => inc('child')}
            disableDec={value.child <= 0}
            disableInc={total >= maxTotal}
          />
          <Row
            title='Infants'
            subtitle='Below 2 years at time of travel'
            value={value.infant}
            onDec={() => dec('infant')}
            onInc={() => inc('infant')}
            disableDec={value.infant <= 0}
            disableInc={value.infant >= value.adult || total >= maxTotal}
          />

          <div className='pt-2 text-right'>
            <button
              type='button'
              className='text-blue-600 font-semibold hover:underline'
              onClick={() => setOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ title, subtitle, value, onDec, onInc, disableDec, disableInc }) {
  const btnBase =
    'inline-flex items-center justify-center w-8 h-8 rounded-md bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed'
  return (
    <div className='flex items-center justify-between py-2'>
      <div>
        <div className='font-medium'>{title}</div>
        <div className='text-slate-500 text-xs'>{subtitle}</div>
      </div>
      <div className='flex items-center gap-2'>
        <button
          type='button'
          className={btnBase}
          onClick={onDec}
          disabled={disableDec}
        >
          <Minus size={16} />
        </button>
        <div className='w-6 text-center font-semibold'>{value}</div>
        <button
          type='button'
          className={btnBase}
          onClick={onInc}
          disabled={disableInc}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}
