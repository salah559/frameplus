import { 
  type User, 
  type InsertUser, 
  type PortfolioItem, 
  type InsertPortfolioItem,
  type TeamMember,
  type InsertTeamMember,
  type Service,
  type InsertService,
  type Booking,
  type InsertBooking
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  
  getBookings(): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private portfolioItems: Map<string, PortfolioItem>;
  private teamMembers: Map<string, TeamMember>;
  private services: Map<string, Service>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.users = new Map();
    this.portfolioItems = new Map();
    this.teamMembers = new Map();
    this.services = new Map();
    this.bookings = new Map();
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample portfolio items
    const portfolioData = [
      {
        id: randomUUID(),
        title: "حفل زفاف أنيق",
        description: "التصوير التقليدي",
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "wedding",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "جلسة بورتريه احترافية",
        description: "تصوير شخصي",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "portrait",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "فعالية شركات",
        description: "تصوير المؤتمرات",
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "event",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "تصوير المنتجات",
        description: "تصوير تجاري",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "commercial",
        createdAt: new Date()
      }
    ];
    
    portfolioData.forEach(item => this.portfolioItems.set(item.id, item));

    // Initialize team members
    const teamData = [
      {
        id: randomUUID(),
        name: "أحمد محمد",
        role: "المصور الرئيسي",
        description: "مصور محترف بخبرة 10 سنوات في تصوير حفلات الزفاف والفعاليات الكبرى. حاصل على جوائز دولية في التصوير الفوتوغرافي.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        experience: 10,
        socialLinks: ["https://instagram.com", "https://twitter.com"]
      },
      {
        id: randomUUID(),
        name: "سارة أحمد",
        role: "مصورة البورتريه",
        description: "متخصصة في التصوير الشخصي والعائلي بخبرة 8 سنوات. تتميز بأسلوبها الفني الذي يبرز جمال اللحظات الطبيعية والعفوية.",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        experience: 8,
        socialLinks: ["https://instagram.com", "https://twitter.com"]
      },
      {
        id: randomUUID(),
        name: "خالد عمر",
        role: "مختص الفيديو",
        description: "خبير في إنتاج الفيديو والمونتاج السينمائي. يحول اللحظات إلى قصص مؤثرة باستخدام أحدث تقنيات التصوير والمعالجة.",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        experience: 7,
        socialLinks: ["https://instagram.com", "https://twitter.com"]
      }
    ];
    
    teamData.forEach(member => this.teamMembers.set(member.id, member));

    // Initialize services
    const servicesData = [
      {
        id: randomUUID(),
        name: "باقة حفلات الزفاف",
        description: "تغطية كاملة ليوم زفافك بأعلى جودة مع ألبوم رقمي وطباعة فاخرة",
        price: 5000,
        features: ["8 ساعات تصوير", "+500 صورة معدلة", "ألبوم رقمي مخصص", "مصور + مساعد"],
        isPopular: "false"
      },
      {
        id: randomUUID(),
        name: "باقة الفيديو الاحترافي",
        description: "فيديو سينمائي احترافي يحكي قصتك بأسلوب فني مميز",
        price: 7500,
        features: ["فيديو 10-15 دقيقة", "تصوير 4K Ultra HD", "مونتاج سينمائي", "موسيقى مرخصة", "طائرة درون"],
        isPopular: "true"
      },
      {
        id: randomUUID(),
        name: "باقة البورتريه",
        description: "جلسة تصوير شخصية أو عائلية في الاستوديو أو الموقع المفضل لديك",
        price: 1500,
        features: ["ساعة تصوير", "25 صورة معدلة", "تعديل احترافي", "خلفيات متنوعة"],
        isPopular: "false"
      }
    ];
    
    servicesData.forEach(service => this.services.set(service.id, service));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values());
  }

  async getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(
      item => item.category === category
    );
  }

  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = randomUUID();
    const item: PortfolioItem = {
      ...insertItem,
      description: insertItem.description ?? null,
      id,
      createdAt: new Date()
    };
    this.portfolioItems.set(id, item);
    return item;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = randomUUID();
    const member: TeamMember = {
      ...insertMember,
      experience: insertMember.experience ?? null,
      socialLinks: insertMember.socialLinks ?? null,
      id
    };
    this.teamMembers.set(id, member);
    return member;
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = {
      ...insertService,
      price: insertService.price ?? null,
      isPopular: insertService.isPopular ?? null,
      id
    };
    this.services.set(id, service);
    return service;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      preferredDate: insertBooking.preferredDate ?? null,
      message: insertBooking.message ?? null,
      id,
      createdAt: new Date(),
      status: "pending"
    };
    this.bookings.set(id, booking);
    return booking;
  }
}

export const storage = new MemStorage();
