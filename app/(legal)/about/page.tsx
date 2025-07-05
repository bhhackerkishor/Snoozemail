"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Clock,
  Zap,
  Shield,
  Users,
  Rocket,
  Globe,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  const scrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative py-24 px-4 max-w-6xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-sky-900 dark:text-sky-200">
            Email Reminders,{" "}
            <span className="text-sky-600 dark:text-sky-400">Simplified</span>
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            SnoozeMail was born from a simple idea: email reminders should be as
            easy as forwarding a message.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600 text-white px-6 py-3">
              Try It Free
            </Button>
            <Button
              variant="outline"
              className="border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400"
              onClick={scrollToHowItWorks}
            >
              How It Works
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-sky-50/30 dark:bg-sky-950/30 rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-semibold mb-6 text-sky-900 dark:text-sky-200">
            Our Story
          </h2>
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>
              In 2023, our founder Kishor Kumar was drowning in email
              follow-ups. Calendar reminders weren&apos;t cutting it, and
              existing tools were too complex. There had to be a better way.
            </p>
            <p>
              The breakthrough came while waiting for a train. What if you could
              just forward an email with a time in the subject line? No new
              apps, no complicated setups - just pure simplicity.
            </p>
            <p>
              Today, SnoozeMail helps thousands of professionals stay on top of
              their inboxes without the stress. We believe technology should
              solve problems, not create new ones.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-semibold mb-12 text-center text-sky-900 dark:text-sky-200"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          What We Believe In
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <Zap className="w-10 h-10 text-sky-600 dark:text-sky-400" />
              ),
              title: "Simplicity First",
              description:
                "If it's not intuitive, we won't build it. Our product works the way you already think.",
            },
            {
              icon: (
                <Shield className="w-10 h-10 text-sky-600 dark:text-sky-400" />
              ),
              title: "Privacy Matters",
              description:
                "Your emails are your business. We process them securely and never store them permanently.",
            },
            {
              icon: (
                <Users className="w-10 h-10 text-sky-600 dark:text-sky-400" />
              ),
              title: "Human-Centered",
              description:
                "We design for real people with busy lives, not just tech enthusiasts.",
            },
          ].map((value, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              className="bg-white/70 dark:bg-gray-900/70 p-8 rounded-xl border border-sky-100 dark:border-sky-900/50 hover:shadow-md transition-shadow"
            >
              <div className="bg-sky-100/50 dark:bg-sky-900/20 p-4 rounded-full w-fit mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-medium mb-2 text-sky-800 dark:text-sky-200">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-16 px-4 max-w-4xl mx-auto bg-sky-50/30 dark:bg-sky-950/30 rounded-3xl my-12"
      >
        <motion.h2
          className="text-3xl font-semibold mb-12 text-center text-sky-900 dark:text-sky-200"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          The Magic Behind SnoozeMail
        </motion.h2>
        <div className="space-y-8">
          {[
            {
              icon: <Mail className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
              title: "Forward Your Email",
              description:
                "Send to our special address with your desired time (like '2h@snoozemail.in')",
            },
            {
              icon: (
                <Clock className="w-8 h-8 text-sky-600 dark:text-sky-400" />
              ),
              title: "We Handle the Timing",
              description:
                "Our system securely processes your email and schedules the reminder",
            },
            {
              icon: (
                <Rocket className="w-8 h-8 text-sky-600 dark:text-sky-400" />
              ),
              title: "Get It Back On Time",
              description:
                "The email returns to your inbox exactly when you need it",
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
              className="flex items-start gap-6"
            >
              <div className="bg-sky-100/50 dark:bg-sky-900/20 p-3 rounded-lg mt-1">
                {step.icon}
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-sky-800 dark:text-sky-200">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-semibold mb-12 text-center text-sky-900 dark:text-sky-200"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          The Humans Behind the Code
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Kishor Kumar",
              role: "Founder & CEO",
              bio: "Email productivity obsessive. Previously built tools at RegalMints before striking out to solve his own inbox woes.",
              funFact: "Can recite the entire script of The Office",
            },
            {
              name: "You?",
              role: "Future Teammate",
              bio: "We're growing! Interested in joining our mission to simplify email?",
              funFact: "Tell us what makes you unique!",
            },
          ].map((person, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              className="bg-white/70 dark:bg-gray-900/70 p-8 rounded-xl border border-sky-100 dark:border-sky-900/50 hover:shadow-md transition-shadow text-center"
            >
              <div className="bg-sky-100/50 dark:bg-sky-900/20 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-sky-800 dark:text-sky-200">
                {person.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="text-xl font-medium mb-1 text-sky-800 dark:text-sky-200">
                {person.name}
              </h3>
              <p className="text-sky-600 dark:text-sky-400 mb-4">
                {person.role}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {person.bio}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">Fun fact:</span> {person.funFact}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <motion.div
          className="bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-700 dark:to-blue-700 rounded-3xl p-12 shadow-xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <Globe className="w-12 h-12 mx-auto text-white mb-6" />
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
            Ready to transform your email habits?
          </h2>
          <p className="text-lg mb-8 text-sky-100">
            Join thousands who&apos;ve taken control of their inbox
          </p>
          <Button className="bg-white hover:bg-gray-100 text-sky-600 px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all">
            Start Snoozing Free <Heart className="ml-2 h-4 w-4 inline" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
