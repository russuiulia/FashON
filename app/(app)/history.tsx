import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Placeholder data — replace with real store/API later
const HISTORY = [
  { id: '1', occasion: 'Work', date: 'Today', image: null },
  { id: '2', occasion: 'Dinner', date: 'Yesterday', image: null },
  { id: '3', occasion: 'Casual day out', date: 'Mar 7', image: null },
  { id: '4', occasion: 'Party', date: 'Mar 5', image: null },
];

function OutfitCard({ item }: { item: typeof HISTORY[0] }) {
  return (
    <View className="flex-row items-center gap-4 py-4 border-b border-beige-100 dark:border-espresso-800">
      {/* Thumbnail */}
      <View className="w-16 h-16 rounded-xl bg-beige-100 dark:bg-espresso-800 overflow-hidden items-center justify-center">
        {item.image ? (
          <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <Text className="text-2xl">👗</Text>
        )}
      </View>

      {/* Info */}
      <View className="flex-1 gap-0.5">
        <Text className="font-semibold text-beige-900 dark:text-espresso-100">{item.occasion}</Text>
        <Text className="text-xs text-caramel dark:text-bronze">{item.date}</Text>
      </View>

      <Text className="text-caramel dark:text-bronze text-xs">›</Text>
    </View>
  );
}

export default function History() {
  return (
    <SafeAreaView className="flex-1 bg-beige-50 dark:bg-espresso-900">
      <ScrollView
        contentContainerClassName="px-8 pt-8 pb-12"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="gap-1 mb-8">
          <Text className="text-2xl font-bold text-beige-900 dark:text-espresso-100">
            Your Outfits
          </Text>
          <Text className="text-sm text-caramel dark:text-bronze">
            {HISTORY.length} looks generated
          </Text>
        </View>

        {HISTORY.length === 0 ? (
          <View className="items-center gap-3 mt-20">
            <Text className="text-5xl">🪞</Text>
            <Text className="text-base font-semibold text-beige-900 dark:text-espresso-100">
              No outfits yet
            </Text>
            <Text className="text-sm text-caramel dark:text-bronze text-center">
              Generate your first look from the home tab
            </Text>
          </View>
        ) : (
          HISTORY.map((item) => <OutfitCard key={item.id} item={item} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}