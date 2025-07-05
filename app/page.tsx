"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  CalendarCheck,
  Clock,
  CheckCircle,
  SendHorizontal,
  Star,
  Zap,
  Shield,
  Lock,
  BadgeCheck,
} from "lucide-react";
import { useState } from "react";
import PricingSection from "@/components/pricing";
import TrustedBrandsSlider from "@/components/brandSlider";
import StatsSection from "@/components/StatsSection";
import EmailFlowDemo from "@/components/EmailDemo";
import { EmailTagsPreview } from "@/components/snoozeTags";
import Footer from "@/components/footer";
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const { openSignUp } = useClerk();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = (id: string) => {
    console.log(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const handleTryNow = () => {
    setIsLoading(true);
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      openSignUp({
        afterSignUpUrl: "/dashboard",
        afterSignInUrl: "/dashboard",
      });
    }
    setIsLoading(false);
  };

  const handleStartSnoozing = () => {
    setIsLoading(true);
    if (isSignedIn) {
      router.push("/signup");
    } else {
      openSignUp({
        afterSignUpUrl: "/signup",
        afterSignInUrl: "/signup",
      });
    }
    setIsLoading(false);
  };

  

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/30 to-white dark:from-gray-900 dark:to-sky-950/50"></div>
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-sky-100/50 dark:bg-sky-900/20 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-sky-100/40 dark:bg-sky-900/30 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4 max-w-6xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 mb-4">
            <Zap className="w-4 h-4 mr-2" />
            <span>Over 10,000 emails snoozed daily</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-sky-900 dark:text-sky-200 leading-tight">
            Take Control of Your{" "}
            <span className="text-sky-600 dark:text-sky-400">Email Time</span>
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            SnoozeMail helps you schedule emails to return to your inbox exactly
            when you need them. No plugins, no downloads - just forward and
            forget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleTryNow}
              disabled={isLoading}
              className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600 text-white px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-sky-200/50 dark:hover:shadow-sky-900/30 transition-all"
            >
              {isLoading ? "Loading..." : "Try It Free"}{" "}
              <SendHorizontal className="ml-2 h-4 w-4 inline" />
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                handleScroll("how-it-works");
              }}
              className="px-8 py-4 rounded-xl text-lg border-sky-600 text-sky-600 dark:text-sky-400 dark:border-sky-400"
            >
              See How It Works
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Trust Indicators */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50">
              <BadgeCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-medium">Secure & Private</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We never store your emails permanently
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium">Encrypted</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                All data is encrypted in transit
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50">
              <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium">No Tracking</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We don&apos;t track or profile users
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustedBrandsSlider />

      {/* How It Works */}
      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-semibold mb-12 text-center text-sky-900 dark:text-sky-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          How It Works
        </motion.h2>

        <div className="relative">
          {/* Animated connecting line */}
          <motion.div
            className="hidden md:block absolute h-1 bg-sky-200 dark:bg-sky-800 top-1/4 left-1/6 right-1/6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <Mail className="w-10 h-10 text-sky-600 dark:text-sky-400" />
                ),
                title: "Forward Email",
                text: "Send to our special address with your desired delay",
                badge: "Try: 2h@snoozemail.in",
              },
              {
                icon: (
                  <CalendarCheck className="w-10 h-10 text-sky-600 dark:text-sky-400" />
                ),
                title: "We Schedule It",
                text: "Our system processes and schedules your reminder",
                badge: "Precise timing",
              },
              {
                icon: (
                  <Clock className="w-10 h-10 text-sky-600 dark:text-sky-400" />
                ),
                title: "Get Reminded",
                text: "Receive the email back at your specified time",
                badge: "99.9% reliable",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: idx * 0.2,
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="h-full border border-sky-100 dark:border-sky-900/50 hover:shadow-lg transition-shadow group relative overflow-hidden">
                  {/* Animated background effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-sky-50 to-white dark:from-sky-900/20 dark:to-sky-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -100 }}
                    whileHover={{ x: 0 }}
                  />

                  <CardContent className="flex flex-col items-center text-center p-8 relative z-10">
                    <motion.div
                      className="bg-sky-100/50 dark:bg-sky-900/20 p-4 rounded-full mb-6 group-hover:bg-sky-200/50 dark:group-hover:bg-sky-800/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {step.icon}
                    </motion.div>

                    <h3 className="text-xl font-medium mb-2 text-sky-800 dark:text-sky-200">
                      {step.title}
                    </h3>

                    <motion.p
                      className="text-gray-600 dark:text-gray-300 mb-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      {step.text}
                    </motion.p>

                    <motion.span
                      className="text-xs font-mono bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 px-3 py-1 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      {step.badge}
                    </motion.span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <EmailFlowDemo />
      <EmailTagsPreview />
      {/* Testimonials */}
      <section className="py-16 px-4 max-w-6xl mx-auto bg-sky-50/30 dark:bg-sky-950/30 rounded-3xl my-12">
        <motion.h2
          className="text-3xl font-semibold mb-12 text-center text-sky-900 dark:text-sky-200"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          Loved by Professionals
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote:
                "SnoozeMail has saved me countless hours by helping me manage my inbox on my own schedule.",
              author: "Sarah K.",
              role: "Product Manager",
              rating: 5,
            },
            {
              quote:
                "As a consultant, I need to follow up at precise times. SnoozeMail makes this effortless.",
              author: "Michael T.",
              role: "Business Consultant",
              rating: 5,
            },
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
            >
              <Card className="h-full bg-white/70 dark:bg-gray-900/70 p-6 rounded-xl border border-sky-100 dark:border-sky-900/50">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-lg italic mb-6 text-gray-700 dark:text-gray-300">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className="flex items-center">
                  <div className="bg-sky-100 dark:bg-sky-900/50 w-10 h-10 rounded-full flex items-center justify-center text-sky-700 dark:text-sky-300 font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-sky-800 dark:text-sky-200">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        className="scrol-mt-20 py-16 px-4 max-w-6xl mx-auto"
        id="features"
      >
        <motion.h2
          className="text-3xl font-semibold mb-12 text-center text-sky-900 dark:text-sky-200"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          Powerful Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <Clock className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              ),
              title: "Flexible Timing",
              description:
                "Set reminders from 2 minutes to 2 years in the future",
            },
            {
              icon: <Mail className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
              title: "Any Email Client",
              description: "Works with Gmail, Outlook, Apple Mail and more",
            },
            {
              icon: (
                <Shield className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              ),
              title: "Secure Processing",
              description: "Enterprise-grade security for your communications",
            },
            {
              icon: <Zap className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
              title: "Lightning Fast",
              description: "Near-instant processing of your requests",
            },
            {
              icon: (
                <CheckCircle className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              ),
              title: "Simple Syntax",
              description: "Easy-to-remember time formats (2h, 3d, next-week)",
            },
            {
              icon: <Lock className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
              title: "No Storage",
              description: "Emails are processed then immediately deleted",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
              className="flex items-start bg-white/70 dark:bg-gray-900/70 p-6 rounded-xl border border-sky-100 dark:border-sky-900/50 hover:shadow-md transition-shadow"
            >
              <div className="bg-sky-100/50 dark:bg-sky-900/20 p-2 rounded-lg mr-4">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-sky-800 dark:text-sky-200 mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Final CTA */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <motion.div
          className="bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-700 dark:to-blue-700 rounded-3xl p-12 shadow-xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
            Ready to take control of your inbox?
          </h2>
          <p className="text-lg mb-8 text-sky-100">
            Join thousands of professionals who use SnoozeMail daily
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleStartSnoozing}
              disabled={isLoading}
              className="bg-white hover:bg-gray-100 text-sky-600 px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? "Loading..." : "Start Snoozing Free"}{" "}
              <SendHorizontal className="ml-2 h-4 w-4 inline" />
            </Button>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg"
            >
              See Pricing Plans
            </Button>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl font-semibold mb-12 text-center text-sky-900 dark:text-sky-200"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-6">
          {[
            {
              question: "Is my email data secure?",
              answer:
                "Absolutely. We process emails in memory and never store them permanently. All data is encrypted in transit.",
            },
            {
              question: "What email providers does this work with?",
              answer:
                "SnoozeMail works with any email provider that allows forwarding, including Gmail, Outlook, Yahoo, and more.",
            },
            {
              question: "How precise are the reminders?",
              answer:
                "Reminders are delivered within seconds of your specified time. We maintain 99.9% delivery reliability.",
            },
            {
              question: "Is there a free plan?",
              answer:
                "Yes! Our free plan allows for 10 snoozes per month. Paid plans start with higher limits and additional features.",
            },
          ].map((faq, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/70 dark:bg-gray-900/70 p-6 rounded-xl border border-sky-100 dark:border-sky-900/50"
            >
              <h3 className="text-lg font-medium text-sky-800 dark:text-sky-200 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
