import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"

import Cart from '../Screens/Cart/Cart'
import CheckOutNavigator from './CheckoutNavigator'

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name='Cart'
                component={Cart}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Checkout'
                component={CheckOutNavigator}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>


    )
}

export default function CartNavigator() {
    return <MyStack />
}