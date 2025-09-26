export async function safeAsyncOperation<T>(
  operation: () => Promise<T>,
  fallback: T,
  errorMessage?: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error(errorMessage || 'Async operation failed:', error);
    return fallback;
  }
}

export function safeSyncOperation<T>(
  operation: () => T,
  fallback: T,
  errorMessage?: string
): T {
  try {
    return operation();
  } catch (error) {
    console.error(errorMessage || 'Sync operation failed:', error);
    return fallback;
  }
}

export async function safeMongoOperation<T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> {
  return safeAsyncOperation(operation, fallback, 'MongoDB operation failed');
}
