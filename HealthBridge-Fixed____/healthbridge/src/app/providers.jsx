

import { ThemeProvider } from '../context/ThemeContext';
import { ToastProvider } from '../context/ToastContext';
import { AISymptomCheckerProvider } from '../context/AISymptomCheckerContext';
import Toast from '../components/Toast/Toast';


export function Providers({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        {/* Toast singleton: portal-rendered to document.body, reads ToastContext */}
        <Toast />

        <AISymptomCheckerProvider>
          {children}
        </AISymptomCheckerProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default Providers;
