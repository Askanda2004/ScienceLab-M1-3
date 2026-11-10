import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import tdsImage from '../../../assets/experiment-tds.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/procedure.css'
import './exp3.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ขั้นตอนการทดลอง', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 3 น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ',
    experiment: 'การทดลองที่ 3', mystery: 'น้ำไหนดี? ช่วยลุงช่างเลือกน้ำ', pisa: 'PISA 3 · ใช้ข้อมูลตัดสินใจ',
    next: 'ต่อไป', language: 'เลือกภาษา',
    steps: [
      'เลือกน้ำ 1 ชนิด จุ่มเครื่องวัด TDS แล้วบันทึกค่า',
      'เทน้ำ 20 mL ลงจานระเหย',
      'ให้ความร้อนจนน้ำระเหยหมด (แอปเร่งเวลาให้)',
      'ส่องแว่นขยายดูคราบที่เหลือ แล้วเลือกระดับคราบ',
      'ทำซ้ำกับน้ำชนิดอื่นจนครบ 4 ชนิด แล้วลองเพิ่มรอบการต้ม',
    ],
  },
  ms: {
    back: 'Kembali', title: 'Prosedur Eksperimen', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 3 Air yang mana?',
    experiment: 'Eksperimen 3', mystery: 'Air yang mana? Bantu memilih air', pisa: 'PISA 3 · Membuat keputusan berdasarkan data',
    next: 'Seterusnya', language: 'Pilih bahasa',
    steps: [
      'Pilih satu jenis air, celupkan meter TDS dan catat bacaan',
      'Tuang 20 mL air ke dalam piring penyejat',
      'Panaskan sehingga semua air tersejat (masa dipercepatkan dalam aplikasi)',
      'Gunakan kanta pembesar untuk melihat sisa dan pilih tahap sisanya',
      'Ulangi untuk 4 jenis air dan cuba tambah bilangan kitaran pemanasan',
    ],
  },
  en: {
    back: 'Back', title: 'Experiment Procedure', subtitle: 'Grade 7 · Matter Around Us · Experiment 3: Which Water?',
    experiment: 'Experiment 3', mystery: 'Which water? Help choose the right water', pisa: 'PISA 3 · Make data-based decisions',
    next: 'Continue', language: 'Choose language',
    steps: [
      'Choose one water sample, dip in the TDS meter and record the reading',
      'Pour 20 mL of water into an evaporating dish',
      'Heat until all the water evaporates (the app speeds up time)',
      'Use a magnifying glass to inspect the residue and select its level',
      'Repeat with all 4 water samples, then try increasing the number of heating cycles',
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string;
  next: string; language: string; steps: string[]
}>

export function Experiment3ProcedurePage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page exp3-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp3/materials" label={copy.back} />
          <div className="objectives-title exp3-title">
            <span className="objectives-number">6</span>
            <div>
              <h1>{copy.title}</h1>
              {/* <p>{copy.subtitle}</p> */}
            </div>
          </div>
        </header>

        <div className="objectives-layout">
          <aside className="objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <img src={tdsImage} alt="" />
            <h3>{copy.mystery}</h3>
            <span className="pisa-badge">{copy.pisa}</span>
          </aside>

          <div className="objectives-main">
            <section className="procedure-panel" aria-label={copy.title}>
              <ol className="procedure-list">
                {copy.steps.map((step, index) => (
                  <li key={step}>
                    <span className="procedure-index">{index + 1}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp3/prediction" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
