const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio_db';

// Mapping from old categories to new categories
const categoryMapping = {
  'programming': 'Web Developer',
  'frontend': 'Web Developer',
  'backend': 'Web Developer',
  'database': 'Web Developer',
  'tools': 'Engineer',
  'design': 'Creative Professional',
  'other': 'Other Professional Skills',
  // Handle existing categories that might already be in new format
  'Frontend': 'Web Developer',
  'Backend': 'Web Developer',
  'Tools': 'Engineer',
  'Design': 'Creative Professional',
  'Other': 'Other Professional Skills'
};

async function migrateSkillCategories() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔄 Starting skill category migration...');
    await client.connect();
    
    const db = client.db(MONGODB_DB_NAME);
    const skillsCollection = db.collection('skills');
    
    // Get all skills
    const skills = await skillsCollection.find({}).toArray();
    console.log(`📊 Found ${skills.length} skills to migrate`);
    
    let migratedCount = 0;
    
    for (const skill of skills) {
      const oldCategory = skill.category;
      const newCategory = categoryMapping[oldCategory];
      
      if (newCategory && newCategory !== oldCategory) {
        await skillsCollection.updateOne(
          { _id: skill._id },
          { 
            $set: { 
              category: newCategory,
              updatedAt: new Date()
            } 
          }
        );
        console.log(`✅ Updated "${skill.name}": ${oldCategory} → ${newCategory}`);
        migratedCount++;
      } else if (!newCategory) {
        console.log(`⚠️  Unknown category "${oldCategory}" for skill "${skill.name}" - setting to "Other Professional Skills"`);
        await skillsCollection.updateOne(
          { _id: skill._id },
          { 
            $set: { 
              category: 'Other Professional Skills',
              updatedAt: new Date()
            } 
          }
        );
        migratedCount++;
      } else {
        console.log(`ℹ️  Skill "${skill.name}" already has correct category: ${oldCategory}`);
      }
    }
    
    console.log(`\n🎉 Migration completed! Updated ${migratedCount} skills.`);
    
    // Show final state
    const updatedSkills = await skillsCollection.find({}).toArray();
    console.log('\n📋 Final skill categories:');
    const categoryCounts = {};
    updatedSkills.forEach(skill => {
      categoryCounts[skill.category] = (categoryCounts[skill.category] || 0) + 1;
    });
    
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} skill(s)`);
    });
    
  } catch (error) {
    console.error('❌ Error during migration:', error);
  } finally {
    await client.close();
  }
}

migrateSkillCategories();
