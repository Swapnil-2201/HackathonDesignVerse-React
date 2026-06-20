import Navbar from '../components/Navbar/Navbar';

/**
 * MainLayout — the page skeleton.
 *
 * Owns the persistent chrome that wraps every section: Navbar at top,
 * page content in between, Footer at bottom, plus the app-wide Toast
 * and AgentModal, which render via the layout but are controlled by
 * their respective Contexts (see src/context/) rather than local
 * layout state.
 *
 * Navbar is now wired in for real (was a placeholder <header>).
 * Footer, Toast, and AgentModal remain TODO placeholders — none of
 * those components have been generated yet, so importing them here
 * would break the build rather than degrade gracefully.
 */
export default function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="layout-content">
        {children}
      </main>

      {/* TODO: replace with <Footer /> — src/components/Footer/Footer.jsx */}
      <footer className="layout-footer-slot">Footer placeholder</footer>

      {/* TODO: replace with <Toast /> — consumes ToastContext, src/components/ui/Toast/Toast.jsx */}
      {/* TODO: replace with <AgentModal /> — consumes AgentContext, src/components/agent/AgentModal.jsx */}
    </div>
  );
}
