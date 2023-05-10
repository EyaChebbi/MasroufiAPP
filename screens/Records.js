import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image } from 'react-native';
import axios from 'axios';
import UserContext from '../server/UserContext'
import api from '../api';

export default function Records() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const { user } = useContext(UserContext);
  const userId = user?.userId;

  useEffect(() => {

    if (!userId) {
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await api.get(`/transactions?userId=${userId}`);
  
        const transactions = response.data;
        const expenses = [];
  
        transactions.forEach(transaction => {
          const month = new Date(transaction.transactionDate).toLocaleString('default', { month: 'long', day: 'numeric' });
  
          if (transaction.transactionType === 'Spending') {
            expenses.push({
              month: month,
              amount: `${transaction.amount} TND`,
              categoryName: transaction.categoryName
            });
          } else {
            incomes.push({
              month: month,
              amount: `${transaction.amount} TND`,
              categoryName: transaction.categoryName
            });
          }
        });
  
        setExpenses(expenses);
        setIncomes(incomes);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
  
    fetchTransactions();
  }, [userId]);
  


  const renderExpense = ({ item }) => (
    <View key={item.transactionID} style={styles.expenseContainer}>
      <View style={styles.expenseMonth}>
        <Text style={styles.expenseMonthText}>{item.month}</Text>
      </View>
      <View style={styles.expenseAmountDescr}>
        <Text style={styles.expenscategoryName}>{item.categoryName}</Text>
        <Text style={styles.expenseAmountText}>{item.amount}</Text>
      </View>
      
    </View>
  );

  return (
    <>
      <ScrollView style={styles.containerTop}>
      <View style={styles.container}>
        <Text style={styles.title}>Expenses</Text>
        {
          expenses.length === 0 ? 
            <>
              <View style={styles.innerContainer}>
                <Image source={require('../assets/images/decline.png')} style={styles.image}/>
                <Text style = {styles.noData}>No expenses have been recorded</Text>
              </View>
            </>
          :
            <FlatList
            data={expenses}
            renderItem={renderExpense}
            keyExtractor={item => item.id}
            />
        }
        </View>

      <View style={styles.container}>
        <Text style={styles.title}>Incomes</Text>

        {
          incomes.length === 0 ? 
            <>
              <View style={styles.innerContainer}>
                <Image source={require('../assets/images/decline.png')} style={styles.image}/>
                <Text style = {styles.noData}>No Incomes have been recorded</Text>
              </View>
            </>
          :
            <FlatList
            data={incomes}
            renderItem={renderExpense}
            keyExtractor={item => item.id}
            />
        }
      </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    flex: 1, 
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color:'#4FA095' ,
  },
  expenseContainer: {
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    marginTop: 5,
    padding: 10,
    marginRight: 15,
    marginLeft:15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  expenseMonthText:{
    //textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 20,
  },
  expenseAmountText: {
    //flex: 1,
    //textAlign: 'center',
    //fontWeight: 'bold',
    fontSize: 16,
    borderColor: '#4FA095', 
    borderWidth: 2,
    width: 100,
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderRadius: 10,
    //backgroundColor: '#eeeeee'
  },
  expenseAmountDescr: {
    //textAlign: 'center',
    //alignContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //width: 100,
  },
  expenscategoryName: {
    //fontWeight: 'bold',
    fontSize: 16,
  },
  image:{ 
    width: 130, 
    height: 130,
    alignSelf: 'center', 

  },
  noData: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 25,
  },
  scrollViewContainer:{
    flex: 1,
    alignItems: 'center', 
  }
});
