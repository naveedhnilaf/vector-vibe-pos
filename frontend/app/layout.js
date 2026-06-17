import './globals.css';

export const metadata = {
  title: 'Vector Vibe POS',
  description: 'POS System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}