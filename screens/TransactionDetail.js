import React, {useState} from 'react';  
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function TransactionDetail(props) {

    return (
        <View style={styles.container}>
            <Ionicons name="apps" size={25} style={styles.icon}/>
            <Text style={styles.type}>
                {props.type}
            </Text>
            <Text style={styles.options}>
                {props.options}
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({

    container:{
        flex:0.1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    type: {
        fontWeight: '600',
    },
    options:{
        marginLeft: 50,
        fontWeight: '600',
    },
    icon: {
        marginLeft:50,
    }

})