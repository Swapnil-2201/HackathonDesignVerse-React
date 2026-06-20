// src/components/ui/Button/Button.jsx
import styles from './Button.module.css';

/**
 * Button
 *
 * Single reusable component replacing the legacy
 * `.btn .btn-primary / .btn-outline / .btn-emergency / .btn-lg / .btn-sm`
 * class-combination pattern (per the A1 architecture doc).
 *
 * Renders an <a> when `href` is provided, otherwise a <button>, so the
 * same component covers both "navigate to anchor" CTAs (Hero, Navbar)
 * and "trigger an action" buttons (future AgentContext.openModal() calls)
 * without the caller needing to pick a different component.
 *
 * Props:
 *   href      {string}            if present, renders as <a href={href}>
 *   variant   {'primary'|'outline'|'emergency'}  default: 'primary'
 *   size      {'lg'|'sm'}         optional, default size is unset
 *   icon      {string}            Font Awesome icon name, e.g. 'fa-phone'
 *                                 (the 'fa-solid' prefix is added automatically)
 *   className {string}            extra classes, merged in after variant/size
 *   ...rest                       forwarded to the underlying <a>/<button>
 *                                 (onClick, aria-label, target, type, etc.)
 */
const VARIANT_CLASS = {
  primary: 'primary',
  outline: 'outline',
  emergency: 'emergency',
};

const SIZE_CLASS = {
  lg: 'lg',
  sm: 'sm',
};

export default function Button({
  children,
  href,
  variant = 'primary',
  size,
  icon,
  className = '',
  ...rest
}) {
  const classes = [
    styles.btn,
    styles[VARIANT_CLASS[variant]] || styles.primary,
    size && styles[SIZE_CLASS[size]],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && <i className={`fa-solid ${icon}`} aria-hidden="true" />}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
