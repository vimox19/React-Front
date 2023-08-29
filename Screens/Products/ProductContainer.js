import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView } from "react-native";
import ProductList from "./ProductList";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoriesFilter";
import baseUrl from "../../BaseUrl";
import axios from "axios";

//const data = require('../../assets/products.json');
//const productsCategories = require('../../assets/categories.json');
var { width, height } = Dimensions.get('window');

const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);

    useEffect(() => {
        setActive(-1);

        axios.get(`${baseUrl}/products`)
            .then((res) => {
                console.log(res)
                setProducts(res.data);
                setFilteredProducts(res.data);
                setInitialState(res.data);
            })

        axios.get(`${baseUrl}/categories`)
            .then((res) => {
                console.log(res)
                setCategories(res.data);
            })
        return () => {
            setProducts([]);
            setFilteredProducts([]);
            setCategories([]);
            setActive();
            setInitialState();
        };
    }, []);

    const searchProduct = (text) => {
        setSearchText(text);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const changeCtg = (ctg) => {
        {
            ctg === 'all'
                ? [setProductsCtg(initialState), setActive(true)] :
                [];
        }
    }

    return (
        <ScrollView>
            <TextInput
                style={styles.input}
                placeholder="Search"
                onChangeText={(text) => searchProduct(text)}
                value={searchText}
            />
            <Banner />
            <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                //productsCtg={productsCtg}
                active={active}
                setActive={setActive}
            />

            <View style={styles.listContainer}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <ProductList navigation={props.navigation} key={item.id} item={item} />
                    ))
                ) : (
                    <View style={styles.noProductContainer}>
                        <Text>No Products Found</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    listContainer: {
        width: '100%',
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    noProductContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 200,
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 8,
        backgroundColor: 'white',
        marginBottom: 10,
    },
});

export default ProductContainer;