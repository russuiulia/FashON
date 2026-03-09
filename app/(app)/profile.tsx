import { router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function ProfileRow({ label, value, onPress }: { label: string; value: string; onPress?: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      className="flex-row justify-between items-center py-4 border-b border-beige-100 dark:border-espresso-800"
    >
      <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze">
        {label}
      </Text>
      <View className="flex-row items-center gap-2">
        <Text className="text-sm text-beige-900 dark:text-espresso-200">{value}</Text>
        {onPress && <Text className="text-caramel dark:text-bronze text-xs">›</Text>}
      </View>
    </TouchableOpacity>
  );
}

export default function Profile() {
  // Replace with real user data from store/context
  const user = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    age: '26',
    gender: 'Female',
    style: 'Minimalist',
    location: 'Paris, France',
  };

  return (
    <SafeAreaView className="flex-1 bg-beige-50 dark:bg-espresso-900">
      <ScrollView
        contentContainerClassName="px-8 pt-8 pb-12"
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View className="items-center gap-3 mb-10">
          <View className="w-20 h-20 rounded-full bg-beige-100 dark:bg-espresso-800 items-center justify-center">
            <Text className="text-4xl">🧍</Text>
          </View>
          <View className="items-center gap-0.5">
            <Text className="text-lg font-bold text-beige-900 dark:text-espresso-100">
              {user.name}
            </Text>
            <Text className="text-sm text-caramel dark:text-bronze">{user.email}</Text>
          </View>
        </View>

        {/* Profile info */}
        <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze mb-2">
          Profile
        </Text>
        <View className="mb-8">
          <ProfileRow label="Age" value={user.age} /* onPress={() => router.push('/profile/edit')} */ />
          <ProfileRow label="Gender" value={user.gender}  /*onPress={() => router.push('/profile/edit')} */ />
          <ProfileRow label="Style" value={user.style} /* onPress={() => router.push('/profile/edit')}*/  />
          <ProfileRow label="Location" value={user.location} /* onPress={() => router.push('/profile/edit')}*/  />
        </View>

        {/* Stats */}
        <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze mb-2">
          Stats
        </Text>
        <View className="flex-row gap-4 mb-10">
          {[
            { label: 'Outfits', value: '4' },
            { label: 'Occasions', value: '3' },
            { label: 'This week', value: '2' },
          ].map((stat) => (
            <View
              key={stat.label}
              className="flex-1 bg-beige-100 dark:bg-espresso-800 rounded-xl py-4 items-center gap-1"
            >
              <Text className="text-xl font-bold text-gold-light dark:text-gold-dark">
                {stat.value}
              </Text>
              <Text className="text-xs text-caramel dark:text-bronze">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Sign out */}
        <TouchableOpacity
          onPress={() => router.replace('/auth/login')}
          className="border border-beige-100 dark:border-espresso-800 rounded-xl py-4 items-center"
        >
          <Text className="text-sm font-semibold text-caramel dark:text-bronze">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}