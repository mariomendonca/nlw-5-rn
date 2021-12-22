import React from 'react';
import { ScrollView, Text, Image } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { categories } from '../../utils/categories';
import { Category } from '../category';

import { styles } from './styles';

type Props = {
  categorySelected: string;
  setCategorySelected: (categoryId: string) => void;
  hasCheckBox?: boolean
}

export function CategorySelect({ categorySelected, setCategorySelected, hasCheckBox = false }: Props) {
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {categories.map(category => (
        <Category
          hasCheckBox={hasCheckBox}
          key={category.id}
          title={category.title}
          icon={category.icon}
          checked={category.id === categorySelected}
          onPress={() => setCategorySelected(category.id)}
        />
      ))}
    </ScrollView>
  )
}
