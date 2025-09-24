import styles from './Hero.module.css'
import HeroContent from '@/components/hero/hero_content/HeroContent'
import HeroTagSection from './hero_tag_section/HeroTagSection'

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <HeroTagSection />
      <HeroContent />
    </section>
  )
}
