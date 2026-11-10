import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import densityImage from '../../../assets/experiment-density.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/science-skills.css'
import './exp2.css'

const content = {
  th: {
    back: 'ย้อนกลับ', title: 'ทักษะกระบวนการทางวิทยาศาสตร์', subtitle: 'ม.1 สารรอบตัว · การทดลองที่ 2 ความลับของทะเลปัตตานี',
    experiment: 'การทดลองที่ 2', mystery: 'ความลับของทะเลปัตตานี', pisa: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    next: 'ต่อไป', language: 'เลือกภาษา',
    cards: [
      ['ทักษะการวัด', 'ชั่งมวลด้วยเครื่องชั่งดิจิทัล และตวงปริมาตรด้วยกระบอกตวง'],
      ['ทักษะการคำนวณ', 'คำนวณความหนาแน่น = มวล ÷ ปริมาตร (g/mL)'],
      ['ทักษะการตั้งสมมติฐาน', 'คาดคะเนว่าถ้าเกลือมากขึ้น ไข่จะลอยหรือจม'],
      ['ทักษะการกำหนดและควบคุมตัวแปร', 'เปลี่ยนเฉพาะปริมาณเกลือ คงปริมาตรและใช้วัตถุชิ้นเดียวกัน'],
    ],
  },
  ms: {
    back: 'Kembali', title: 'Kemahiran Proses Sains', subtitle: 'Tingkatan 1 · Bahan di sekeliling · Eksperimen 2 Rahsia Laut Pattani',
    experiment: 'Eksperimen 2', mystery: 'Rahsia Laut Pattani', pisa: 'PISA 2 · Mereka bentuk · Mentafsir data',
    next: 'Seterusnya', language: 'Pilih bahasa',
    cards: [
      ['Kemahiran mengukur', 'Timbang jisim menggunakan penimbang digital dan sukat isi padu dengan silinder penyukat'],
      ['Kemahiran mengira', 'Kira ketumpatan = jisim ÷ isi padu (g/mL)'],
      ['Kemahiran membuat hipotesis', 'Ramalkan sama ada telur akan terapung atau tenggelam apabila garam ditambah'],
      ['Menentukan dan mengawal pemboleh ubah', 'Ubah jumlah garam sahaja, kekalkan isi padu dan gunakan objek yang sama'],
    ],
  },
  en: {
    back: 'Back', title: 'Science Process Skills', subtitle: 'Grade 7 · Matter Around Us · Experiment 2: Secrets of Pattani Sea',
    experiment: 'Experiment 2', mystery: 'Secrets of Pattani Sea', pisa: 'PISA 2 · Design · Interpret data',
    next: 'Continue', language: 'Choose language',
    cards: [
      ['Measurement skills', 'Measure mass with a digital scale and volume with a graduated cylinder'],
      ['Calculation skills', 'Calculate density = mass ÷ volume (g/mL)'],
      ['Hypothesis skills', 'Predict whether an egg will float or sink as more salt is added'],
      ['Identifying and controlling variables', 'Change only the amount of salt; keep the volume and test object the same'],
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; subtitle: string; experiment: string; mystery: string; pisa: string;
  next: string; language: string; cards: [string, string][]
}>

export function Experiment2ScienceSkillsPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = content[language]

  return (
    <main className="objectives-page exp2-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content">
        <header className="objectives-header">
          <BackButton className="objectives-back" href="/gradem1/exp2/vocabulary" label={copy.back} />
          <div className="objectives-title exp2-title">
            <span className="objectives-number">3</span>
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
            <section className="science-skills-panel" aria-label={copy.title}>
              <ol className="science-skills-grid">
                {copy.cards.map(([title, description], index) => (
                  <li className={`science-skill-card science-skill-card-${index + 1}`} key={title}>
                    <div className="science-skill-heading">
                      <span>{index + 1}</span>
                      <h2>{title}</h2>
                    </div>
                    <p>{description}</p>
                  </li>
                ))}
              </ol>
            </section>
            <div className="objectives-actions">
              <NextButton className="objectives-next" label={copy.next} href="/gradem1/exp2/thinking" />
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
