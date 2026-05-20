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
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Please briefly tell us about the project"),
  name: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.string().optional(),
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
      email: "",
      message: "",
      name: "",
      phone: "",
      projectType: "",
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
        title: "Enquiry received",
        description: "Thanks — your enquiry has been received.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description:
          "We couldn't submit your enquiry just now. Please try again, or email info@spiceoflifemedia.com.au directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" className="bg-background" spacing="compact">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-foreground/40 mb-6">
                07 / Contact
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-medium text-foreground tracking-[-0.02em] leading-[1.02] text-[clamp(2.25rem,5vw,4.5rem)] mb-6">
                Start a{" "}
                <span className="italic text-primary/90">project.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-foreground/65 leading-relaxed text-base md:text-lg max-w-md mb-8">
                Tell us briefly what you need — a website, a video, a podcast
                edit, an event piece, a brand asset. Only email and message are
                required.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="border-t border-foreground/10 pt-5">
                <p className="text-[10px] tracking-[0.28em] uppercase text-accent mb-3">
                  Direct
                </p>
                <a
                  href="mailto:info@spiceoflifemedia.com.au"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors break-all"
                >
                  info@spiceoflifemedia.com.au
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              {isSuccess ? (
                <div className="flex flex-col items-start py-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle2 className="w-12 h-12 text-accent mb-6" />
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-3">
                    Enquiry received.
                  </h3>
                  <p className="text-foreground/65 max-w-md leading-relaxed">
                    Thanks — your enquiry has been received. We'll be in touch
                    shortly with next steps.
                  </p>
                  <button
                    onClick={() => {
                      form.reset();
                      setIsSuccess(false);
                    }}
                    className="mt-6 text-sm font-semibold text-primary hover:text-accent transition-colors duration-500 inline-flex items-center gap-2"
                  >
                    Submit another enquiry
                    <span>→</span>
                  </button>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-7"
                  >
                    <div className="grid md:grid-cols-2 gap-7">
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
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClass}>
                              Your Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Optional"
                                className={inputClass}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-7">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClass}>Phone</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Optional"
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
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClass}>
                              Business / Project Type
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="contact-project-type"
                                placeholder="e.g. Web, Video, Podcast, Event"
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
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            What do you need? *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="A few sentences about the project…"
                              className="bg-transparent border-0 border-b border-foreground/15 rounded-none px-0 min-h-[110px] resize-y focus-visible:ring-0 focus-visible:border-foreground placeholder:text-foreground/30 transition-colors"
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
                      className="group inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-sm text-sm font-semibold tracking-wide transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary/90 hover:translate-y-[-1px] hover:shadow-[0_12px_30px_-12px_rgba(31,36,51,0.45)] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Enquiry
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
