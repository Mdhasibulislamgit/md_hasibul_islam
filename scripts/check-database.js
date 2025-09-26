const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio_db';

async function checkDatabase() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    console.log('Please check your .env file and ensure MONGODB_URI is set.');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔍 Checking database connection...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');

    const db = client.db(MONGODB_DB_NAME);
    console.log(`📊 Using database: ${MONGODB_DB_NAME}`);

    // Check collections and document counts
    const collections = ['about', 'skills', 'experience', 'cv'];
    
    for (const collectionName of collections) {
      const collection = db.collection(collectionName);
      const count = await collection.countDocuments();
      console.log(`📄 ${collectionName}: ${count} document(s)`);
      
      if (count === 0) {
        console.log(`⚠️  Warning: ${collectionName} collection is empty`);
      }
    }

    // Check if about data exists (critical for homepage)
    const aboutCollection = db.collection('about');
    const aboutData = await aboutCollection.findOne({});
    
    if (aboutData) {
      console.log('✅ About data found - homepage should load correctly');
      console.log(`👤 Profile: ${aboutData.fullName}`);
    } else {
      console.log('❌ No about data found - homepage will show loading screen');
      console.log('💡 Run "npm run seed" to populate the database with sample data');
    }

    console.log('\n🎉 Database check completed!');

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check if MongoDB is running');
    console.log('2. Verify MONGODB_URI in your .env file');
    console.log('3. Ensure network connectivity to MongoDB');
    console.log('4. Check if the database credentials are correct');
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the check function
checkDatabase();
