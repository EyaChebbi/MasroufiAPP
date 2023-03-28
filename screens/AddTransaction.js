import React, { Component, useState, useEffect} from 'react'
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import TransactionHeader from '../components/TransactionHeader'
import { Ionicons } from '@expo/vector-icons';
import CalendarComponent from '../components/CalendarComponent';
import { useNavigation } from "@react-navigation/native";
export default function AddTrasaction({navigation}) {
    
    const toggleExpanded = () => {
        navigation.navigate('Categories');
    };
    const savePress = () =>{
        console.log('saved');
        // to be continued
    }
    const [source, setSource] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [payee, setPayee] = useState('');

    return(          
            <View  style={styles.container} keyboardDismissMode='on-drag'>
                <TransactionHeader/>
                
                <Text style={{ flex:0.065, paddingTop: 15, marginLeft: 50, fontWeight: '600', fontSize: 20,}}>
                    Transaction Details
                </Text>
                
                <View style={styles.containerRow} >
                    
                    <View style={styles.type}>
                        <Ionicons name="apps" size={25} style={styles.icon}/>
                        <Text style={styles.typeText}> 
                            Category
                        </Text>
                    </View>
                    <Pressable onPress={toggleExpanded}>
                        <Text style={styles.options}>
                            Transportation
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.containerRow} >
                    <View style={styles.type}>
                        <Ionicons name="calendar-outline" size={25} style={styles.icon}/>
                        <Text style={styles.typeText}> 
                            Date
                        </Text>
                    </View>
                    <CalendarComponent/>
                </View>

                <View style={styles.containerRow} >
                    <View style={styles.type}>
                        <Ionicons name="time-outline" size={25} style={styles.icon}/>
                        <Text style={styles.typeText}> 
                            Time
                        </Text>
                    </View>
                    <TextInput
                    value={time}
                    onChangeText={(value) => setTime(value)}
                    placeholder="Insert XX:XX"
                    placeholderTextColor='black'
                    // clearButtonMode='while-editing'
                    style={styles.options}
                    />  
                </View>

                <View style={styles.containerRow} >
                    <View style={styles.type}>
                        <Ionicons name="arrow-undo" size={25} style={styles.icon}/>
                        <Text style={styles.typeText}> 
                            Source
                        </Text>
                    </View>
                    <TextInput
                    value={source}
                    onChangeText={(value) => setSource(value)}
                    placeholder="Insert Source"
                    placeholderTextColor='black'
                    // clearButtonMode='while-editing'
                    style={styles.options}
                    />   
                </View>

                <View style={styles.containerRow} >
                    <View style={styles.type}>
                        <Ionicons name="location" size={25} style={styles.icon}/>
                        <Text style={styles.typeText}> 
                            Location
                        </Text>
                    </View>
                    <TextInput
                    value={location}
                    onChangeText={(value) => setLocation(value)}
                    placeholder="Insert Location"
                    keyboardType="default"
                    placeholderTextColor='black'
                    style={styles.options}
                    />   
                </View>

                <View style={styles.containerRow} >
                    <View style={styles.type}>
                        <Ionicons name="person" size={25} style={styles.icon}/>
                        <Text style={styles.typeText}> 
                            Payee
                        </Text>
                    </View>
                    <TextInput
                    value={payee}
                    onChangeText={(value) => setPayee(value)}
                    placeholder="Insert Payee"
                    keyboardType="default"
                    placeholderTextColor='black'
                    style={styles.options}
                    />   
                </View>
                <View style={{flex: 0.04}}>
                </View>
                <Pressable onPress={savePress} style={styles.savePressable}>
                    <Text style={styles.saveButton}>
                        Save
                    </Text>
                </Pressable>
            </View>  
    )   
}


const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    containerRow:{
        flex:0.08,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 50,
        justifyContent: 'space-between',
    },
    type:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    typeText: {
        fontWeight: '600',
        marginLeft: 10,
    },
    options:{
        marginRight: 60,
        fontWeight: '600',
        textAlign: 'right',
    },
    icon: {
    },
    savePressable:{
        flex: 0.01,
        justifyContent: 'center',
        alignItems: 'center',         
    },
    saveButton:{
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#4FA095',
        width: 110,
        textAlign: 'center',
        padding: 3,
        height: 35, 
        borderRadius: 7,
        fontSize: 17,
    }
})