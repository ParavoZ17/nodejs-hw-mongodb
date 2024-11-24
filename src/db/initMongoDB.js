// //mongodb+srv://Mykola:<db_password>@cluster0.1ukmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
import mongoose from 'mongoose';

import { env } from '../utils/env.js';

// export const initMongoDB = async () => {
//   try {
//     const user = env('MONGODB_USER');
//     const password = env('MONGODB_PASSWORD');
//     const url = env('MONGODB_URL');
//     const db = env('MONGODB_DB');
//     await mongoose.connect(
//       `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
//     );
//     console.log('It`s OK');
//   } catch (error) {
//     console.log(error.message);
//     throw error;
//   }
// };

export const initMongoDB = async () => {
  try {
    const user = env('MONGODB_USER');
    const password = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');
    
    const fullUrl = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
    console.log('Connecting to:', fullUrl); // Лог повного URL (без пароля)

    await mongoose.connect(fullUrl);
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
};
