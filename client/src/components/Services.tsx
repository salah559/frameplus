import { useQuery } from "@tanstack/react-query";
import { Camera, Play, User, Building, Package, Settings, Check } from "lucide-react";
import type { Service } from "@shared/schema";

const getServiceIcon = (serviceName: string) => {
  if (serviceName.includes("زفاف")) return Camera;
  if (serviceName.includes("فيديو")) return Play;
  if (serviceName.includes("بورتريه")) return User;
  if (serviceName.includes("فعاليات")) return Building;
  if (serviceName.includes("منتجات")) return Package;
  return Settings;
};

export default function Services() {
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

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
    <section id="services" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            خدماتنا
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            باقات التصوير
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-arabic">
            اختر الباقة المناسبة لك من بين مجموعة متنوعة من خدمات التصوير الاحترافية
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = getServiceIcon(service.name);
            return (
              <div 
                key={service.id} 
                className={`service-card bg-card rounded-2xl p-8 shadow-lg ${
                  service.isPopular === "true" ? "border-2 border-primary" : ""
                }`}
                data-testid={`service-card-${service.id}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-16 h-16 ${
                    service.isPopular === "true" ? "bg-primary" : "bg-primary/10"
                  } rounded-2xl flex items-center justify-center`}>
                    <IconComponent className={`w-8 h-8 ${
                      service.isPopular === "true" ? "text-primary-foreground" : "text-primary"
                    }`} />
                  </div>
                  {service.isPopular === "true" && (
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                      الأكثر طلباً
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  {service.name}
                </h3>
                <p className="text-muted-foreground mb-6 font-arabic">
                  {service.description}
                </p>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-4">
                    {service.price ? (
                      <>
                        <span className="text-4xl font-bold text-foreground">{service.price}</span>
                        <span className="text-muted-foreground">ريال</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-foreground">حسب الطلب</span>
                    )}
                  </div>
                  
                  <ul className="space-y-3 text-sm">
                    {service.features?.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={scrollToContact}
                  className="w-full btn-primary px-6 py-3 rounded-lg font-bold"
                  data-testid={`service-cta-${service.id}`}
                >
                  {service.price ? "احجز الآن" : "تواصل معنا"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
