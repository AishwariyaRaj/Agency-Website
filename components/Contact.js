"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@luminarystudio.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 000-0000" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email";
    }
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.trim().length < 20)
      errs.message = "Message must be at least 20 characters";
    return errs;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden bg-theme-bg transition-colors duration-300">
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionTitle
          eyebrow="Let's Talk"
          title={
            <>
              Start Your Next{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                Project
              </span>
            </>
          }
          description="Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours."
        />

        <div className="mt-16 grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-theme-text-title mb-2">
                Get in touch
              </h3>
              <p className="text-theme-text-secondary text-sm leading-relaxed">
                Whether you&apos;re starting a new venture or scaling an existing
                product, we&apos;re here to help craft the perfect digital experience.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-xs text-theme-text-secondary/70 mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-sm text-theme-text-title font-medium">
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping opacity-60" />
              </div>
              <span className="text-sm text-emerald-500 dark:text-emerald-300 font-medium">
                Available for new projects
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-theme-card-bg border border-theme-card-border shadow-theme-card rounded-2xl p-12 text-center transition-all duration-300"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-theme-text-title mb-3">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-theme-text-secondary text-sm mb-8 max-w-sm mx-auto">
                    Thanks for reaching out. Our team will get back to you within
                    24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-theme-card-bg border border-theme-card-border shadow-theme-card hover:shadow-theme-card-hover rounded-2xl p-6 md:p-8 space-y-6 transition-all duration-300"
                >
                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-theme-text-primary mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full bg-theme-input-bg border rounded-xl px-4 py-3 text-sm text-theme-input-text placeholder-theme-text-secondary/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 ${
                          errors.name
                            ? "border-red-500/50 focus:ring-red-500/30"
                            : "border-theme-input-border hover:border-theme-text-title/20"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1.5">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-theme-text-primary mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full bg-theme-input-bg border rounded-xl px-4 py-3 text-sm text-theme-input-text placeholder-theme-text-secondary/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 ${
                          errors.email
                            ? "border-red-500/50 focus:ring-red-500/30"
                            : "border-theme-input-border hover:border-theme-text-title/20"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1.5">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-theme-text-primary mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project, goals, and timeline..."
                      value={form.message}
                      onChange={handleChange}
                      className={`w-full bg-theme-input-bg border rounded-xl px-4 py-3 text-sm text-theme-input-text placeholder-theme-text-secondary/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 resize-none ${
                        errors.message
                          ? "border-red-500/50 focus:ring-red-500/30"
                          : "border-theme-input-border hover:border-theme-text-title/20"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1.5">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 text-sm cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
