import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../Screens/User/Login'
import UserProfile from '../Screens/User/UserProfile'
import Register from '../Screens/User/Register'


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                option={{
                    headerShown: false
                }} />

            <Stack.Screen
                name="Register"
                component={Register}
                option={{
                    headerShown: false
                }} />

            <Stack.Screen
                name="User Profile"
                component={UserProfile}
                option={{
                    headerShown: false,
                    headerBackTitle: '',
                    headerLeft: null
                }} />


        </Stack.Navigator>
    )

}

export default function UserNavigator() {
    return <MyStack />
}
