export class CredentialsService {
  static validateAdminCredentials(username: string, password: string): boolean {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      console.error("ADMIN_USERNAME or ADMIN_PASSWORD not set in .env file");
      return false;
    }

    return username === adminUsername && password === adminPassword;
  }

  static isConfigured(): boolean {
    return !!(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD);
  }

  static getConfigurationError(): string | null {
    if (!process.env.ADMIN_USERNAME) {
      return "ADMIN_USERNAME not configured";
    }
    if (!process.env.ADMIN_PASSWORD) {
      return "ADMIN_PASSWORD not configured";
    }
    return null;
  }
}
