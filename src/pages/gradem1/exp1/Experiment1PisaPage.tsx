import { useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import { NextButton } from '../../../components/navigation/NextButton'
import boilingImage from '../../../assets/experiment-boiling.svg'
import type { Language } from '../../../types/language'
import './objectives.css'
import './pisa.css'

const copy = {
  th: {
    back: 'ย้อนกลับ', title: 'ภารกิจ PISA', experiment: 'การทดลองที่ 1', mystery: 'ปริศนาหม้อน้ำเชื่อมของมะนะ', badge: 'PISA 1 · อธิบายปรากฏการณ์',
    heading: 'ภารกิจ PISA 1 · อธิบายปรากฏการณ์เชิงวิทยาศาสตร์', scenarioTitle: 'สถานการณ์', scenario: 'แม่ค้าขนมบอกว่า “น้ำเชื่อมก็เดือดที่ 100 °C เหมือนน้ำเปล่า” นักเรียนมีกราฟอุณหภูมิ–เวลา 2 เส้น เส้น A ราบที่ 100 °C ส่วนเส้น B สูงกว่าและยังเพิ่มขึ้น',
    q1Label: 'ข้อ 1 · เลือกตอบ · 1 คะแนน', q2Label: 'ข้อ 2 · เลือกตอบ · 1 คะแนน',
    q1: 'กราฟเส้นใดเป็นของสารบริสุทธิ์ เพราะอะไร', q1Options: [
      'เส้น A เพราะอุณหภูมิเพิ่มขึ้นอย่างต่อเนื่องตลอดเวลาที่เดือด',
      'เส้น B เพราะอุณหภูมิยังคงเพิ่มขึ้น แสดงว่าสารกำลังเปลี่ยนสถานะอย่างสมบูรณ์',
      'เส้น A เพราะอุณหภูมิคงที่ที่ 100 °C ขณะเดือด',
      'เส้น B เพราะอุณหภูมิสูงกว่า 100 °C แสดงว่าสารบริสุทธิ์มีจุดเดือดสูงกว่า',
    ],
    q2: 'ถ้าเติมเกลือเพิ่มอีก 1 ช้อน จุดเดือดจะเปลี่ยนอย่างไร', q2Options: [
      'จุดเดือดสูงขึ้นอีก เพราะมีตัวละลายอยู่ในน้ำมากขึ้น',
      'จุดเดือดลดลง เพราะเกลือทำให้น้ำระเหยได้ง่ายขึ้น',
      'จุดเดือดเท่าเดิม เพราะการเติมเกลือไม่มีผลต่ออุณหภูมิของน้ำ',
      'น้ำจะเดือดทันทีที่อุณหภูมิต่ำกว่า 100 °C เพราะเกลือช่วยเร่งการเดือด',
    ],
    submit: 'ส่งคำตอบ', submitted: 'ตรวจคำตอบแล้ว', answer: 'เฉลย', correct: 'ถูกต้อง', wrong: 'ลองทบทวนกราฟและหลักการเรื่องจุดเดือดอีกครั้ง', points: 'คะแนน', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Misi PISA', experiment: 'Eksperimen 1', mystery: 'Misteri air gula Mana', badge: 'PISA 1 · Menjelaskan fenomena',
    heading: 'Misi PISA 1 · Menjelaskan fenomena saintifik', scenarioTitle: 'Situasi', scenario: 'Penjual kuih berkata, “Air gula mendidih pada 100 °C seperti air biasa.” Murid mempunyai dua garis graf suhu–masa. Garis A mendatar pada 100 °C, manakala garis B lebih tinggi dan terus meningkat.',
    q1Label: 'Soalan 1 · Pilihan jawapan · 1 markah', q2Label: 'Soalan 2 · Pilihan jawapan · 1 markah',
    q1: 'Garis manakah mewakili bahan tulen, dan mengapa?', q1Options: [
      'Garis A kerana suhu meningkat secara berterusan semasa mendidih',
      'Garis B kerana suhu terus meningkat, menandakan perubahan keadaan berlaku sepenuhnya',
      'Garis A kerana suhu kekal pada 100 °C semasa mendidih',
      'Garis B kerana suhu melebihi 100 °C, menandakan bahan tulen mempunyai takat didih lebih tinggi',
    ],
    q2: 'Jika satu sudu garam ditambah, apakah yang berlaku kepada takat didih?', q2Options: [
      'Takat didih meningkat kerana lebih banyak bahan terlarut di dalam air',
      'Takat didih menurun kerana garam memudahkan air tersejat',
      'Takat didih kekal kerana garam tidak mempengaruhi suhu air',
      'Air terus mendidih di bawah 100 °C kerana garam mempercepat pendidihan',
    ],
    submit: 'Hantar jawapan', submitted: 'Jawapan disemak', answer: 'Jawapan', correct: 'Betul', wrong: 'Semak semula graf dan konsep takat didih.', points: 'Markah', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'PISA Mission', experiment: 'Experiment 1', mystery: "Mana’s Sugar Water Mystery", badge: 'PISA 1 · Explain phenomena',
    heading: 'PISA Mission 1 · Explain a scientific phenomenon', scenarioTitle: 'Scenario', scenario: 'A vendor says, “Sugar water boils at 100 °C just like plain water.” Students have two temperature–time lines. Line A stays flat at 100 °C, while line B is higher and keeps rising.',
    q1Label: 'Question 1 · Multiple choice · 1 point', q2Label: 'Question 2 · Multiple choice · 1 point',
    q1: 'Which line represents a pure substance, and why?', q1Options: [
      'Line A because its temperature rises continuously while boiling',
      'Line B because its temperature keeps rising, showing the substance is changing state completely',
      'Line A because its temperature stays at 100 °C while boiling',
      'Line B because it is above 100 °C, showing pure substances have a higher boiling point',
    ],
    q2: 'If one more spoon of salt is added, what happens to the boiling point?', q2Options: [
      'It rises because more solute is present in the water',
      'It falls because salt makes water evaporate more easily',
      'It stays the same because salt does not affect water temperature',
      'The water boils below 100 °C because salt speeds up boiling',
    ],
    submit: 'Submit answers', submitted: 'Answers checked', answer: 'Answer', correct: 'Correct', wrong: 'Review the graph and the concept of boiling point.', points: 'Score', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; badge: string; heading: string; scenarioTitle: string; scenario: string; q1Label: string; q2Label: string;
  q1: string; q1Options: string[]; q2: string; q2Options: string[];
  submit: string; submitted: string; answer: string; correct: string; wrong: string; points: string; language: string
}>

const thaiOptionLetters = ['ก', 'ข', 'ค', 'ง']

function TemperatureGraph() {
  return (
    <svg className="pisa-graph" viewBox="0 0 440 270" role="img" aria-label="Temperature-time graph comparing line A at a constant boiling point and line B rising above it">
      <rect x="1" y="1" width="438" height="268" rx="14" fill="#fff" />
      <path d="M38 20v218h365" fill="none" stroke="#53617c" strokeWidth="2" />
      <path d="M38 190h365M38 140h365M38 90h365" stroke="#e2e7ef" strokeWidth="1" />
      <path d="M38 218 112 160 187 84 266 84 340 84 398 84" fill="none" stroke="#5281d6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 218 112 157 187 78 266 70 340 64 398 58" fill="none" stroke="#f47d4d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="407" y="91" fill="#5281d6" fontSize="20" fontWeight="800">A</text>
      <text x="407" y="61" fill="#f47d4d" fontSize="20" fontWeight="800">B</text>
      <text x="8" y="94" fill="#6b7891" fontSize="13">100°C</text>
      <text x="330" y="258" fill="#6b7891" fontSize="13">เวลา</text>
    </svg>
  )
}

export function Experiment1PisaPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [firstChoice, setFirstChoice] = useState<number | null>(null)
  const [secondChoice, setSecondChoice] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const text = copy[language]
  const score = Number(firstChoice === 2) + Number(secondChoice === 0)

  const selectChoice = (question: 1 | 2, index: number) => {
    if (question === 1) setFirstChoice(index)
    else setSecondChoice(index)
    setSubmitted(false)
  }

  return (
    <main className="objectives-page pisa-page">
      <div className="objectives-background" aria-hidden="true" />
      <div className="objectives-content pisa-shell">
        <header className="objectives-header pisa-header">
          <BackButton className="pisa-back" href="/gradem1/exp1/conclusion" label={text.back} />
          <div className="objectives-title pisa-title"><span className="objectives-number pisa-number">12</span><h1>{text.title}</h1></div>
        </header>

        <div className="objectives-layout pisa-layout">
          <aside className="objectives-sidecard pisa-sidecard">
            <h2>{text.experiment}</h2>
            <img src={boilingImage} alt="" />
            <h3>{text.mystery}</h3>
            <span className="pisa-badge">{text.badge}</span>
          </aside>

          <section className="pisa-panel">
            <h2 className="pisa-panel-title">{text.heading}</h2>
            <div className="pisa-workspace">
              <article className="pisa-scenario">
                <h3>{text.scenarioTitle}</h3>
                <p>{text.scenario}</p>
                <TemperatureGraph />
              </article>

              <div className="pisa-questions">
                <fieldset className="pisa-question pisa-question-blue">
                  <legend><span>{text.q1Label}</span>{text.q1}</legend>
                  {text.q1Options.map((option, index) => (
                    <label className={`pisa-choice${firstChoice === index ? ' is-selected' : ''}`} key={option}>
                      <input type="radio" name="pisa-q1" checked={firstChoice === index} onChange={() => selectChoice(1, index)} />
                      <span>{language === 'th' ? thaiOptionLetters[index] : String.fromCharCode(65 + index)}</span>{option}
                    </label>
                  ))}
                  {submitted && <p className={`pisa-feedback${firstChoice === 2 ? ' is-correct' : ' is-wrong'}`}>{text.answer} {firstChoice === 2 ? '✓' : '—'} {text.q1Options[2]}</p>}
                </fieldset>

                <fieldset className="pisa-question pisa-question-blue">
                  <legend><span>{text.q2Label}</span>{text.q2}</legend>
                  {text.q2Options.map((option, index) => (
                    <label className={`pisa-choice${secondChoice === index ? ' is-selected' : ''}`} key={option}>
                      <input type="radio" name="pisa-q2" checked={secondChoice === index} onChange={() => selectChoice(2, index)} />
                      <span>{language === 'th' ? thaiOptionLetters[index] : String.fromCharCode(65 + index)}</span>{option}
                    </label>
                  ))}
                  {submitted && <p className={`pisa-feedback${secondChoice === 0 ? ' is-correct' : ' is-wrong'}`}>{text.answer} {secondChoice === 0 ? '✓' : '—'} {text.q2Options[0]}</p>}
                </fieldset>

              </div>
            </div>

            <footer className="pisa-footer">
              {submitted && <p className="pisa-score">{text.points}: {score} / 2</p>}
              <button className="pisa-submit" type="button" onClick={() => setSubmitted(true)}>{submitted ? text.submitted : text.submit} <span aria-hidden="true">›</span></button>
            </footer>
          </section>
        </div>
      </div>
      <LanguageSwitcher language={language} label={text.language} onLanguageChange={setLanguage} />
      <NextButton className="pisa-next" label={language === 'th' ? 'ต่อไป' : language === 'ms' ? 'Seterusnya' : 'Next'} href="/gradem1/exp1/summary" />
    </main>
  )
}
