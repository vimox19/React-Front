import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native'
import { connect } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import * as actions from '../../Redux/Actions/cartActions';
const SingleProduct = (props) => {

    const [item, setItem] = useState(props.route.params.item)
    const [availability, setAvailability] = useState(null)

    return (
        <View style={StyleSheet.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image style={styles.image}
                        source={{
                            uri: item.image ? item.image :
                                'https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w'
                        }}
                        resizeMode='contain'
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentHeader}>{item.name}</Text>
                    <Text style={styles.contentText}> Brand : {item.brand}</Text>
                    <Text> In Stock : {item.countInStock}</Text>
                    <Text> Category : {item.search}</Text>

                </View>
                {/* add more attribute*/}

            </ScrollView>
            <View style={styles.bottomContainer}>
                <View style={styles.leftPriceContainer}>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <View style={styles.rightPriceContainer}>
                    <Button title="Add"
                        onPress={() => {
                            props.addItemToCart(item),
                                Toast.show({
                                    type: 'success',
                                    topOffset: 60,
                                    text1: `${item.name} added to cart`
                                })
                        }} />
                </View>
            </View>

        </View>

    )
}

const mapToDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20,

    },
    contentText: {
        fontSize: 18,
        margin: 20,
        fontWeight: 'bold'
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: -150,
        backgroundColor: 'transparent',
    },
    leftPriceContainer: {
        alignItems: 'flex-start',
        paddingLeft: 20
    },
    rightPriceContainer: {
        alignItems: 'flex-end',
        paddingRight: 20
    },
    price: {
        fontSize: 24,
        color: 'red'
    }
})

export default connect(null, mapToDispatchToProps)(SingleProduct);