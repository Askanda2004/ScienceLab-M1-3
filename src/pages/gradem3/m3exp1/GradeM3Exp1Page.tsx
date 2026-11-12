import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import streetIllustration from '../../../assets/grade-m2-street.svg'
import type { Language } from '../../../types/language'
import './m3exp1.css'

const copyByLanguage = {
  th: {
    back: 'เลือกระดับชั้น', title: 'เลือกการทดลอง', grade: 'ชั้นมัธยมศึกษาปีที่ 3', topic: 'ปฏิกิริยา', start: 'เริ่มทดลอง', question: 'ปริศนา',
    experiments: [
      { title: 'การเกิดสนิม', question: 'ทำไมตะปูที่โดนน้ำและอากาศจึงเกิดสนิมเร็วกว่าตะปูที่แห้ง?', tag: 'การเกิดสนิม', icon: '⚙️' },
      { title: 'การเผาไหม้', question: 'ปัจจัยใดทำให้เทียนติดไฟและเผาไหม้ได้ต่อเนื่อง?', tag: 'การเผาไหม้', icon: '🔥' },
      { title: 'กรดและเบส', question: 'สารใกล้ตัวชนิดใดมีสมบัติเป็นกรดหรือเบส และรู้ได้อย่างไร?', tag: 'กรดและเบส', icon: '🧪' },
    ],
  },
  ms: {
    back: 'Pilih tingkatan', title: 'Pilih eksperimen', grade: 'Tingkatan 3', topic: 'Tindak balas', start: 'Mula eksperimen', question: 'Persoalan',
    experiments: [
      { title: 'Pembentukan karat', question: 'Mengapa paku yang terkena air dan udara berkarat lebih cepat?', tag: 'Karat', icon: '⚙️' },
      { title: 'Pembakaran', question: 'Apakah yang membolehkan lilin menyala dan terus terbakar?', tag: 'Pembakaran', icon: '🔥' },
      { title: 'Asid dan alkali', question: 'Bahan harian manakah bersifat asid atau alkali, dan bagaimana mengenalinya?', tag: 'Asid dan alkali', icon: '🧪' },
    ],
  },
  en: {
    back: 'Choose grade', title: 'Choose an Experiment', grade: 'Grade 9', topic: 'Reactions', start: 'Start experiment', question: 'Question',
    experiments: [
      { title: 'Rust formation', question: 'Why does a nail exposed to water and air rust faster than a dry nail?', tag: 'Rust', icon: '⚙️' },
      { title: 'Combustion', question: 'What allows a candle to ignite and keep burning?', tag: 'Combustion', icon: '🔥' },
      { title: 'Acids and bases', question: 'Which everyday substances are acidic or basic, and how can we tell?', tag: 'Acids and bases', icon: '🧪' },
    ],
  },
} satisfies Record<Language, {
  back: string; title: string; grade: string; topic: string; start: string; question: string
  experiments: { title: string; question: string; tag: string; icon: string }[]
}>

export function GradeM3Exp1Page() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = copyByLanguage[language]

  return (
    <main className="m3-exp1-page">
      <div className="m3-exp1-backdrop" style={{ backgroundImage: `url(${streetIllustration})` }} aria-hidden="true" />
      <div className="m3-exp1-content">
        <header className="m3-exp1-header">
          <BackButton className="m3-exp1-back" href="/grades" label={copy.back} />
          <h1>{copy.title}</h1>
        </header>
        <div className="m3-exp1-layout">
          <aside className="m3-exp1-sidebar">
            <section className="m3-exp1-intro">
              <h2>{copy.grade}</h2>
              <div className="m3-exp1-street" style={{ backgroundImage: `url(${streetIllustration})` }} aria-hidden="true" />
              <p>{copy.topic}</p>
            </section>
          </aside>
          <section className="m3-exp1-list" aria-label={copy.title}>
            {copy.experiments.map((experiment, index) => (
              <article className="m3-exp1-card" key={experiment.title}>
                <header className="m3-exp1-card-heading">
                  <span className="m3-exp1-number">{index + 1}</span>
                  <h2>{language === 'th' ? `การทดลองที่ ${index + 1}` : `${language === 'ms' ? 'Eksperimen' : 'Experiment'} ${index + 1}`}</h2>
                </header>
                <div className={`m3-exp1-art art-${index}`} aria-hidden="true"><span>{experiment.icon}</span></div>
                <div className="m3-exp1-details">
                  <h3>{experiment.title}</h3>
                  <p>{copy.question}: {experiment.question}</p>
                  <span className="m3-exp1-tag">{experiment.tag}</span>
                </div>
                <NextButton className="m3-exp1-start" label={copy.start} />
              </article>
            ))}
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label="Language" onLanguageChange={setLanguage} />
    </main>
  )
}
