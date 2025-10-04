import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

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
  };

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-foreground" viewBox="0 0 100 100" fill="none">
                  <path d="M20 20 L20 50 L50 50 M20 50 L20 80 L35 80 M55 20 L80 20 M65 30 L65 80" 
                        stroke="currentColor" strokeWidth="8" strokeLinecap="square"/>
                </svg>
              </div>
              <span className="text-xl font-display font-bold">Frame Plus</span>
            </div>
            <p className="text-sm text-gray-400 font-arabic">
              فريق التصوير الاحترافي المتخصص في التقاط أجمل اللحظات بأعلى جودة وإبداع.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="text-gray-400 hover:text-primary transition-colors"
                  data-testid="footer-home"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("gallery")} 
                  className="text-gray-400 hover:text-primary transition-colors"
                  data-testid="footer-gallery"
                >
                  معرض الأعمال
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("team")} 
                  className="text-gray-400 hover:text-primary transition-colors"
                  data-testid="footer-team"
                >
                  الفريق
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")} 
                  className="text-gray-400 hover:text-primary transition-colors"
                  data-testid="footer-services"
                >
                  الخدمات
                </button>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">خدماتنا</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400">تصوير حفلات الزفاف</span></li>
              <li><span className="text-gray-400">الفيديو الاحترافي</span></li>
              <li><span className="text-gray-400">تصوير البورتريه</span></li>
              <li><span className="text-gray-400">تصوير الفعاليات</span></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">النشرة البريدية</h3>
            <p className="text-sm text-gray-400 mb-4 font-arabic">اشترك للحصول على آخر العروض والأخبار</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2" data-testid="newsletter-form">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-background/10 border border-border text-sm focus:outline-none focus:border-primary"
                data-testid="newsletter-email"
                required
              />
              <button 
                type="submit" 
                className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold"
                data-testid="newsletter-submit"
              >
                اشتراك
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 font-arabic">
            © 2024 Frame Plus. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6 text-sm">
            <button className="text-gray-400 hover:text-primary transition-colors" data-testid="privacy-policy">
              سياسة الخصوصية
            </button>
            <button className="text-gray-400 hover:text-primary transition-colors" data-testid="terms-of-service">
              شروط الاستخدام
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
