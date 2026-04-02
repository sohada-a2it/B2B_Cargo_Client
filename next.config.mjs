/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',  // স্ট্যাটিক HTML আউটপুটের জন্য
  trailingSlash: true,  // Firebase Hosting-এর জন্য ভালো অভ্যাস
  images: {
    unoptimized: true,  // স্ট্যাটিক এক্সপোর্টের জন্য
  },
};
export default nextConfig;
