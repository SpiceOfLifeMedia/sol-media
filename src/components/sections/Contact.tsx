import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Phone number is required"),
  website: z.string().optional(),
  needs: z.string().min(10, "Please briefly describe what you need"),
  budget: z.string({ required_error: "Please select a budget range" }),
  timeline: z.string().min(2, "Please indicate your timeline"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      website: "",
      needs: "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/sol-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Submission failed (${res.status})`);
      }

      setIsSuccess(true);
      toast({
        title: "Request received",
        description: "We'll be in touch shortly to discuss your website.",
      });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description:
          "We couldn't submit your request just now. Please try again, or email info@spiceoflifemedia.com.au directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" className="bg-white border-t border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-6 leading-tight">
                Ready for a website that <span className="italic text-primary">finally matches your business?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                Tell us what you do, where your current website is letting you down, and what you want the new site to achieve.
              </p>
              
              <div className="bg-background border border-border p-6 rounded-sm mt-12 inline-block">
                <p className="text-sm font-medium text-foreground/80 italic flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
                  No pressure. No hard sell. Just a clear look at what your website needs.
                </p>
              </div>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7">
            <Reveal delay={0.2} direction="left">
              <div className="bg-background border border-border/50 p-8 md:p-10 rounded-sm shadow-sm relative overflow-hidden">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center h-full min-h-[500px]">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                    >
                      <CheckCircle2 className="w-20 h-20 text-accent mb-6" />
                    </motion.div>
                    <h3 className="text-3xl font-serif font-medium text-foreground mb-4">Request Received</h3>
                    <p className="text-foreground/70 max-w-md mx-auto">
                      Thanks — your website review request has been received. We'll be in touch within 1–2 business days with next steps.
                    </p>
                    <button 
                      onClick={() => {
                        form.reset();
                        setIsSuccess(false);
                      }}
                      className="mt-8 text-sm font-semibold text-primary underline underline-offset-4 hover:text-accent transition-colors"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Your Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" className="bg-white border-border/50 focus-visible:ring-primary h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="businessName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Business Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Acme Construction" className="bg-white border-border/50 focus-visible:ring-primary h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" className="bg-white border-border/50 focus-visible:ring-primary h-12" {...field} />
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
                              <FormLabel className="text-foreground font-semibold">Phone Number *</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="0400 000 000" className="bg-white border-border/50 focus-visible:ring-primary h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold">Current Website (if applicable)</FormLabel>
                            <FormControl>
                              <Input placeholder="www.yourwebsite.com.au" className="bg-white border-border/50 focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Budget Range *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-white border-border/50 focus-visible:ring-primary h-12">
                                    <SelectValue placeholder="Select a range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Under $1,500">Under $1,500</SelectItem>
                                  <SelectItem value="$1,500–$3,500">$1,500–$3,500</SelectItem>
                                  <SelectItem value="$3,500–$6,500">$3,500–$6,500</SelectItem>
                                  <SelectItem value="$6,500+">$6,500+</SelectItem>
                                  <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="timeline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Timeline *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Next month, ASAP" className="bg-white border-border/50 focus-visible:ring-primary h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="needs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold">What do you need? *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us briefly about the project goals..." 
                                className="bg-white border-border/50 focus-visible:ring-primary min-h-[100px] resize-y" 
                                {...field} 
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
                            <FormLabel className="text-foreground font-semibold">Any other details?</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Additional context..." 
                                className="bg-white border-border/50 focus-visible:ring-primary min-h-[80px] resize-y" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 rounded-sm text-base font-semibold transition-all duration-200 mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          "Request Website Review"
                        )}
                      </button>
                    </form>
                  </Form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
