"use client";

import { Mail, MailCheck, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve("Success");
        } else {
          reject("Failed");
        }
      }, 1500);
    });

    toast.promise(promise, {
      loading: "Sending your message...",
      success: () => {
        return "Message sent successfully! We will reply soon.";
      },
      error: (err) => {
        return `Failed to send: ${err}. Please try again.`;
      },
      finally: () => {
        setIsSubmitting(false);
      },
    });

    // For your real implementation:

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed");
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Send message error:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 dark:bg-sky-900 mb-4">
            <Mail className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Contact SnoozeMail
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions? We&apos;re here to help! Reach out to our team
            anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-sky-200 dark:border-sky-800">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Your Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <MailCheck className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-sky-200 dark:border-sky-800">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </h3>
                    <a
                      href="mailto:contact@snoozemail.in"
                      className="text-base text-gray-800 dark:text-gray-200 hover:text-sky-600 dark:hover:text-sky-400"
                    >
                      contact@snoozemail.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone
                    </h3>
                    <a
                      href="tel:+918015603293"
                      className="text-base text-gray-800 dark:text-gray-200 hover:text-sky-600 dark:hover:text-sky-400"
                    >
                      +91 8015603293
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Office
                    </h3>
                    <p className="text-base text-gray-800 dark:text-gray-200">
                      Marudur , Ariyalur.
                      <br />
                      TamilNadu, India 621710
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-sky-200 dark:border-sky-800">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-sky-600 dark:text-sky-400">
                    What&apos;s your typical response time?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    We usually respond within 24 hours on business days.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-sky-600 dark:text-sky-400">
                    Do you offer enterprise solutions?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Yes! Contact us for custom enterprise plans and volume
                    pricing.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-sky-600 dark:text-sky-400">
                    Where can I find documentation?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Visit our{" "}
                    <a
                      href="/docs"
                      className="text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      documentation
                    </a>{" "}
                    page for API references and guides.
                  </p>
                </div>
                <Link href="/faq" className="flex items-center gap-2">
                  <Button variant="link" className="mt-2 text-sky-600">
                    Detailed FAQ page
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
