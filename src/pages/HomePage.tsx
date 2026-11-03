import { LabCard } from '../features/labs/components/LabCard'
import { labs } from '../features/labs/data/labs'
// import { AppHeader } from '../components/layout/AppHeader'

export function HomePage() {
  const gradeLevels = [
    { grade: 'ม.1', title: 'สารรอบตัวเรา', labIds: ['plant-cell'] },
    { grade: 'ม.2', title: 'สารละลาย', labIds: ['circuit'] },
    { grade: 'ม.3', title: 'ปฎิกิริยา',  labIds: ['mixtures'] },
  ]

  return (
    <div className="app-shell">
      {/* <AppHeader /> */}
      <main className="page-content">
        <section className="welcome" aria-labelledby="welcome-title">
          <p className="eyebrow">เรียนรู้ผ่านการลงมือทำ</p>
          <h1 id="welcome-title">ยินดีต้อนรับสู่ห้องทดลอง</h1>
          <p className="welcome-copy">เลือกการทดลอง แล้วเริ่มสำรวจวิทยาศาสตร์ได้จากทุกอุปกรณ์</p>
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
                    <h1 className="grade-label">มัธยมศึกษาปีที่ {index + 1}</h1>
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
