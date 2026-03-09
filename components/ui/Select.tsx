import { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export type SelectOption = { label: string; value: string };

interface SelectProps {
  label: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  info?: string;
}

export function Select({ label, placeholder = 'Select…', options, value, onChange, info }: SelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View className="gap-2">
      {/* Label row */}
      <View className="flex-row items-center gap-2">
        <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze">
          {label}
        </Text>
        {info && (
          <View className="flex-row items-center gap-1 bg-beige-100 dark:bg-espresso-800 rounded-full px-2 py-0.5">
            <Text className="text-gold-light dark:text-gold-dark text-xs">ℹ</Text>
            <Text className="text-xs text-caramel dark:text-bronze">{info}</Text>
          </View>
        )}
      </View>

      {/* Trigger */}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="border border-beige-100 dark:border-espresso-800 rounded-xl px-4 py-4 flex-row justify-between items-center"
      >
        <Text className={selected ? 'text-beige-900 dark:text-espresso-200' : 'text-bronze'}>
          {selected ? selected.label : placeholder}
        </Text>
        <Text className="text-caramel dark:text-bronze text-xs">▾</Text>
      </TouchableOpacity>

      {/* Modal sheet */}
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity
          className="flex-1 bg-black/40 justify-end"
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View className="bg-beige-50 dark:bg-espresso-900 rounded-t-3xl px-6 pt-4 pb-10">
            {/* Handle */}
            <View className="w-10 h-1 rounded-full bg-beige-100 dark:bg-espresso-800 self-center mb-5" />
            <Text className="text-xs font-semibold tracking-widest uppercase text-caramel dark:text-bronze mb-4">
              {label}
            </Text>
            <ScrollView showsVerticalScrollIndicator={false} className="max-h-72">
              {options.map((opt, i) => {
                const active = opt.value === value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => { onChange(opt.value); setOpen(false); }}
                    className={`py-4 flex-row justify-between items-center ${i < options.length - 1 ? 'border-b border-beige-100 dark:border-espresso-800' : ''
                      }`}
                  >
                    <Text className={`text-base ${active ? 'text-gold-light dark:text-gold-dark font-semibold' : 'text-beige-900 dark:text-espresso-200'}`}>
                      {opt.label}
                    </Text>
                    {active && <Text className="text-gold-light dark:text-gold-dark">✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}