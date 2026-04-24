import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { auth } from '@/lib/firebase';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <Text className="text-red-500 text-xs mt-1">{message}</Text>;
}

function validate(email: string, password: string) {
  const errors: { email?: string; password?: string } = {};
  if (!email) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email.';
  if (!password) errors.password = 'Password is required.';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
  return errors;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const isDisabled = loading || !email || !password;

  const handleLogin = async () => {
    const validationErrors = validate(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setSubmitError('');
      setErrors({});
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/home');
    } catch (error: any) {
      const msg =
        error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password'
          ? 'Incorrect email or password.'
          : error.code === 'auth/user-not-found'
            ? 'No account found with this email.'
            : error.code === 'auth/too-many-requests'
              ? 'Too many attempts. Try again later.'
              : 'Something went wrong. Please try again.';
      setSubmitError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') setEmail(value);
    else setPassword(value);
    // Clear the error for the field as the user types
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (submitError) setSubmitError('');
  };

  return (
    <SafeAreaView className="flex-1 bg-beige-50 dark:bg-espresso-900">
      <View className="flex-1 px-8 justify-center gap-10">

        <View className="items-center gap-2">
          <Text className="text-3xl font-bold tracking-[8px] text-gold-light dark:text-gold-dark">
            FashON
          </Text>
          <Text className="text-sm tracking-widest text-caramel dark:text-bronze">
            Welcome back
          </Text>
        </View>

        <View className="gap-5">
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

          <TouchableOpacity className="self-end" onPress={() => { }}>
            <Text className="text-sm text-gold-light dark:text-gold-dark">Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {submitError ? (
          <View className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
            <Text className="text-red-500 text-sm text-center">{submitError}</Text>
          </View>
        ) : null}

        <View className="gap-4">
          <Button
            variant="filled"
            label={loading ? 'Signing in...' : 'Sign In'}
            onPress={handleLogin}
            disabled={isDisabled}
          />

          <View className="flex-row items-center gap-3">
            <View className="flex-1 h-px bg-beige-100 dark:bg-espresso-800" />
            <Text className="text-caramel dark:text-bronze text-sm">or</Text>
            <View className="flex-1 h-px bg-beige-100 dark:bg-espresso-800" />
          </View>
        </View>

        <View className="flex-row justify-center">
          <Text className="text-caramel dark:text-bronze">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text className="text-gold-light dark:text-gold-dark font-semibold">Sign up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}