import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PortfolioItem } from "@shared/schema";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const { data: portfolioItems = [] } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  const categories = [
    { id: "all", label: "الكل" },
    { id: "wedding", label: "حفلات الزفاف" },
    { id: "portrait", label: "البورتريه" },
    { id: "event", label: "الفعاليات" },
    { id: "commercial", label: "التجاري" }
  ];

  const filteredItems = activeCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            معرض الأعمال
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            أحدث أعمالنا
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-arabic">
            مجموعة مختارة من أفضل الصور والفيديوهات التي قمنا بالتقاطها لعملائنا
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
              data-testid={`filter-${category.id}`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="gallery-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="gallery-item rounded-xl overflow-hidden bg-card shadow-md cursor-pointer"
              onClick={() => setLightboxImage(item.imageUrl)}
              data-testid={`gallery-item-${item.id}`}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-72 object-cover"
              />
              <div className="gallery-overlay">
                <div className="text-white">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="btn-primary px-8 py-4 rounded-lg font-bold" data-testid="load-more">
            عرض المزيد
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
          data-testid="lightbox-overlay"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white hover:text-primary z-10 p-2"
            data-testid="lightbox-close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <img 
            src={lightboxImage} 
            alt="Gallery Image" 
            className="max-w-full max-h-full object-contain"
            data-testid="lightbox-image"
          />
        </div>
      )}
    </section>
  );
}
