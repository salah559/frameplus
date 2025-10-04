export default function Hero() {
  const scrollToGallery = () => {
    const element = document.getElementById("gallery");
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Professional photography equipment and studio setup" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="animate-fade-in-up">
          {/* Logo Display */}
          <div className="inline-block mb-8 transform hover:scale-105 transition-transform duration-300">
            <div className="w-32 h-32 lg:w-40 lg:h-40 bg-primary rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-20 h-20 lg:w-24 lg:h-24 text-primary-foreground" viewBox="0 0 100 100" fill="none">
                <path d="M20 20 L20 50 L50 50 M20 50 L20 80 L35 80 M55 20 L80 20 M65 30 L65 80" 
                      stroke="currentColor" strokeWidth="8" strokeLinecap="square"/>
              </svg>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold text-white mb-6">
            Frame <span className="text-primary">Plus</span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 mb-4 font-arabic">
            فريق التصوير الاحترافي
          </p>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-12 font-arabic leading-relaxed">
            نلتقط لحظاتكم المميزة بعدسات احترافية، نحول ذكرياتكم إلى إبداعات خالدة
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToGallery}
              className="btn-primary px-8 py-4 rounded-lg font-bold text-lg w-full sm:w-auto"
              data-testid="hero-gallery-cta"
            >
              استعرض أعمالنا
            </button>
            <button
              onClick={scrollToContact}
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all w-full sm:w-auto"
              data-testid="hero-contact-cta"
            >
              احجز جلسة تصوير
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
