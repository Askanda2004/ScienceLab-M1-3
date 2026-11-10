import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import boilingIllustration from '../../../assets/experiment-boiling.svg'
import densityIllustration from '../../../assets/experiment-density.svg'
import tdsIllustration from '../../../assets/experiment-tds.svg'
import coastIllustration from '../../../assets/grade-m1-coast.svg'
import type { Language } from '../../../types/language'
import './exp1.css'

const experimentImages = [boilingIllustration, densityIllustration, tdsIllustration]

const translations = {
  th: {
    back: 'เลือกระดับชั้น',
    pageTitle: 'เลือกการทดลอง',
    gradeTitle: 'ชั้นมัธยมศึกษาปีที่ 1',
    topic: 'สารรอบตัวเรา',
    experimentsLabel: 'รายการทดลองชั้นมัธยมศึกษาปีที่ 1',
    experimentTitle: (number: number) => `การทดลองที่ ${number}`,
    mystery: 'ปริศนา',
    start: 'เริ่มทดลอง',
    languageLabel: 'ภาษา',
    experiments: [
      { name: 'จุดเดือด', question: 'ทำไมน้ำเชื่อมถึงเดือดช้ากว่าน้ำเปล่า ทั้งที่ตั้งไฟพร้อมกัน?', tag: 'จุดเดือด' },
      { name: 'ความหนาแน่น', question: 'ทำไมเราลอยตัวในน้ำทะเลได้ง่ายกว่าในสระน้ำจืด?', tag: 'ความหนาแน่น' },
      { name: 'TDS', question: 'ทำไมน้ำจากแหล่งต่าง ๆ จึงมีปริมาณสารที่ละลายอยู่ไม่เท่ากัน?', tag: 'TDS' },
    ],
  },
  ms: {
    back: 'Pilih tingkatan',
    pageTitle: 'Pilih Eksperimen',
    gradeTitle: 'Tingkatan 1',
    topic: 'Bahan di Sekeliling Kita',
    experimentsLabel: 'Senarai eksperimen Tingkatan 1',
    experimentTitle: (number: number) => `Eksperimen ${number}`,
    mystery: 'Persoalan',
    start: 'Mula Eksperimen',
    languageLabel: 'Bahasa',
    experiments: [
      { name: 'Takat Didih', question: 'Mengapa air gula mendidih lebih lambat daripada air kosong walaupun dipanaskan serentak?', tag: 'Takat Didih' },
      { name: 'Ketumpatan', question: 'Mengapa kita lebih mudah terapung di laut berbanding di kolam air tawar?', tag: 'Ketumpatan' },
      { name: 'TDS', question: 'Mengapa jumlah bahan terlarut berbeza antara sumber air?', tag: 'TDS' },
    ],
  },
  en: {
    back: 'Choose grade',
    pageTitle: 'Choose an Experiment',
    gradeTitle: 'Grade 7',
    topic: 'Everyday Materials',
    experimentsLabel: 'Grade 7 experiments',
    experimentTitle: (number: number) => `Experiment ${number}`,
    mystery: 'Question',
    start: 'Start experiment',
    languageLabel: 'Language',
    experiments: [
      { name: 'Boiling Point', question: 'Why does sugar water boil more slowly than plain water when heated at the same time?', tag: 'Boiling point' },
      { name: 'Density', question: 'Why is it easier to float in seawater than in a freshwater pool?', tag: 'Density' },
      { name: 'TDS', question: 'Why do different water sources contain different amounts of dissolved substances?', tag: 'TDS' },
    ],
  },
} satisfies Record<Language, {
  back: string
  pageTitle: string
  gradeTitle: string
  topic: string
  experimentsLabel: string
  experimentTitle: (number: number) => string
  mystery: string
  start: string
  languageLabel: string
  experiments: { name: string; question: string; tag: string }[]
}>

export function GradeM1Exp1Page() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = translations[language]

  return (
    <main className="exp1-page">
      <div className="exp1-scenery" aria-hidden="true">
        <span className="exp1-sun" />
        <span className="exp1-cloud cloud-one" />
        <span className="exp1-cloud cloud-two" />
        <span className="exp1-sea" />
        <span className="exp1-island" />
      </div>

      <div className="exp1-content">
        <header className="exp1-header">
          <BackButton className="exp1-back" href="/grades" label={copy.back} />
          <h1>{copy.pageTitle}</h1>
        </header>

        <div className="exp1-layout">
          <aside className="exp1-sidebar">
            <section className="grade-intro">
              <h2>{copy.gradeTitle}</h2>
              <div className="coast-illustration" aria-hidden="true">
                <img className="coast-image" src={coastIllustration} alt="" />
              </div>
              <p className="grade-topic">{copy.topic}</p>
            </section>
            {/* <div className="mission-note">
              <span className="student-illustration" aria-hidden="true">🧑🏻‍🔬</span>
              <p>เริ่มจากภารกิจที่ 1 ที่ครัวของมะนะ แล้วไปทะเลกับร้านลุงช่างกัน!</p>
            </div> */}
          </aside>

          <section className="experiment-list" aria-label={copy.experimentsLabel}>
            {copy.experiments.map((experiment, index) => (
              <article className="experiment-card" key={index}>
                {/* {experiment.recommended && <span className="recommended-label">แนะนำเริ่มที่นี่</span>} */}
                <header className="experiment-card-heading">
                  <span className="experiment-number">{index + 1}</span>
                  <h2>{copy.experimentTitle(index + 1)}</h2>
                </header>
                <div className={`experiment-art ${['peach', 'sky', 'lilac'][index]}`}>
                  <img className="experiment-art-image" src={experimentImages[index]} alt="" />
                </div>
                <div className="experiment-details">
                  <h3>{experiment.name}</h3>
                  <p>{copy.mystery}: {experiment.question}</p>
                  <span className="experiment-tag">{experiment.name}</span>
                </div>
                <NextButton
                  className="experiment-start"
                  label={copy.start}
                  href={index === 0 ? '/gradem1/exp1/objectives' : index === 1 ? '/gradem1/exp2' : index === 2 ? '/gradem1/exp3' : undefined}
                />
              </article>
            ))}
          </section>
        </div>
      </div>

      <LanguageSwitcher language={language} label={copy.languageLabel} onLanguageChange={setLanguage} />
    </main>
  )
}
