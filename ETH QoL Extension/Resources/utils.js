/**
 * Creates a promise that resolves after a specified time
 * @param {number} ms - The number of milliseconds to sleep
 * @returns {Promise} A promise that resolves after the specified time
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
