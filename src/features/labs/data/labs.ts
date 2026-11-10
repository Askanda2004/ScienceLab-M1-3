import type { Lab } from '../types'
import plantCellImage from '../../../assets/lab-cell.svg'
import electricCircuitImage from '../../../assets/lab-circuit.svg'
import chemistryImage from '../../../assets/lab-chemistry.svg'

export const labs: Lab[] = [
  {
    id: 'plant-cell',
    title: 'สารรอบตัวเรา',
    subject: '',
    description: 'ทำความรู้จักส่วนประกอบของเซลล์พืชผ่านแบบจำลองโต้ตอบ',
    icon: '✳',
    image: plantCellImage,
    accent: 'mint',
    level: '',
  },
  {
    id: 'circuit',
    title: 'สารละลาย',
    subject: '',
    description: 'ทดลองต่อวงจรและสังเกตการไหลของกระแสไฟฟ้า',
    icon: 'ϟ',
    image: electricCircuitImage,
    accent: 'blue',
    level: '',
  },
  {
    id: 'mixtures',
    title: 'ปฎิกิริยา',
    subject: '',
    description: 'เลือกวิธีแยกสารให้เหมาะกับสมบัติของสารแต่ละชนิด',
    icon: '◉',
    image: chemistryImage,
    accent: 'amber',
    level: '',
  },
]
