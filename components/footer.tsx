"use client";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-4 max-w-6xl mx-auto border-t border-sky-100 dark:border-sky-900/50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Mail className="h-6 w-6 text-sky-600" />
            <span className="text-lg font-bold text-sky-800 dark:text-sky-200">
              SnoozeMail
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            The simplest way to schedule your emails
          </p>
        </div>

        <div>
          <h3 className="font-medium text-sky-800 dark:text-sky-200 mb-4">
            Product
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#features"
                className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#pricing"
                className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/snooze-tags"
                className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
              >
                SnoozeTags
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-sky-800 dark:text-sky-200 mb-4">
            Company
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/career"
                className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-sky-800 dark:text-sky-200 mb-4">
            Legal
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/privacy-policy"
                className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-sky-100 dark:border-sky-900/50 text-center text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} SnoozeMail. All rights reserved.</p>
      </div>
    </footer>
  );
}
