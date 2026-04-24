import '../global.css';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { UserProfileProvider } from '@/context/UserProfileContext';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.background,   // #F9F3EC
    text: Colors.light.text,               // #2C1F14
    primary: Colors.light.tint,            // #8B6914
    card: Colors.light.background,         // header/tab bar bg
    border: '#E8DDD0',                     // subtle warm border
    notification: Colors.light.tint,
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.dark.background,    // #1C1510
    text: Colors.dark.text,               // #F0E6D6
    primary: Colors.dark.tint,            // #C9A84C
    card: Colors.dark.background,         // header/tab bar bg
    border: '#2E2318',                    // subtle warm dark border
    notification: Colors.dark.tint,
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [user, loading]);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <UserProfileProvider>
          <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : LightTheme}>
            <Stack screenOptions={{ headerShown: false }} />
          </ThemeProvider>
        </UserProfileProvider>
      </AuthProvider>
    </SafeAreaProvider >
  );
}