import { db } from '../firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';

// Users
export const getUser = async (userId) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const addUser = async (userData) => {
  return await addDoc(collection(db, 'users'), userData);
};

export const updateUser = async (userId, userData) => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, userData);
};

// Clubs
export const getClubs = async () => {
  const querySnapshot = await getDocs(collection(db, 'clubs'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getClub = async (clubId) => {
  const docRef = doc(db, 'clubs', clubId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const addClub = async (clubData) => {
  return await addDoc(collection(db, 'clubs'), clubData);
};

export const updateClub = async (clubId, clubData) => {
  const docRef = doc(db, 'clubs', clubId);
  await updateDoc(docRef, clubData);
};

// Events
export const getEvents = async (clubId = null) => {
  let q = collection(db, 'events');
  if (clubId) {
    q = query(q, where('clubId', '==', clubId));
  }
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addEvent = async (eventData) => {
  return await addDoc(collection(db, 'events'), eventData);
};

export const updateEvent = async (eventId, eventData) => {
  const docRef = doc(db, 'events', eventId);
  await updateDoc(docRef, eventData);
};