import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);

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
      Alert.alert('Registration failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-beige-50 dark:bg-espresso-900">
      <View className="flex-1 px-8 justify-center gap-10">

        {/* Header */}
        <View className="items-center gap-2">
          <Text className="text-3xl font-bold tracking-[8px] text-gold-light dark:text-gold-dark">
            FashON
          </Text>
          <Text className="text-sm tracking-widest text-caramel dark:text-bronze">
            Create your account
          </Text>
        </View>

        {/* Form */}
        <View className="gap-5">
          <Input
            label="Full Name"
            placeholder="Jane Doe"
            autoCapitalize="words"
            value={fullName}
            onChangeText={setFullName}
          />

          <Input
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Input
            label="Confirm Password"
            placeholder="••••••••"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Terms */}
        <Text className="text-xs text-center text-caramel dark:text-bronze leading-5">
          By creating an account you agree to our{' '}
          <Text className="text-gold-light dark:text-gold-dark font-semibold">
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text className="text-gold-light dark:text-gold-dark font-semibold">
            Privacy Policy
          </Text>
        </Text>

        {/* Actions */}
        <Button
          variant="filled"
          label={loading ? 'Creating account...' : 'Create Account'}
          onPress={handleRegister}
          disabled={loading}
        />

        {/* Footer */}
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