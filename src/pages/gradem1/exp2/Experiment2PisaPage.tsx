import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import densityImage from '../../../assets/experiment-density.svg'
import type { Language } from '../../../types/language'
import '../exp1/objectives.css'
import '../exp1/pisa.css'
import './exp2.css'

const copy = {
  th: {
    back: 'ย้อนกลับ', title: 'ภารกิจ PISA', experiment: 'การทดลองที่ 2', mystery: 'ความลับของทะเลปัตตานี', badge: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    heading: 'ภารกิจ PISA 2 · ออกแบบการสืบเสาะและแปลข้อมูล', scenarioTitle: 'สถานการณ์',
    scenario: 'อามีนะห์ชั่งน้ำจืด 100 mL กับน้ำทะเล 200 mL แล้วสรุปว่า “น้ำทะเลหนักกว่า จึงหนาแน่นกว่า” นักเรียนมีตารางผลการทดลอง 4 แถว',
    q1Label: 'ข้อ 1 · เลือกตอบ · 1 คะแนน', q2Label: 'ข้อ 2 · เลือกตอบ · 1 คะแนน',
    q1: 'การทดลองของอามีนะห์มีข้อบกพร่องอะไร', q1Options: [
      'ชั่งมวลของสารก่อนทดลอง ทำให้ค่าความหนาแน่นเปลี่ยนแปลงไป',
      'ใช้ภาชนะทดลองต่างสีกัน ทำให้ผลการทดลองมีความคลาดเคลื่อน',
      'ใช้สารชนิดเดียวกันในการทดลอง ทำให้ไม่สามารถเปรียบเทียบผลได้',
      'ใช้ปริมาตรไม่เท่ากัน ทำให้เปรียบเทียบเฉพาะมวลไม่ได้ ต้องคำนวณมวล ÷ ปริมาตรก่อนเปรียบเทียบ',
    ],
    q2: 'จากตาราง ของเหลวใดทำให้ไข่ (1.07 g/mL) ลอยได้', q2Options: [
      'น้ำเปล่า เพราะมีความหนาแน่นน้อยกว่าไข่',
      'น้ำเกลือ 1 ช้อนชา เพราะมีความหนาแน่นใกล้เคียงกับไข่',
      'น้ำเกลือ 3 ช้อนชา (1.09 g/mL) เพราะมีความหนาแน่นมากกว่าไข่ (1.07 g/mL)',
      'น้ำเปล่าผสมเกลือเล็กน้อย เพราะเกลือทำให้ไข่มีน้ำหนักลดลง',
    ],
    submit: 'ส่งคำตอบ', submitted: 'ตรวจคำตอบแล้ว', answer: 'เฉลย', correct: 'ถูกต้อง', wrong: 'ลองทบทวนข้อมูลเรื่องมวล ปริมาตร และความหนาแน่นอีกครั้ง', points: 'คะแนน', language: 'เลือกภาษา', fresh: 'น้ำจืด 100 mL', sea: 'น้ำทะเล 200 mL',
  },
  ms: {
    back: 'Kembali', title: 'Misi PISA', experiment: 'Eksperimen 2', mystery: 'Rahsia Laut Pattani', badge: 'PISA 2 · Reka bentuk · Tafsir data',
    heading: 'Misi PISA 2 · Mereka bentuk penyiasatan dan mentafsir data', scenarioTitle: 'Situasi',
    scenario: 'Aminah menimbang 100 mL air tawar dan 200 mL air laut, lalu menyimpulkan bahawa air laut lebih berat dan lebih tumpat. Murid mempunyai jadual keputusan eksperimen dengan 4 baris.',
    q1Label: 'Soalan 1 · Pilihan jawapan · 1 markah', q2Label: 'Soalan 2 · Pilihan jawapan · 1 markah',
    q1: 'Apakah kelemahan eksperimen Aminah?', q1Options: [
      'Menimbang bahan sebelum eksperimen mengubah ketumpatannya',
      'Menggunakan bekas berlainan warna menyebabkan keputusan tidak tepat',
      'Menggunakan bahan yang sama menjadikan perbandingan mustahil',
      'Isi padu tidak sama, jadi jisim sahaja tidak boleh dibandingkan; kira jisim ÷ isi padu dahulu',
    ],
    q2: 'Berdasarkan jadual, cecair manakah membolehkan telur (1.07 g/mL) terapung?', q2Options: [
      'Air tawar kerana ketumpatannya lebih rendah daripada telur',
      'Air garam 1 sudu teh kerana ketumpatannya hampir sama dengan telur',
      'Air garam 3 sudu teh (1.09 g/mL) kerana ketumpatannya lebih tinggi daripada telur (1.07 g/mL)',
      'Air tawar dengan sedikit garam kerana garam mengurangkan berat telur',
    ],
    submit: 'Hantar jawapan', submitted: 'Jawapan disemak', answer: 'Jawapan', correct: 'Betul', wrong: 'Semak semula maklumat tentang jisim, isi padu dan ketumpatan.', points: 'Markah', language: 'Pilih bahasa', fresh: 'Air tawar 100 mL', sea: 'Air laut 200 mL',
  },
  en: {
    back: 'Back', title: 'PISA Mission', experiment: 'Experiment 2', mystery: 'Secrets of Pattani Sea', badge: 'PISA 2 · Design · Interpret data',
    heading: 'PISA Mission 2 · Design an inquiry and interpret data', scenarioTitle: 'Scenario',
    scenario: 'Aminah weighs 100 mL of fresh water and 200 mL of seawater, then concludes that seawater is heavier and therefore denser. The class has a four-row results table.',
    q1Label: 'Question 1 · Multiple choice · 1 point', q2Label: 'Question 2 · Multiple choice · 1 point',
    q1: 'What is a flaw in Aminah’s experiment?', q1Options: [
      'Weighing the substance before the experiment changes its density',
      'Using containers of different colors makes the results inaccurate',
      'Using the same substance means the results cannot be compared',
      'The volumes differ, so mass alone cannot be compared; calculate mass ÷ volume first',
    ],
    q2: 'According to the table, which liquid makes an egg (1.07 g/mL) float?', q2Options: [
      'Fresh water, because it is less dense than the egg',
      'Salt water with 1 teaspoon, because its density is close to the egg’s',
      'Salt water with 3 teaspoons (1.09 g/mL), because it is denser than the egg (1.07 g/mL)',
      'Fresh water with a little salt, because salt reduces the egg’s weight',
    ],
    submit: 'Submit answers', submitted: 'Answers checked', answer: 'Answer', correct: 'Correct', wrong: 'Review mass, volume, and density.', points: 'Score', language: 'Choose language', fresh: 'Fresh water 100 mL', sea: 'Seawater 200 mL',
  },
} satisfies Record<Language, Record<string, string | string[]>>

const thaiOptionLetters = ['ก', 'ข', 'ค', 'ง']

export function Experiment2PisaPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [firstChoice, setFirstChoice] = useState<number | null>(null)
  const [secondChoice, setSecondChoice] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const text = copy[language]
  const q1Options = text.q1Options as string[]
  const q2Options = text.q2Options as string[]
  const score = Number(firstChoice === 3) + Number(secondChoice === 2)
  const letters = language === 'th' ? thaiOptionLetters : ['A', 'B', 'C', 'D']

  const choose = (question: 1 | 2, index: number) => {
    if (question === 1) setFirstChoice(index)
    else setSecondChoice(index)
    setSubmitted(false)
  }

  return (
    <main className="objectives-page pisa-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content pisa-shell">
        <header className="objectives-header pisa-header">
          <BackButton className="pisa-back" href="/gradem1/exp2/conclusion" label={text.back as string} />
          <div className="objectives-title pisa-title"><span className="objectives-number pisa-number">11</span><h1>{text.title as string}</h1></div>
        </header>

        <div className="objectives-layout pisa-layout">
          <aside className="objectives-sidecard pisa-sidecard">
            <h2>{text.experiment as string}</h2>
            <img src={densityImage} alt="" />
            <h3>{text.mystery as string}</h3>
            <span className="pisa-badge">{text.badge as string}</span>
          </aside>

          <section className="pisa-panel">
            <h2 className="pisa-panel-title">{text.heading as string}</h2>
            <div className="pisa-workspace">
              <article className="pisa-scenario">
                <h3>{text.scenarioTitle as string}</h3>
                <p>{text.scenario as string}</p>
                <div className="density-comparison" aria-label={`${text.fresh} compared with ${text.sea}`}>
                  <div className="density-vessel density-vessel-fresh"><span /><strong>100 mL</strong><small>{text.fresh as string}</small></div>
                  <div className="density-vessel density-vessel-sea"><span /><strong>200 mL</strong><small>{text.sea as string}</small></div>
                </div>
              </article>

              <div className="pisa-questions">
                <fieldset className="pisa-question pisa-question-blue">
                  <legend><span>{text.q1Label as string}</span>{text.q1 as string}</legend>
                  {q1Options.map((option, index) => (
                    <label className={`pisa-choice${firstChoice === index ? ' is-selected' : ''}`} key={option}>
                      <input type="radio" name="exp2-pisa-q1" checked={firstChoice === index} onChange={() => choose(1, index)} />
                      <span>{letters[index]}</span>{option}
                    </label>
                  ))}
                  {submitted && <p className={`pisa-feedback${firstChoice === 3 ? ' is-correct' : ' is-wrong'}`}>{text.answer as string} {firstChoice === 3 ? '✓' : '—'} {q1Options[3]}</p>}
                </fieldset>

                <fieldset className="pisa-question pisa-question-blue">
                  <legend><span>{text.q2Label as string}</span>{text.q2 as string}</legend>
                  {q2Options.map((option, index) => (
                    <label className={`pisa-choice${secondChoice === index ? ' is-selected' : ''}`} key={option}>
                      <input type="radio" name="exp2-pisa-q2" checked={secondChoice === index} onChange={() => choose(2, index)} />
                      <span>{letters[index]}</span>{option}
                    </label>
                  ))}
                  {submitted && <p className={`pisa-feedback${secondChoice === 2 ? ' is-correct' : ' is-wrong'}`}>{text.answer as string} {secondChoice === 2 ? '✓' : '—'} {q2Options[2]}</p>}
                </fieldset>
              </div>
            </div>

            <footer className="pisa-footer">
              {submitted && <p className="pisa-score">{text.points as string}: {score} / 2</p>}
              <button className="pisa-submit" type="button" onClick={() => setSubmitted(true)}>{(submitted ? text.submitted : text.submit) as string}<span aria-hidden="true">›</span></button>
            </footer>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language as string} onLanguageChange={setLanguage} />
      <NextButton
        className="pisa-next"
        label={language === 'th' ? 'ต่อไป' : language === 'ms' ? 'Seterusnya' : 'Next'}
        href="/gradem1/exp2/summary"
      />
    </main>
  )
}
