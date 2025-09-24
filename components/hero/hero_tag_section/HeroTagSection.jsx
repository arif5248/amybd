'use client'

import styles from './HeroTagSection.module.css'
// choose icons you like
import { ShieldCheck, CreditCard, Award } from 'lucide-react'

export default function HeroTagSection() {
  return (
    <div className={`container ${styles.wrap}`}>
      <h1 className={styles.tagline}>উড়াল দিন</h1>

      <div className={styles.row}>
        <span className={styles.item}>
          <ShieldCheck className={styles.icon} aria-hidden='true' />
          <span>24/7 Amy Support Team</span>
        </span>

        <span className={styles.item}>
          <CreditCard className={styles.icon} aria-hidden='true' />
          <span>Secure &amp; Easy Payment</span>
        </span>

        <span className={styles.item}>
          <Award className={styles.icon} aria-hidden='true' />
          <span>Award-winning</span>
        </span>
      </div>
    </div>
  )
}
