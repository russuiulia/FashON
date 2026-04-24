import { useOutfits } from '@/hooks/useOutfits';
import { formatDistanceToNow } from 'date-fns';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function OutfitCard({ item }: { item: ReturnType<typeof useOutfits>['outfits'][0] }) {
  const date = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true });

  return (
    <View className="flex-row items-center gap-4 py-4 border-b border-beige-100 dark:border-espresso-800">
      <View className="w-16 h-16 rounded-xl bg-beige-100 dark:bg-espresso-800 overflow-hidden items-center justify-center">
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <Text className="text-2xl">👗</Text>
        )}
      </View>
      <View className="flex-1 gap-0.5">
        <Text className="font-semibold text-beige-900 dark:text-espresso-100">{item.occasion}</Text>
        <Text className="text-xs text-caramel dark:text-bronze">{date}</Text>
        {item.description && (
          <Text className="text-xs text-caramel dark:text-bronze" numberOfLines={1}>
            {item.description}
          </Text>
        )}
      </View>
      <Text className="text-caramel dark:text-bronze text-xs">›</Text>
    </View>
  );
}

export default function History() {
  const { outfits, loading } = useOutfits();

  return (
    <SafeAreaView className="flex-1 bg-beige-50 dark:bg-espresso-900">
      <ScrollView contentContainerClassName="px-8 pt-8 pb-12" showsVerticalScrollIndicator={false}>
        <View className="gap-1 mb-8">
          <Text className="text-2xl font-bold text-beige-900 dark:text-espresso-100">
            Your Outfits
          </Text>
          <Text className="text-sm text-caramel dark:text-bronze">
            {outfits.length} looks generated
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator className="mt-20" color="#C49A3C" />
        ) : outfits.length === 0 ? (
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
          outfits.map((item) => <OutfitCard key={item.id} item={item} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}