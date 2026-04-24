import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

export type UserProfile = {
  uid: string;
  displayName: string;
  email: string;
  age: string;
  gender: string;
  style: string;
  location: string;
};

type UserProfileContextType = {
  profile: UserProfile | null;
  loading: boolean;
  updateProfile: (fields: Partial<UserProfile>) => Promise<void>;
};

const UserProfileContext = createContext<UserProfileContextType>({
  profile: null,
  loading: true,
  updateProfile: async () => { },
});

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) setProfile(snap.data() as UserProfile);
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (fields: Partial<UserProfile>) => {
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid), fields);
    setProfile((prev) => (prev ? { ...prev, ...fields } : prev));
  };

  return (
    <UserProfileContext.Provider value={{ profile, loading, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export const useUserProfile = () => useContext(UserProfileContext);