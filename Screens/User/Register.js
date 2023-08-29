import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Inputs'
import Error from '../../Shared/Error'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import baseUrl from '../../BaseUrl'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const Register = (props) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')

    const register = () => {
        if (
            email === '' ||
            name === '' ||
            phone === '' ||
            password === '') {
            setError("Please fill all the fiels")
        }
        let user = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            isAdmin: false
        }
        axios.post(`${baseUrl}/users/register`, user)
            .then((res) => {
                if (res.status == 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: " You can Login now",
                    })
                    setTimeout(() => {
                        props.navigation.navigate("Login")
                    }, 500)
                }
            })
            .catch((errpr) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "something wrong",
                })
            })

    }


    return (
        <KeyboardAwareScrollView viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}>
            <FormContainer title={'Register'}>
                <Input
                    placeholder={"Email"}
                    name={"email"}
                    id={"emai"}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />

                <Input
                    placeholder={"Name"}
                    name={"name"}
                    id={"name"}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    id={"phone"}
                    keybordType={'numeric'}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"Password"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />

                <View>
                    {error ? <Error message={error} /> : null}
                </View>
                <View>
                    <Button title={"Register"} onPress={() => register()}></Button>
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Button title={"back to login"} onPress={() => props.navigation.navigate('Login')}></Button>
                </View>


            </FormContainer>


        </KeyboardAwareScrollView>
    )

}

export default Register