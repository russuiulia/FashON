import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export type UserProfile = {
  uid: string;
  displayName: string;
  email: string;
  age: string;
  gender: string;
  style: string;
  location: string;
};

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) setProfile(snap.data() as UserProfile);
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (fields: Partial<UserProfile>) => {
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid), fields);
    setProfile((prev) => prev ? { ...prev, ...fields } : prev);
  };

  return { profile, loading, updateProfile };
}