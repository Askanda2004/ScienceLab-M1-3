type Props = {
  href: string
  label: string
  className: string
}

export function BackButton({ href, label, className }: Props) {
  return (
    <a className={className} href={href} aria-label={label}>
      <span aria-hidden="true">‹</span>
      {label}
    </a>
  )
}
