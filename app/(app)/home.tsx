import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

const OCCASION_OPTIONS = [
  { label: '💼 Work', value: 'work' },
  { label: '🎉 Party', value: 'party' },
  { label: '🍽 Dinner', value: 'dinner' },
  { label: '🏃 Sport', value: 'sport' },
  { label: '🛍 Casual day out', value: 'casual' },
  { label: '✈️ Travel', value: 'travel' },
  { label: '🌿 Outdoor', value: 'outdoor' },
  { label: '✏️ Other…', value: 'other' },
];

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [occasion, setOccasion] = useState('');
  const [customOccasion, setCustomOccasion] = useState('');

  async function pickFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  }

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled) setImage(result.assets[0].uri);
  }

  const canGenerate = image && (occasion && (occasion !== 'other' || customOccasion.trim()));

  return (
    <SafeAreaView className="flex-1 bg-beige-50 dark:bg-espresso-900">
      <ScrollView
        contentContainerClassName="px-8 pt-8 pb-12 gap-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="gap-1">
          <Text className="text-4xl text-center font-bold text-gold-light dark:text-gold-dark leading-tight">
            What do you want{'\n'}to wear today?
          </Text>
          <Text className="text-sm text-center text-caramel dark:text-bronze">
            Upload a photo of your clothes or take one
          </Text>
        </View>

        {/* Image input */}
        {image ? (
          <View className="gap-3">
            <View className="rounded-2xl overflow-hidden aspect-square w-full">
              <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
            </View>
            <TouchableOpacity onPress={() => setImage(null)} className="self-center">
              <Text className="text-sm text-caramel dark:text-bronze underline">Remove photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="gap-3">
            {/* Camera */}
            <TouchableOpacity
              onPress={takePhoto}
              className="border-2 border-dashed border-gold-light dark:border-gold-dark rounded-2xl py-10 items-center gap-2"
            >
              <Text className="text-4xl">📸</Text>
              <Text className="font-semibold text-gold-light dark:text-gold-dark">Take a photo</Text>
              <Text className="text-xs text-caramel dark:text-bronze">Use your camera</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center gap-3">
              <View className="flex-1 h-px bg-beige-100 dark:bg-espresso-800" />
              <Text className="text-caramel dark:text-bronze text-sm">or</Text>
              <View className="flex-1 h-px bg-beige-100 dark:bg-espresso-800" />
            </View>

            {/* Gallery */}
            <TouchableOpacity
              onPress={pickFromGallery}
              className="border border-beige-100 dark:border-espresso-800 rounded-2xl py-6 items-center gap-2"
            >
              <Text className="text-4xl">🖼</Text>
              <Text className="font-semibold text-beige-900 dark:text-espresso-200">
                Upload from gallery
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Occasion */}
        <View className="gap-4">
          <Select
            label="Occasion"
            placeholder="What's the plan?"
            options={OCCASION_OPTIONS}
            value={occasion}
            onChange={(v) => { setOccasion(v); setCustomOccasion(''); }}
          />

          {occasion === 'other' && (
            <View className="gap-2">
              <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze">
                Describe it
              </Text>
              <TextInput
                placeholder="e.g. beach wedding, first date…"
                value={customOccasion}
                onChangeText={setCustomOccasion}
                className="border border-beige-100 dark:border-espresso-800 rounded-xl px-4 py-4 text-beige-900 dark:text-espresso-200 placeholder:text-bronze"
              />
            </View>
          )}
        </View>

        {/* Generate */}
        <Button
          variant={canGenerate ? 'filled' : 'outlined'}
          label="✦  Generate Outfit"
          disabled={!canGenerate}
          onPress={() => { /* call AI */ }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}