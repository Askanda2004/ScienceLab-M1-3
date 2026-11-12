import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import streetIllustration from '../../../assets/grade-m2-street.svg'
import type { Language } from '../../../types/language'
import './m2exp1.css'

const copyByLanguage = {
  th: {
    back: 'เลือกระดับชั้น', title: 'เลือกการทดลอง', grade: 'ชั้นมัธยมศึกษาปีที่ 2', topic: 'สารละลาย', start: 'เริ่มทดลอง', question: 'ปริศนา',
    experiments: [
      { title: 'สภาพละลายได้', question: 'ทำไมชาเย็นมีน้ำตาลเหลือก้นแก้ว แต่ชาร้อนใส่น้ำตาลเท่ากันกลับละลายหมด?', tag: 'สภาพละลายได้', icon: '☕' },
      { title: 'ความเข้มข้นร้อยละ', question: 'ทำไม ORS 1 ซองต้องผสมน้ำ 250 มิลลิลิตรพอดี ใส่น้ำมากกว่านี้ได้ไหม?', tag: 'ความเข้มข้น', icon: '♧' },
      { title: 'การเจือจางอย่างปลอดภัย', question: 'ทำไมเมื่อต้องเทกรดลงน้ำทุกครั้ง ใส่กรดมากขึ้นยางจะแข็งเร็วกว่าไหม?', tag: 'การเจือจาง', icon: '🪣' },
    ],
  },
  ms: {
    back: 'Pilih tingkatan', title: 'Pilih eksperimen', grade: 'Tingkatan 2', topic: 'Larutan', start: 'Mula eksperimen', question: 'Persoalan',
    experiments: [
      { title: 'Keterlarutan', question: 'Mengapa gula tertinggal di dasar teh sejuk tetapi larut dalam teh panas?', tag: 'Keterlarutan', icon: '☕' },
      { title: 'Kepekatan peratus', question: 'Mengapa satu paket ORS perlu dicampur dengan tepat 250 ml air?', tag: 'Kepekatan', icon: '♧' },
      { title: 'Pencairan selamat', question: 'Mengapa asid perlu dituang ke dalam air semasa pencairan?', tag: 'Pencairan', icon: '🪣' },
    ],
  },
  en: {
    back: 'Choose grade', title: 'Choose an Experiment', grade: 'Grade 8', topic: 'Solutions', start: 'Start experiment', question: 'Question',
    experiments: [
      { title: 'Solubility', question: 'Why does sugar remain at the bottom of iced tea but dissolve in hot tea?', tag: 'Solubility', icon: '☕' },
      { title: 'Percentage concentration', question: 'Why must one ORS sachet be mixed with exactly 250 ml of water?', tag: 'Concentration', icon: '♧' },
      { title: 'Safe dilution', question: 'Why should acid be added to water during dilution?', tag: 'Dilution', icon: '🪣' },
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; grade: string; topic: string; start: string; question: string
  experiments: { title: string; question: string; tag: string; icon: string }[]
}>

export function GradeM2Exp1Page() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = copyByLanguage[language]

  return (
    <main className="m2-exp1-page">
      <div className="m2-exp1-backdrop" style={{ backgroundImage: `url(${streetIllustration})` }} aria-hidden="true" />
      <div className="m2-exp1-content">
        <header className="m2-exp1-header">
          <BackButton className="m2-exp1-back" href="/grades" label={copy.back} />
          <h1>{copy.title}</h1>
        </header>
        <div className="m2-exp1-layout">
          <aside className="m2-exp1-sidebar">
            <section className="m2-exp1-intro">
              <h2>{copy.grade}</h2>
              <div className="m2-exp1-street" style={{ backgroundImage: `url(${streetIllustration})` }} aria-hidden="true" />
              <p>{copy.topic}</p>
            </section>
          </aside>
          <section className="m2-exp1-list" aria-label={copy.title}>
            {copy.experiments.map((experiment, index) => (
              <article className={`m2-exp1-card${index === 0 ? ' is-featured' : ''}`} key={experiment.title}>
                <header className="m2-exp1-card-heading">
                  <span className="m2-exp1-number">{index + 1}</span>
                  <h2>{language === 'th' ? `การทดลองที่ ${index + 1}` : `${language === 'ms' ? 'Eksperimen' : 'Experiment'} ${index + 1}`}</h2>
                </header>
                <div className={`m2-exp1-art art-${index}`} aria-hidden="true"><span>{experiment.icon}</span></div>
                <div className="m2-exp1-details">
                  <h3>{experiment.title}</h3>
                  <p>{copy.question}: {experiment.question}</p>
                  <span className="m2-exp1-tag">{experiment.tag}</span>
                </div>
                <NextButton
                  className="m2-exp1-start"
                  label={copy.start}
                  href={index === 0 ? '/gradem2/m2exp1/objectives' : index === 1 ? '/gradem2/m2exp2/objectives' : '/gradem2/m2exp3/objectives'}
                />
              </article>
            ))}
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label="Language" onLanguageChange={setLanguage} />
    </main>
  )
}
