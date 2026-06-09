import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/2ff8362c80.js" crossOrigin="anonymous"></script>
        <script dangerouslySetInnerHTML={{
          __html: `(function() {
            if (localStorage.getItem("darkmode") === "active") {
              document.documentElement.classList.add("darkmode");
            }
          })();`
        }} />
      </head>
      <body className={`${inter.className} body-color`}>
        {children}
      </body>
    </html>
  );
}