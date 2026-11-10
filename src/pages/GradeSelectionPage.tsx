import { useState } from 'react'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { BackButton } from '../components/navigation/BackButton'
import type { Language } from '../types/language'
import coastImage from '../assets/grade-m1-coast.svg'
import circuitImage from '../assets/lab-circuit.svg'
import reactionImage from '../assets/lab-chemistry.svg'
import './grade-selection.css'

const pageCopy = {
  th: {
    back: 'กลับหน้าแรก',
    enter: 'เข้าสู่ชั้น',
    heading: 'เลือกระดับชั้น',
    gradeTitle: (number: number) => `ชั้นมัธยมศึกษาปีที่ ${number}`,
    topics: ['สารรอบตัวเรา', 'สารละลาย', 'ปฏิกิริยา'],
    ariaLabel: 'เลือกระดับชั้นมัธยมศึกษา',
    languageLabel: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali ke laman utama',
    enter: 'Masuk ke',
    heading: 'Pilih Tingkatan',
    gradeTitle: (number: number) => `Tingkatan ${number}`,
    topics: ['Bahan di Sekeliling Kita', 'Larutan', 'Tindak Balas'],
    ariaLabel: 'Pilih tingkatan sekolah menengah',
    languageLabel: 'Pilih bahasa',
  },
  en: {
    back: 'Back to home',
    enter: 'Open',
    heading: 'Choose a Grade',
    gradeTitle: (number: number) => `Grade ${number}`,
    topics: ['Everyday Materials', 'Solutions', 'Reactions'],
    ariaLabel: 'Choose a middle school grade',
    languageLabel: 'Choose language',
  },
} satisfies Record<Language, {
  back: string
  enter: string
  heading: string
  gradeTitle: (number: number) => string
  topics: string[]
  ariaLabel: string
  languageLabel: string
}>

const gradeOptions = [
  { number: 1, image: coastImage, href: '/gradem1/exp1' },
  { number: 2, image: circuitImage },
  { number: 3, image: reactionImage },
]

export function GradeSelectionPage() {
  const [language, setLanguage] = useState<Language>('th')
  const copy = pageCopy[language]

  return (
    <main className="grade-select-page">
      <div className="lab-room-backdrop" aria-hidden="true">
        <div className="room-window window-one" />
        <div className="room-window window-two" />
        <div className="room-shelf" />
        <div className="room-counter" />
        <div className="room-flasks"><span /><span /><span /></div>
      </div>

      <div className="grade-select-content">
        <BackButton className="grade-select-back" href="/" label={copy.back} />
        <header className="grade-select-heading">
          {/* <span className="grade-select-kicker">ห้องทดลองวิทยาศาสตร์เสมือนจริง</span> */}
          <h1>{copy.heading}</h1>
          {/* <p>เลือกชั้นเรียนเพื่อออกเดินทางค้นพบวิทยาศาสตร์</p> */}
        </header>

        <section className="grade-choice-grid" aria-label={copy.ariaLabel}>
          {gradeOptions.map((grade) => {
            const card = (
              <article className={`grade-choice grade-choice-${grade.number}`} key={grade.number}>
                <h2>{copy.gradeTitle(grade.number)}</h2>
                <img src={grade.image} alt="" />
                <div className="grade-choice-footer">
                  <h3>{copy.topics[grade.number - 1]}</h3>
                </div>
              </article>
            )

            return grade.href ? (
              <a className="grade-choice-link" href={grade.href} key={grade.number} aria-label={`${copy.enter} ${copy.gradeTitle(grade.number)}`}>
                {card}
              </a>
            ) : card
          })}
        </section>
      </div>
      <LanguageSwitcher language={language} label={copy.languageLabel} onLanguageChange={setLanguage} />
    </main>
  )
}
