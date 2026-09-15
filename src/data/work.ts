export type Work = { id: number; title: string; category: string; year: string; image: string; alt: string; featured?: boolean; showOnHome?: boolean };

export const works: Work[] = [
  { id: 1, title: "After Hours", category: "Editorial", year: "2025", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85", alt: "Portrait in soft natural light", featured: true, showOnHome: true },
  { id: 2, title: "Quiet Form", category: "Beauty", year: "2025", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=85", alt: "Black and white fashion portrait", featured: true, showOnHome: true },
  { id: 3, title: "In Transit", category: "Campaign", year: "2024", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85", alt: "Fashion look in a city setting", featured: false, showOnHome: true },
  { id: 4, title: "Study No. 04", category: "Portrait", year: "2024", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85", alt: "Editorial portrait with sculptural styling", featured: true, showOnHome: false },
  { id: 5, title: "The New Line", category: "Fashion", year: "2023", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85", alt: "Model wearing a neutral fashion look", featured: false, showOnHome: true },
  { id: 6, title: "Nocturne", category: "Beauty", year: "2023", image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85", alt: "Close fashion portrait against a dark background", featured: false, showOnHome: false },
];

export const categories = ["All", "Fashion", "Editorial", "Beauty", "Portrait", "Campaign"];
