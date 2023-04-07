import React, {useState} from 'react';  
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';


export default function TransactionHeader() {

    const [type, setType] = useState('Expense');
    const [amount, setAmount] = useState('000');
    
    const handlePress = (type) => {
        setType(type);
    };
    
    const handleAmountChange = (value) => {
        setAmount(value);
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Add Transaction
            </Text>
            <View style={styles.transaction}>
                <Pressable onPress={() => setType('Expense')} style={[styles.boxExpense, {backgroundColor: type === 'Expense' ? '#fff' : '#41837A',}]}>
                    <Text style={[styles.text, {color: type === 'Expense' ? '#000000' : '#ffffff'}]}>
                        Expense
                    </Text>
                </Pressable>
                <Pressable onPress={() => setType('Income')} style={[styles.boxIncome, {backgroundColor: type === 'Income' ? '#fff' : '#41837A',
                color: type ==='Expense' ? '#000' : '#fff',}]}>
                    <Text style={[styles.text, {color: type === 'Income' ? '#000000' : '#ffffff'}]}>
                        Income
                    </Text>
                </Pressable>
            </View>
            <View style={{flexDirection: 'row', }}>
                <Text style={styles.tnd}>
                    TND
                </Text>
                <TextInput
                    value={amount}
                    onChangeText={(value) => setAmount(value)}
                    placeholder="Amount"
                    keyboardType="numeric"
                    keyboardDismissMode = "on-drag"
                    style={styles.amount}
                />   
                
            </View>     
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:0.35,
        backgroundColor: '#4FA095',
        justifyContent: 'center',
    },
    title:{
        fontSize: 28,   
        color: 'white',
        justifyContent: 'center',
        marginLeft: 50,
        fontWeight: '700',
    },
    boxExpense:{
        marginTop: 30, 
        marginLeft:50,
        width: 120,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 8,
    },
    boxIncome:{
        marginTop: 30, 
        marginRight:50,
        width: 120,
        borderRadius: 10,
        padding: 8,
        textAlign: 'center',
        justifyContent: 'center',
    },
    tnd:{
        marginTop: 17,
        marginLeft: 50,
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        borderRadius: 10,
        padding: 8,
        width: 80,
        height: 40,
        color: '#000',
        backgroundColor: '#fff',
        
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
        marginLeft: 120,
    }
})