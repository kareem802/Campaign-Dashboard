/**
 * Helper function to simulate network delay for mock API calls.
 * @param ms Delay in milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let simulateFailure = false;

export function setSimulateFailure(value: boolean) {
  simulateFailure = value;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('simulate-failure-change'));
  }
}

export function getSimulateFailure() {
  return simulateFailure;
}

/**
 * Simulates an API call that returns data after a delay.
 * @param data The data to return
 * @param ms Optional custom delay in milliseconds
 */
export async function simulateApiCall<T>(data: T, ms = 800): Promise<T> {
  await delay(ms);
  if (simulateFailure) {
    setSimulateFailure(false);
    throw new Error('Simulated backend response failure.');
  }
  return data;
}


