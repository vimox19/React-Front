import React from "react";
import { View, Dimensions, StyleSheet, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
    const getTotalPrice = () => {
        return props.cartItems.reduce((total, item) => total + item.product.price, 0);
    };

    const clearCart = () => {
        props.clearCart();
    };

    return (
        <View style={styles.container}>
            {props.cartItems.length ? (
                <FlatList
                    data={props.cartItems}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Image
                                style={styles.thumbnail}
                                source={{
                                    uri: item.product.image
                                        ? item.product.image
                                        : "https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w",
                                }}
                            />
                            <View style={styles.itemDetails}>
                                <Text>{item.product.name}</Text>
                                <Text>${item.product.price}</Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.product.name}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text>Cart is Empty</Text>
                    <Text>Add Products</Text>
                </View>
            )}

            {props.cartItems.length > 0 && (
                <View style={styles.bottomContainer}>
                    <View style={styles.totalContainer}>
                        <Text>Total:</Text>
                        <Text>${getTotalPrice()}</Text>
                    </View>
                    <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
                        <Text>Clear Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.clearButton} onPress={() => props.navigation.navigate("Checkout")}>
                        <Text>Go to checkout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        marginBottom: 10,
        padding: 10,
    },
    thumbnail: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    totalContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    clearButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);