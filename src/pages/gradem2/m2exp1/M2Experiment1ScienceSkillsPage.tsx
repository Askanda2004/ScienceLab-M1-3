import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import teaImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './m2-objectives.css'
import './m2-science-skills.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ทักษะกระบวนการทางวิทยาศาสตร์', subtitle: 'ม.2 สารละลาย · การทดลองที่ 1 ปริศนาน้ำตาลก้นแก้วชาชัก', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาน้ำตาล\nก้นแก้วชาชัก', pisa: 'PISA 1 · อธิบายปรากฏการณ์', next: 'ต่อไป', language: 'เลือกภาษา',
    cards: [
      ['ทักษะการวัด', 'ใช้เทอร์มอมิเตอร์ตั้งอุณหภูมิน้ำ และนับช้อนตัวละลาย (ช้อนละ 10 g)'],
      ['ทักษะการจัดกระทำและสื่อความหมายข้อมูล', 'บันทึกค่าลงตาราง แล้วเขียนกราฟสภาพละลายได้–อุณหภูมิ'],
      ['ทักษะการตีความหมายข้อมูลและลงข้อสรุป', 'อ่านความชันของกราฟ แล้วสรุปว่าสารใดไวต่ออุณหภูมิมากที่สุด'],
      ['ทักษะการกำหนดและควบคุมตัวแปร', 'ใช้น้ำ 100 g เท่ากันทุกครั้ง และเปลี่ยนเฉพาะอุณหภูมิ'],
    ],
  },
  ms: {
    back: 'Kembali', title: 'Kemahiran Proses Sains', subtitle: 'Tingkatan 2 Larutan · Eksperimen 1 Misteri gula di dasar teh tarik', experiment: 'Eksperimen 1', mystery: 'Misteri gula di\ndasar teh tarik', pisa: 'PISA 1 · Menjelaskan fenomena', next: 'Seterusnya', language: 'Pilih bahasa',
    cards: [
      ['Kemahiran mengukur', 'Gunakan termometer untuk menetapkan suhu air dan kira sudu zat terlarut (10 g setiap sudu)'],
      ['Mengurus dan menyampaikan data', 'Catat bacaan dalam jadual, kemudian lukis graf keterlarutan melawan suhu'],
      ['Mentafsir data dan membuat kesimpulan', 'Baca kecerunan graf dan tentukan bahan yang paling peka terhadap suhu'],
      ['Menentukan dan mengawal pemboleh ubah', 'Gunakan 100 g air setiap kali dan ubah suhu sahaja'],
    ],
  },
  en: {
    back: 'Back', title: 'Science Process Skills', subtitle: 'Grade 8 Solutions · Experiment 1 Sugar at the Bottom of the Teh Tarik Glass', experiment: 'Experiment 1', mystery: 'The sugar at the\nbottom of the tea', pisa: 'PISA 1 · Explain phenomena', next: 'Continue', language: 'Choose language',
    cards: [
      ['Measurement skills', 'Set the water temperature with a thermometer and count solute spoonfuls (10 g per spoon)'],
      ['Organizing and communicating data', 'Record measurements in a table, then draw a solubility–temperature graph'],
      ['Interpreting data and drawing conclusions', 'Read the graph slope and identify which substance is most sensitive to temperature'],
      ['Identifying and controlling variables', 'Use 100 g of water each time and change only the temperature'],
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string; next: string; language: string; cards: [string, string][]
}>

export function M2Experiment1ScienceSkillsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="m2-objectives-page m2-science-skills-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1/vocabulary" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">4</span>
            <div className="m2-science-skills-title-copy">
              <h1>{copy.title}</h1>
              {/* <p>{copy.subtitle}</p> */}
            </div>
          </div>
        </header>
        <div className="m2-objectives-layout">
          <aside className="m2-objectives-sidecard">
            <h2>{copy.experiment}</h2>
            <img src={teaImage} alt="" />
            <h3>{copy.mystery}</h3>
            <span className="m2-pisa-badge">{copy.pisa}</span>
          </aside>
          <div className="m2-objectives-main">
            <section className="m2-objectives-panel m2-science-skills-panel" aria-label={copy.title}>
              <ol className="m2-science-skills-grid">
                {copy.cards.map(([title, description], index) => (
                  <li className={`m2-science-skill-card m2-science-skill-card-${index + 1}`} key={title}>
                    <div className="m2-science-skill-heading">
                      <span>{index + 1}</span>
                      <h2>{title}</h2>
                    </div>
                    <p>{description}</p>
                  </li>
                ))}
              </ol>
            </section>
            <div className="m2-objectives-actions">
              <NextButton className="m2-objectives-next" label={copy.next} href="/gradem2/m2exp1/thinking" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
