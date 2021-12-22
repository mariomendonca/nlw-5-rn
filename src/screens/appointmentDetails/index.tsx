import React, { useEffect, useState } from 'react'
import { Alert, FlatList, ImageBackground, Linking, Platform, Share, Text, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Fontisto } from '@expo/vector-icons'

import { styles } from './styles'
import { Background } from '../../components/background'
import { Header } from '../../components/header'
import { theme } from '../../global/styles/theme'
import { ListHeader } from '../../components/listHeader'
import { Member, MemberProps } from '../../components/member'
import { ListDivider } from '../../components/listDivider'
import { ButtonIcon } from '../../components/buttonIcon'

import BannerImg from '../../assets/banner.png'
import { useRoute } from '@react-navigation/native'
import { AppointmentProps } from '../../components/appointment'
import { api } from '../../services/api'
import { Loading } from '../../components/loading'

type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const [widget, setWidget] = React.useState<GuildWidget>({} as GuildWidget)
  const [loading, setLoading] = React.useState(true)

  const route = useRoute()
  const { guildSelected } = route.params as Params

  function handleShareInvite() {
    console.log(widget)
    
    const message = Platform.OS === 'ios' ? `Junte-se a ${guildSelected.guild.name}`
    : widget.instant_invite

    Share.share({
      message,
      url: widget.instant_invite
    })
  }

  function handleOpenGuild() {
    Linking.openURL('https://github.com/mariomendonca')
  }

  async function fetchGuildInfo() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`)
      setWidget(response.data)

    } catch (error) {
      Alert.alert('Abubleble')
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchGuildInfo()
  }, [])
  return (
    <Background>
      <Header
        title='Detalhes'
        action={
          <BorderlessButton onPress={handleShareInvite}>
            <Fontisto
              name='share'
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground
        style={styles.banner}
        source={BannerImg}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {guildSelected.guild.name}
          </Text>

          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader
            title='Jogadores'
            subtitle={`Total ${widget.members.length}`}
          />

          <FlatList
            data={widget.members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Member data={item} />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.members}
          />
        </>
      )
      }

      <View style={styles.footer}>
        <ButtonIcon
          onPress={handleOpenGuild}
          title='Entrar na partida'
        />
      </View>

    </Background >
  )
}
