import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import '../m2exp1/m2-materials.css'
import './m2-exp3-materials.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'วัสดุอุปกรณ์', experiment: 'การทดลองที่ 3',
    mystery: 'น้ำกรดยาง\nของปะดอ', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    next: 'ต่อไป', language: 'เลือกภาษา',
    materials: [
      ['🧴', 'ขวดกรดฟอร์มิก', 'A 90 · B 50 · C 3 %'],
      ['🥛', 'ถ้วยตวงกรด 100 mL', '1 ใบ'],
      ['🪣', 'ถังน้ำสะอาด 3 L', '1 ใบ'],
      ['🧤', 'ถุงมือ + แว่นตา', 'บังคับสวมทุกครั้ง'],
      ['🥣', 'ถาดน้ำยาง 1 L', 'น้ำยางสด'],
      ['⏱️', 'นาฬิกาจับเวลา', 'เริ่มเวลาได้'],
    ] as [string, string, string][],
  },
  ms: {
    back: 'Kembali', title: 'Bahan dan Peralatan', experiment: 'Eksperimen 3',
    mystery: 'Pencairan asid\nlateks dengan selamat', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    next: 'Seterusnya', language: 'Pilih bahasa',
    materials: [
      ['🧴', 'Botol asid formik', 'A 90 · B 50 · C 3 %'],
      ['🥛', 'Cawan penyukat asid 100 mL', '1 unit'],
      ['🪣', 'Baldi air bersih 3 L', '1 unit'],
      ['🧤', 'Sarung tangan + gogal', 'Wajib dipakai setiap masa'],
      ['🥣', 'Dulang lateks 1 L', 'Lateks segar'],
      ['⏱️', 'Jam randik', 'Mula mengukur masa'],
    ] as [string, string, string][],
  },
  en: {
    back: 'Back', title: 'Materials and Equipment', experiment: 'Experiment 3',
    mystery: 'Safe latex acid\ndilution', pisa: 'PISA 3 · Use data to decide',
    next: 'Continue', language: 'Choose language',
    materials: [
      ['🧴', 'Formic acid bottles', 'A 90 · B 50 · C 3 %'],
      ['🥛', '100 mL acid measuring cup', '1 cup'],
      ['🪣', '3 L clean water bucket', '1 bucket'],
      ['🧤', 'Gloves + goggles', 'Wear at all times'],
      ['🥣', '1 L latex tray', 'Fresh latex'],
      ['⏱️', 'Stopwatch', 'Ready to time'],
    ] as [string, string, string][],
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string;
  next: string; language: string; materials: [string, string, string][]
}>

export function M2Experiment3MaterialsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-exp3-materials-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp3/thinking" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">5</span>
            <h1>{copy.title}</h1>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <div className="m2-exp3-materials-art" aria-hidden="true">🪣</div>
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>
          <div className="m2-objectives-main">
            <section className="m2-objectives-panel m2-materials-panel" aria-label={copy.title}>
              <ul className="m2-materials-grid">
                {copy.materials.map(([icon, name, amount], index) => (
                  <li className={`m2-material-card m2-material-card-${(index % 3) + 1}`} key={name}>
                    <span className="m2-material-icon" aria-hidden="true">{icon}</span>
                    <h2>{name}</h2>
                    <p>{amount}</p>
                  </li>
                ))}
              </ul>
            </section>
            <div className="m2-objectives-actions">
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp3/procedure" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
