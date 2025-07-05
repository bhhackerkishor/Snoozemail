import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Rocket,
  Globe,
  Users,
  BriefcaseBusiness,
  Network,
} from "lucide-react";

const getBrandIcon = (type: string) => {
  switch (type) {
    case "Startup":
      return <Rocket className="w-6 h-6 text-blue-500 mr-3" />;
    case "Industry":
      return <Building2 className="w-6 h-6 text-green-500 mr-3" />;
    case "Worldwide":
      return <Globe className="w-6 h-6 text-purple-500 mr-3" />;
    case "Solutions":
      return <BriefcaseBusiness className="w-6 h-6 text-orange-500 mr-3" />;
    case "Community":
      return <Users className="w-6 h-6 text-pink-500 mr-3" />;
    default:
      return <Network className="w-6 h-6 text-gray-500 mr-3" />;
  }
};

const TrustedBrandsSlider = () => {
  // Placeholder brand names (remove when you have real clients)
  const placeholderBrands = [
    { name: "Tech Innovators", type: "Startup" },
    { name: "Digital Agencies", type: "Industry" },
    { name: "Remote Teams", type: "Worldwide" },
    { name: "Enterprise", type: "Solutions" },
    { name: "SaaS Companies", type: "Industry" },
    { name: "Productivity Pros", type: "Community" },
  ];

  // Testimonials (placeholder content)
  const testimonials = [
    {
      id: 1,
      quote:
        "SnoozeMail has transformed how we manage our inboxes. The ability to schedule emails has saved us countless hours each week.",
      author: "Alex Johnson",
      role: "Product Manager at TechStart",
    },
    {
      id: 2,
      quote:
        "As a remote team, SnoozeMail keeps us perfectly in sync across timezones. It's become our secret productivity weapon.",
      author: "Samira Chen",
      role: "CEO at DigitalNomads",
    },
    {
      id: 3,
      quote:
        "The analytics alone are worth the price. We've optimized our communication patterns thanks to SnoozeMail's insights.",
      author: "Michael Rodriguez",
      role: "Operations Director at ScaleUp",
    },
  ];

  // Auto-slide animation state
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 8000); // Increased duration for better readability
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Brand marquee animation
  const BrandMarquee = () => (
    <div className="relative overflow-hidden py-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="px-4 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wider">
          TRUSTED BY INDUSTRY LEADERS
        </span>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Brand Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <BrandMarquee />

          {/* Auto-scrolling brand cards */}
          <div className="mt-12 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap flex items-center">
              {[...placeholderBrands, ...placeholderBrands].map(
                (brand, index) => (
                  <motion.div
                    key={`${brand.name}-${index}`}
                    className="inline-flex items-center mx-6 px-6 py-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
                    whileHover={{ y: -6, scale: 1.05 }}
                  >
                    {getBrandIcon(brand.type)}
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        {brand.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {brand.type}
                      </p>
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </div>

          <style jsx>{`
            .animate-marquee {
              animation: marquee 40s linear infinite;
              display: inline-block;
            }
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-24"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            >
              Loved by teams worldwide
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Join thousands of satisfied users who transformed their workflow
            </motion.p>
          </div>

          <div className="relative max-w-4xl mx-auto h-[400px]">
            {/* Testimonial Cards */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: direction * 100, scale: 0.95 }}
                animate={{
                  opacity: index === activeTestimonial ? 1 : 0,
                  x: index === activeTestimonial ? 0 : direction * 100,
                  scale: index === activeTestimonial ? 1 : 0.95,
                  zIndex: index === activeTestimonial ? 1 : 0,
                }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className={`absolute inset-0 ${index === activeTestimonial ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                  <Quote className="w-10 h-10 text-blue-500 opacity-20 mb-6" />
                  <blockquote className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed flex-grow">
                    <p>&quot;{testimonial.quote}&quot;</p>
                  </blockquote>
                  <div className="mt-8 flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {testimonial.author.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-5">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-md text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Navigation Controls */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => {
                    setDirection(-1);
                    setActiveTestimonial((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1,
                    );
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <div className="flex space-x-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > activeTestimonial ? 1 : -1);
                        setActiveTestimonial(index);
                      }}
                      className={`w-3.5 h-3.5 rounded-full transition-all ${index === activeTestimonial ? "bg-blue-600 w-8" : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"}`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => {
                    setDirection(1);
                    setActiveTestimonial((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1,
                    );
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBrandsSlider;
