import React, { useEffect, useContext, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Inputs'
import Error from '../../Shared/Error'
import AuthGlobal from "../../Context/store/AuthGlobal"
import { loginUser } from "../../Context/actions/Auth-actions"

const Login = (props) => {
    const context = useContext(AuthGlobal)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
            props.navigation.navigate("User Profile")
        }

    }, [context.stateUser.isAuthenticated])

    const handelSubmit = () => {
        const user = {
            email,
            password
        }
        if (email === "" || password === "") {
            setError("Please fill your information")
        } else {
            loginUser(user, context.dispatch)
        }
    }
    return (
        <FormContainer title="Login">
            <Input placeholder={"Email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            />

            <Input placeholder={"Password"}
                name={"password"}
                id={"password"}
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
                <Button title="Login" onPress={() => handelSubmit()}></Button>
            </View>

            <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
                <Text style={styles.middleText}>Dont have account</Text>
                <Button title="Register" onPress={() => props.navigation.navigate("Register")}></Button>
            </View>
        </FormContainer>
    )

}
const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        alignItems: 'center'
    },
    middleText: {
        marginBottom: 20,
        alignSelf: "center"
    }
})
export default Login