"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Search, Clock, Calendar, Sun, Briefcase, Gift } from "lucide-react";

interface SnoozeTag {
  tag: string;
  desc: string;
  category: "time" | "day" | "date" | "productivity" | "custom";
}

const ALL_TAGS: SnoozeTag[] = [
  // Time-based (short-term)
  { tag: "10min", desc: "Returns after 10 minutes", category: "time" },
  { tag: "30min", desc: "Returns after 30 minutes", category: "time" },
  { tag: "1hour", desc: "Returns after 1 hour", category: "time" },
  { tag: "2hours", desc: "Returns after 2 hours", category: "time" },
  { tag: "4hours", desc: "Returns after 4 hours", category: "time" },
  { tag: "noon", desc: "Returns today at 12 PM", category: "time" },
  { tag: "evening", desc: "Returns today at 6 PM", category: "time" },
  { tag: "tonight9pm", desc: "Returns tonight at 9 PM", category: "time" },

  // Day-based
  { tag: "tomorrow", desc: "Returns tomorrow at same time", category: "day" },
  { tag: "2days", desc: "Returns after 2 days", category: "day" },
  { tag: "3days", desc: "Returns after 3 days", category: "day" },
  { tag: "nextweek", desc: "Returns same day next week", category: "day" },
  { tag: "weekend", desc: "Returns on upcoming weekend", category: "day" },
  { tag: "monday8am", desc: "Returns Monday at 8 AM", category: "day" },
  { tag: "friday", desc: "Returns upcoming Friday", category: "day" },
  { tag: "friday9am", desc: "Returns Friday at 9 AM", category: "day" },
  { tag: "saturday", desc: "Returns upcoming Saturday", category: "day" },
  { tag: "sunday", desc: "Returns upcoming Sunday", category: "day" },

  // Week-specific
  { tag: "nextmonday", desc: "Returns next Monday", category: "day" },
  { tag: "nextfriday", desc: "Returns next Friday", category: "day" },
  { tag: "nextsunday", desc: "Returns next Sunday", category: "day" },

  // Date-specific
  { tag: "1aug", desc: "Returns on 1 Aug (any year)", category: "date" },
  { tag: "25dec", desc: "Returns on 25 Dec", category: "date" },
  { tag: "1jan", desc: "Returns on 1 Jan (New Year)", category: "date" },
  {
    tag: "valentines",
    desc: `Returns on 14 Feb (Valentine's Day)`,
    category: "date",
  },
  {
    tag: "aprilfools",
    desc: `Returns on 1 Apr (April Fools' Day)`,
    category: "date",
  },
  {
    tag: "diwali",
    desc: "Returns on Diwali (custom logic required)",
    category: "date",
  },
  {
    tag: "birthday",
    desc: "Returns on your birthday (custom date)",
    category: "date",
  },

  // Monthly / Yearly
  { tag: "nextmonth", desc: "Returns same date next month", category: "date" },
  {
    tag: "nextquarter",
    desc: "Returns in 3 months (calendar quarter)",
    category: "date",
  },
  { tag: "6months", desc: "Returns after 6 months", category: "date" },
  { tag: "year", desc: "Returns after 1 year", category: "date" },

  // Common Use Tags
  {
    tag: "later",
    desc: "Returns later today (default 3 PM)",
    category: "time",
  },
  { tag: "tonight", desc: "Returns tonight at 8 PM", category: "time" },
  {
    tag: "thisevening",
    desc: "Returns this evening at 6 PM",
    category: "time",
  },
  {
    tag: "thisweekend",
    desc: "Returns this Saturday at 10 AM",
    category: "day",
  },
  { tag: "afterlunch", desc: "Returns today at 2 PM", category: "time" },
  { tag: "afterdinner", desc: "Returns today at 8 PM", category: "time" },

  // Productivity Focused
  {
    tag: "focushour",
    desc: "Returns in 1 hour to focus again",
    category: "productivity",
  },
  {
    tag: "break",
    desc: "Returns in 15 minutes (quick break)",
    category: "productivity",
  },
  {
    tag: "dailyreview",
    desc: "Returns every night at 9 PM",
    category: "productivity",
  },
  {
    tag: "morningroutine",
    desc: "Returns tomorrow at 7 AM",
    category: "productivity",
  },
  {
    tag: "weekreview",
    desc: "Returns Friday 5 PM for weekly review",
    category: "productivity",
  },
  {
    tag: "monthlyreview",
    desc: "Returns 1st of every month",
    category: "productivity",
  },

  // Custom/Workflow
  { tag: "workflow", desc: "Custom tag illustration", category: "custom" },
  {
    tag: "meetings",
    desc: "Returns before your next meeting",
    category: "custom",
  },
  {
    tag: "followup",
    desc: "Returns in 2 days for follow-up",
    category: "custom",
  },
  {
    tag: "remindme",
    desc: "Generic reminder for custom needs",
    category: "custom",
  },
  {
    tag: "paybills",
    desc: "Returns on bill due date (custom)",
    category: "custom",
  },
];

const PAGE_SIZE = 20;

const categoryIcons = {
  time: <Clock className="text-blue-500 w-4 h-4" />,
  day: <Sun className="text-yellow-500 w-4 h-4" />,
  date: <Calendar className="text-green-500 w-4 h-4" />,
  productivity: <Briefcase className="text-purple-500 w-4 h-4" />,
  custom: <Gift className="text-pink-500 w-4 h-4" />,
};

const categoryColors = {
  time: "bg-blue-100 text-blue-800",
  day: "bg-yellow-100 text-yellow-800",
  date: "bg-green-100 text-green-800",
  productivity: "bg-purple-100 text-purple-800",
  custom: "bg-pink-100 text-pink-800",
};

export default function SnoozeTagsPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Filter + paginate
  const filtered = ALL_TAGS.filter(
    (t) =>
      t.tag.toLowerCase().includes(query.toLowerCase()) &&
      (activeCategory ? t.category === activeCategory : true),
  );

  const displayed = filtered.slice(0, PAGE_SIZE * page);

  // Infinite scroll observer
  const loadMore = useCallback(() => {
    if (PAGE_SIZE * page < filtered.length) {
      setPage((p) => p + 1);
    }
  }, [page, filtered.length]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            SnoozeMail Tags Directory
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover all available tags to schedule your emails with precision
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tags (e.g. 'weekend', 'nextmonth')"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                !activeCategory
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              All Tags
            </button>
            {Object.entries({
              time: "Short-term",
              day: "Days",
              date: "Dates",
              productivity: "Productivity",
              custom: "Custom",
            }).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveCategory(activeCategory === key ? null : key);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                  activeCategory === key
                    ? categoryColors[key as keyof typeof categoryColors] +
                      " font-semibold"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {categoryIcons[key as keyof typeof categoryIcons]}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tags Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {displayed.map((t) => (
            <div
              key={t.tag}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[t.category]}`}
                      >
                        {categoryIcons[t.category]}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {t.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white font-mono">
                      {t.tag}@snoozemail.in
                    </h3>
                  </div>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    Copy
                  </button>
                </div>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {t.desc}
                </p>
                <div className="mt-4">
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Try this tag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sentinel for infinite scroll */}
        <div ref={sentinelRef} className="h-6" />

        {/* Loading/End states */}
        {PAGE_SIZE * page < filtered.length && (
          <div className="text-center py-8">
            <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading more tags...
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No tags found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {PAGE_SIZE * page >= filtered.length && filtered.length > 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            You&apos;ve reached the end of the list
          </div>
        )}
      </div>
    </div>
  );
}
