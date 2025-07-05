"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "₹0",
      period: "forever",
      description: "Perfect for individuals getting started",
      features: [
        "10 reminders per month",
        "Basic email notifications",
        "Community support",
        "Limited analytics",
      ],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Professional",
      price: "₹199",
      period: "per month",
      description: "For power users and small teams",
      features: [
        "100 reminders per month",
        "Priority notifications",
        "Email & chat support",
        "Advanced analytics",
        "Custom intervals",
      ],
      cta: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "₹499",
      period: "per month",
      description: "For businesses with advanced needs",
      features: [
        "Unlimited reminders",
        "24/7 priority support",
        "Team collaboration",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section
      className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 py-16 px-4 sm:px-6 lg:px-8"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Start small and upgrade
            anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl border-2 overflow-hidden transition-all ${
                plan.highlight
                  ? "border-sky-300 dark:border-sky-600 shadow-lg scale-[1.02]"
                  : "border-sky-200 dark:border-sky-800"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-sky-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <h3
                  className={`text-2xl font-bold mb-1 ${
                    plan.highlight ? "text-sky-600 dark:text-sky-400" : ""
                  }`}
                >
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {" "}
                    / {plan.period}
                  </span>
                </div>

                <Button
                  className={`w-full py-3 text-base font-medium mb-6 ${
                    plan.highlight
                      ? "bg-sky-600 hover:bg-sky-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {plan.cta}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ/Additional Info */}
        <div className="mt-16 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-4">
            Need help choosing?{" "}
            <a
              href="/contact"
              className="text-sky-600 dark:text-sky-400 hover:underline"
            >
              Contact our team
            </a>
          </p>
          <p className="text-sm">
            All plans come with a 14-day money-back guarantee. No credit card
            required.
          </p>
        </div>
      </div>
    </section>
  );
}
