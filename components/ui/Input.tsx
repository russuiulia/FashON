import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <View className="gap-2">
      <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze">
        {label}
      </Text>
      <TextInput
        className="border border-beige-100 dark:border-espresso-800 rounded-xl px-4 py-4 text-beige-900 dark:text-espresso-200 placeholder:text-bronze"
        {...props}
      />
    </View>
  );
}