import { getDictionary, Locale } from "@/dictionaries";
import Image from "next/image";
import Link from "next/link";

interface ChessSetMock {
  title: string;
  image: string;
  description: string;
  tags: string[];
}

const mockSets: ChessSetMock[] = [
  {
    title: "Minimalist Modern",
    image: "/images/chess_modern_wood_1773703821418.png",
    description: "Elegant wooden pieces on polished marble board with sleek typography design.",
    tags: ["Wood", "Modern", "Minimalist"]
  },
  {
    title: "Neon Glass Abstract",
    image: "/images/chess_neon_glass_1773703836512.png",
    description: "Futuristic abstract design with soft neon cyan glowing crystals backdrop.",
    tags: ["Glass", "Futuristic", "Artistic"]
  },
  {
    title: "Medieval Stone Carved",
    image: "/images/chess_medieval_stone_1773703850401.png",
    description: "Detailed vintage Knight Theme inspired set in rich walnut stone finishes.",
    tags: ["Stone", "Vintage", "Medieval"]
  },
  {
    title: "Luxury Marble Classic",
    image: "/images/chess_luxury_marble_1773703868198.png",
    description: "Polished White Quartz mixed with dark marble items for absolute elegance.",
    tags: ["Marble", "Classic", "Luxurious"]
  },
  {
    title: "The King's Guard",
    image: "/images/chess_medieval_stone_1773703850401.png",
    description: "Detailed vintage Knight Theme inspired set in rich walnut stone finishes.",
    tags: ["Stone", "Vintage", "Medieval"]
  },
  {
    title: "Nordic Frost",
    image: "/images/chess_modern_wood_1773703821418.png",
    description: "Elegant wooden pieces on polished marble board with sleek typography design.",
    tags: ["Wood", "Modern", "Minimalist"]
  },
  {
    title: "Cyber Neon Glow",
    image: "/images/chess_neon_glass_1773703836512.png",
    description: "Futuristic abstract design with soft neon cyan glowing crystals backdrop.",
    tags: ["Glass", "Futuristic", "Artistic"]
  },
  {
    title: "White Quartz Signature",
    image: "/images/chess_luxury_marble_1773703868198.png",
    description: "Polished White Quartz mixed with dark marble items for absolute elegance.",
    tags: ["Marble", "Classic", "Luxurious"]
  }
];

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang === "pl" ? "pl" : "en") as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      {/* Header Menu */}
      <header className="flex h-16 w-full items-center justify-between border-b px-6 bg-white dark:bg-black sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href={`/${locale}`} className="font-bold tracking-wider text-xl hover:opacity-80 transition">
            CHESS MUSEUM
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link href={`/${locale}`} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {locale === "pl" ? "Strona Główna" : "Home"}
            </Link>
            <Link href={`/${locale}/gallery`} className="text-sm font-medium text-foreground underline underline-offset-4">
              {locale === "pl" ? "Galeria" : "Gallery"}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium hover:underline">
            {dict.common.language} ({locale.toUpperCase()})
          </button>
        </div>
      </header>

      {/* Title */}
      <section className="flex flex-col items-center justify-center gap-2 text-center py-16 px-4 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {locale === "pl" ? "Galeria Eksponatów" : "Exhibit Gallery"}
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          {locale === "pl" 
            ? "Przeglądaj naszą kolekcję unikalnych zestawów szachowych." 
            : "Browse our collection of unique chess sets."}
        </p>
      </section>

      {/* Alternating Grid Chessboard layout for gallery too! */}
      <section className="w-full border-t border-b">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 chess-checkerboard">
          {mockSets.map((set, i) => (
            <div 
              key={i} 
              className="group flex flex-col justify-between p-8 border-r border-b border-zinc-100 dark:border-zinc-800 hover:z-10 hover:shadow-xl transition-all cursor-pointer aspect-square"
            >
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                <Image 
                  src={set.image} 
                  alt={set.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                  {set.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {set.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-2">
                  {set.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-zinc-200/40 dark:bg-zinc-800 text-foreground px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Owner CTA Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4 bg-zinc-50 dark:bg-zinc-900/50">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
          {dict.landing.cta_title}
        </h2>
        <p className="text-base text-muted-foreground mb-6 max-w-md">
          {dict.landing.cta_description}
        </p>
        <button className="px-8 py-3 bg-foreground text-background font-medium rounded-full hover:bg-zinc-800 transition shadow-lg">
          {dict.landing.cta_button}
        </button>
      </section>
    </div>
  );
}
