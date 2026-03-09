
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  return (
    <SafeAreaView className="flex-1 bg-beige-50 dark:bg-espresso-900">
      <View className="flex-1 px-8 justify-center gap-10">

        <View className="items-center gap-2">
          <Text className="text-3xl font-bold tracking-[8px] text-gold-light dark:text-gold-dark">
            RUSSU
          </Text>
          <Text className="text-sm tracking-widest text-caramel dark:text-bronze">
            Welcome back
          </Text>
        </View>

        <View className="gap-5">
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

          <TouchableOpacity className="self-end">
            <Text className="text-sm text-gold-light dark:text-gold-dark">
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        <View className="gap-4">
          <Button variant="filled" label="Sign In" />

          <View className="flex-row items-center gap-3">
            <View className="flex-1 h-px bg-beige-100 dark:bg-espresso-800" />
            <Text className="text-caramel dark:text-bronze text-sm">or</Text>
            <View className="flex-1 h-px bg-beige-100 dark:bg-espresso-800" />
          </View>

          <Button variant="outlined" label="Continue with Google" />
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