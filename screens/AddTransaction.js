import React, { useState} from 'react'
import { StyleSheet, Text, View} from 'react-native'
import TransactionDetail from '../screens/TransactionDetail'
import TransactionHeader from '../screens/TransactionHeader'

    const AddTransaction = () => {
        const [date, setDate] = useState('');
        const [description, setDescription] = useState('');
        const [amount, setAmount] = useState('');
        const [category, setCategory] = useState('');
      
        const handleAddTransaction = () => {
          // Send HTTP request to add transaction
          fetch('http://your_server_url/transactions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              date,
              description,
              amount,
              category
            })
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Error adding transaction.');
              }
              return response.json();
            })
            .then(data => {
              console.log(data);
              // Reset form fields after successful submission
              setDate('');
              setDescription('');
              setAmount('');
              setCategory('');
            })
            .catch(error => {
              console.error(error);
            });
        };
      
        return(
            <View style={{flex:1,}}>
                <TransactionHeader/>
                <Text style={{ flex:0.1, paddingTop: 15, marginLeft: 50, fontWeight: '600', fontSize: 20,}}>
                    Transaction Details
                </Text>
                <TransactionDetail type="Category" options="Transportation"/>
                <TransactionDetail type="Date" options="23/02/2023"/>

            </View>
            
        )
    
    }
    export default AddTransaction;