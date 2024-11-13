// LoadJourneyPlans.js
import { collection, query, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const loadJourneyPlans = async (userId) => {
  try {
    const userPlansRef = collection(firestore, 'users', userId, 'journeyPlans');
    const q = query(userPlansRef);
    const querySnapshot = await getDocs(q);
    const plans = querySnapshot.docs.map(doc => doc.data());
    return plans;
  } catch (error) {
    console.error("Error loading journey plans: ", error.message);
  }
};
