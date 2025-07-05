"use client";

import { Component, ReactNode } from "react";
import { handleError } from "@/utils/errorHandler";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error Boundary caught:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const message = handleError(this.state.error, "component");

      return (
        this.props.fallback || (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="max-w-md w-full px-6 py-8 bg-white dark:bg-gray-950 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-center"
            >
              {/* Error Icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4"
              >
                <RefreshCw className="text-red-500 dark:text-red-400 w-7 h-7" />
              </motion.div>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Something went wrong
              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                {process.env.NODE_ENV === "development"
                  ? message
                  : "We're working on it. Please try again later."}
              </p>

              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.resetError}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm shadow-md"
                >
                  <RefreshCw size={16} />
                  Try Again
                </motion.button>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-5 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full text-sm shadow-md"
                  >
                    <Home size={16} />
                    Go Home
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )
      );
    }

    return this.props.children;
  }
}
