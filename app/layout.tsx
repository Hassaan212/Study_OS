import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StudyOS - AI-Powered Academic Workspace',
  description: 'An AI-powered academic workspace for students',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
