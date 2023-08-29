import React from 'react';
import { Button, View, Text, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/cartActions';
import Toast from "react-native-toast-message"
import baseUrl from "../../../BaseUrl"
import axios from 'axios';

const Confirm = (props) => {
    const confirm = props.route.params;

    const confirmOrder = () => {
        const order = confirm.order
        console.log(order)
        axios.post(`${baseUrl}/orders`, order)
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "The Order Is Successful."
                    })
                    setTimeout(() => {
                        props.clearCart()
                        props.navigation.navigate('Cart')
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "The Order Isn't Successful."
                })
            })


    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Confirm Order</Text>
                {props.route.params ? (
                    <View style={styles.orderContainer}>
                        <Text style={styles.shippingText}>Shipping to:</Text>
                        <View style={styles.addressContainer}>
                            <Text>Address: {confirm.order.adresse}</Text>
                        </View>
                        <Text style={styles.itemsTitle}>Items:</Text>
                        {confirm.order.orderItems.map((x) => (
                            <View style={styles.itemContainer} key={x.product.name}>
                                <View style={styles.thumbnailContainer}>
                                    <Image source={{ uri: 'https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w' }} style={styles.thumbnail} />
                                </View>
                                <View style={styles.itemBody}>
                                    <View style={styles.itemNameContainer}>
                                        <Text>{x.product.name}</Text>
                                    </View>
                                    <View style={styles.itemPriceContainer}>
                                        <Text>$ {x.product.price}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : null}
                <View style={{ alignItems: 'center', margin: 20 }}>
                    <Button title={'Place Order'} onPress={confirmOrder}></Button>
                </View>
            </View>
        </ScrollView>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart())
    };
};
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    orderContainer: {
        borderWidth: 1,
        borderColor: 'orange',
        padding: 8,
        alignItems: 'center',
    },
    shippingText: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: 8,
    },
    addressContainer: {
        padding: 8,
    },
    itemsTitle: {
        fontWeight: 'bold',
        marginVertical: 8,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: width / 1.2,
        marginVertical: 8,
    },
    thumbnailContainer: {
        marginRight: 10,
    },
    thumbnail: {
        width: 50,
        height: 50,
    },
    itemBody: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemNameContainer: {
        marginRight: 20,
    },
    itemPriceContainer: {},
});

export default connect(null, mapDispatchToProps)(Confirm);