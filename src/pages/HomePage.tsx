import { LabCard } from '../features/labs/components/LabCard'
import { labs } from '../features/labs/data/labs'

export function HomePage() {
  const gradeLevels = [
    { grade: 'ม.1', title: 'สารรอบตัวเรา', labIds: ['plant-cell'] },
    { grade: 'ม.2', title: 'สารละลาย', labIds: ['circuit'] },
    { grade: 'ม.3', title: 'ปฎิกิริยา',  labIds: ['mixtures'] },
  ]

  return (
    <div className="app-shell">
      <main className="page-content">
        <section className="welcome" aria-labelledby="welcome-title">
          <div className="welcome-copy-block">
            {/* <p className="welcome-badge"><span aria-hidden="true">🧪</span> ยินดีต้อนรับนักวิทยาศาสตร์รุ่นเยาว์</p> */}
            <h1 id="welcome-title">เข้าห้องทดลอง<br />แล้วมา <span>ค้นหาปริศนา</span> กัน!</h1>
            {/* <p className="welcome-copy">ลองทดลองเอง สังเกตผล แล้วไขปริศนาของสารรอบตัวเราไปพร้อมกัน</p> */}
            <a className="welcome-cta" href="/grades"><span aria-hidden="true"></span> เริ่มทดลองเลย</a>
          </div>
          <div className="welcome-art" aria-hidden="true">
            <svg viewBox="0 0 520 560" role="presentation">
              <ellipse className="flask-shadow" cx="260" cy="515" rx="205" ry="22" />
              <path className="flask-glass" d="M205 55h110v135l151 248c22 36-4 82-46 82H100c-42 0-68-46-46-82l151-248V55Z" />
              <path className="flask-liquid" d="m128 360 117-190h30l117 190 47 77c9 15-2 34-20 34H101c-18 0-29-19-20-34l47-77Z" />
              <path className="flask-neck" d="M190 34h140c16 0 29 13 29 29v17H161V63c0-16 13-29 29-29Z" />
              <circle className="flask-bubble bubble-one" cx="213" cy="344" r="17" />
              <circle className="flask-bubble bubble-two" cx="306" cy="300" r="25" />
              <path className="flask-highlight" d="m138 380 75-122" />
              <path className="flask-star star-one" d="m414 130 13 32 32 13-32 13-13 32-13-32-32-13 32-13 13-32Z" />
              <path className="flask-star star-two" d="m91 228 9 22 22 9-22 9-9 22-9-22-22-9 22-9 9-22Z" />
            </svg>
          </div>
        </section>
        <section className="labs-section" id="labs" aria-labelledby="labs-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">เลือกชั้นเรียน</p>
              <h2 id="labs-title">ห้องทดลองระดับมัธยมศึกษาตอนต้น</h2>
            </div>
            <span className="lab-count">มัธยมศึกษาปีที่ 1–3</span>
          </div>
          <div className="grade-grid">
            {gradeLevels.map((level, index) => (
              <section className="grade-section" key={level.grade} aria-labelledby={`grade-${index + 1}`}>
                <div className="grade-heading">
                  <span className="grade-number">{level.grade}</span>
                  <div>
                    <p className="grade-label">มัธยมศึกษาปีที่ {index + 1}</p>
                    <h3 id={`grade-${index + 1}`}>{level.title}</h3>
                  </div>
                </div>
                {/* <p className="grade-description">{level.description}</p> */}
                <div className="grade-labs">
                  {labs.filter((lab) => level.labIds.includes(lab.id)).map((lab) => (
                    <LabCard key={lab.id} lab={lab} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
