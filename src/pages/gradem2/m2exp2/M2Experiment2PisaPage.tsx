import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import '../m2exp1/m2-objectives.css'
import '../m2exp1/m2-pisa.css'
import './m2-exp2-pisa.css'

const copy = {
  th: {
    back: 'ย้อนกลับ', title: 'ภารกิจ PISA', experiment: 'การทดลองที่ 2', mystery: 'ผสม ORS ให้น้อง\nอย่างปลอดภัย', badge: 'PISA 2 · ออกแบบ · แปลข้อมูล',
    heading: 'ภารกิจ PISA 2 · ออกแบบและประเมินการสืบเสาะ', scenarioTitle: 'สถานการณ์',
    scenario: 'ฟรีดาสผสม ORS 1 ซองในแก้ว 2 ใบขนาดไม่เท่ากัน แล้วสรุปว่า “แก้วไหนก็ได้ ขอแค่ใส่ผง 1 ซอง”', smallGlass: 'แก้ว 125 mL', largeGlass: 'แก้ว 500 mL',
    q1Label: 'ข้อ 1 · เลือกตอบ · 1 คะแนน', q1: 'วิธีผสมของฟรีดาสมีข้อบกพร่องอะไร', q1Options: [
      'เลือกใช้แก้วคนละสี ทำให้สังเกตสีของสารละลายได้ยาก',
      'ใช้ผง ORS เพียง 1 ซอง จึงมีตัวละลายน้อยเกินไป',
      'ไม่ได้เปลี่ยนอุณหภูมิน้ำ ทำให้ทดลองได้เพียงครั้งเดียว',
      'ไม่ได้กำหนดปริมาตรน้ำให้เท่ากัน ความเข้มข้นจึงต่างกัน ควรผสมตามปริมาตรที่ระบุ',
    ],
    q2Label: 'ข้อ 2 · เลือกตอบ · 1 คะแนน', q2: 'ใช้น้ำ 500 mL กับผง 1 ซอง ได้กี่ % และมีผลอย่างไร', q2Options: [
      'ได้ 1% เจือจางเกินไป ร่างกายอาจได้รับเกลือแร่ไม่เพียงพอ',
      'ได้ 2% ตรงตามเป้าหมายและปลอดภัย',
      'ได้ 4% เข้มข้นเกินไป เพราะมีน้ำมากขึ้น',
      'ได้ 5% ความเข้มข้นไม่ขึ้นกับปริมาตรน้ำ',
    ],
    submit: 'ส่งคำตอบ', submitted: 'ตรวจคำตอบแล้ว', answer: 'เฉลย', correct: 'ถูกต้อง', wrong: 'ลองทบทวนการคำนวณความเข้มข้นและข้อมูลจากการทดลองอีกครั้ง', points: 'คะแนน', next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Misi PISA', experiment: 'Eksperimen 2', mystery: 'Bancuh ORS untuk adik\ndengan selamat', badge: 'PISA 2 · Mereka bentuk · Tafsir data',
    heading: 'Misi PISA 2 · Mereka bentuk dan menilai penyiasatan', scenarioTitle: 'Situasi',
    scenario: 'Frida membancuh satu paket ORS dalam dua gelas yang berlainan saiz, lalu menyimpulkan bahawa mana-mana gelas boleh digunakan asalkan satu paket serbuk dimasukkan.', smallGlass: 'Gelas 125 mL', largeGlass: 'Gelas 500 mL',
    q1Label: 'Soalan 1 · Pilihan jawapan · 1 markah', q1: 'Apakah kelemahan cara bancuhan Frida?', q1Options: [
      'Memilih gelas berlainan warna menyukarkan pemerhatian warna larutan',
      'Menggunakan hanya satu paket ORS menyebabkan zat terlarut terlalu sedikit',
      'Tidak mengubah suhu air bermakna hanya satu percubaan boleh dibuat',
      'Isi padu air tidak ditetapkan sama, jadi kepekatannya berbeza; bancuh mengikut isi padu yang ditetapkan',
    ],
    q2Label: 'Soalan 2 · Pilihan jawapan · 1 markah', q2: 'Apakah kepekatan satu paket serbuk dalam 500 mL air dan kesannya?', q2Options: [
      '1%, terlalu cair dan badan mungkin tidak mendapat garam mineral yang mencukupi',
      '2%, tepat pada sasaran dan selamat',
      '4%, terlalu pekat kerana air lebih banyak',
      '5%, kepekatan tidak bergantung pada isi padu air',
    ],
    submit: 'Hantar jawapan', submitted: 'Jawapan disemak', answer: 'Jawapan', correct: 'Betul', wrong: 'Semak semula pengiraan kepekatan dan keputusan eksperimen.', points: 'Markah', next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'PISA Mission', experiment: 'Experiment 2', mystery: 'Mix ORS for a child\nsafely', badge: 'PISA 2 · Design · Interpret data',
    heading: 'PISA Mission 2 · Design and evaluate an inquiry', scenarioTitle: 'Scenario',
    scenario: 'Frida mixes one ORS sachet into two differently sized cups and concludes that either cup is fine as long as she uses one sachet.', smallGlass: '125 mL cup', largeGlass: '500 mL cup',
    q1Label: 'Question 1 · Multiple choice · 1 point', q1: 'What is the flaw in Frida’s mixing method?', q1Options: [
      'Using different colored cups makes the solution color hard to observe',
      'Using only one ORS sachet means there is too little solute',
      'Not changing the water temperature means only one trial is possible',
      'The water volume is not controlled, so concentration varies; use the specified volume',
    ],
    q2Label: 'Question 2 · Multiple choice · 1 point', q2: 'What concentration results from one sachet in 500 mL, and what is the effect?', q2Options: [
      '1%, too dilute, so the body may not receive enough electrolytes',
      '2%, on target and safe',
      '4%, too concentrated because there is more water',
      '5%, concentration does not depend on water volume',
    ],
    submit: 'Submit answers', submitted: 'Answers checked', answer: 'Answer', correct: 'Correct', wrong: 'Review the concentration calculation and experiment data.', points: 'Score', next: 'Next', language: 'Choose language',
  },
} satisfies Record<Language, Record<string, string | string[]>>

const thaiLetters = ['ก', 'ข', 'ค', 'ง']

function CupComparison({ smallLabel, largeLabel }: { smallLabel: string; largeLabel: string }) {
  return (
    <div className="m2-exp2-pisa-cups" aria-label={`${smallLabel} compared with ${largeLabel}`}>
      <div className="m2-exp2-pisa-cup-item">
        <div className="m2-exp2-pisa-cup small"><span>125</span></div>
        <strong>{smallLabel}</strong>
      </div>
      <div className="m2-exp2-pisa-cup-item">
        <div className="m2-exp2-pisa-cup large"><span>500</span></div>
        <strong>{largeLabel}</strong>
      </div>
    </div>
  )
}

export function M2Experiment2PisaPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [firstChoice, setFirstChoice] = useState<number | null>(null)
  const [secondChoice, setSecondChoice] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const text = copy[language]
  const q1Options = text.q1Options as string[]
  const q2Options = text.q2Options as string[]
  const score = Number(firstChoice === 3) + Number(secondChoice === 0)
  const letters = language === 'th' ? thaiLetters : ['A', 'B', 'C', 'D']

  function choose(question: 1 | 2, index: number) {
    if (question === 1) setFirstChoice(index)
    else setSecondChoice(index)
    setSubmitted(false)
  }

  return (
    <main className="m2-objectives-page m2-pisa-page m2-exp2-pisa-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content m2-pisa-shell">
        <header className="m2-objectives-header m2-pisa-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp2/answers" label={text.back as string} />
          <div className="m2-objectives-title m2-pisa-title"><span className="m2-objectives-number m2-pisa-number">11</span><h1>{text.title as string}</h1></div>
        </header>
        <div className="m2-objectives-layout m2-pisa-layout">
          <aside className="m2-objectives-sidecard m2-pisa-sidecard">
            <h2>{text.experiment as string}</h2><div className="m2-exp2-pisa-icon" aria-hidden="true">🩺</div>
            <h3>{text.mystery as string}</h3><span className="m2-pisa-badge">{text.badge as string}</span>
          </aside>
          <section className="m2-pisa-panel m2-exp2-pisa-panel">
            <h2 className="m2-pisa-panel-title">{text.heading as string}</h2>
            <div className="m2-pisa-workspace">
              <article className="m2-pisa-scenario m2-exp2-pisa-scenario">
                <h3>{text.scenarioTitle as string}</h3><p>{text.scenario as string}</p>
                <CupComparison smallLabel={text.smallGlass as string} largeLabel={text.largeGlass as string} />
              </article>
              <div className="m2-pisa-questions">
                {([1, 2] as const).map((question) => {
                  const isFirst = question === 1
                  const selected = isFirst ? firstChoice : secondChoice
                  const options = isFirst ? q1Options : q2Options
                  const correct = isFirst ? 3 : 0
                  return <fieldset className="m2-pisa-question" key={question}>
                    <legend><span>{(isFirst ? text.q1Label : text.q2Label) as string}</span>{(isFirst ? text.q1 : text.q2) as string}</legend>
                    {options.map((option, index) => <label className={`m2-pisa-choice${selected === index ? ' is-selected' : ''}`} key={option}>
                      <input type="radio" name={`m2-exp2-pisa-q${question}`} checked={selected === index} onChange={() => choose(question, index)} />
                      <span>{letters[index]}</span>{option}
                    </label>)}
                    {submitted && <p className={`m2-pisa-feedback${selected === correct ? ' is-correct' : ' is-wrong'}`}>{text.answer as string}: {selected === correct ? '✓' : '—'} {options[correct]}</p>}
                  </fieldset>
                })}
              </div>
            </div>
            <footer className="m2-pisa-footer">
              {submitted && <p className="m2-pisa-score">{text.points as string}: {score} / 2</p>}
              <button className="m2-pisa-submit" type="button" onClick={() => setSubmitted(true)}>{(submitted ? text.submitted : text.submit) as string}<span aria-hidden="true">›</span></button>
            </footer>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language as string} onLanguageChange={setLanguage} />
      <NextButton className="m2-pisa-next" label={text.next as string} href="/gradem2/m2exp2/summary" />
    </main>
  )
}
