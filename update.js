const fs = require('fs');
let content = fs.readFileSync('src/components/PortfolioView.tsx', 'utf8');

// Add Image import if not present
if (!content.includes('import Image from "next/image"')) {
  content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport Image from "next/image";');
}

// Add image field to interface
content = content.replace('gradient: string;\n  tinggi', 'gradient: string;\n  image: string;\n  tinggi');

// Update PROYEK_DATA
let i = 1;
content = content.replace(/gradient: "linear-gradient[^"]+",\n    tinggi/g, (match) => {
  return `gradient: "${match.split('"')[1]}",\n    image: "/images/porto-${i++}.jpg",\n    tinggi`;
});

// Update ProyekCard
const cardTarget = `      {/* ── Artwork Area ── */}
      <div
        style={{
          width: "100%",
          height: TINGGI_MAP[proyek.tinggi],
          backgroundImage: proyek.gradient,
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.50s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "transform",
          position: "relative",
        }}
      >
        {/* Pola dekoratif tipis */}`;

const cardReplacement = `      {/* ── Artwork Area ── */}
      <div
        style={{
          width: "100%",
          height: TINGGI_MAP[proyek.tinggi],
          backgroundColor: "#e2e8f0",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.50s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "transform",
          position: "relative",
        }}
      >
        <Image
          src={proyek.image}
          alt={proyek.judul}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Pola dekoratif tipis */}`;

content = content.replace(cardTarget, cardReplacement);

fs.writeFileSync('src/components/PortfolioView.tsx', content);
console.log('Update complete');
