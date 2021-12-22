import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, Alert, ActivityIndicator } from 'react-native'

import IllustrationImg from '../../assets/illustration.png'
import { Background } from "../../components/background";
import { ButtonIcon } from "../../components/buttonIcon";
import { styles } from './styles'
import { useAuth } from "../../context/auth";
import { theme } from "../../global/styles/theme";

export function SignIn() {
  const { navigate } = useNavigation()
  const { loading, SignIn } = useAuth()
  
  async function handleSignIn() {
    try {
      await SignIn()
    } catch (error) {
      Alert.alert(error as string)
    }
  }

  
  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode='stretch'
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}
            e organizesuas {'\n'}
            jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie grupo para jogas seus games {'\n'}
            favoritos com seus amigos
          </Text>

          {
            loading ? <ActivityIndicator color={theme.colors.primary}/> : (
              <ButtonIcon title='Entrar com discord' onPress={handleSignIn} />
            ) 
          }
        </View>
      </View>
    </Background>
  )
}