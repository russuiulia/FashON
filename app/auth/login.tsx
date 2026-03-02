import { router } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Login() {
  return (
    <SafeAreaView className="flex-1 bg-beige-50 dark:bg-espresso-900">
      <View className="flex-1 px-8 justify-center gap-10">

        {/* Header */}
        <View className="items-center gap-2">
          <Text className="text-3xl font-bold tracking-[8px] text-gold-light dark:text-gold-dark">
            RUSSU
          </Text>
          <Text className="text-sm tracking-widest text-caramel dark:text-bronze">
            Welcome back
          </Text>
        </View>

        {/* Form */}
        <View className="gap-5">
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

          <TouchableOpacity className="self-end">
            <Text className="text-sm text-gold-light dark:text-gold-dark">
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View className="gap-4">
          <TouchableOpacity className="bg-gold-light dark:bg-gold-dark rounded-xl py-4 items-center">
            <Text className="text-white font-bold tracking-widest">
              Sign In
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center gap-3">
            <View className="flex-1 h-px bg-beige-100 dark:bg-espresso-800" />
            <Text className="text-caramel dark:text-bronze text-sm">or</Text>
            <View className="flex-1 h-px bg-beige-100 dark:bg-espresso-800" />
          </View>

          <TouchableOpacity className="border border-beige-100 dark:border-espresso-800 rounded-xl py-4 items-center">
            <Text className="text-beige-900 dark:text-espresso-200 font-medium">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
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