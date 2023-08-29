import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"

import Cart from '../Screens/Cart/Cart'
import Checkout from '../Screens/Cart/Checkout/Checkout'
import Payment from '../Screens/Cart/Checkout/Payment'
import Confirm from '../Screens/Cart/Checkout/Confirm'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

function MyTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Shipping' component={Checkout} />
            {/* //<Tab.Screen name='Payment' component={Payment} /> */}
            <Tab.Screen name='Confirm' component={Confirm} />
        </Tab.Navigator>


    )
}

export default function CheckOutNavigator() {
    return <MyTab />
}