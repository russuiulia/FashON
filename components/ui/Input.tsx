import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  error?: boolean;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <View className="gap-2">
      <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze">
        {label}
      </Text>
      <TextInput
        className={`border rounded-xl px-4 py-4 text-beige-900 dark:text-espresso-200 placeholder:text-bronze ${
          error
            ? 'border-red-500'
            : 'border-beige-100 dark:border-espresso-800'
        }`}
        {...props}
      />
    </View>
  );
}