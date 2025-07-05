type ErrorContext = "api" | "page" | "component";

export function handleError(
  error: unknown,
  context: ErrorContext = "component",
) {
  const isDev = process.env.NODE_ENV === "development";

  // Default production message
  let userMessage = "Server is busy. Please try again later.";
  let devMessage = "";

  if (error instanceof Error) {
    devMessage = error.message;

    // Special case for 404
    if (error.message.includes("404")) {
      userMessage = isDev
        ? `Not Found: ${error.message}`
        : "The requested resource was not found.";
    }
  }

  // Log detailed error in development
  if (isDev) {
    console.error(`[${context} Error]`, error);
    return devMessage || userMessage;
  }

  return userMessage;
}
