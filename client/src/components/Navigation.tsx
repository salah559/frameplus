import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import framePlusLogo from "@assets/frame plus_1759547660654.jpg";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "gallery", "team", "services", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "الرئيسية" },
    { id: "gallery", label: "معرض الأعمال" },
    { id: "team", label: "الفريق" },
    { id: "services", label: "الخدمات" },
    { id: "contact", label: "اتصل بنا" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm shadow-sm z-50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <button 
              onClick={() => scrollToSection("home")} 
              className="flex items-center gap-3 group"
              data-testid="logo-home"
            >
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105">
                <svg className="w-8 h-8 text-primary-foreground" viewBox="0 0 100 100" fill="none">
                  <path d="M20 20 L20 50 L50 50 M20 50 L20 80 L35 80 M55 20 L80 20 M65 30 L65 80" 
                        stroke="currentColor" strokeWidth="8" strokeLinecap="square"/>
                </svg>
              </div>
              <span className="text-xl lg:text-2xl font-display font-bold text-foreground">Frame Plus</span>
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link text-foreground hover:text-primary font-medium transition-colors ${
                    activeSection === item.id ? "active" : ""
                  }`}
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden lg:block btn-primary px-6 py-3 rounded-lg font-semibold"
              data-testid="nav-cta"
            >
              احجز الآن
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              data-testid="mobile-menu-toggle"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-card z-40 lg:hidden transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        data-testid="mobile-menu"
      >
        <div className="p-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 left-6 p-2 rounded-lg hover:bg-muted transition-colors"
            data-testid="mobile-menu-close"
          >
            <X className="w-6 h-6" />
          </button>
          
          <nav className="flex flex-col gap-6 mt-16">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-2xl font-semibold hover:text-primary transition-colors text-right"
                data-testid={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-primary px-6 py-4 rounded-lg font-semibold text-center mt-4"
              data-testid="mobile-nav-cta"
            >
              احجز الآن
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
