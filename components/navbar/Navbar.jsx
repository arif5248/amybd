import Link from 'next/link'
import styles from './Navbar.module.css'
import Logo from '@/components/logo/Logo'

export default function Navbar() {
  return (
    <header className={styles.root}>
      <div className='container'>
        <div className={styles.inner}>
          <Link href='/' className={styles.brand}>
            <Logo size={48} />
          </Link>

          <nav className={styles.nav}>
            <Link href='/' className={styles.link}>
              Home
            </Link>
            <Link href='/flights' className={styles.link}>
              Flights
            </Link>
            <Link href='/hotels' className={styles.link}>
              Hotels
            </Link>
            <Link href='/visa' className={styles.link}>
              Visa
            </Link>
            <Link href='/explore' className={styles.link}>
              Explore
            </Link>
            <Link href='/app' className={styles.link}>
              App
            </Link>
            <Link href='/loginOrCreate' className={styles.loginOrCreateBtn}>
              Login | Create
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
