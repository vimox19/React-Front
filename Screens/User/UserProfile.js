import React, { useContext, useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, Button, StyleSheet, Container } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import baseUrl from '../../BaseUrl';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth-actions';



const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState();

    useEffect(() => {
        if (context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }

        AsyncStorage.getItem("jwt")
            .then((res) => {
                console.log("User Sub:", context.stateUser.user.userId);
                //console.log("AsyncStorage Response:", res); 
                axios.get(`${baseUrl}/users/${context.stateUser.user.userId}`, {
                    headers: { Authorization: `Bearer ${res}` },
                }).then((user) => {
                    console.log(user.data);
                    setUserProfile(user.data);
                }).catch((error) => console.log(error));
            }).catch((error) => console.log(error));

        return () => {
            setUserProfile();
        }


    }, [context.stateUser.isAuthenticated])

    return (

        <ScrollView contentContainerStyle={styles.container}>
            <Text style={{ fontSize: 30 }}>
                {userProfile ? userProfile.name : ""}
            </Text>
            <View style={{ marginTop: 20 }}>
                <Text style={{ margin: 10 }}>
                    email:{userProfile ? userProfile.email : ""}
                </Text>

                <Text style={{ margin: 10 }}>
                    phone:{userProfile ? userProfile.phone : ""}
                </Text>
            </View>
            <View style={{ marginTop: 80 }}>
                <Button title={"sign out"} onPress={() => [
                    AsyncStorage.removeItem("jwt"),
                    logoutUser(context.dispatch)
                ]}></Button>

            </View>
        </ScrollView>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }
})
export default UserProfile