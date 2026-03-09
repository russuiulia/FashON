import { Button } from '@/components/ui/Button';
import { GenderPicker } from '@/components/ui/GenderPicker';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STYLE_OPTIONS = [
  { label: '👕 Casual', value: 'casual' },
  { label: '👔 Formal', value: 'formal' },
  { label: '🏃 Sporty', value: 'sporty' },
  { label: '🧥 Streetwear', value: 'streetwear' },
  { label: '✨ Elegant', value: 'elegant' },
  { label: '🌿 Minimalist', value: 'minimalist' },
  { label: '🎨 Eclectic', value: 'eclectic' },
];

export default function CreateProfile() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [style, setStyle] = useState('');
  const [location, setLocation] = useState<{ city: string; coords: string } | null>(null);
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState('');

  async function requestLocation() {
    setLocLoading(true);
    setLocError('');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocError('Permission denied. Enable location in settings.');
        return;
      }
      const coords = await Location.getCurrentPositionAsync({});
      const [place] = await Location.reverseGeocodeAsync(coords.coords);
      const city = [place.city ?? place.subregion, place.country].filter(Boolean).join(', ');
      setLocation({
        city,
        coords: `${coords.coords.latitude.toFixed(4)}, ${coords.coords.longitude.toFixed(4)}`,
      });
    } catch {
      setLocError('Could not get location. Try again.');
    } finally {
      setLocLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-beige-50 dark:bg-espresso-900">
      <View className="flex-1 px-8 justify-center gap-10">

        {/* Header */}
        <View className="items-center gap-2">
          <Text className="text-3xl font-bold tracking-[8px] text-gold-light dark:text-gold-dark">
            RUSSU
          </Text>
          <Text className="text-sm tracking-widest text-caramel dark:text-bronze">
            Set up your profile
          </Text>
        </View>

        {/* Form */}
        <View className="gap-6">

          {/* Age */}
          <Input
            label="Age"
            placeholder="25"
            keyboardType="number-pad"
            maxLength={3}
            value={age}
            onChangeText={setAge}
          />

          {/* Gender */}
          <View className="gap-2">
            <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze">
              Gender
            </Text>
            <GenderPicker value={gender} onChange={setGender} />
          </View>

          {/* Style */}
          <Select
            label="Style"
            placeholder="Pick your vibe…"
            options={STYLE_OPTIONS}
            value={style}
            onChange={setStyle}
          />

          {/* Location */}
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze">
                Location
              </Text>
              <View className="flex-row items-center gap-1 bg-beige-100 dark:bg-espresso-800 rounded-full px-2 py-0.5">
                <Text className="text-gold-light dark:text-gold-dark text-xs">ℹ</Text>
                <Text className="text-xs text-caramel dark:text-bronze">Used for weather info</Text>
              </View>
            </View>

            {location ? (
              <View className="border border-beige-100 dark:border-espresso-800 rounded-xl px-4 py-4 flex-row justify-between items-center">
                <View>
                  <Text className="text-beige-900 dark:text-espresso-200 font-medium">{location.city}</Text>
                  <Text className="text-xs text-caramel dark:text-bronze mt-0.5">{location.coords}</Text>
                </View>
                <TouchableOpacity onPress={requestLocation}>
                  <Text className="text-xs text-gold-light dark:text-gold-dark font-semibold">Change</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={requestLocation}
                className="border border-dashed border-gold-light dark:border-gold-dark rounded-xl py-4 items-center gap-1"
              >
                {locLoading ? (
                  <ActivityIndicator color="#C49A3C" />
                ) : (
                  <>
                    <Text className="text-2xl">📍</Text>
                    <Text className="text-sm font-semibold text-gold-light dark:text-gold-dark">
                      Allow location access
                    </Text>
                    <Text className="text-xs text-caramel dark:text-bronze">
                      Tap to detect your city
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            )}

            {locError ? (
              <Text className="text-xs text-red-400">{locError}</Text>
            ) : null}
          </View>
        </View>

        {/* CTA */}
        <Button
          variant="filled"
          label="Continue"
          onPress={() => router.push('/home')}
        />

      </View>
    </SafeAreaView>
  );
}