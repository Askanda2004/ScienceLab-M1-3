export function AppHeader() {
  return (
    <header className="app-header">
      <a className="brand" href="/" aria-label="ScienceLab หน้าหลัก">
        <span className="brand-mark" aria-hidden="true">S</span>
        <span>Science<span className="brand-light">Lab</span></span>
      </a>
      <nav className="main-nav" aria-label="เมนูหลัก">
        <a className="active" href="#labs">ห้องทดลอง</a>
        <a href="#about">เกี่ยวกับ</a>
      </nav>
      <span className="device-note">เรียนรู้ได้ทุกที่</span>
    </header>
  )
}
