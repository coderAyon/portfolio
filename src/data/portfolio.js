import { Code2, Globe2, Layers3, Palette, PenTool, Smartphone } from "lucide-react";

import { assetHref } from "../lib/assets";

export const skills = [
  {
    icon: Palette,
    label: "Brand Visuals",
    text: "Logo concepts, identity systems, and polished social media visuals built with an editorial eye.",
  },
  {
    icon: Layers3,
    label: "Compositions",
    text: "Layer-rich posters, thumbnails, product graphics, and premium digital art direction.",
  },
  {
    icon: PenTool,
    label: "Design Tools",
    text: "Practical creative workflow across Photoshop-style editing, vector thinking, and layout systems.",
  },
  {
    icon: Code2,
    label: "CS Foundation",
    text: "A growing technical base that helps design ideas become interactive, structured web experiences.",
  },
];

export const projectCategories = [
  {
    id: "android",
    label: "Android App",
    icon: Smartphone,
    summary: "Downloadable Android apps with clean previews, APK sizes, and direct install files.",
    projects: [
      {
        title: "Cashify",
        type: "Android Finance App",
        accent: "from-emerald-400 to-orange-500",
        text: "A simple cash-flow companion for tracking daily money movement and personal balances.",
        appPreviewImage: assetHref("apps/previews/cashify.png?v=2026062702"),
        apkUrl: assetHref("apps/apks/cashify.apk"),
        apkSize: "42 MB",
      },
      {
        title: "Notes",
        type: "Android Utility App",
        accent: "from-cyan-300 to-sky-500",
        text: "A focused note-taking app for quick writing, lightweight organization, and everyday reminders.",
        appPreviewImage: assetHref("apps/previews/notes.png?v=2026062702"),
        apkUrl: assetHref("apps/apks/notes.apk"),
        apkSize: "28 MB",
      },
      {
        title: "Unit Converter",
        type: "Android Calculator App",
        accent: "from-lime-300 to-orange-500",
        text: "A practical converter for common units with fast inputs, clear results, and a clean mobile flow.",
        appPreviewImage: assetHref("apps/previews/unit-converter.png?v=2026062702"),
        apkUrl: assetHref("apps/apks/unit-converter.apk"),
        apkSize: "9 MB",
      },
    ],
  },
  {
    id: "website",
    label: "Website Development",
    icon: Globe2,
    summary: "Landing pages, portfolios, business websites, interactive sections, and responsive builds.",
    projects: [
      {
        title: "LMS Website",
        header: "Learning Management System",
        type: "Live Website Project",
        status: "Repo + Live",
        accent: "from-violet-400 to-fuchsia-500",
        text: "A live LMS website with a course-focused header, learning sections, and a polished responsive interface.",
        description:
          "This LMS website presents a learning platform experience with a clear header, course-focused messaging, structured content sections, and a responsive layout that can grow into a full education product showcase.",
        details: [
          "Modern landing-page header for an LMS brand",
          "Responsive website structure for desktop and mobile",
          "Ready for project screenshots, UI breakdowns, and future feature notes",
        ],
        previewImage: assetHref("projects/lms-preview.png?v=20260626b"),
        repoUrl: "https://github.com/coderAyon/LMS-Website",
        liveUrl: "https://coderayon.github.io/LMS-Website/",
      },
    ],
  },
  {
    id: "graphics",
    label: "Graphics Design",
    icon: Palette,
    summary: "Brand visuals, social media design, thumbnails, posters, and Fiverr client graphics.",
    projects: [
      {
        title: "Visual Identity System",
        type: "Future Design Case Study",
        accent: "from-violet-500 to-fuchsia-400",
        text: "A premium brand direction slot ready for logos, identity systems, and client concepts.",
      },
      {
        title: "Social Design Pack",
        type: "Future Image Set",
        accent: "from-cyan-300 to-violet-400",
        text: "Upload future social posts, thumbnails, banners, and creative campaign screenshots.",
      },
      {
        title: "Poster & Thumbnail Series",
        type: "Future Graphics Work",
        accent: "from-slate-100 to-violet-300",
        text: "Prepared for high-impact graphics, poster compositions, and polished Fiverr deliverables.",
      },
    ],
  },
];

export const fiverrReviews = Array.from({ length: 10 }, (_, index) => ({
  image: assetHref(`reviews/fiverr-review-${String(index + 1).padStart(2, "0")}.png`),
  alt: `Fiverr client review screenshot ${index + 1}`,
}));

const graphicsAssetVersion = "20260625";

const createGraphicsSamples = ({ id, label, count, folder, prefix, orientation = "landscape" }) =>
  Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      id: `${id}-${number}`,
      title: `${label} Work ${number}`,
      label,
      number,
      orientation,
      image: assetHref(`graphics/${folder}/${prefix}-${number}.jpg?v=${graphicsAssetVersion}`),
      note: "Portfolio showcase",
    };
  });

export const graphicsWorkTypes = [
  {
    id: "logo",
    label: "Logo",
    summary: "Logo marks, brand symbols, monograms, and identity concepts ready for client-proof presentation.",
    accent: "from-violet-400 to-fuchsia-500",
    samples: createGraphicsSamples({
      id: "logo",
      label: "Logo",
      count: 16,
      folder: "logo",
      prefix: "logo",
    }),
  },
  {
    id: "business-card",
    label: "Business card",
    summary: "Business card layouts, print-ready identity pieces, and premium stationery compositions.",
    accent: "from-cyan-300 to-violet-500",
    samples: createGraphicsSamples({
      id: "business-card",
      label: "Business card",
      count: 10,
      folder: "business-card",
      prefix: "business-card",
    }),
  },
  {
    id: "t-shirt",
    label: "T shirt",
    summary: "T-shirt graphics, apparel mockups, merch visuals, and bold wearable design concepts.",
    accent: "from-fuchsia-400 to-purple-600",
    samples: createGraphicsSamples({
      id: "t-shirt",
      label: "T shirt",
      count: 8,
      folder: "t-shirt",
      prefix: "t-shirt",
      orientation: "portrait",
    }),
  },
];

export const cvAssetUrl = assetHref("profile/ayon-roy-cv.pdf");
const profilePhotoUrl = assetHref("profile/ayon-roy-profile.jpg?v=20260625");

export const defaultProfile = {
  name: "Ayon Roy",
  role: "Computer Science Student / Graphics Designer",
  address: "Manikganj, Khalpar, Dhaka, Bangladesh",
  phone: "+880 1630802119",
  phoneAlt: "+880 1569199502",
  email: "ayonr169@gmail.com",
  academicProgram: "Computer Science Student",
  academicFocus: "Graphics design, web interfaces, creative technology, and portfolio projects",
  academicStatus: "Learning, building, and preparing stronger client-ready case studies",
  bio: "I create futuristic visual identities and interactive portfolio experiences with a growing computer science foundation.",
  photoUrl: profilePhotoUrl,
  photoDataUrl: "",
};

export function readSavedProfile() {
  return defaultProfile;
}

export function broadcastProfileUpdate(profile) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ayon-profile-updated", { detail: profile }));
}
