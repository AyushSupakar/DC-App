
export const sanitizeString = (input) => {
  if (typeof input !== 'string') return input;

  return input
    .replace(/[\r\n\t]/g, ' ')        // Replace newlines and tabs with space
    .replace(/["'\\`]/g, '')          // Remove quotes and backslashes
    .replace(/[^\w\s.,!?@#&-]/g, '')  // Remove any other special characters
    .trim();                          // Remove extra spaces at ends
};
