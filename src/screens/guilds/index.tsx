import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Guild, GuildProps } from '../../components/guild'
import { ListDivider } from '../../components/listDivider'
import { Loading } from '../../components/loading'
import { api } from '../../services/api'

import { styles } from './styles'

type Props = {
  handleGuildSelect: (guild: GuildProps) => void
}

export function Guilds({ handleGuildSelect }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds')

    setGuilds(response.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchGuilds()
  }, [])

  return (
    <View style={styles.container}>
      {
        loading ? (
          <Loading />
        ) : (
          <FlatList
            data={guilds}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 68, paddingTop: 104 }}
            ListHeaderComponent={() => <ListDivider isCentered />}
            renderItem={({ item }) => (
              <Guild data={item}
                onPress={() => handleGuildSelect(item)}
              />
            )}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            showsVerticalScrollIndicator={false}
            style={styles.guilds}
          />
        )
      }
    </View>
  )
}
