import { Connection } from 'mongoose';

export const migration = async (connection: Connection) => {
  const db = connection.db;

  const roles = [
    {
      name: 'admin',
      subRoles: ['super_admin', 'manager', 'developer'],
    },
    {
      name: 'user',
      subRoles: ['basic_user', 'premium_user'],
    },
    {
      name: 'guest',
      subRoles: ['viewer'],
    },
    {
      name: 'moderator',
      subRoles: ['content_moderator', 'admin_moderator'],
    },
  ];

  const roleCollection = db?.collection('roles');

  // Insert roles if they don't exist already
  const existingRoles = await roleCollection?.find().toArray();
  if (!existingRoles?.length) {
    await roleCollection?.insertMany(roles);
    console.log('Roles inserted successfully!');
  } else {
    console.log('Roles already exist!');
  }
};
