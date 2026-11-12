import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import type { Language } from '../../../types/language'
import './m2-objectives.css'
import './m2-pisa.css'

const copy = {
  th: {
    back: 'ย้อนกลับ', title: 'ภารกิจ PISA', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาน้ำตาล\nก้นแก้วชาชัก', badge: 'PISA 1 · อธิบายปรากฏการณ์',
    heading: 'ภารกิจ PISA 1 · อธิบายปรากฏการณ์เชิงวิทยาศาสตร์', scenarioTitle: 'สถานการณ์', scenario: 'กะนะบอกว่า “ถ้าคนแรง ๆ นานขึ้น น้ำตาลในชาเย็นจะละลายหมดเหมือนชาร้อน” นักเรียนมีกราฟสภาพละลายได้ของน้ำตาลและเกลือ',
    q1Label: 'ข้อ 1 · เลือกตอบ · 1 คะแนน', q1: 'ที่ 10 °C น้ำ 100 g ละลายน้ำตาลได้มากที่สุดประมาณกี่กรัม?', q1Options: ['ประมาณ 36 g', 'ประมาณ 190 g', 'ประมาณ 220 g', 'ประมาณ 360 g'],
    q2Label: 'ข้อ 2 · เลือกตอบ · 1 คะแนน', q2: 'การคนแรงขึ้นมีผลต่อสภาพละลายได้หรืออัตราการละลายอย่างไร?', q2Options: ['ทำให้สภาพละลายได้เพิ่มขึ้น', 'ทำให้อุณหภูมิน้ำสูงขึ้นเสมอ', 'ช่วยให้ละลายเร็วขึ้น แต่ปริมาณสูงสุดที่ละลายได้เท่าเดิม', 'ทำให้สารละลายไม่อิ่มตัว'],
    submit: 'ส่งคำตอบ', submitted: 'ตรวจคำตอบแล้ว', answer: 'เฉลย', correct: 'ถูกต้อง', wrong: 'ลองทบทวนข้อมูลจากการทดลองอีกครั้ง', points: 'คะแนน', next: 'ต่อไป', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Misi PISA', experiment: 'Eksperimen 1', mystery: 'Misteri gula di\ndasar teh tarik', badge: 'PISA 1 · Menjelaskan fenomena',
    heading: 'Misi PISA 1 · Menjelaskan fenomena saintifik', scenarioTitle: 'Situasi', scenario: 'Kana berkata, “Jika dikacau kuat lebih lama, gula dalam teh sejuk akan larut sepenuhnya seperti dalam teh panas.” Murid melihat graf keterlarutan gula dan garam.',
    q1Label: 'Soalan 1 · Pilihan jawapan · 1 markah', q1: 'Pada 10 °C, kira-kira berapa gram gula paling banyak larut dalam 100 g air?', q1Options: ['Kira-kira 36 g', 'Kira-kira 190 g', 'Kira-kira 220 g', 'Kira-kira 360 g'],
    q2Label: 'Soalan 2 · Pilihan jawapan · 1 markah', q2: 'Apakah kesan mengacau lebih kuat terhadap keterlarutan atau kadar pelarutan?', q2Options: ['Meningkatkan keterlarutan', 'Sentiasa menaikkan suhu air', 'Mempercepat pelarutan tetapi jumlah maksimum yang larut kekal sama', 'Menghalang larutan daripada menjadi tepu'],
    submit: 'Hantar jawapan', submitted: 'Jawapan disemak', answer: 'Jawapan', correct: 'Betul', wrong: 'Semak semula maklumat eksperimen.', points: 'Markah', next: 'Seterusnya', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'PISA Mission', experiment: 'Experiment 1', mystery: 'The sugar at the\nbottom of the tea', badge: 'PISA 1 · Explain phenomena',
    heading: 'PISA Mission 1 · Explain a scientific phenomenon', scenarioTitle: 'Scenario', scenario: 'Kana says, “If we stir iced tea harder for longer, all the sugar will dissolve just like it does in hot tea.” Students have a solubility graph for sugar and salt.',
    q1Label: 'Question 1 · Multiple choice · 1 point', q1: 'At 10 °C, about how many grams of sugar can dissolve in 100 g of water at most?', q1Options: ['About 36 g', 'About 190 g', 'About 220 g', 'About 360 g'],
    q2Label: 'Question 2 · Multiple choice · 1 point', q2: 'How does stronger stirring affect solubility or the rate of dissolving?', q2Options: ['It increases solubility', 'It always raises the water temperature', 'It makes dissolving faster, but the maximum amount that dissolves stays the same', 'It prevents the solution from becoming saturated'],
    submit: 'Submit answers', submitted: 'Answers checked', answer: 'Answer', correct: 'Correct', wrong: 'Review the experiment data.', points: 'Score', next: 'Continue', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; badge: string; heading: string; scenarioTitle: string; scenario: string;
  q1Label: string; q1: string; q1Options: string[]; q2Label: string; q2: string; q2Options: string[];
  submit: string; submitted: string; answer: string; correct: string; wrong: string; points: string; next: string; language: string
}>

const thaiOptionLetters = ['ก', 'ข', 'ค', 'ง']

function SolubilityGraph() {
  return (
    <svg className="m2-pisa-graph" viewBox="0 0 440 270" role="img" aria-label="Solubility of sugar and salt at different temperatures">
      <rect x="1" y="1" width="438" height="268" rx="14" fill="#fff" />
      <path d="M46 20v214h350" fill="none" stroke="#53617c" strokeWidth="2" />
      {[0, 100, 200, 300, 400].map((value, index) => {
        const y = 234 - index * 49
        return <g key={value}><path d={`M46 ${y}h350`} stroke="#e2e7ef" /><text x="38" y={y + 5} textAnchor="end" fill="#6b7891" fontSize="13">{value}</text></g>
      })}
      <path d="M58 210 155 196 252 176 355 116" fill="none" stroke="#e6813d" strokeWidth="5" strokeLinecap="round" />
      <path d="M58 216 155 216 252 215 355 214" fill="none" stroke="#4c83d2" strokeWidth="5" strokeLinecap="round" />
      {[['10°', 58], ['30°', 155], ['50°', 252], ['80°', 355]].map(([label, x]) => <text key={label} x={x} y="254" textAnchor="middle" fill="#6b7891" fontSize="13">{label}</text>)}
      <circle cx="376" cy="108" r="6" fill="#e6813d" /><text x="388" y="113" fill="#b6532c" fontSize="14" fontWeight="700">น้ำตาล</text>
      <rect x="370" y="208" width="12" height="12" rx="2" fill="#4c83d2" /><text x="388" y="219" fill="#34466f" fontSize="14" fontWeight="700">เกลือ</text>
      <text x="14" y="16" fill="#53617c" fontSize="12">g / น้ำ 100 g</text>
    </svg>
  )
}

export function M2Experiment1PisaPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [firstChoice, setFirstChoice] = useState<number | null>(null)
  const [secondChoice, setSecondChoice] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const text = copy[language]
  const score = Number(firstChoice === 1) + Number(secondChoice === 2)

  const selectChoice = (question: 1 | 2, index: number) => {
    if (question === 1) setFirstChoice(index)
    else setSecondChoice(index)
    setSubmitted(false)
  }

  return (
    <main className="m2-objectives-page m2-pisa-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content m2-pisa-shell">
        <header className="m2-objectives-header m2-pisa-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1/answers" label={text.back} />
          <div className="m2-objectives-title m2-pisa-title"><span className="m2-objectives-number m2-pisa-number">12</span><h1>{text.title}</h1></div>
        </header>

        <div className="m2-objectives-layout m2-pisa-layout">
          <aside className="m2-objectives-sidecard m2-pisa-sidecard">
            <h2>{text.experiment}</h2>
            <div className="m2-pisa-cup" aria-hidden="true">☕</div>
            <h3>{text.mystery}</h3>
            <span className="m2-pisa-badge">{text.badge}</span>
          </aside>

          <section className="m2-pisa-panel">
            <h2 className="m2-pisa-panel-title">{text.heading}</h2>
            <div className="m2-pisa-workspace">
              <article className="m2-pisa-scenario">
                <h3>{text.scenarioTitle}</h3>
                <p>{text.scenario}</p>
                <SolubilityGraph />
              </article>
              <div className="m2-pisa-questions">
                {([1, 2] as const).map((question) => {
                  const isFirst = question === 1
                  const selected = isFirst ? firstChoice : secondChoice
                  const options = isFirst ? text.q1Options : text.q2Options
                  const label = isFirst ? text.q1Label : text.q2Label
                  const prompt = isFirst ? text.q1 : text.q2
                  const correctAnswer = isFirst ? 1 : 2
                  return (
                    <fieldset className="m2-pisa-question" key={question}>
                      <legend><span>{label}</span>{prompt}</legend>
                      {options.map((option, index) => <label className={`m2-pisa-choice${selected === index ? ' is-selected' : ''}`} key={option}>
                        <input type="radio" name={`m2-pisa-q${question}`} checked={selected === index} onChange={() => selectChoice(question, index)} />
                        <span>{language === 'th' ? thaiOptionLetters[index] : String.fromCharCode(65 + index)}</span>{option}
                      </label>)}
                      {submitted && <p className={`m2-pisa-feedback${selected === correctAnswer ? ' is-correct' : ' is-wrong'}`}>{text.answer}: {selected === correctAnswer ? '✓' : '—'} {options[correctAnswer]}</p>}
                    </fieldset>
                  )
                })}
              </div>
            </div>
            <footer className="m2-pisa-footer">
              {submitted && <p className="m2-pisa-score">{text.points}: {score} / 2</p>}
              <button className="m2-pisa-submit" type="button" onClick={() => setSubmitted(true)}>{submitted ? text.submitted : text.submit}<span aria-hidden="true">›</span></button>
            </footer>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
      <NextButton className="m2-pisa-next" label={text.next} href="/gradem2/m2exp1/summary" />
    </main>
  )
}
