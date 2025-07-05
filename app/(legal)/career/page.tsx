"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface Job {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  perks?: string[];
  cta?: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Engineer",
    subtitle: "React / Next.js / TypeScript",
    description:
      "Craft delightful, performant UIs with our design system and own features from concept to deployment. You'll work closely with our product team to build intuitive interfaces for complex email workflows.",
    image:
      "https://images.unsplash.com/photo-1604781109199-ced99b89b0f6?q=80&w=1151&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // coding desk
    perks: [
      "Work with cutting-edge frontend stack",
      "Own entire feature verticals",
      "Weekly design system collaboration",
    ],
    cta: "View frontend openings",
  },
  {
    id: 2,
    title: "Backend Engineer",
    subtitle: "Node / Serverless / AWS",
    description:
      "Design and implement scalable microservices for our email scheduling infrastructure. Optimize delivery algorithms and ensure sub-second latency across global regions.",
    image:
      "https://plus.unsplash.com/premium_photo-1682146029185-198922bd8350?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // server room
    perks: [
      "Build fault-tolerant systems",
      "Work with event-driven architecture",
      "Own services end-to-end",
    ],
    cta: "Explore backend roles",
  },
  {
    id: 3,
    title: "Product Designer",
    subtitle: "UX/UI · Motion · Research",
    description:
      "Lead design for core product experiences and design system components. Conduct user research and translate complex workflows into elegant, intuitive interfaces.",
    image:
      "https://plus.unsplash.com/premium_photo-1661285019754-1d12d252ece5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // design tools
    perks: [
      "Own entire product verticals",
      "Conduct user research sessions",
      "Define design system evolution",
    ],
    cta: "See design positions",
  },
  {
    id: 4,
    title: "Developer Relations",
    subtitle: "Community · Content · OSS",
    description:
      "Build relationships with developers, create technical content, and grow our open-source ecosystem. Represent SnoozeMail at conferences and community events.",
    image:
      "https://images.unsplash.com/photo-1683234326324-10d082893ec1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // devrel speaking
    perks: [
      "Speak at major conferences",
      "Create viral technical content",
      "Shape our OSS strategy",
    ],
    cta: "Check DevRel roles",
  },
];

// Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? -40 : 40,
    scale: 0.95,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring" as const, // tell TS this is the literal 'spring'
      stiffness: 120,
      damping: 20,
      duration: 0.3,
      ease: [0.42, 0, 0.58, 1] as [number, number, number, number], // literal tuple
    },
  },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.0, 0.0, 0.2, 1],
    },
  },
};

export default function CareerPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animate the wire height based on scroll
  const wireHeight = useTransform(scrollYProgress, [0, 1], ["5%", "110%"]);

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-28 overflow-hidden">
      {/* Background elements */}
      <span className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/5" />
      <span className="absolute bottom-0 -right-40 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-600/5" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* Heading section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-24"
        >
          <motion.div
            variants={fadeInVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800/50 mb-6"
          >
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              WE&apos;RE HIRING
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Build the Future of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Email Productivity
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInVariants}
            className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Join our fully-remote team building tools that help people reclaim
            focus and control over their digital lives.
          </motion.p>

          <motion.div
            variants={fadeInVariants}
            className="mt-10 flex justify-center gap-4"
          >
            <Button size="lg" className="rounded-full px-8 shadow-sm">
              View all openings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-gray-300 dark:border-gray-600"
            >
              Learn about our culture
            </Button>
          </motion.div>
        </motion.div>

        {/* Timeline section */}
        <div ref={containerRef} className="relative">
          {/* Vertical timeline wire - animated by scroll */}
          <div className="absolute left-1/2 top-0 h-full -ml-[1px] w-0.5 bg-gray-200 dark:bg-gray-700/50 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-400 via-blue-500 to-transparent dark:from-blue-600 dark:via-blue-500"
              style={{ scaleY: wireHeight, originY: 0 }}
            />
          </div>

          <motion.ul
            className="space-y-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {jobs.map((job, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.li
                  key={job.id}
                  className="relative"
                  custom={isLeft ? "right" : "left"}
                  variants={itemVariants}
                >
                  {/* Timeline dot - appears when scrolled to */}
                  <motion.div
                    className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-600/20 rounded-full animate-ping" />
                      <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 shadow-lg ring-8 ring-blue-100/50 dark:ring-blue-900/20">
                        <span className="text-white text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content container */}
                  <div
                    className={`flex flex-col lg:flex-row items-center gap-12 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                  >
                    {/* Text card */}
                    <div
                      className={`w-full lg:w-1/2 ${isLeft ? "lg:pr-12" : "lg:pl-12"}`}
                    >
                      <motion.div
                        className={`p-8 rounded-3xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-all ${isLeft ? "lg:mr-auto" : "lg:ml-auto"}`}
                        whileHover={{ y: -5 }}
                      >
                        <div
                          className={`flex items-center gap-2 mb-2 ${isLeft ? "justify-start" : "justify-end"}`}
                        >
                          <span className="text-xs font-semibold tracking-wider uppercase text-blue-500 dark:text-blue-400">
                            {job.subtitle}
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                          {job.title}
                        </h3>

                        <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {job.description}
                        </p>

                        {job.perks && (
                          <ul
                            className={`mt-6 space-y-2 ${isLeft ? "text-left" : "text-right"}`}
                          >
                            {job.perks.map((perk, i) => (
                              <motion.li
                                key={i}
                                className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2"
                                initial={{ opacity: 0, x: isLeft ? -10 : 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                              >
                                {!isLeft && <span>•</span>}
                                <span>{perk}</span>
                                {isLeft && <span>•</span>}
                              </motion.li>
                            ))}
                          </ul>
                        )}

                        <div
                          className={`mt-8 ${isLeft ? "text-left" : "text-right"}`}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full gap-1.5 border-gray-300 dark:border-gray-600"
                          >
                            {job.cta || "Learn more"}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </motion.div>
                    </div>

                    {/* Image */}
                    <div className="w-full lg:w-1/2">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="overflow-hidden rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700/50"
                      >
                        <Image
                          src={job.image}
                          alt={job.title}
                          width={800}
                          height={600}
                          className="object-cover w-full h-72 sm:h-80 md:h-96"
                          priority={index < 2}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center dark:bg-gray-800"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to join our mission?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            We&apos;re building the future of productivity tools with a
            talented, distributed team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 shadow-sm">
              View all open positions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-gray-300 dark:border-gray-600"
            >
              How we work
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
