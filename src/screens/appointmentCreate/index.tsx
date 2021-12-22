import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { COLLECTION_APPOINTMENTS } from '../../config/database'
import { styles } from './styles'
import { Header } from '../../components/header'
import { CategorySelect } from '../../components/categorySelect'
import { RectButton } from 'react-native-gesture-handler'
import { theme } from '../../global/styles/theme'
import { GuildIcon } from '../../components/guildIcon'
import { SmallInput } from '../../components/smallInput'
import { Textarea } from '../../components/textarea'
import { Button } from '../../components/button'
import { ModalView } from '../../components/ModalView'
import { Guilds } from '../guilds'
import { GuildProps } from '../../components/guild'

export function AppointtmentCreate() {
  const [category, setCategory] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [description, setDescription] = useState('')

  const { navigate } = useNavigation()

  function handleOpenGuilds() {
    setIsModalOpen(true)
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect)
    setIsModalOpen(false)
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
    const appointments = storage ? JSON.parse(storage) : []

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    )

    navigate('home')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <Header
          title='Agendar partida'
        />

        <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>Categoria</Text>

        <CategorySelect
          hasCheckBox
          setCategorySelected={setCategory}
          categorySelected={category}
        />

        <View style={styles.form}>
          <RectButton onPress={handleOpenGuilds}>
            <View style={styles.select}>
              {
                guild.icon ? 
                <GuildIcon guildId={guild.id} iconId={guild.icon}/> 
                : <View style={styles.image} />
              }

              <View style={styles.selectBody}>
                <Text style={styles.label}>
                  {guild.name || 'Selecione um servidor'}
                </Text>
              </View>

              <Feather
                name='chevron-right'
                color={theme.colors.heading}
                size={18}
              />
            </View>
          </RectButton>

          <View style={styles.field}>
            <View>
              <Text style={styles.label}>
                Dia e mês
              </Text>

              <View style={styles.column}>

                <SmallInput maxLength={2} onChangeText={setDay}/>
                <Text style={styles.divider}>
                  /
                </Text>
                <SmallInput maxLength={2} onChangeText={setMonth}/>

              </View>
            </View>

            <View>
              <Text style={styles.label}>
                Hora e minuto
              </Text>

              <View style={styles.column} >

                <SmallInput maxLength={2} onChangeText={setHour}/>
                <Text style={styles.divider}>
                  :
                </Text>
                <SmallInput maxLength={2} onChangeText={setMinute}/>

              </View>
            </View>

          </View>

          <View style={[styles.field, { marginBottom: 12 }]}>
            <Text style={styles.label}>
              Descrição
            </Text>

            <Text style={styles.textMax}>
              Max 100 caracteres
            </Text>

          </View>
          <Textarea
            multiline
            maxLength={100}
            numberOfLines={5}
            autoCorrect={false}
            onChangeText={setDescription}
          />

          <View style={styles.footer}>
            <Button title='Agendar' onPress={handleSave}/>
          </View>
        </View>

      </ScrollView>

      <ModalView visible={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <Guilds handleGuildSelect={handleGuildSelect}/>
      </ModalView>

    </KeyboardAvoidingView>
  )
}
