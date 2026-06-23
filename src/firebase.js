import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, query, orderBy } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if environment variables are provided
const isFirebaseConfigured = 
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID;

let db = null;

if (isFirebaseConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase Firestore successfully initialized!");
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.warn("Firebase environment variables are missing. Using localStorage fallback.");
}

// Collection name in Firestore
const COLLECTION_NAME = 'recap_data';

/**
 * Saves a group recap record.
 * Writes to localStorage as a local backup and to Firestore if configured.
 */
export async function saveRecap(record) {
  const localDataStr = localStorage.getItem('destrip_recap_data') || '[]';
  let localData = [];
  try {
    localData = JSON.parse(localDataStr);
    if (!Array.isArray(localData)) localData = [];
  } catch (e) {
    localData = [];
  }

  const finalRecord = {
    ...record,
    createdAt: record.createdAt || Date.now()
  };

  localData.push(finalRecord);
  localStorage.setItem('destrip_recap_data', JSON.stringify(localData));

  if (db) {
    try {
      await addDoc(collection(db, COLLECTION_NAME), finalRecord);
      console.log("Recap successfully saved to Firestore!");
    } catch (e) {
      console.error("Failed to save recap to Firestore:", e);
    }
  }
}

/**
 * Subscribes to real-time updates of recaps.
 * If Firebase is active, listens to Firestore. Otherwise, reads from localStorage.
 * Returns an unsubscribe function.
 */
export function subscribeToRecaps(onUpdate) {
  if (db) {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      onUpdate(data);
    }, (error) => {
      console.error("Error subscribing to Firestore recaps, falling back to local:", error);
      fallbackToLocal(onUpdate);
    });
  } else {
    fallbackToLocal(onUpdate);
    return () => {};
  }
}

function fallbackToLocal(onUpdate) {
  const localDataStr = localStorage.getItem('destrip_recap_data') || '[]';
  try {
    const localData = JSON.parse(localDataStr);
    const sortedLocal = Array.isArray(localData)
      ? [...localData].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      : [];
    onUpdate(sortedLocal);
  } catch (e) {
    onUpdate([]);
  }
}

/**
 * Deletes a group recap record by ID.
 * Deletes from localStorage and Firestore (if active).
 */
export async function deleteRecap(id, localIndex) {
  // 1. Delete from localStorage
  const localDataStr = localStorage.getItem('destrip_recap_data') || '[]';
  try {
    let localData = JSON.parse(localDataStr);
    if (Array.isArray(localData)) {
      const updated = localData.filter((item, idx) => {
        return item.id !== id && item.createdAt !== id && idx !== localIndex;
      });
      localStorage.setItem('destrip_recap_data', JSON.stringify(updated));
    }
  } catch (e) {
    console.error("Error deleting from localStorage:", e);
  }

  // 2. Delete from Firestore if active and ID is a Firestore ID (string)
  if (db && typeof id === 'string' && isNaN(Number(id))) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      console.log(`Document ${id} successfully deleted from Firestore!`);
    } catch (e) {
      console.error("Failed to delete document from Firestore:", e);
    }
  }
}
