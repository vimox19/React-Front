import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text } from 'react-native';


const CategoryFilter = (props) => {
    return (
        <ScrollView
            bounces={false}
            horizontal={true}
            style={{ backgroundColor: 'white' }}
        >
            <View style={styles.categoryContainer}>
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.categoryFilter('all');
                        props.setActive(-1);
                    }}
                >
                    <View
                        style={[
                            styles.center,
                            styles.badge,
                            props.active === -1 ? styles.active : styles.inactive,
                        ]}
                    >
                        <Text style={{ color: 'white' }}>All</Text>
                    </View>
                </TouchableOpacity>
                {props.categories.map((item) => (
                    <TouchableOpacity
                        key={item._id}
                        onPress={() => {
                            //props.categoryFilter(item._id);
                            props.setActive(props.categories.indexOf(item));
                        }}
                    >
                        <View
                            style={[
                                styles.center,
                                styles.badge,
                                props.active === props.categories.indexOf(item)
                                    ? styles.active
                                    : styles.inactive,
                            ]}
                        >
                            <Text style={{ color: 'white' }}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>


    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        margin: 5,
        padding: 10,
        borderRadius: 5,
    },
    active: {
        backgroundColor: '#03bafc',
    },
    inactive: {
        backgroundColor: '#a0e1eb',
    },
    categoryContainer: {
        flexDirection: 'row',
        margin: 0,
        padding: 0,
        borderRadius: 0,
    },
});

export default CategoryFilter;