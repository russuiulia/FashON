import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  return (
    <SafeAreaView className="flex-1 bg-beige-50 dark:bg-espresso-900">
      <View className="flex-1 px-8 justify-center gap-10">

        {/* Header */}
        <View className="items-center gap-2">
          <Text className="text-3xl font-bold tracking-[8px] text-gold-light dark:text-gold-dark">
            RUSSU
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
          />

          <Input
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="••••••••"
            secureTextEntry
          />

          <Input
            label="Confirm Password"
            placeholder="••••••••"
            secureTextEntry
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
        <Button variant="filled" label="Create Account" onPress={() => router.push('/auth/create-profile')} />

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