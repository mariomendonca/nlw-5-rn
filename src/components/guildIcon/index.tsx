import React from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles';
import DiscordSVG from '../../assets/discord.svg'
type Props = {
  guildId: string;
  iconId: string | null;
}

export function GuildIcon({ guildId, iconId }: Props) {
  // const uri = 'https://github.com/mariomendonca.png'
  const uri = `${process.env.CDN_IMAGE}/icons/${guildId}/${iconId}.png`

  return (
    <View style={styles.container}>
      {
        iconId ? (
          <Image source={{ uri }}
            style={styles.image}
          />
        ) : (
          <DiscordSVG height={40} width={40} />
        )

      }
    </View>
  )
}
