import { useEffect, useMemo, useState } from 'react'
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import { BackButton } from '../../../components/navigation/BackButton'
import type { Language } from '../../../types/language'
import './m2-objectives.css'
import './m2-lab.css'

type SoluteId = 'sugar' | 'salt' | 'alum'
type Temperature = 10 | 30 | 50 | 80
type Measurement = { grams: number; spoonAdditions: number }
type LabResults = Record<SoluteId, Partial<Record<Temperature, Measurement>>>

const STORAGE_KEY = 'science-lab-m2-exp1-solubility-results'
const temperatures: Temperature[] = [10, 30, 50, 80]
const solutes: SoluteId[] = ['sugar', 'salt', 'alum']
const solubility: Record<SoluteId, Record<Temperature, number>> = {
  sugar: { 10: 190, 30: 220, 50: 260, 80: 360 },
  salt: { 10: 36, 30: 36, 50: 37, 80: 38 },
  alum: { 10: 4, 30: 8, 50: 17, 80: 71 },
}
const soluteNames: Record<SoluteId, Record<Language, string>> = {
  sugar: { th: 'น้ำตาลทราย', ms: 'Gula', en: 'Sugar' },
  salt: { th: 'เกลือแกง', ms: 'Garam', en: 'Table salt' },
  alum: { th: 'สารส้ม', ms: 'Tawas', en: 'Alum' },
}

function readResults(): LabResults {
  const empty: LabResults = { sugar: {}, salt: {}, alum: {} }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as Partial<LabResults>
    for (const id of solutes) {
      for (const temperature of temperatures) {
        const measurement = parsed[id]?.[temperature]
        if (measurement && Number.isFinite(measurement.grams) && Number.isFinite(measurement.spoonAdditions)) {
          empty[id][temperature] = measurement
        }
      }
    }
  } catch {
    return empty
  }
  return empty
}

const text = {
  th: {
    back: 'ย้อนกลับ', title: 'ห้องทดลองจำลอง', experiment: 'การทดลองที่ 1',
    mystery: 'ปริศนาน้ำตาล\nก้นแก้วชาชัก', pisa: 'PISA 1 · อธิบายปรากฏการณ์',
    choose: 'เลือกตัวละลาย', temperature: 'อุณหภูมิน้ำ', water: 'น้ำ 100 g',
    add: '+ เติม 1 ช้อน', stir: 'คน 10 วินาที', spoons: 'ช้อน', grams: 'g',
    resetTrial: 'รีเซ็ตชุดนี้', resetTable: 'รีเซ็ตตาราง',
    dissolved: 'ละลายหมด เติมต่อได้', saturated: 'อิ่มตัวแล้ว ผลึกไม่หาย', stirring: 'กำลังคนให้ละลาย…',
    ready: 'เติมช้อนแล้วกดคน เพื่อดูว่าละลายหมดหรือไม่', amountAdded: 'ปริมาณที่เติม', amount: 'ปริมาณที่ละลายได้',
    recordTitle: 'บันทึกผล', tempCol: 'อุณหภูมิ', spoonCol: 'ช้อนที่ละลาย', gramsCol: 'g / น้ำ 100 g',
    graphTitle: 'กราฟสภาพละลายได้', noData: 'บันทึกผลแต่ละอุณหภูมิเพื่อสร้างกราฟ',
    progress: 'อุณหภูมิที่บันทึก', seeResults: 'ดูผลการทดลอง', completeHint: 'บันทึกให้ครบทั้ง 4 อุณหภูมิของตัวละลายที่เลือกก่อนดูผล',
    principles: 'หลักการทดลองและตัวแปร', principlesList: [
      'สภาพละลายได้คือปริมาณตัวละลายสูงสุดที่ละลายในตัวทำละลายจำนวนหนึ่ง ณ อุณหภูมิหนึ่ง ในแล็บนี้ใช้กรัมต่อน้ำ 100 g',
      'เมื่อละลายจนเต็มที่เป็นสารละลายอิ่มตัว ส่วนที่เติมเกินจะเหลือเป็นผลึกก้นภาชนะและคนเท่าไรก็ไม่ละลาย',
      'การคนช่วยให้ละลายเร็วขึ้น แต่อุณหภูมิที่สูงขึ้นมักทำให้ละลายได้มากขึ้น ซึ่งเป็นคนละเรื่องกัน',
      'น้ำตาลและสารส้มละลายได้เพิ่มขึ้นชัดเจนเมื่อน้ำร้อนขึ้น ส่วนเกลือแกงเปลี่ยนแปลงเพียงเล็กน้อย',
    ],
    axisTemp: 'อุณหภูมิ (°C)', axisAmount: 'กรัมต่อน้ำ 100 g', complete: 'บันทึกครบแล้ว', language: 'เลือกภาษา',
  },
  ms: {
    back: 'Kembali', title: 'Makmal Simulasi', experiment: 'Eksperimen 1',
    mystery: 'Misteri gula di\ndasar teh tarik', pisa: 'PISA 1 · Menjelaskan fenomena',
    choose: 'Pilih bahan terlarut', temperature: 'Suhu air', water: 'Air 100 g',
    add: '+ Tambah 1 sudu', stir: 'Kacau 10 saat', spoons: 'sudu', grams: 'g',
    resetTrial: 'Set semula sesi ini', resetTable: 'Set semula jadual',
    dissolved: 'Larut sepenuhnya, boleh tambah', saturated: 'Tepu, kristal tidak larut', stirring: 'Sedang mengacau…',
    ready: 'Tambah satu sudu dan kacau untuk melihat sama ada ia larut', amountAdded: 'Jumlah ditambah', amount: 'Jumlah yang larut',
    recordTitle: 'Rekod keputusan', tempCol: 'Suhu', spoonCol: 'Sudu larut', gramsCol: 'g / 100 g air',
    graphTitle: 'Graf keterlarutan', noData: 'Rekod setiap suhu untuk membina graf',
    progress: 'Suhu direkodkan', seeResults: 'Lihat keputusan', completeHint: 'Rekodkan keempat-empat suhu bagi bahan yang dipilih sebelum melihat keputusan',
    principles: 'Prinsip eksperimen dan pemboleh ubah', principlesList: [
      'Keterlarutan ialah jumlah maksimum zat terlarut yang boleh larut dalam sejumlah pelarut pada suhu tertentu; di sini unitnya gram bagi 100 g air.',
      'Larutan tepu telah melarutkan jumlah maksimum. Bahan yang ditambah berlebihan kekal sebagai kristal walaupun dikacau.',
      'Mengacau mempercepatkan pelarutan, manakala suhu lebih tinggi biasanya meningkatkan jumlah yang boleh larut.',
      'Gula dan tawas lebih mudah larut apabila suhu meningkat, tetapi keterlarutan garam berubah sedikit sahaja.',
    ],
    axisTemp: 'Suhu (°C)', axisAmount: 'g bagi 100 g air', complete: 'Semua direkod', language: 'Pilih bahasa',
  },
  en: {
    back: 'Back', title: 'Virtual Laboratory', experiment: 'Experiment 1',
    mystery: 'The sugar at the\nbottom of the tea', pisa: 'PISA 1 · Explain phenomena',
    choose: 'Choose a solute', temperature: 'Water temperature', water: '100 g water',
    add: '+ Add 1 spoon', stir: 'Stir for 10 seconds', spoons: 'spoons', grams: 'g',
    resetTrial: 'Reset this trial', resetTable: 'Reset table',
    dissolved: 'Dissolved; you can add more', saturated: 'Saturated; crystals remain', stirring: 'Stirring…',
    ready: 'Add one spoon and stir to check if it dissolves', amountAdded: 'Amount added', amount: 'Amount dissolved',
    recordTitle: 'Experiment record', tempCol: 'Temperature', spoonCol: 'Spoons dissolved', gramsCol: 'g / 100 g water',
    graphTitle: 'Solubility graph', noData: 'Record each temperature to build the graph',
    progress: 'Temperatures recorded', seeResults: 'View results', completeHint: 'Record all four temperatures for the selected solute to view results',
    principles: 'Scientific principles and variables', principlesList: [
      'Solubility is the maximum amount of solute that dissolves in a fixed amount of solvent at a given temperature; here it is grams per 100 g of water.',
      'A saturated solution has dissolved as much solute as it can. Extra solid remains as crystals even when stirred.',
      'Stirring makes dissolving faster, while higher temperature usually increases how much can dissolve. These are different effects.',
      'Sugar and alum solubility rise clearly with temperature, while table salt changes very little.',
    ],
    axisTemp: 'Temperature (°C)', axisAmount: 'g per 100 g water', complete: 'All recorded', language: 'Choose language',
  },
} satisfies Record<Language, {
  back: string; title: string; experiment: string; mystery: string; pisa: string; choose: string;
  temperature: string; water: string; add: string; stir: string; spoons: string; grams: string; resetTrial: string; resetTable: string;
  dissolved: string; saturated: string; stirring: string; ready: string; amountAdded: string; amount: string;
  recordTitle: string; tempCol: string; spoonCol: string; gramsCol: string; graphTitle: string;
  noData: string; progress: string; seeResults: string; completeHint: string; principles: string;
  principlesList: string[]; axisTemp: string; axisAmount: string; complete: string; language: string
}>

export function M2Experiment1LabPage() {
  const [language, setLanguage] = useState<Language>('th')
  const [solute, setSolute] = useState<SoluteId>('sugar')
  const [temperature, setTemperature] = useState<Temperature>(10)
  const [spoonAdditions, setSpoonAdditions] = useState(0)
  const [pendingStir, setPendingStir] = useState(false)
  const [isStirring, setIsStirring] = useState(false)
  const [message, setMessage] = useState<'ready' | 'dissolved' | 'saturated'>('ready')
  const [results, setResults] = useState<LabResults>(readResults)
  const copy = text[language]
  const capacity = solubility[solute][temperature]
  const savedMeasurement = results[solute][temperature]
  const displayedSpoonAdditions = savedMeasurement?.spoonAdditions ?? spoonAdditions
  const addedGrams = displayedSpoonAdditions * 10
  const isSaturated = !!savedMeasurement || message === 'saturated'
  const dissolvedGrams = savedMeasurement?.grams ?? (isSaturated ? capacity : addedGrams)
  const completedTemperatures = temperatures.filter((value) => results[solute][value] !== undefined)
  const isSoluteComplete = completedTemperatures.length === temperatures.length
  const chartPoints = useMemo(() => temperatures.flatMap((value, index) => {
    const amount = results[solute][value]?.grams
    if (amount === undefined) return []
    const x = 38 + index * 66
    const y = 116 - Math.min(amount / 400, 1) * 90
    return [{ x, y, temp: value, amount }]
  }), [results, solute])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(results))
    } catch {
      // Keep the lab usable when browser storage is unavailable.
    }
  }, [results])

  function selectSolute(next: SoluteId) {
    if (isStirring) return
    setSolute(next)
    setSpoonAdditions(0)
    setPendingStir(false)
    setMessage('ready')
  }

  function selectTemperature(next: Temperature) {
    if (isStirring) return
    setTemperature(next)
    setSpoonAdditions(0)
    setPendingStir(false)
    setMessage('ready')
  }

  function addSpoon() {
    if (isStirring || savedMeasurement) return
    setSpoonAdditions((count) => count + 1)
    setPendingStir(true)
    setMessage('ready')
  }

  function stir() {
    if (isStirring || savedMeasurement || !pendingStir || spoonAdditions === 0) return
    setIsStirring(true)
    window.setTimeout(() => {
      const addedGrams = spoonAdditions * 10
      if (addedGrams > capacity) {
        const measurement = { grams: capacity, spoonAdditions }
        setResults((current) => ({
          ...current,
          [solute]: { ...current[solute], [temperature]: measurement },
        }))
        setMessage('saturated')
      } else {
        setMessage('dissolved')
      }
      setPendingStir(false)
      setIsStirring(false)
    }, 1200)
  }

  function resetCurrentTrial() {
    if (isStirring) return
    setSpoonAdditions(0)
    setPendingStir(false)
    setMessage('ready')
    setResults((current) => {
      const nextForSolute = { ...current[solute] }
      delete nextForSolute[temperature]
      return { ...current, [solute]: nextForSolute }
    })
  }

  function resetSoluteTable() {
    if (isStirring) return
    setSpoonAdditions(0)
    setPendingStir(false)
    setMessage('ready')
    setResults((current) => ({ ...current, [solute]: {} }))
  }

  return (
    <main className="m2-objectives-page m2-exp1-lab-page">
      <div className="m2-objectives-background" aria-hidden="true" />
      <div className="m2-objectives-content">
        <header className="m2-objectives-header">
          <BackButton className="m2-objectives-back" href="/gradem2/m2exp1/prediction" label={copy.back} />
          <div className="m2-objectives-title">
            <span className="m2-objectives-number">9</span>
            <h1>{copy.title}</h1>
          </div>
        </header>

        <div className="m2-lab-layout">
          <section className="m2-lab-workspace" aria-label={copy.title}>
            <section className="m2-lab-control-panel" aria-label={copy.choose}>
              <h2>{copy.choose}</h2>
              <div className="m2-lab-solutes">
                {solutes.map((id) => (
                  <button key={id} type="button" className={solute === id ? 'is-active' : ''} aria-pressed={solute === id} onClick={() => selectSolute(id)} disabled={isStirring || pendingStir}>
                    {soluteNames[id][language]}{solute === id ? ' ✓' : ''}
                  </button>
                ))}
              </div>

              <h3>{copy.temperature}: <strong>{temperature} °C</strong></h3>
              <div className="m2-lab-temperatures">
                {temperatures.map((value) => (
                  <button key={value} type="button" className={`${temperature === value ? 'is-active' : ''}${results[solute][value] ? ' is-done' : ''}`} onClick={() => selectTemperature(value)} disabled={isStirring || pendingStir}>
                    {value}°
                    {results[solute][value] && <small>✓</small>}
                  </button>
                ))}
              </div>

              <div className="m2-lab-add-count">
                <span>{copy.spoons}</span><strong>{displayedSpoonAdditions}</strong>
                <span>=</span><strong>{addedGrams} {copy.grams}</strong>
              </div>
              <p className="m2-lab-water">{copy.water} · 1 {copy.spoons} = 10 g</p>

              <div className="m2-lab-buttons">
                <button type="button" className="m2-lab-add" onClick={addSpoon} disabled={isStirring || !!savedMeasurement}>{copy.add}</button>
                <button type="button" className="m2-lab-stir" onClick={stir} disabled={isStirring || !!savedMeasurement || !pendingStir}>
                  {isStirring ? copy.stirring : copy.stir}
                </button>
                <button type="button" className="m2-lab-reset-trial" onClick={resetCurrentTrial} disabled={isStirring}>{copy.resetTrial}</button>
              </div>
            </section>

            <section className={`m2-lab-simulation${isStirring ? ' is-stirring' : ''}`} aria-live="polite">
              <div className={`m2-lab-status is-${message}`}>
                {isStirring ? copy.stirring : message === 'saturated' || savedMeasurement ? copy.saturated : message === 'dissolved' ? copy.dissolved : copy.ready}
              </div>
              <div className={`m2-lab-beaker is-${solute}`} aria-label={`${soluteNames[solute][language]}, ${addedGrams} g added, ${dissolvedGrams} g dissolved`}>
                <div className="m2-lab-beaker-liquid" style={{ height: `${Math.max(8, Math.min(addedGrams / 400 * 75, 75))}%` }} />
                <div className="m2-lab-solids">
                  {isSaturated && Array.from({ length: Math.min(12, Math.max(3, Math.ceil((addedGrams - dissolvedGrams) / 10))) }, (_, index) => <i key={index} style={{ left: `${(index * 17) % 58}px`, bottom: `${index % 2 ? 3 : 0}px` }} />)}
                </div>
                <div className="m2-lab-beaker-glass" />
                {isStirring && <div className="m2-lab-stirrer" />}
              </div>
              <div className="m2-lab-live-readout">
                <div><span>🌡️</span><strong>{temperature} °C</strong><small>{copy.temperature}</small></div>
                <div><span>🥄</span><strong>{isSaturated || message === 'dissolved' ? dissolvedGrams : addedGrams} g</strong><small>{isSaturated || message === 'dissolved' ? copy.amount : copy.amountAdded}</small></div>
              </div>
              <p className="m2-lab-feedback">
                {message === 'saturated' || savedMeasurement ? copy.saturated : message === 'dissolved' ? copy.dissolved : copy.ready}
              </p>
            </section>

            <section id="m2-lab-record" className="m2-lab-record-panel" aria-label={copy.recordTitle}>
              <div className="m2-lab-record-heading">
                <h2>{copy.recordTitle} · {soluteNames[solute][language]}</h2>
                <button type="button" onClick={resetSoluteTable} disabled={isStirring || completedTemperatures.length === 0}>{copy.resetTable}</button>
              </div>
              <div className="m2-lab-record-table-wrap">
                <table className="m2-lab-record-table">
                  <thead><tr><th>{copy.tempCol}</th><th>{copy.spoonCol}</th><th>{copy.gramsCol}</th></tr></thead>
                  <tbody>
                    {temperatures.map((value) => {
                      const measurement = results[solute][value]
                      return <tr key={value} className={temperature === value ? 'is-current' : ''}>
                        <th scope="row">{value} °C</th>
                        <td>{measurement ? (Number.isInteger(measurement.grams / 10) ? measurement.grams / 10 : (measurement.grams / 10).toFixed(1)) : '—'}</td>
                        <td>{measurement?.grams ?? '—'}</td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>

              <div className="m2-lab-chart-section">
                <h3>{copy.graphTitle}</h3>
                <svg className="m2-lab-chart" viewBox="0 0 300 150" role="img" aria-label={copy.graphTitle}>
                  {[0, 100, 200, 300, 400].map((tick) => {
                    const y = 116 - tick / 400 * 90
                    return <g key={tick}><line x1="32" x2="286" y1={y} y2={y} /><text x="25" y={y + 4}>{tick}</text></g>
                  })}
                  {temperatures.map((value, index) => <text className="m2-lab-chart-x" key={value} x={38 + index * 66} y="136">{value}°</text>)}
                  {chartPoints.length > 1 && <polyline className="m2-lab-chart-line" points={chartPoints.map((point) => `${point.x},${point.y}`).join(' ')} />}
                  {chartPoints.map((point) => <circle key={point.temp} cx={point.x} cy={point.y} r="5" />)}
                </svg>
              </div>
              <p className="m2-lab-progress">{copy.progress}: {completedTemperatures.length} / 4</p>
              <div className="m2-lab-progress-track"><span style={{ width: `${completedTemperatures.length * 25}%` }} /></div>
              {isSoluteComplete
                ? <a className="m2-lab-results-button is-ready" href="/gradem2/m2exp1/results">{copy.seeResults} ›</a>
                : <button className="m2-lab-results-button" type="button" disabled>{copy.seeResults}</button>}
              {!isSoluteComplete && <small className="m2-lab-result-hint">{copy.completeHint}</small>}
            </section>

            <p className="m2-lab-workflow">ทำซ้ำ: เติม 1 ช้อน → คน → ดูผล · บันทึกครบ 4 อุณหภูมิ แล้วจึงดูผลได้</p>
          </section>
        </div>

      </div>
      <LanguageSwitcher language={language} label={copy.language} onLanguageChange={setLanguage} />
    </main>
  )
}
