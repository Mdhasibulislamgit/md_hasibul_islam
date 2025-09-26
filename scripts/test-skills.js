const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio_db';

async function testSkills() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔍 Testing skills retrieval...');
    await client.connect();

    const db = client.db(MONGODB_DB_NAME);
    const skillsCollection = db.collection('skills');

    const skills = await skillsCollection.find({}).toArray();

    console.log(`📊 Found ${skills.length} skills in database:`);
    skills.forEach((skill, index) => {
      console.log(`${index + 1}. ${skill.name} (${skill.category}) - ${skill.proficiencyLevel || 'No level'} - Icon: ${skill.iconName || 'None'}`);
    });

    console.log('\n✅ Skills test completed!');
  } catch (error) {
    console.error('❌ Error testing skills:', error);
  } finally {
    await client.close();
  }
}

testSkills();
