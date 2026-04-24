import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUserProfile } from '@/context/UserProfileContext';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <Text className="text-red-500 text-xs mt-1">{message}</Text>;
}

type Errors = {
  age?: string;
  gender?: string;
  style?: string;
  location?: string;
};

function validate(age: string, gender: string, style: string, location: string): Errors {
  const errors: Errors = {};
  if (!age) errors.age = 'Age is required.';
  else if (isNaN(Number(age)) || Number(age) < 1 || Number(age) > 120)
    errors.age = 'Enter a valid age between 1 and 120.';
  if (!gender) errors.gender = 'Gender is required.';
  else if (gender.trim().length < 2) errors.gender = 'Enter a valid gender.';
  if (!style) errors.style = 'Style is required.';
  else if (style.trim().length < 2) errors.style = 'Enter a valid style.';
  if (location && location.trim().length < 2)
    errors.location = 'Enter a valid location.';
  return errors;
}
export default function EditProfile() {
  const { profile, updateProfile } = useUserProfile();

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [style, setStyle] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setAge(profile.age ?? '');
      setGender(profile.gender ?? '');
      setStyle(profile.style ?? '');
      setLocation(profile.location ?? '');
    }
  }, [profile]);

  const hasChanges =
    age !== (profile?.age ?? '') ||
    gender !== (profile?.gender ?? '') ||
    style !== (profile?.style ?? '') ||
    location !== (profile?.location ?? '');

  const isDisabled = loading || !hasChanges || !age || !gender || !style;

  const handleChange = (field: keyof Errors, value: string) => {
    if (field === 'age') setAge(value);
    else if (field === 'gender') setGender(value);
    else if (field === 'style') setStyle(value);
    else if (field === 'location') setLocation(value);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (submitError) setSubmitError('');
  };

  const handleSave = async () => {
    const validationErrors = validate(age, gender, style, location);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setSubmitError('');
      setErrors({});
      await updateProfile({ age, gender, style, location });
      if (router.canGoBack()) router.back();
      else router.replace('/profile');
    } catch (error: any) {
      setSubmitError('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-beige-50 dark:bg-espresso-900">
      <ScrollView
        contentContainerClassName="px-8 pt-8 pb-12 gap-5"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-beige-900 dark:text-espresso-100 mb-4">
          Edit Profile
        </Text>

        <View>
          <Input
            label="Age"
            placeholder="26"
            keyboardType="numeric"
            value={age}
            onChangeText={(v) => handleChange('age', v)}
            error={!!errors.age}
          />
          <FieldError message={errors.age} />
        </View>

        <View>
          <Input
            label="Gender"
            placeholder="Female"
            value={gender}
            onChangeText={(v) => handleChange('gender', v)}
            error={!!errors.gender}
          />
          <FieldError message={errors.gender} />
        </View>

        <View>
          <Input
            label="Style"
            placeholder="Minimalist"
            value={style}
            onChangeText={(v) => handleChange('style', v)}
            error={!!errors.style}
          />
          <FieldError message={errors.style} />
        </View>

        <View>
          <Input
            label="Location"
            placeholder="Paris, France"
            value={location}
            onChangeText={(v) => handleChange('location', v)}
            error={!!errors.location}
          />
          <FieldError message={errors.location} />
        </View>

        {submitError ? (
          <View className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
            <Text className="text-red-500 text-sm text-center">{submitError}</Text>
          </View>
        ) : null}

        <Button
          variant={hasChanges ? 'filled' : 'outlined'}
          label={loading ? 'Saving...' : hasChanges ? 'Save Changes' : 'No Changes'}
          onPress={hasChanges ? handleSave : () => router.canGoBack() ? router.back() : router.replace('/profile')}
          disabled={loading || (hasChanges && (!age || !gender || !style))}
        />
      </ScrollView>
    </SafeAreaView>
  );
}