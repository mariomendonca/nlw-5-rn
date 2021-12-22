import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Appointment, AppointmentProps } from '../../components/appointment';
import { Background } from '../../components/background';
import { ButtonAdd } from '../../components/buttonAdd';
import { CategorySelect } from '../../components/categorySelect';
import { ListDivider } from '../../components/listDivider';
import { ListHeader } from '../../components/listHeader';
import { Loading } from '../../components/loading';
import { Profile } from '../../components/profile';
import { COLLECTION_APPOINTMENTS } from '../../config/database';

import { styles } from './styles';

export function Home() {
  const [category, setCategory] = useState('')
  const [appointments, setAppointments] = useState<AppointmentProps[]>([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()

  function navigateToAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('appointmentDetails', { guildSelected })
  }

  function navigateToAppointmentCreate() {
    navigation.navigate('appointmentCreate')
  }

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  }

  async function loadAppointments() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
    const storageResponse: AppointmentProps[] = storage ? JSON.parse(storage) : []

    if (category) {
      setAppointments(storageResponse.filter(item => item.category === category))
    } else {
      setAppointments(storageResponse)
    }

    setLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadAppointments()
  }, [category]))

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={navigateToAppointmentCreate} />
      </View>

      <CategorySelect
        hasCheckBox={true}
        categorySelected={category}
        setCategorySelected={handleCategorySelect}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader
            title='Partidas agendadas'
            subtitle={`Total ${appointments.length}`}
          />

          <FlatList
            ItemSeparatorComponent={ListDivider}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
            data={appointments}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 69 }}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => navigateToAppointmentDetails(item)}
              />
            )}
          />
        </>)}
    </Background>
  )
}
