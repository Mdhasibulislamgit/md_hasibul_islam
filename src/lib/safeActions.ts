export async function safeMongoOperation<T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error('MongoDB operation failed:', error);
    return fallback;
  }
}
