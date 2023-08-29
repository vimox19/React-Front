import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native"
import { Item, Picker } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome'
import FromContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Inputs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux"


const Checkout = (props) => {
    const [orderItems, setOrderItems] = useState();
    const [adresse, setAdresse] = useState();
    const [phone, setphone] = useState();

    useEffect(
        () => {
            setOrderItems(props.cartItems)
            return () => setOrderItems();
        }, []
    )

    const CheckOut = () => {
        let order = {
            phone,
            orderItems,
            adresse: adresse
        }
        props.navigation.navigate("Confirm", { order: order })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}>
            <FromContainer title="Shipping Address">
                <Input
                    placeholder={"Phone"}
                    name={"Phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setphone(text)}
                />

                <Input
                    placeholder={"Shipping"}
                    name={"Shipping"}
                    value={adresse}
                    keyboardType={"text"}
                    onChangeText={(text) => setAdresse(text)}
                />
                <View style={{ width: '80%', alignItems: 'center' }}>
                    <Button title='Confirm' onPress={() => CheckOut()} />
                </View>
            </FromContainer>

        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

export default connect(mapStateToProps)(Checkout)