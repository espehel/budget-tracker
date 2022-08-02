import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const app = initializeApp({
  apiKey: 'AIzaSyCXVN0IeRpd9rJUafcqmvCqGwvZQ5wXZw8',
  authDomain: 'budget-tracker-62d3c.firebaseapp.com',
  projectId: 'budget-tracker-62d3c',
  storageBucket: 'budget-tracker-62d3c.appspot.com',
  messagingSenderId: '168684940775',
  appId: '1:168684940775:web:e508fc141d7eaae6cf2142',
});
const db = getFirestore(app);

export const getPosts = async () => {
  const postsSnapshot = await getDocs(collection(db, 'budgets/UO3CgW5ohnHm7R5zozKS/posts'));
  return postsSnapshot.docs.map((doc) => doc.data());
};
