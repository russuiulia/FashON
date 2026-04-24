import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUserProfile } from '@/hooks/useUserProfiles';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfile() {
  const { profile, updateProfile } = useUserProfile();

  const [age, setAge] = useState(profile?.age ?? '');
  const [gender, setGender] = useState(profile?.gender ?? '');
  const [style, setStyle] = useState(profile?.style ?? '');
  const [location, setLocation] = useState(profile?.location ?? '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateProfile({ age, gender, style, location });
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-beige-50 dark:bg-espresso-900">
      <ScrollView contentContainerClassName="px-8 pt-8 pb-12 gap-5" showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-bold text-beige-900 dark:text-espresso-100 mb-4">
          Edit Profile
        </Text>

        <Input label="Age" placeholder="26" keyboardType="numeric" value={age} onChangeText={setAge} />
        <Input label="Gender" placeholder="Female" value={gender} onChangeText={setGender} />
        <Input label="Style" placeholder="Minimalist" value={style} onChangeText={setStyle} />
        <Input label="Location" placeholder="Paris, France" value={location} onChangeText={setLocation} />

        <Button
          variant="filled"
          label={loading ? 'Saving...' : 'Save Changes'}
          onPress={handleSave}
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}