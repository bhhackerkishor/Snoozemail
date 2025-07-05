// app/(legal)/blog/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Hammer, BookOpen, Code2, Server, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogPlaceholder() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 360],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            className="absolute w-2 h-2 bg-blue-400 dark:bg-blue-600 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center p-6 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-8"
          >
            <Hammer size={60} className="text-blue-600 dark:text-blue-400" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Our Blog is Under Construction
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            We&apos;re crafting something amazing for you! Our team is working hard to bring you valuable content about email productivity and digital organization.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, staggerChildren: 0.2 }}
        >
          {[
            {
              icon: <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
              title: "In-depth Articles",
              description: "Learn how to maximize your productivity with email management strategies."
            },
            {
              icon: <Code2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
              title: "Technical Guides",
              description: "Advanced tips for developers and power users to customize their workflow."
            },
            {
              icon: <Server className="w-8 h-8 text-green-600 dark:text-green-400" />,
              title: "Behind the Scenes",
              description: "How we built SnoozeMail to handle millions of scheduled emails."
            },
            {
              icon: <Mail className="w-8 h-8 text-orange-600 dark:text-orange-400" />,
              title: "Email Productivity",
              description: "Transform your relationship with email and reclaim your focus time."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
            Subscribe to our newsletter to be the first to know when we launch our blog and release new features.
          </p>
          
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
            >
              Subscribe
              <ArrowRight size={18} />
            </motion.button>
          </div>
          
          <div className="mt-12">
            <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              <ArrowRight className="mr-2 rotate-180" />
              Return to Homepage
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
