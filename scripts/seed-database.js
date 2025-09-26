const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio_db';

async function seedDatabase() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB_NAME);

    // Seed About Data
    const aboutCollection = db.collection('about');
    const existingAbout = await aboutCollection.findOne({});
    
    if (!existingAbout) {
      const aboutData = {
        fullName: "Md Hasibul Islam",
        profilePictureUrl: "https://avatars.githubusercontent.com/u/1234567?v=4",
        contactEmail: "hasibul@example.com",
        bioParagraphs: [
          "I am a passionate full-stack developer with expertise in modern web technologies.",
          "I love creating innovative solutions and building user-friendly applications.",
          "Always eager to learn new technologies and take on challenging projects."
        ],
        personalValues: [
          "Innovation",
          "Quality",
          "Continuous Learning",
          "Collaboration"
        ],
        origin: {
          city: "Dhaka",
          country: "Bangladesh"
        },
        educationHistory: [
          {
            id: "edu1",
            institution: "University of Technology",
            degree: "Bachelor of Computer Science",
            year: "2020",
            duration: "2016-2020",
            iconName: "GraduationCap"
          }
        ],
        socialLinks: [
          {
            id: "social1",
            platform: "GitHub",
            url: "https://github.com/hasibul",
            iconName: "Github"
          },
          {
            id: "social2",
            platform: "LinkedIn",
            url: "https://linkedin.com/in/hasibul",
            iconName: "Linkedin"
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await aboutCollection.insertOne(aboutData);
      console.log('✅ About data seeded successfully');
    } else {
      console.log('ℹ️  About data already exists');
    }

    // Seed Skills Data
    const skillsCollection = db.collection('skills');
    const existingSkills = await skillsCollection.findOne({});
    
    if (!existingSkills) {
      const skillsData = [
        {
          name: "JavaScript",
          category: "programming",
          proficiencyLevel: "expert",
          iconName: "Code",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "React",
          category: "frontend",
          proficiencyLevel: "expert",
          iconName: "Component",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Node.js",
          category: "backend",
          proficiencyLevel: "advanced",
          iconName: "Server",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "MongoDB",
          category: "database",
          proficiencyLevel: "advanced",
          iconName: "Database",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "TypeScript",
          category: "programming",
          proficiencyLevel: "advanced",
          iconName: "FileCode",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Next.js",
          category: "frontend",
          proficiencyLevel: "advanced",
          iconName: "Globe",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      await skillsCollection.insertMany(skillsData);
      console.log('✅ Skills data seeded successfully');
    } else {
      console.log('ℹ️  Skills data already exists');
    }

    // Seed Experience Data
    const experienceCollection = db.collection('experience');
    const existingExperience = await experienceCollection.findOne({});
    
    if (!existingExperience) {
      const experienceData = [
        {
          title: "Full Stack Developer",
          company: "Tech Solutions Inc.",
          location: "Dhaka, Bangladesh",
          startDate: "2022-01-01",
          endDate: null,
          isCurrentPosition: true,
          description: "Developing modern web applications using React, Node.js, and MongoDB. Leading frontend development and collaborating with cross-functional teams.",
          technologies: ["React", "Node.js", "MongoDB", "TypeScript", "Next.js"],
          achievements: [
            "Improved application performance by 40%",
            "Led a team of 3 developers",
            "Implemented CI/CD pipeline"
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Frontend Developer",
          company: "Digital Agency",
          location: "Dhaka, Bangladesh",
          startDate: "2020-06-01",
          endDate: "2021-12-31",
          isCurrentPosition: false,
          description: "Developed responsive web applications and collaborated with design teams to create user-friendly interfaces.",
          technologies: ["React", "JavaScript", "CSS", "HTML"],
          achievements: [
            "Delivered 15+ projects on time",
            "Improved user experience metrics by 25%"
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      await experienceCollection.insertMany(experienceData);
      console.log('✅ Experience data seeded successfully');
    } else {
      console.log('ℹ️  Experience data already exists');
    }

    // Seed CV Info
    const cvCollection = db.collection('cv');
    const existingCv = await cvCollection.findOne({});
    
    if (!existingCv) {
      const cvData = {
        fileName: "cv.pdf",
        lastModified: new Date(),
        originalName: "Md_Hasibul_Islam_CV.pdf",
        filePath: "/cv.pdf",
        fileSize: 1024000,
        mimeType: "application/pdf",
        uploadedAt: new Date().toISOString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await cvCollection.insertOne(cvData);
      console.log('✅ CV data seeded successfully');
    } else {
      console.log('ℹ️  CV data already exists');
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('You can now access your portfolio at http://localhost:3000');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the seed function
seedDatabase();
