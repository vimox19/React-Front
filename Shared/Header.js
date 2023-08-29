import React from 'react';
import { SafeAreaView, View, Image, StyleSheet } from 'react-native';


const Header = () => {

    return (
        <SafeAreaView style={styles.header}>
            <Image
                resizeMode='contain'
                style={{ height: 50 }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    }
})

export default Header
