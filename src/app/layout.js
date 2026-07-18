import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Main/Navbar";
import Footer from "@/components/Main/Footer";
import Providers from "./providers";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Business Directory India | Companies, Manufacturers & Suppliers Directory | Inquiry Bazaar",
  description: "Explore India's comprehensive business directory featuring manufacturers, suppliers, exporters, traders, dealers, service providers, and companies across multiple industries. Discover verified business profiles and send inquiries directly through Inquiry Bazaar.",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>

        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
        >
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){
                (c[a].q=c[a].q||[]).push(arguments)
              };
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x7v7eroeqz");
          `}
        </Script>
        <meta name="google-site-verification" content="6bbu4UfJBXU6bw_utiN0GWbpnttBceKaSZe77oyWJME" />

        <Script id="organization-schema" type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://inquirybazaar.com/#organization",
                  name: "Inquiry Bazaar",
                  url: "https://inquirybazaar.com/",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://inquirybazaar.com/logo.png",
                  },
                  sameAs: [
                    "https://www.facebook.com/profile.php?id=61562989183794",
                    "https://www.linkedin.com/company/inquiry-bazaar/?viewAsMember=true",
                    "https://www.instagram.com/inquirybazaar/",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://inquirybazaar.com/#website",
                  url: "https://inquirybazaar.com/",
                  name: "Inquiry Bazaar",
                  publisher: {
                    "@id": "https://inquirybazaar.com/#organization",
                  },
                },
              ],
            }),
          }}
        />

      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
