'use client'

export default function Button({
  className = '',
  type = 'button',
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`btn inline-flex items-center gap-2 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
