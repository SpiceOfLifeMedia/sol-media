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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const inputClass =
  "bg-transparent border-0 border-b border-foreground/15 rounded-none px-0 h-12 focus-visible:ring-0 focus-visible:border-foreground placeholder:text-foreground/30 transition-colors";

const labelClass =
  "text-[10px] tracking-[0.28em] uppercase text-foreground/50 font-medium mb-2";

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
      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      setIsSuccess(true);
      toast({
        title: "Request received",
        description: "We'll be in touch shortly to discuss your website.",
      });
    } catch {
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
    <Section id="contact" className="bg-background" spacing="loose">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-8">
                11 / Contact
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)] mb-8">
                Ready for a website<br />
                that{" "}
                <span className="italic text-primary/90">
                  finally matches the business?
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-foreground/65 leading-relaxed text-base md:text-lg max-w-md mb-10">
                Tell us what you do, where your current website is letting you
                down, and what you want the new site to achieve.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="border-t border-foreground/10 pt-6">
                <p className="text-[10px] tracking-[0.28em] uppercase text-accent mb-3">
                  No pressure
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed italic max-w-sm">
                  No hard sell. Just a clear look at what your website needs.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              {isSuccess ? (
                <div className="flex flex-col items-start py-16">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle2 className="w-14 h-14 text-accent mb-8" />
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
                    Request received.
                  </h3>
                  <p className="text-foreground/65 max-w-md leading-relaxed">
                    Thanks — your website review request has been received.
                    We'll be in touch within 1–2 business days with next steps.
                  </p>
                  <button
                    onClick={() => {
                      form.reset();
                      setIsSuccess(false);
                    }}
                    className="mt-8 text-sm font-semibold text-primary hover:text-accent transition-colors duration-500 inline-flex items-center gap-2"
                  >
                    Submit another enquiry
                    <span>→</span>
                  </button>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClass}>
                              Your Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Full name"
                                className={inputClass}
                                {...field}
                              />
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
                            <FormLabel className={labelClass}>
                              Business Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Business / brand"
                                className={inputClass}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClass}>
                              Email *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                className={inputClass}
                                {...field}
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
                            <FormLabel className={labelClass}>
                              Phone *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="0400 000 000"
                                className={inputClass}
                                {...field}
                              />
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
                          <FormLabel className={labelClass}>
                            Current Website (if any)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="www.yourwebsite.com.au"
                              className={inputClass}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClass}>
                              Budget Range *
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger
                                  className={`${inputClass} text-foreground/80`}
                                >
                                  <SelectValue placeholder="Select a range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Under $1,500">
                                  Under $1,500
                                </SelectItem>
                                <SelectItem value="$1,500–$3,500">
                                  $1,500–$3,500
                                </SelectItem>
                                <SelectItem value="$3,500–$6,500">
                                  $3,500–$6,500
                                </SelectItem>
                                <SelectItem value="$6,500+">$6,500+</SelectItem>
                                <SelectItem value="Not sure yet">
                                  Not sure yet
                                </SelectItem>
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
                            <FormLabel className={labelClass}>
                              Timeline *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Next month, ASAP"
                                className={inputClass}
                                {...field}
                              />
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
                          <FormLabel className={labelClass}>
                            What do you need? *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us briefly about the project goals…"
                              className="bg-transparent border-0 border-b border-foreground/15 rounded-none px-0 min-h-[100px] resize-y focus-visible:ring-0 focus-visible:border-foreground placeholder:text-foreground/30 transition-colors"
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
                          <FormLabel className={labelClass}>
                            Any other details?
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Additional context…"
                              className="bg-transparent border-0 border-b border-foreground/15 rounded-none px-0 min-h-[80px] resize-y focus-visible:ring-0 focus-visible:border-foreground placeholder:text-foreground/30 transition-colors"
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
                      className="group inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-sm text-sm font-semibold tracking-wide transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary/90 hover:translate-y-[-1px] hover:shadow-[0_12px_30px_-12px_rgba(31,36,51,0.45)] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Request Website Review
                          <span className="ml-3 inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                            →
                          </span>
                        </>
                      )}
                    </button>
                  </form>
                </Form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
