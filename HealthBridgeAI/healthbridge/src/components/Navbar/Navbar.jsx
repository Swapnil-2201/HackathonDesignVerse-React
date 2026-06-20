import { useEffect, useState } from 'react';

import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { navLinks } from '../../data/navLinks';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track scroll position
  useEffect(() => {
    const SCROLL_THRESHOLD = 30;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on Escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`${styles.navbar} ${
        isScrolled ? styles.scrolled : ''
      }`}
    >
      <div className={styles.navInner}>
        {/* Logo */}
        <a
          href="#top"
          className={styles.logo}
          onClick={closeMenu}
        >
          <span
            className={styles.logoMark}
            aria-hidden="true"
          >
            <i className="fa-solid fa-heart-pulse" />
          </span>

          Health
          <span className={styles.logoAccent}>
            Bridge
          </span>
        </a>

        {/* Navigation Links */}
        <nav
          id="primary-navigation"
          className={`${styles.navLinks} ${
            isMenuOpen ? styles.open : ''
          }`}
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={styles.navLink}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* CTA Button */}
        <a
          href="#checker"
          className={styles.navCta}
          onClick={closeMenu}
        >
          Take Health Check
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`${styles.navToggle} ${
            isMenuOpen ? styles.active : ''
          }`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={
            isMenuOpen
              ? 'Close menu'
              : 'Open menu'
          }
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}