import { useQuery } from "@tanstack/react-query";
import { Instagram, Twitter } from "lucide-react";
import type { TeamMember } from "@shared/schema";

export default function Team() {
  const { data: teamMembers = [] } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  return (
    <section id="team" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            تعرف علينا
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            فريق العمل
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-arabic">
            مصورون محترفون بخبرة واسعة في جميع مجالات التصوير الفوتوغرافي والفيديو
          </p>
        </div>
        
        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card bg-card rounded-2xl overflow-hidden shadow-lg" data-testid={`team-card-${member.id}`}>
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={member.imageUrl} 
                  alt={`${member.name} - ${member.role}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-display font-bold text-white">{member.name}</h3>
                  <p className="text-primary font-semibold">{member.role}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4 font-arabic">
                  {member.description}
                </p>
                <div className="flex gap-3">
                  {member.socialLinks?.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all"
                      data-testid={`social-link-${member.id}-${index}`}
                    >
                      {index === 0 ? <Instagram className="w-5 h-5" /> : <Twitter className="w-5 h-5" />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
