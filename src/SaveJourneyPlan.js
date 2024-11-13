// SaveJourneyPlan.js
import { doc, collection, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const saveJourneyPlan = async (userId, planData) => {
  try {
    const userPlanRef = doc(collection(firestore, 'users', userId, 'journeyPlans'));
    await setDoc(userPlanRef, planData);
  } catch (error) {
    console.error("Error saving journey plan: ", error.message);
  }
};
