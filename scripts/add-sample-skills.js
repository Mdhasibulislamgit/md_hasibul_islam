const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio_db';

// Sample skills for different categories
const sampleSkills = [
  // Engineer category
  {
    name: 'System Architecture',
    category: 'Engineer',
    proficiencyLevel: 'Advanced',
    iconName: 'Building'
  },
  {
    name: 'Problem Solving',
    category: 'Engineer',
    proficiencyLevel: 'Expert',
    iconName: 'Lightbulb'
  },
  {
    name: 'Technical Documentation',
    category: 'Engineer',
    proficiencyLevel: 'Advanced',
    iconName: 'FileText'
  },
  
  // Creative Professional category
  {
    name: 'UI/UX Design',
    category: 'Creative Professional',
    proficiencyLevel: 'Intermediate',
    iconName: 'Palette'
  },
  {
    name: 'Graphic Design',
    category: 'Creative Professional',
    proficiencyLevel: 'Intermediate',
    iconName: 'Image'
  },
  
  // Business & Management category
  {
    name: 'Project Management',
    category: 'Business & Management',
    proficiencyLevel: 'Advanced',
    iconName: 'Calendar'
  },
  {
    name: 'Team Leadership',
    category: 'Business & Management',
    proficiencyLevel: 'Intermediate',
    iconName: 'Users'
  },
  {
    name: 'Strategic Planning',
    category: 'Business & Management',
    proficiencyLevel: 'Intermediate',
    iconName: 'Target'
  },
  
  // Other Professional Skills category
  {
    name: 'Communication',
    category: 'Other Professional Skills',
    proficiencyLevel: 'Expert',
    iconName: 'MessageCircle'
  },
  {
    name: 'Time Management',
    category: 'Other Professional Skills',
    proficiencyLevel: 'Advanced',
    iconName: 'Clock'
  }
];

async function addSampleSkills() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔄 Adding sample skills...');
    await client.connect();
    
    const db = client.db(MONGODB_DB_NAME);
    const skillsCollection = db.collection('skills');
    
    let addedCount = 0;
    
    for (const skill of sampleSkills) {
      // Check if skill already exists
      const existingSkill = await skillsCollection.findOne({ name: skill.name });
      
      if (!existingSkill) {
        const now = new Date();
        await skillsCollection.insertOne({
          ...skill,
          createdAt: now,
          updatedAt: now
        });
        console.log(`✅ Added "${skill.name}" in ${skill.category}`);
        addedCount++;
      } else {
        console.log(`ℹ️  Skill "${skill.name}" already exists, skipping`);
      }
    }
    
    console.log(`\n🎉 Added ${addedCount} new skills!`);
    
    // Show final state
    const allSkills = await skillsCollection.find({}).toArray();
    console.log(`\n📋 Total skills in database: ${allSkills.length}`);
    
    const categoryCounts = {};
    allSkills.forEach(skill => {
      categoryCounts[skill.category] = (categoryCounts[skill.category] || 0) + 1;
    });
    
    console.log('\n📊 Skills by category:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} skill(s)`);
    });
    
  } catch (error) {
    console.error('❌ Error adding sample skills:', error);
  } finally {
    await client.close();
  }
}

addSampleSkills();
