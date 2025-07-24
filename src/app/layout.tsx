import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { generateMetadata as generateSEOMetadata, generateCourseStructuredData } from '@/lib/seo';
import { getAllChapters, getTotalCourseHours } from '@/lib/content';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate comprehensive SEO metadata
export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "LearnOmni.org - Master Omni Analytics",
    description: "Learn data analytics with our comprehensive 10.2-hour course covering Omni platform features, AI-powered querying, dashboard creation, and real-world applications. Free course with 61 video lessons across 8 chapters.",
    keywords: [
      "omni analytics",
      "data analytics course",
      "business intelligence",
      "dashboard creation", 
      "data visualization",
      "ai analytics",
      "free online course",
      "data modeling",
      "sql training",
      "embedded analytics",
      "learn omni",
      "omni platform training"
    ],
  }),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: { url: '/apple-touch-icon.svg', type: 'image/svg+xml' }
  },
  manifest: '/manifest.json'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data for the course
  const chapters = getAllChapters();
  const totalHours = getTotalCourseHours();
  const courseStructuredData = generateCourseStructuredData(chapters, totalHours);

      return (
      <html lang="en">
        <head>
          {/* Google Analytics */}
          {GA_MEASUREMENT_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}', {
                      page_location: window.location.href,
                      page_title: document.title,
                    });
                  `,
                }}
              />
            </>
          )}
          
          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(courseStructuredData)
            }}
          />
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
