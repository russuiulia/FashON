import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'filled' | 'outlined';
}

export function Button({ label, variant = 'filled', ...props }: ButtonProps) {
  const containerClass =
    variant === 'filled'
      ? 'bg-gold-light dark:bg-gold-dark rounded-xl py-4 items-center'
      : 'border border-beige-100 dark:border-espresso-800 rounded-xl py-4 items-center';

  const textClass =
    variant === 'filled'
      ? 'text-white font-bold tracking-widest'
      : 'text-beige-900 dark:text-espresso-200 font-medium';

  return (
    <TouchableOpacity className={containerClass} {...props}>
      <Text className={textClass}>{label}</Text>
    </TouchableOpacity>
  );
}