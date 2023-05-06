import React, { Component, useState, useEffect, useContext} from 'react'
import { Platform, KeyboardAvoidingView, Alert, StyleSheet, Text, View, Pressable, TextInput, Keyboard} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Categories from './Categories';
import Modal from 'react-native-modal';
import { theme } from '../constants';
import UserContext from '../server/UserContext';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from "@react-navigation/native";
import api from '../api';
import { ScrollView } from 'react-native-gesture-handler';
// import CalendarModal from '../components/CalendarModal';
import CategoryContext from '../server/CategoryContext';
export default function AddTransaction(route) {


    const setEarning = () =>{
        setType('Earning');
        setLocation('');
        setPayee('');
    }
    const setSpending = () =>{
        setType('Spending');
        setSource('');
    }

    function CalendarModal(props) {
        const { isVisible, onDayPress, selectedDate } = props;
        return (
          <Modal isVisible={isVisible}>
            <View style={styles.containerModal}>
              <Calendar onDayPress={onDayPress} markedDates={{ [selectedDate]: { selected: true } }} />
            </View>
          </Modal>
        );
    }
      
    const { user } = useContext(UserContext);
    const userId = user?.userId;
    console.log("userId Home " + userId)

    
    function CalendarComponent(props) {
        const [selectedDate, setSelectedDate] = useState('');
        const [showCalendar, setShowCalendar] = useState(false);
    

        const handleDayPress = (day) => {
          setSelectedDate(day.dateString);
          console.log(day);
          console.log(selectedDate);
        //   setShowCalendar(false);
        props.selectedDate(day.dateString); 
        setShowCalendar(false);
        };
        
        
        const toggleCalendar = () => {
          setShowCalendar(!showCalendar);
        };
      
        return (
          <View>
            <Pressable onPress={toggleCalendar}>
              <Text style={styles.optionsCalendar}>
                {selectedDate ? selectedDate : 'Select Date'}
              </Text>
            </Pressable>
            <CalendarModal
              isVisible={showCalendar}
              onDayPress={handleDayPress}
              selectedDate={selectedDate}
            />
          </View>
        );
    }
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('Hey there');
    const [errors, setErrors] = useState([]);
    const [source, setSource] = useState('');
    const [amount, setAmount] = useState('000');
    const [location, setLocation] = useState('');
    const [isFocusedTime, setIsFocusedTime] = useState(false);
    const [time, setTime] = useState('');
    const { categories } = useContext(CategoryContext);
    // const [category, setCategory] = useState('');
    const [payee, setPayee] = useState('');
    // const [payer, setPayer] = useState('');
    const [type, setType] = useState('Spending');
    
    const handleFocus = () => {
        setIsFocusedTime(true);
      };
    
      const handleBlur = () => {
        setIsFocusedTime(false);
      };

    const handleAddExpense = async () => {
        console.log(amount);
        console.log(type);
        console.log(selectedDate);
        console.log(userId);
        try {
        const url = '/transactions';
        const response = await api.post(url, { userId, amount, category, selectedDate, source, payee, location,  time, type }); 
        console.log(response.data.token);
        Alert.alert(
            'Success!',
            'Your transaction has been added',
            [
            {
                text: 'Ok', onPress: () => {
                navigation.navigate('Home')
                }
            }
            ],
            { cancelable: false }
        );

        } catch (error) {
        if (error.response && error.response.data) {
            setErrors(error.response.data.errors);
            console.log(error.response.data);
        } else {
            console.log(error);
        }
        } finally {
        setLoading(false);
        }
    };
    // const hasErrors = key => errors && errors.includes && errors.includes(key) ? styles.hasErrors : null;

    const categoryID = categories?.categoryID;
    const categoryName = categories?.categoryName;
    const navigation = useNavigation();
    const toggleExpanded = () => {
        console.log("Category ID " + categoryID)
        navigation.navigate('Categories');  
        // setCategory(categories?.category);      
    };
   


    return(          
            <View  style={styles.container} onPress={Keyboard.dismiss}>
                <View style={styles.containerHeader}>
                    <View style={{marginLeft: 50,}}>
                        <Text style={styles.title}>
                            Add Transaction
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',   }}>
                            <View style={{flexDirection: 'column', alignItems: 'flex-start', }}>
                                <Pressable onPress={() => setSpending()} style={[styles.boxExpense, {backgroundColor: type === 'Spending' ? '#fff' : '#41837A',}]}>
                                    <Text style={[styles.text, {color: type === 'Spending' ? '#000000' : '#ffffff'}]}>
                                        Spending
                                    </Text>
                                </Pressable>
                                <Text style={styles.tnd}>
                                    TND
                                </Text>
                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginRight: 40,}}>
                                <Pressable onPress={() => setEarning()} style={[styles.boxIncome, {backgroundColor: type === 'Earning' ? '#fff' : '#41837A',
                                color: type ==='Spending' ? '#000' : '#fff',}]}>
                                    <Text style={[styles.text, {color: type === 'Earning' ? '#000000' : '#ffffff'}]}>
                                        Earning
                                    </Text>
                                </Pressable>
                                <TextInput
                                    value={amount}
                                    onChangeText={(value) => setAmount(value)}
                                    placeholder="Amount"
                                    keyboardType="numeric"
                                    // keyboardDismissMode = "on-drag"
                                    style={styles.amount}
                                    onFocus={() => {
                                        if (amount === '000') {
                                        setAmount(''); // Update TextInput value to empty string when focused
                                        }
                                    }
                                    }
                                />
                            </View>
                        </View>    
                        {/* </View> */} 
                    </View>     
                </View>
                <Text style={{ flex:0.065, paddingTop: 20, marginLeft: 50, fontWeight: '600', fontSize: 20,}}>
                    Transaction Details
                </Text>
                
                <View style={styles.containerRow} >
                    
                    <View style={styles.type}>
                        <Ionicons name="apps" size={25} style={styles.icon}/>
                        <Text style={styles.typeText}> 
                            Category
                        </Text>
                    </View>
                    <Pressable onPress={toggleExpanded} >
                        <Text style={styles.options}>
                            {categoryID === undefined 
                            ? "None"
                            : categoryName}
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
                    <CalendarComponent selectedDate={selectedDate => setSelectedDate(selectedDate)}/>
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
                    placeholder="Insert 00:00"
                    keyboardType="numeric"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholderTextColor={isFocusedTime ? '#cccccc' : 'black'}
                    style={styles.options}
                    />  
                </View>
                {
                    type === 'Spending' ? 

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

                    :

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
                        style={styles.options}
                        />   
                    </View>

                }
                
                {
                    type === 'Spending' ? 

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

                    :

                    null
                }

                
                <View style={{flex: 0.04}}>
                </View>
                <View style={styles.saveBox}>
                    <Pressable onPress={() => handleAddExpense()} >
                        <Text style={styles.saveButton}>
                            Save
                        </Text>
                    </Pressable>
                </View>
                {/* </ScrollView> */}
            {/* // </KeyboardAvoidingView> */}
            </View>                  
    )   
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        // justifyContent: 'center',

    },
    containerRow:{
        flex:0.09,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 50,
        justifyContent: 'space-between',
        // marginRight: 60,
        // paddingRight: 5,
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
        flex: 1,
        marginTop:20,
    },
    icon: {
    },
    saveBox:{
        backgroundColor: 'black',
        flex: 0.06,
        width: 120, 
        height: 35,
        backgroundColor: '#4FA095',
        borderRadius: 10,
        justifyContent: 'center',
        // alignItems: 'center',
        // alignContent: 'center',
        alignSelf: 'center',
    },
    saveButton:{
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '600',
        fontSize: 17, 
    },
    containerHeader:{
        flex:0.34,
        backgroundColor: '#4FA095',
        justifyContent: 'center',
        
        // alignItems: 'center'
    },
    title:{
        fontSize: 28,   
        color: 'white',
        justifyContent: 'center',
        // marginLeft: 50,
        fontWeight: '700',
    },
    scrollContainer: {
        flexGrow: 1,
        // justifyContent: 'center',
        // paddingHorizontal: theme.sizes.base * 2,
    },
    boxExpense:{
        marginTop: 30, 
        // marginLeft:50,
        width: 140,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 8,
    },
    boxIncome:{
        marginTop: 30, 
        // marginRight:50,
        width: 140,
        borderRadius: 10,
        padding: 8,
        // textAlign: 'center',
        // justifyContent: 'center',
    },
    tnd:{
        marginTop: 17,
        // marginLeft: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        // justifyContent: 'center',
        fontWeight: '600',
        borderRadius: 10,
        // padding: 8,
        width: 80,
        height: 40,
        color: '#000',
        backgroundColor: '#fff',
        overflow: 'hidden',

    },
    text: {
        textAlign: 'center',
        fontWeight: '600',
        

    }, 
    transaction:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    amount:{
        color: '#fff',
        fontWeight: '600',
        fontSize: 30,
        marginTop: 17, 
        // marginLeft: 120,
        textAlign: 'center',
    },
    optionsCalendar: {
        marginRight: 60,
        fontWeight: '600',
      },
      containerModal: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
      },
})