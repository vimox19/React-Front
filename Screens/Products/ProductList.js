import React from 'react';
import { TouchableOpacity, View, Dimensions, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

var { width } = Dimensions.get("window");

const ProductList = (props) => {
    const { item } = props;
    return (
        <TouchableOpacity style={{ width: '50%' }}
            onPress={() =>
                props.navigation.navigate("Product Detail", { item: item })
            }>
            <View>
                <ProductCard {...item} />
            </View>
        </TouchableOpacity>
    )
}



export default ProductList

