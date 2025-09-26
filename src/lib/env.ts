export function isBuildContext(): boolean {
  return typeof window === 'undefined' && !process.env.MONGODB_URI;
}
