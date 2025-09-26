
import { ExperienceCard } from '@/components/features/experience';
import { getExperience } from '@/actions/experienceActions';
import { FileText } from 'lucide-react';

export default async function ExperiencePage() {
  const experienceList = await getExperience();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <FileText className="h-16 w-16 mx-auto text-primary mb-5" />
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
          My Professional Journey
        </h1>
        
      </div>

      {experienceList.length > 0 ? (
        <div className="space-y-8">
          {experienceList.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      ) : (
         <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No experience to display yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
