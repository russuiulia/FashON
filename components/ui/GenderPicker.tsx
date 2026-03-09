import { Text, TouchableOpacity, View } from 'react-native';

export type GenderOption = { label: string; value: string };

const DEFAULT_OPTIONS: GenderOption[] = [
  { label: '♂ Male', value: 'male' },
  { label: '♀ Female', value: 'female' },
  { label: '⚬ Other', value: 'other' },
];

interface GenderPickerProps {
  value: string;
  onChange: (value: string) => void;
  options?: GenderOption[];
}

export function GenderPicker({ value, onChange, options = DEFAULT_OPTIONS }: GenderPickerProps) {
  return (
    <View className="flex-row bg-beige-100 dark:bg-espresso-800 rounded-xl p-1 gap-1">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <TouchableOpacity
            key={opt.value}
            onPress={() => onChange(opt.value)}
            className={`flex-1 py-3 rounded-lg items-center ${active
                ? 'bg-gold-light dark:bg-gold-dark'
                : 'bg-transparent'
              }`}
          >
            <Text
              className={`text-sm font-semibold ${active
                  ? 'text-white'
                  : 'text-caramel dark:text-bronze'
                }`}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}