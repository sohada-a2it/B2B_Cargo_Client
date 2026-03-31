// app/sitemap.xml/route.js
export const dynamic = "force-static";
import { NextResponse } from 'next/server';

export async function GET() {
  // লোকালহোস্ট এবং প্রোডাকশন উভয়ের জন্য কাজ করবে
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://client.cargologisticscompany.com' 
    : 'http://localhost:3000';

  const currentDate = new Date().toISOString().split('T')[0];

  // আপনার ওয়েবসাইটের সব পেজের লিস্ট
  const pages = [
    { path: '', priority: '1.00', changefreq: 'daily' },
    { path: 'about', priority: '0.90', changefreq: 'weekly' },
    { path: 'service', priority: '0.90', changefreq: 'weekly' },
    { path: 'our-company', priority: '0.90', changefreq: 'weekly' },
    { path: 'industries', priority: '0.80', changefreq: 'weekly' },
    { path: 'industries-details', priority: '0.70', changefreq: 'monthly' },
    { path: 'contact', priority: '0.80', changefreq: 'monthly' },
    { path: 'history', priority: '0.70', changefreq: 'monthly' },
    { path: 'why-choose-us', priority: '0.70', changefreq: 'monthly' },
    { path: 'tracking', priority: '0.90', changefreq: 'daily' },
    { path: 'request-quote', priority: '0.80', changefreq: 'weekly' },
    { path: 'privacy-policy', priority: '0.50', changefreq: 'yearly' },
    { path: 'terms-of-service', priority: '0.50', changefreq: 'yearly' },
    { path: 'auth/login', priority: '0.60', changefreq: 'monthly' },
    { path: 'auth/register', priority: '0.60', changefreq: 'monthly' },
    { path: 'profile', priority: '0.60', changefreq: 'weekly' },
    { path: 'invoices', priority: '0.70', changefreq: 'daily' },
    { path: 'shipments', priority: '0.80', changefreq: 'daily' },
    { path: 'bookings/my_bookings', priority: '0.80', changefreq: 'daily' },
    { path: 'create-booking', priority: '0.70', changefreq: 'weekly' },
  ];

  // XML তৈরি করা
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const page of pages) {
    const url = page.path === '' ? baseUrl : `${baseUrl}/${page.path}`;
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += `  </url>\n`;
  }

  sitemap += '</urlset>';

  // XML রেসপন্স রিটার্ন করা
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400',
    },
  });
}