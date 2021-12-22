import React from "react";
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from "../screens/home";
import { SignIn } from "../screens/signin";
import { AppointmentDetails } from "../screens/appointmentDetails";
import { AppointtmentCreate } from "../screens/appointmentCreate";


export function AuthRoutes() {
  const { Navigator, Screen } = createStackNavigator()
  
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name='home' component={Home} />
      <Screen name='appointmentDetails' component={AppointmentDetails} />
      <Screen name='appointmentCreate' component={AppointtmentCreate} />
    </Navigator>
  )
}