import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { serviceOptions } from "@/content/home";

const enquirySchema = z.object({
  services: z.array(z.enum(serviceOptions)).min(1, "Choose at least one area."),
  website: z
    .string()
    .trim()
    .max(240)
    .refine(
      (value) =>
        !value ||
        /^https?:\/\//i.test(value) ||
        /^[a-z0-9.-]+\.[a-z]{2,}/i.test(value),
      "Enter a website address, or leave it blank.",
    ),
  projectGoal: z
    .string()
    .trim()
    .min(20, "Give us a little more context so we can respond properly.")
    .max(3000),
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z.string().trim().max(40),
  timeline: z.string().trim().max(80),
  companyWebsite: z.string().max(0),
});

type EnquiryValues = z.infer<typeof enquirySchema>;

const defaults: EnquiryValues = {
  services: [],
  website: "",
  projectGoal: "",
  name: "",
  email: "",
  phone: "",
  timeline: "",
  companyWebsite: "",
};

export function ProjectEnquiry() {
  const [expanded, setExpanded] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const formRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: defaults,
  });

  useEffect(() => {
    const open = () => {
      setExpanded(true);
      window.setTimeout(
        () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
        120,
      );
    };
    window.addEventListener("sol:open-project", open);
    return () => window.removeEventListener("sol:open-project", open);
  }, []);

  const continueToContact = async () => {
    const valid = await trigger(["services", "website", "projectGoal"], {
      shouldFocus: true,
    });
    if (valid) setStep(2);
  };

  const submit = handleSubmit(async (values) => {
    setStatus("sending");
    try {
      const response = await fetch("/api/sol-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const contentType = response.headers.get("content-type") ?? "";
      const payload = contentType.includes("application/json")
        ? await response.json()
        : null;
      if (!response.ok || payload?.ok !== true) {
        throw new Error(`Lead endpoint returned ${response.status}`);
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div className="project-success" role="status">
        <span>Enquiry received</span>
        <h3>We’ll read this properly.</h3>
        <p>
          You’ll receive a considered response from Spice of Life Media—not an
          automated sales sequence.
        </p>
        <button
          className="text-link text-link--paper"
          type="button"
          onClick={() => {
            reset(defaults);
            setStatus("idle");
            setStep(1);
            setExpanded(false);
          }}
        >
          Send another enquiry <span aria-hidden="true">↗</span>
        </button>
      </div>
    );
  }

  return (
    <div className="project-enquiry" ref={formRef}>
      {!expanded ? (
        <button
          className="button button--paper project-enquiry__open"
          type="button"
          onClick={() => setExpanded(true)}
        >
          Start a project
        </button>
      ) : (
        <form onSubmit={submit} noValidate>
          <div className="form-progress" aria-label={`Step ${step} of 2`}>
            <span className={step >= 1 ? "is-active" : ""} />
            <span className={step >= 2 ? "is-active" : ""} />
            <small>0{step} / 02</small>
          </div>

          {step === 1 ? (
            <fieldset
              className="form-step"
              aria-describedby={errors.services ? "services-error" : undefined}
            >
              <legend>Where should we start?</legend>
              <p>Choose one capability, or connect the work.</p>
              <div className="service-choices">
                {serviceOptions.map((service) => (
                  <label key={service}>
                    <input
                      type="checkbox"
                      value={service}
                      aria-invalid={Boolean(errors.services)}
                      aria-describedby={
                        errors.services ? "services-error" : undefined
                      }
                      {...register("services")}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
              {errors.services && (
                <p className="form-error" id="services-error" role="alert">
                  {errors.services.message}
                </p>
              )}

              <label className="form-field">
                <span>Current website <em>Optional</em></span>
                <input
                  type="text"
                  autoComplete="url"
                  placeholder="yourbusiness.com.au"
                  aria-invalid={Boolean(errors.website)}
                  aria-describedby={
                    errors.website ? "website-error" : undefined
                  }
                  {...register("website")}
                />
                {errors.website && (
                  <small
                    className="form-error"
                    id="website-error"
                    role="alert"
                  >
                    {errors.website.message}
                  </small>
                )}
              </label>

              <label className="form-field">
                <span>What needs to change?</span>
                <textarea
                  rows={4}
                  placeholder="Tell us where the business is now, where it needs to go and what is standing in the way."
                  aria-invalid={Boolean(errors.projectGoal)}
                  aria-describedby={
                    errors.projectGoal ? "project-goal-error" : undefined
                  }
                  {...register("projectGoal")}
                />
                {errors.projectGoal && (
                  <small
                    className="form-error"
                    id="project-goal-error"
                    role="alert"
                  >
                    {errors.projectGoal.message}
                  </small>
                )}
              </label>

              <button
                className="button button--paper form-next"
                type="button"
                onClick={continueToContact}
              >
                Continue <span aria-hidden="true">→</span>
              </button>
            </fieldset>
          ) : (
            <fieldset className="form-step">
              <legend>Who should we respond to?</legend>
              <p>Enough detail for a useful first response. Nothing unnecessary.</p>

              <div className="form-grid">
                <label className="form-field">
                  <span>Name</span>
                  <input
                    type="text"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                  />
                  {errors.name && (
                    <small className="form-error" id="name-error" role="alert">
                      {errors.name.message}
                    </small>
                  )}
                </label>
                <label className="form-field">
                  <span>Email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <small className="form-error" id="email-error" role="alert">
                      {errors.email.message}
                    </small>
                  )}
                </label>
                <label className="form-field">
                  <span>Phone <em>Optional</em></span>
                  <input type="tel" autoComplete="tel" {...register("phone")} />
                </label>
                <label className="form-field">
                  <span>Timing <em>Optional</em></span>
                  <select defaultValue="" {...register("timeline")}>
                    <option value="">Select a timeframe</option>
                    <option value="As soon as the right plan is clear">
                      As soon as the right plan is clear
                    </option>
                    <option value="Within 1–3 months">Within 1–3 months</option>
                    <option value="Within 3–6 months">Within 3–6 months</option>
                    <option value="Planning ahead">Planning ahead</option>
                  </select>
                </label>
              </div>

              <label className="honeypot" aria-hidden="true">
                Company website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("companyWebsite")}
                />
              </label>

              <div className="form-actions">
                <button
                  className="text-link text-link--paper"
                  type="button"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button
                  className="button button--paper"
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                </button>
              </div>

              {status === "error" && (
                <p className="form-submit-error" role="alert">
                  The form could not send just now. Email{" "}
                  <a href="mailto:info@spiceoflifemedia.com.au">
                    info@spiceoflifemedia.com.au
                  </a>{" "}
                  and your message will reach the same place.
                </p>
              )}
            </fieldset>
          )}
        </form>
      )}
    </div>
  );
}
