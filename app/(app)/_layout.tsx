import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <View className="items-center gap-0.5 pt-1" style={{ minWidth: 60 }}>
      <Text className={`text-xl ${focused ? 'opacity-100' : 'opacity-40'}`}>{emoji}</Text>
      <Text
        numberOfLines={1}
        className={`text-[10px] font-semibold tracking-wide ${focused ? 'text-gold-light dark:text-gold-dark' : 'text-caramel dark:text-bronze'
          }`}
      >
        {label}
      </Text>
    </View>
  );
}

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 72,
        },
      }}
    >

      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🗂" label="History" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" label="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" label="Profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}