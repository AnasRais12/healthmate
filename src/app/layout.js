import { Inter } from 'next/font/google';
import './globals.css';
import { CustomThemeProvider } from '@/theme/ThemeContext';
import PersistProvider from '@/components/layout/PersistProvider';
import { GlobalProvider } from '@/context/commonContext';
import { SearchProvider } from '@/context/commonContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // select what you need
  display: 'swap',
});

export const metadata = {
  title: "HealthMate",
  description: "Your AI-powered health companion",
  manifest: "/manifest.json",
  themeColor: "#ffffff"
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <SearchProvider>
          <GlobalProvider>
            <PersistProvider>
              <CustomThemeProvider>{children}</CustomThemeProvider>
            </PersistProvider>
          </GlobalProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
