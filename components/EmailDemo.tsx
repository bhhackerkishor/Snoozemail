"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  Mail,
  Clock,
  Send,
  Loader2,
  Bell,
  AlarmClock,
  Timer,
  CalendarClock,
} from "lucide-react";

/* ─────────────────────────────── Component ─────────────────────────────── */
export default function EmailFlowDemo() {
  /* state & refs */
  const [statusMessage, setStatusMessage] = useState(
    "Enter your delay and click Send",
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const fromEmailRef = useRef<HTMLInputElement>(null);

  /* animations */
  const emailAnimation = useAnimation();
  const processingAnimation = useAnimation();
  const receivedAnimation = useAnimation();
  type Controls = ReturnType<typeof useAnimation>;
  const arrowAnimation: Controls = useAnimation();
  const confirmAnimation = useAnimation();
  const statusAnimation = useAnimation();

  const snoozeIcons = [
    <Bell
      key="bell"
      className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
    />,
    <AlarmClock
      key="alarm"
      className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
    />,
    <Timer
      key="timer"
      className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
    />,
    <CalendarClock
      key="cal"
      className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
    />,
  ];

  /* rotate icons while success bubble visible */
  useEffect(() => {
    let id: NodeJS.Timeout | undefined;
    if (showSuccess) {
      id = setInterval(
        () => setCurrentIconIndex((p) => (p + 1) % snoozeIcons.length),
        500,
      );
    }
    return () => clearInterval(id);
  }, [showSuccess, snoozeIcons.length]);

  /* ─────────────────────────────── Handler ─────────────────────────────── */
  const handleSendDemo = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShowSuccess(false);
    setShowConfirm(false);

    const toInput = inputRef.current?.value ?? "";
    const subject = subjectRef.current?.value ?? "Remind me about this";

    if (!/^\d+[hdm]@snoozemail\.in$/i.test(toInput)) {
      setStatusMessage("Invalid format! Try: 2h@snoozemail.in");
      await statusAnimation.start({
        x: [0, -6, 6, 0],
        color: ["#0ea5e9", "#ef4444", "#0ea5e9"],
        transition: { duration: 0.6 },
      });
      setIsAnimating(false);
      return;
    }

    const [, timeStr, unit] = toInput.match(/^(\d+)([hdm])@/i)!;
    const time = Number(timeStr);
    const unitText =
      unit === "h" ? "hour(s)" : unit === "d" ? "day(s)" : "minute(s)";

    /* reset visuals */
    await Promise.all([
      emailAnimation.start({ x: 0, opacity: 0 }),
      processingAnimation.start({ scale: 0, opacity: 0 }),
      receivedAnimation.start({ x: 0, opacity: 0 }),
      confirmAnimation.start({ x: 0, opacity: 0 }),
      arrowAnimation.start({ scaleX: 0 }),
    ]);

    /* sequence */
    setStatusMessage(`Scheduling for ${time} ${unitText} from now…`);

    /* email flies */
    await emailAnimation.start({
      x: [0, 80, 160],
      opacity: [0, 1, 1, 0.01],
      transition: { duration: 4, ease: [0.16, 1, 0.3, 1] },
    });

    /* progress bar 5 s */
    await arrowAnimation.start({
      scaleX: [0, 1],
      transition: { duration: 3, ease: "linear" },
    });

    /* processing */
    setStatusMessage("Processing your request…");
    await processingAnimation.start({
      scale: [0, 1.25, 1],
      opacity: [0, 1, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.9 },
    });

    /* success bubble */
    setStatusMessage(`Done! You'll receive it in ${time} ${unitText}.`);
    setShowSuccess(true);
    await receivedAnimation.start({
      x: [30, 0],
      opacity: [0, 1],
      transition: { type: "spring", stiffness: 320 },
    });

    /* confirmation bubble – slide from bottom‑right */
    setShowConfirm(true);
    console.log(showConfirm);
    await confirmAnimation.start({
      x: [0, -220], // distance to glide left
      opacity: [0, 1, 1, 0],
      transition: { duration: 2.8, times: [0, 0.15, 0.7, 1] },
    });

    /* extra info */
    await new Promise((r) => setTimeout(r, 400));
    setStatusMessage(`We'll remind you about: “${subject}”`);

    /* auto‑reset everything */
    setTimeout(async () => {
      await Promise.all([
        emailAnimation.start({ x: 0, opacity: 0 }),
        processingAnimation.start({ scale: 0, opacity: 0 }),
        receivedAnimation.start({ x: 0, opacity: 0 }),
        arrowAnimation.start({ scaleX: 0 }),
      ]);
      setStatusMessage("Try another delay time!");
      setShowSuccess(false);
      setIsAnimating(false);
      setShowConfirm(false);
    }, 2600);
  };

  /* ─────────────────────────────── UI ─────────────────────────────── */
  return (
    <section className=" relative py-20 px-4 max-w-5xl mx-auto">
      {/* heading */}
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-4 text-sky-900 dark:text-sky-100">
          Experience the Magic
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          See how effortlessly you can schedule emails for the future
        </p>
      </div>

      {/* shell */}
      <div className="bg-gradient-to-br from-sky-50 to-white dark:from-sky-900/30 dark:to-gray-900 p-1 rounded-2xl shadow-xl">
        <div className="bg-white dark:bg-gray-900 p-1 rounded-xl">
          <div className="flex flex-col lg:flex-row gap-1 rounded-xl overflow-hidden">
            {/* ─── left: form ─── */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-sky-50/50 to-white dark:from-sky-900/10 dark:to-gray-900 p-8">
              <div className="flex items-center gap-2 mb-6">
                <Mail className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <h4 className="font-semibold text-sky-800 dark:text-sky-200">
                  Compose Your Email
                </h4>
              </div>

              {/* Inputs */}
              <div className="space-y-5">
                {/* From */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From:
                  </label>
                  <input
                    ref={fromEmailRef}
                    type="email"
                    defaultValue="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* To */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To:
                  </label>
                  <div className="flex">
                    <input
                      ref={inputRef}
                      defaultValue="2h@snoozemail.in"
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      onClick={handleSendDemo}
                      disabled={isAnimating}
                      className="bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white px-5 rounded-r-lg flex items-center justify-center transition-all disabled:opacity-60"
                    >
                      {isAnimating ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
                    Examples:{" "}
                    <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      1h@snoozemail.in
                    </span>{" "}
                    <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      3d@snoozemail.in
                    </span>
                  </p>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject:
                  </label>
                  <input
                    ref={subjectRef}
                    defaultValue="Remind me about this"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message:
                  </label>
                  <textarea
                    defaultValue="This will be sent back to you at the specified time!"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-32 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>
            {/* ─── right: visual canvas ─── */}
            <div className="relative w-full lg:w-1/2 bg-gradient-to-br from-white to-sky-50 dark:from-gray-900 dark:to-sky-900/10 p-8 flex flex-col">
              {/* header */}
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <h4 className="font-semibold text-sky-800 dark:text-sky-200">
                  Email Journey
                </h4>
              </div>

              {/* canvas */}
              <div className="relative flex-1">
                {/* timeline */}
                <div className="absolute z-10 left-8 right-8 top-1/2 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden pointer-events-none">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky-400 to-sky-600 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={arrowAnimation}
                  />
                </div>

                {/* sending bubble */}
                <motion.div
                  className="absolute z-40 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 w-48 left-0 top-1/4"
                  initial={{ x: 0, opacity: 0 }}
                  animate={emailAnimation}
                >
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {(fromEmailRef.current?.value || "Y")[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-sky-600 dark:text-sky-400 truncate">
                        {subjectRef.current?.value || "Remind me about this"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        To: {inputRef.current?.value || "2h@snoozemail.in"}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* processing */}
                <motion.div
                  className="absolute z-30 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border-2 border-sky-400 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={processingAnimation}
                >
                  {snoozeIcons[currentIconIndex]}
                </motion.div>

                {/* success bubble */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      className="absolute z-50 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-emerald-200 dark:border-emerald-800/50 w-48 right-0 top-3/4"
                      initial={{ x: 30, opacity: 0 }}
                      animate={receivedAnimation}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex items-center justify-center w-6 h-6 mt-0.5">
                          {snoozeIcons[currentIconIndex]}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            SnoozeMail Active
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            From:{" "}
                            {fromEmailRef.current?.value || "your@email.com"}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* confirmation bubble */}
                <AnimatePresence>
                  {showConfirm && (
                    <motion.div
                      initial={{ opacity: 0, x: 40, y: 40 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 20, y: 20 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute bottom-4 right-4 z-40 bg-sky-600 dark:bg-sky-700 text-white px-5 py-4 rounded-2xl shadow-xl backdrop-blur-sm"
                    >
                      <div className="text-sm space-y-1 leading-snug">
                        <p className="font-semibold">
                          We’ve received your schedule! ✅
                        </p>
                        <p>
                          We’ll remind you on time at{" "}
                          <span className="underline font-medium">
                            {fromEmailRef.current?.value || "your address"}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* status */}
                <div className="relative z-20 mt-6 px-4 py-3 rounded-lg bg-sky-50 dark:bg-sky-900/30 border border-sky-100 dark:border-sky-800/50 text-center">
                  <motion.div
                    className="font-medium text-sky-700 dark:text-sky-300"
                    animate={statusAnimation}
                  >
                    {statusMessage}
                  </motion.div>

                  {isAnimating && !showSuccess && (
                    <motion.div
                      className="mt-2 h-1.5 bg-sky-100 dark:bg-sky-900/50 rounded-full overflow-hidden"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.8, ease: "linear" }}
                    >
                      <div className="h-full bg-gradient-to-r from-sky-400 to-sky-600" />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
