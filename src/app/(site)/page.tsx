import { getSkills } from "@/actions/skillActions";
import { getAboutData } from "@/actions/aboutActions";
import { getExperience } from "@/actions/experienceActions";
import { getCurrentCvInfo } from "@/actions/cvActions";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ContactSection,
} from "@/components/sections";



export default async function HomePage() {
  // Fetch all data in parallel for better performance
  const [skills, aboutData, experiences, cvInfo] = await Promise.all([
    getSkills(),
    getAboutData(),
    getExperience(),
    getCurrentCvInfo(),
  ]);

  // Get key skills for homepage display (limit to 6)
  const keySkills = skills.slice(0, 6);

  // Get most recent experience for homepage
  const recentExperience = experiences.length > 0 ? experiences[0] : null;

  // If aboutData is null, show a more informative message
  if (!aboutData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome to My Portfolio</h1>
          <p className="text-muted-foreground mb-4">
            The portfolio data is being loaded. If this persists, the database might need to be initialized.
          </p>
          <p className="text-sm text-muted-foreground">
            Please contact the administrator or try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <HeroSection aboutData={aboutData} cvInfo={cvInfo} />
      <div className="space-y-8 py-8">
        <AboutSection aboutData={aboutData} />
        <SkillsSection skills={keySkills} />
        <ExperienceSection experience={recentExperience} />
        <ContactSection />
      </div>
    </div>
  );
}

