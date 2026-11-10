import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import densityImage from '../../../assets/experiment-density.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/summary.css'

const content = {
  th: {
    back: 'ย้อนกลับ', next: 'ต่อไป', title: 'สรุปแนวคิดสำคัญ', experiment: 'การทดลองที่ 2',
    mystery: 'ความลับของทะเลปัตตานี', badge: 'PISA 2 · ออกแบบ · แปลข้อมูล', language: 'เลือกภาษา',
    densityTitle: 'ความหนาแน่น', density: '= มวล ÷ ปริมาตร (g/mL)\nบอกว่าสารอัดแน่นแค่ไหน',
    floatTitle: 'ลอยหรือจม?', float: 'ของเหลวหนาแน่นกว่าวัตถุ → ลอย\nหนาแน่นน้อยกว่า → จม',
    mixtureTitle: 'สารผสมเปลี่ยนได้', mixture: 'น้ำกลั่นคงที่ 1.00 g/mL\nใส่เกลือมาก ยิ่งหนาแน่นมาก',
    fairTitle: 'ทดลองให้ยุติธรรม', fair: 'เปลี่ยนตัวแปรต้นทีละตัว\nคุมปริมาตรและวัตถุให้เท่ากัน',
  },
  ms: {
    back: 'Kembali', next: 'Seterusnya', title: 'Rumusan Idea Utama', experiment: 'Eksperimen 2',
    mystery: 'Rahsia Laut Pattani', badge: 'PISA 2 · Reka bentuk · Tafsir data', language: 'Pilih bahasa',
    densityTitle: 'Ketumpatan', density: '= Jisim ÷ Isi padu (g/mL)\nMenunjukkan kepadatan sesuatu bahan',
    floatTitle: 'Terapung atau tenggelam?', float: 'Cecair lebih tumpat daripada objek → terapung\nKurang tumpat → tenggelam',
    mixtureTitle: 'Campuran boleh berubah', mixture: 'Air suling kekal pada 1.00 g/mL\nLebih banyak garam, lebih tinggi ketumpatan',
    fairTitle: 'Uji secara adil', fair: 'Ubah satu pemboleh ubah pada satu masa\nKekalkan isi padu dan objek yang sama',
  },
  en: {
    back: 'Back', next: 'Next', title: 'Key Ideas Summary', experiment: 'Experiment 2',
    mystery: 'Secrets of Pattani Sea', badge: 'PISA 2 · Design · Interpret data', language: 'Choose language',
    densityTitle: 'Density', density: '= Mass ÷ Volume (g/mL)\nIt tells how tightly matter is packed',
    floatTitle: 'Float or sink?', float: 'Liquid denser than the object → floats\nLess dense → sinks',
    mixtureTitle: 'Mixtures can change', mixture: 'Distilled water stays at 1.00 g/mL\nMore salt makes the solution denser',
    fairTitle: 'Make it a fair test', fair: 'Change one independent variable at a time\nKeep volume and object the same',
  },
} satisfies Record<Language, Record<string, string>>

export function Experiment2SummaryPage() {
  const [language, setLanguage] = useState<Language>('th')
  const text = content[language]
  const cards = [
    { icon: '⚖️', title: text.densityTitle, body: text.density, tone: 'warm' },
    { icon: '🥚', title: text.floatTitle, body: text.float, tone: 'blue' },
    { icon: '🧂', title: text.mixtureTitle, body: text.mixture, tone: 'green' },
    { icon: '🔬', title: text.fairTitle, body: text.fair, tone: 'purple' },
  ]

  return (
    <main className="objectives-page summary-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content summary-content">
        <header className="objectives-header summary-header">
          <BackButton className="objectives-back" href="/gradem1/exp2/pisa" label={text.back} />
          <div className="objectives-title summary-title">
            <span className="objectives-number">12</span>
            <h1>{text.title}</h1>
          </div>
        </header>

        <div className="objectives-layout summary-layout">
          <aside className="objectives-sidecard summary-sidecard">
            <h2>{text.experiment}</h2>
            <img src={densityImage} alt="" />
            <h3>{text.mystery}</h3>
            <span className="pisa-badge">{text.badge}</span>
          </aside>

          <section className="summary-panel" aria-label={text.title}>
            <div className="summary-grid">
              {cards.map((card) => (
                <article className={`summary-card summary-card-${card.tone}`} key={card.title}>
                  <h2><span aria-hidden="true">{card.icon}</span>{card.title}</h2>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
      <div className="summary-actions">
        <NextButton className="summary-next" label={text.next} href="/gradem1/exp2/comparison" />
      </div>
    </main>
  )
}
