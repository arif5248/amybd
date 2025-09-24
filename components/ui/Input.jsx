'use client'

export default function Input(props) {
  const { className = '', ...rest } = props
  return (
    <input
      className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 ${className}`}
      {...rest}
    />
  )
}
