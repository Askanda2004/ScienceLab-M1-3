import './LanguageSwitcher.css'
import type { Language } from '../types/language'

type Props = {
  language: Language
  label: string
  onLanguageChange: (language: Language) => void
}

const languages: { code: Language; label: string }[] = [
  { code: 'th', label: 'ไทย' },
  { code: 'ms', label: 'มลายูถิ่น' },
  { code: 'en', label: 'อังกฤษ' },
]

export function LanguageSwitcher({ language, label, onLanguageChange }: Props) {
  return (
    <nav className="language-switcher" aria-label={label}>
      {languages.map((item) => (
        <button
          className={language === item.code ? 'selected' : ''}
          type="button"
          key={item.code}
          aria-pressed={language === item.code}
          onClick={() => onLanguageChange(item.code)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
