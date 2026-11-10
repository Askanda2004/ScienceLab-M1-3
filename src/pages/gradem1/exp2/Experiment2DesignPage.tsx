import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import densityImage from '../../../assets/experiment-density.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import './exp2.css'
import './design.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ออกแบบการทดลอง', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 2 ความลับของทะเลปัตตานี',
    experiment: 'การทดลองที่ 2', mystery: 'ความลับของทะเลปัตตานี', pisa: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    question: 'คำถามวิจัย: ปริมาณเกลือในน้ำมีผลต่อความหนาแน่นและการลอยของไข่หรือไม่?',
    instruction: 'ลากชิปคำลงช่องตัวแปรให้ถูกต้อง แล้วเลือกสมมติฐาน',
    labels: ['ตัวแปรต้น', 'ตัวแปรตาม', 'ตัวแปรควบคุม'],
    variables: ['ปริมาณเกลือ', 'ความหนาแน่น · การลอย–จม', 'ปริมาตรของเหลว · วัตถุชิ้นเดียวกัน · อุณหภูมิ'],
    language: 'เลือกภาษา', start: 'เริ่มการทดลอง',
  },
  ms: {
    back: 'Kembali', title: 'Reka Bentuk Eksperimen', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 2 Rahsia Laut Pattani',
    experiment: 'Eksperimen 2', mystery: 'Rahsia Laut Pattani', pisa: 'PISA 2 · Mereka bentuk · Mentafsir data',
    question: 'Soalan kajian: Adakah jumlah garam dalam air mempengaruhi ketumpatan dan keapungan telur?',
    instruction: 'Padankan label pemboleh ubah dengan betul, kemudian pilih hipotesis',
    labels: ['Dimanipulasi', 'Bergerak balas', 'Dimalarkan'],
    variables: ['Jumlah garam', 'Ketumpatan · Terapung atau tenggelam', 'Isi padu cecair · Objek yang sama · Suhu'],
    language: 'Pilih bahasa', start: 'Mulakan eksperimen',
  },
  en: {
    back: 'Back', title: 'Design the Experiment', subtitle: 'Grade 7 · Matter Around Us · Experiment 2: Secrets of Pattani Sea',
    experiment: 'Experiment 2', mystery: 'Secrets of Pattani Sea', pisa: 'PISA 2 · Design · Interpret data',
    question: 'Research question: Does the amount of salt in water affect its density and whether an egg floats?',
    instruction: 'Match each variable with its correct category, then choose a hypothesis',
    labels: ['Independent variable', 'Dependent variable', 'Controlled variables'],
    variables: ['Amount of salt', 'Density · Floating or sinking', 'Liquid volume · Same object · Temperature'],
    language: 'Choose language', start: 'Start experiment',
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string;
  question: string; instruction: string; labels: string[]; variables: string[]; language: string; start: string
}>

export function Experiment2DesignPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page exp2-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp2/procedure" label={copy.back} />
          <div className="objectives-title exp2-title">
            <span className="objectives-number">7</span>
            <div>
              <h1>{copy.title}</h1>
              {/* <p>{copy.subtitle}</p> */}
            </div>
          </div>
        </header>

        <div className="objectives-layout">
          <aside className="objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <img src={densityImage} alt="" />
            <h3>{copy.mystery}</h3>
            <span className="pisa-badge">{copy.pisa}</span>
          </aside>

          <div className="objectives-main">
            <section className="design-panel" aria-label={copy.title}>
              <h2 className="design-question">{copy.question}</h2>
              <p className="design-instruction">{copy.instruction}</p>
              <div className="design-variable-list">
                {copy.labels.map((label, index) => (
                  <div className="design-variable-row" key={label}>
                    <span>{label}</span>
                    <p>{copy.variables[index]}</p>
                  </div>
                ))}
              </div>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next design-start" label={copy.start} href="/gradem1/exp2/lab" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
