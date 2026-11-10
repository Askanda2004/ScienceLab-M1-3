type Props = {
  label: string
  className: string
  href?: string
  onClick?: () => void
}

export function NextButton({ label, className, href, onClick }: Props) {
  const content = <>{label} <span aria-hidden="true">›</span></>

  if (href) {
    return <a className={className} href={href}>{content}</a>
  }

  return <button className={className} type="button" onClick={onClick}>{content}</button>
}
