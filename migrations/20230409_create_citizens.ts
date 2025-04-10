import { Connection } from 'mongoose';

export const migration = async (connection: Connection) => {
  const db = connection.db;

  const roles = await db?.collection('roles').find().toArray();

  if (!roles || !roles.length) return;

  const citizens = [
    { name: 'John Doe', roles: [roles[0]._id, roles[1]._id] },
    { name: 'Jane Smith', roles: [roles[1]._id] },
    { name: 'Alice Johnson', roles: [roles[2]._id] },
    { name: 'Bob Brown', roles: [roles[3]._id, roles[1]._id] },
    { name: 'Charlie White', roles: [roles[0]._id] },
    { name: 'David Black', roles: [roles[1]._id] },
    { name: 'Eve Green', roles: [roles[2]._id, roles[3]._id] },
    { name: 'Grace Yellow', roles: [roles[0]._id, roles[1]._id] },
    { name: 'Hannah Blue', roles: [roles[3]._id] },
    { name: 'Ian Red', roles: [roles[1]._id, roles[2]._id] },
  ];

  const citizenCollection = db?.collection('citizens');

  // Insert citizens if they don't exist already
  const existingCitizens = await citizenCollection?.find().toArray();
  if (!existingCitizens?.length) {
    await citizenCollection?.insertMany(citizens);
    console.log('Citizens inserted successfully!');
  } else {
    console.log('Citizens already exist!');
  }
};
