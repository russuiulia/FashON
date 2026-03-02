import { router } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
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
          <View className="gap-2">
            <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze">
              Full Name
            </Text>
            <TextInput
              placeholder="Jane Doe"
              autoCapitalize="words"
              className="border border-beige-100 dark:border-espresso-800 rounded-xl px-4 py-4 text-beige-900 dark:text-espresso-200"
            />
          </View>

          <View className="gap-2">
            <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze">
              Email
            </Text>
            <TextInput
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-beige-100 dark:border-espresso-800 rounded-xl px-4 py-4 text-beige-900 dark:text-espresso-200"
            />
          </View>

          <View className="gap-2">
            <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze">
              Password
            </Text>
            <TextInput
              placeholder="••••••••"
              secureTextEntry
              className="border border-beige-100 dark:border-espresso-800 rounded-xl px-4 py-4 text-beige-900 dark:text-espresso-200"
            />
          </View>

          <View className="gap-2">
            <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze">
              Confirm Password
            </Text>
            <TextInput
              placeholder="••••••••"
              secureTextEntry
              className="border border-beige-100 dark:border-espresso-800 rounded-xl px-4 py-4 text-beige-900 dark:text-espresso-200"
            />
          </View>
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
        <View className="gap-4">
          <TouchableOpacity className="bg-gold-light dark:bg-gold-dark rounded-xl py-4 items-center">
            <Text className="text-white font-bold tracking-widest">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>

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