import { Connection } from 'mongoose';

export const migration = async (connection: Connection) => {
  const db = connection.db;

  const roles = await db?.collection('roles').find().toArray();

  if (!roles || !roles.length) return

  const places = [
    { name: 'Place 1', rolesAllowed: [roles[0]._id, roles[1]._id] },
    { name: 'Place 2', rolesAllowed: [roles[1]._id] },
    { name: 'Place 3', rolesAllowed: [roles[2]._id] },
    { name: 'Place 4', rolesAllowed: [roles[3]._id] },
    { name: 'Place 5', rolesAllowed: [roles[0]._id, roles[1]._id] },
    { name: 'Place 6', rolesAllowed: [roles[0]._id, roles[2]._id] },
    { name: 'Place 7', rolesAllowed: [roles[1]._id, roles[3]._id] },
    { name: 'Place 8', rolesAllowed: [roles[3]._id] },
    { name: 'Place 9', rolesAllowed: [roles[0]._id] },
    { name: 'Place 10', rolesAllowed: [roles[2]._id, roles[3]._id] },
  ];

  const placeCollection = db?.collection('places');

  // Insert places if they don't exist already
  const existingPlaces = await placeCollection?.find().toArray();
  if (!existingPlaces?.length) {
    await placeCollection?.insertMany(places);
    console.log('Places inserted successfully!');
  } else {
    console.log('Places already exist!');
  }
};
