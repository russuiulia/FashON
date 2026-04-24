import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { auth, db } from '@/lib/firebase';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <Text className="text-red-500 text-xs mt-1">{message}</Text>;
}

type Errors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function validate(fullName: string, email: string, password: string, confirmPassword: string): Errors {
  const errors: Errors = {};
  if (!fullName) errors.fullName = 'Full name is required.';
  if (!email) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email.';
  if (!password) errors.password = 'Password is required.';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
  if (!confirmPassword) errors.confirmPassword = 'Please confirm your password.';
  else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  return errors;
}

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const isDisabled = loading || !fullName || !email || !password || !confirmPassword;

  const handleChange = (field: keyof Errors, value: string) => {
    if (field === 'fullName') setFullName(value);
    else if (field === 'email') setEmail(value);
    else if (field === 'password') setPassword(value);
    else if (field === 'confirmPassword') setConfirmPassword(value);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (submitError) setSubmitError('');
  };

  const handleRegister = async () => {
    const validationErrors = validate(fullName, email, password, confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setSubmitError('');
      setErrors({});

      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: fullName });
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: fullName,
        email,
        age: '',
        gender: '',
        style: '',
        location: '',
        createdAt: new Date().toISOString(),
      });

      router.push('/auth/create-profile');
    } catch (error: any) {
      const msg =
        error.code === 'auth/email-already-in-use'
          ? 'An account with this email already exists.'
          : error.code === 'auth/invalid-email'
            ? 'Invalid email address.'
            : error.code === 'auth/weak-password'
              ? 'Password must be at least 6 characters.'
              : 'Something went wrong. Please try again.';
      setSubmitError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-beige-50 dark:bg-espresso-900">
      <View className="flex-1 px-8 justify-center gap-8">

        <View className="items-center gap-2">
          <Text className="text-3xl font-bold tracking-[8px] text-gold-light dark:text-gold-dark">
            FashON
          </Text>
          <Text className="text-sm tracking-widest text-caramel dark:text-bronze">
            Create your account
          </Text>
        </View>

        <View className="gap-4">
          <View>
            <Input
              label="Full Name"
              placeholder="Jane Doe"
              autoCapitalize="words"
              value={fullName}
              onChangeText={(v) => handleChange('fullName', v)}
              error={!!errors.fullName}
            />
            <FieldError message={errors.fullName} />
          </View>

          <View>
            <Input
              label="Email"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(v) => handleChange('email', v)}
              error={!!errors.email}
            />
            <FieldError message={errors.email} />
          </View>

          <View>
            <Input
              label="Password"
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={(v) => handleChange('password', v)}
              error={!!errors.password}
            />
            <FieldError message={errors.password} />
          </View>

          <View>
            <Input
              label="Confirm Password"
              placeholder="••••••••"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(v) => handleChange('confirmPassword', v)}
              error={!!errors.confirmPassword}
            />
            <FieldError message={errors.confirmPassword} />
          </View>
        </View>

        {submitError ? (
          <View className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
            <Text className="text-red-500 text-sm text-center">{submitError}</Text>
          </View>
        ) : null}

        <Text className="text-xs text-center text-caramel dark:text-bronze leading-5">
          By creating an account you agree to our{' '}
          <Text className="text-gold-light dark:text-gold-dark font-semibold">Terms of Service</Text>{' '}
          and{' '}
          <Text className="text-gold-light dark:text-gold-dark font-semibold">Privacy Policy</Text>
        </Text>

        <Button
          variant="filled"
          label={loading ? 'Creating account...' : 'Create Account'}
          onPress={handleRegister}
          disabled={isDisabled}
        />

        <View className="flex-row justify-center">
          <Text className="text-caramel dark:text-bronze">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text className="text-gold-light dark:text-gold-dark font-semibold">Sign in</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}