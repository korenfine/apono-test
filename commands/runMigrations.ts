import mongoose, { Connection } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

const runMigrations = async () => {
  const mongoUri = 'mongodb://localhost:27017/apono'; // Update if needed

  // Establish connection using mongoose.connect (returns a Mongoose instance)
  await mongoose.connect(mongoUri);
  const connection: Connection = mongoose.connection;

  console.log('Connected to MongoDB!');

  const migrationsPath = path.join(__dirname, '../migrations');
  const migrationFiles = fs
    .readdirSync(migrationsPath)
    .filter(file => file.endsWith('.ts'))
    .sort();

  for (const migrationFile of migrationFiles) {
    try {
      const migration = require(path.join(migrationsPath, migrationFile));
      await migration.migration(connection);
      console.log(`Migration ${migrationFile} ran successfully.`);
    } catch (error) {
      console.error(`Failed to run migration ${migrationFile}`, error);
    }
  }

  await connection.close();
  console.log('Migrations completed!');
};

runMigrations().catch((err) => console.error('Error running migrations:', err));
