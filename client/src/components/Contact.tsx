import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, Instagram, Twitter, Facebook, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      preferredDate: "",
      message: "",
    },
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم إرسال طلبك بنجاح",
        description: "سنتواصل معك في أقرب وقت ممكن",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: () => {
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إرسال طلبك. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBooking) => {
    createBookingMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "الهاتف",
      value: "+966 50 123 4567",
      href: "tel:+966501234567"
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      value: "info@frameplus.com",
      href: "mailto:info@frameplus.com"
    },
    {
      icon: MapPin,
      title: "العنوان",
      value: "الرياض، المملكة العربية السعودية",
      href: "#"
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Github, href: "#", label: "GitHub" }
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Info */}
          <div>
            <div className="mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                تواصل معنا
              </span>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                احجز جلستك الآن
              </h2>
              <p className="text-lg text-muted-foreground font-arabic">
                نحن هنا للإجابة على جميع استفساراتك ومساعدتك في اختيار الباقة المناسبة
              </p>
            </div>
            
            {/* Contact Details */}
            <div className="space-y-6 mb-12">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Social Links */}
            <div>
              <h3 className="font-bold text-foreground mb-4">تابعنا على</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-card hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all shadow-sm"
                    aria-label={social.label}
                    data-testid={`social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-foreground">الاسم</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="اسمك الكامل" 
                            {...field} 
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-foreground">رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="05xxxxxxxx" 
                            {...field} 
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-foreground">البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="example@email.com" 
                          {...field} 
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-foreground">نوع الخدمة</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-service">
                            <SelectValue placeholder="اختر نوع الخدمة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="حفلات الزفاف">حفلات الزفاف</SelectItem>
                          <SelectItem value="الفيديو الاحترافي">الفيديو الاحترافي</SelectItem>
                          <SelectItem value="البورتريه">البورتريه</SelectItem>
                          <SelectItem value="الفعاليات">الفعاليات</SelectItem>
                          <SelectItem value="تصوير المنتجات">تصوير المنتجات</SelectItem>
                          <SelectItem value="باقة مخصصة">باقة مخصصة</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-foreground">التاريخ المفضل</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field}
                          value={field.value ?? ""}
                          data-testid="input-date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-foreground">رسالتك</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="أخبرنا المزيد عن احتياجاتك..." 
                          rows={4} 
                          className="resize-none" 
                          {...field}
                          value={field.value ?? ""}
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full btn-primary px-6 py-4 rounded-lg font-bold text-lg"
                  disabled={createBookingMutation.isPending}
                  data-testid="submit-booking"
                >
                  {createBookingMutation.isPending ? "جاري الإرسال..." : "إرسال الطلب"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
