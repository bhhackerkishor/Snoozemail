"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import clsx from "clsx";

type Message = {
  from: "user" | "bot";
  text: string;
  timestamp?: Date;
};

const staticAnswers: Record<string, string> = {
  "how to use tags":
    "**Using Tags**\n\nSimply add tags like `2h`, `3days`, or `nextweek` in your email subject or body. We'll automatically snooze it and bring it back at the right time!",
  "free plan limit":
    "Our **Free plan** includes **10 reminder per month**. Upgrade to Pro for unlimited reminders at just ₹199/month.",
  "forward email":
    "**Forward any email** to **snooze@snoozemail.in** with a tag like `tomorrow` or `2days` in the subject. We'll handle the rest!",
  "contact support":
    "We're here to help! Email us at **help@snoozemail.in** or message us on Twitter @SnoozeMailSupport 🚀",
  "what is snoozemail":
    "**SnoozeMail** is your smart email scheduler. Forward emails with time tags, and we'll return them to your inbox when you need them.",
  "pricing plans":
    "**Our Plans:**\n- Free: 10 reminder/month\n- Pro (₹199/month): Unlimited reminders\n- Team (₹399/month): Shared reminders & analytics",
  hi: "Hello there! 👋 How can I help you with SnoozeMail today?",
  hello:
    "Hi! 😊 Ready to supercharge your email productivity? What can I assist you with?",
  hey: "Hey there! ✨ How can I make your email workflow better today?",
};

const greetingPhrases = [
  "hi",
  "hello",
  "hey",
  "greetings",
  "good morning",
  "good afternoon",
];

function getBotReply(userMsg: string): string {
  const lowerMsg = userMsg.toLowerCase().trim();

  // Check greetings first
  if (greetingPhrases.some((phrase) => lowerMsg.includes(phrase))) {
    return "Hello! 👋 Welcome to SnoozeMail. How can I assist you today?";
  }

  // Check static answers
  const staticAnswer = Object.entries(staticAnswers).find(([key]) =>
    lowerMsg.includes(key),
  );
  if (staticAnswer) return staticAnswer[1];

  // Dynamic responses
  const timeMatch = lowerMsg.match(
    /(\d+)\s*(second|minute|hour|day|week|month)s?/i,
  );
  if (timeMatch) {
    const num = parseInt(timeMatch[1]);
    const unit = timeMatch[2].toLowerCase();
    return `Got it! I'll remind you in **${num} ${unit}${num > 1 ? "s" : ""}**.`;
  }

  if (/reset password/i.test(lowerMsg)) {
    return "You can reset your password by going to **Login → Forgot Password** and following the email instructions.";
  }

  // Default response
  return "I'm still learning! For now, I can help with:\n- Tag usage\n- Account questions\n- Pricing\nTry asking about one of these topics!";
}

function useAutoScroll(ref: React.RefObject<HTMLDivElement>, dep: unknown) {
  useEffect(() => {
    const scroll = () => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    };
    scroll();
    const timer = setTimeout(scroll, 100); // Double check after animations
    return () => clearTimeout(timer);
  }, [dep, ref]);
}

const MessageBubble = ({
  message,
  index,
}: {
  message: Message;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: message.from === "user" ? 10 : -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.3,
      delay: index * 0.05,
    }}
    className={clsx(
      "flex gap-2 max-w-[90%]",
      message.from === "user" ? "ml-auto" : "mr-auto",
    )}
  >
    <div
      className={clsx(
        "flex items-start gap-2",
        message.from === "user" ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div
        className={clsx(
          "p-2 rounded-full",
          message.from === "user"
            ? "bg-primary-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
        )}
      >
        {message.from === "user" ? <User size={16} /> : <Bot size={16} />}
      </div>
      <motion.div
        className={clsx(
          "whitespace-pre-wrap break-words px-4 py-3 rounded-2xl text-sm shadow-sm",
          message.from === "user"
            ? "bg-primary-500 text-white"
            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700",
        )}
      >
        {message.text}
      </motion.div>
    </div>
  </motion.div>
);

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi there! 👋 I'm SnoozeBot.\nHow can I help you with email scheduling today?",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useAutoScroll(messagesEndRef, messages);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      from: "user" as const,
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate typing delay
    setTimeout(() => {
      const botReply = {
        from: "bot" as const,
        text: getBotReply(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={clsx(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg border-solid border-sky-700 flex items-center justify-center",
          "bg-primary-500 hover:bg-primary-600 text-sky-600 dark:text-gray",
          "transition-all duration-300",
          open ? "rotate-180" : "rotate-0",
        )}
        aria-label="Chat support"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Box */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={clsx(
              "fixed bottom-20 right-4 sm:right-6 z-40",
              "w-[calc(100vw-2rem)] sm:w-96 h-[32rem]",
              "bg-white dark:bg-gray-900 rounded-xl shadow-xl border-gray-500",
              "flex flex-col border border-gray-200 dark:border-gray-700",
            )}
          >
            {/* Header */}
            <div
              className={clsx(
                "flex items-center justify-between px-4 py-3 text-black",
                "bg-primary-500 dark:bg-primary-600 dark:text-white",
                "rounded-t-xl",
              )}
            >
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-semibold ">SnoozeBot</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-full hover:bg-primary-400 dark:hover:bg-primary-700 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messagesEndRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950"
            >
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <MessageBubble
                    key={`${index}-${message.timestamp?.getTime()}`}
                    message={message}
                    index={index}
                  />
                ))}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </div>

            {/* Input */}
            <motion.div
              layout
              className="p-3 border-t rounded-b-3xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <div className="flex gap-2">
                <motion.input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className={clsx(
                    "flex-1 px-4 py-2 rounded-full text-sm",
                    "border border-gray-300 dark:border-gray-600",
                    "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                  )}
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className={clsx(
                    "p-2 rounded-full text-black",
                    "bg-primary-500 hover:bg-primary-600 dark:text-white",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                  )}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
