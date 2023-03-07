import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';


export default function Expenses() {
    const expenses = [

        // { id: '1', month: 'January', amount: '50 DT', description: 'Textbooks' },
        // { id: '2', month: 'January', amount: '25 DT', description: 'Rent' },
        // { id: '3', month: 'January', amount: '15 DT', description: 'Internet bill' },
        // { id: '4', month: 'February', amount: '20 DT', description: 'Lunch' },
        // { id: '5', month: 'February', amount: '30 DT', description: 'Supplies' },
        // { id: '6', month: 'February', amount: '75 DT', description: 'Gas bill' },
        // { id: '7', month: 'March', amount: '40 DT', description: 'Transportation' },
        // { id: '8', month: 'March', amount: '50 DT', description: 'Electricity bill' },
        // { id: '9', month: 'March', amount: '100 DT', description: 'Groceries' },
        // { id: '10', month: 'April', amount: '30 DT', description: 'Gym membership' },
        // { id: '11', month: 'April', amount: '20 DT', description: 'Movie tickets' },
        // { id: '12', month: 'April', amount: '80 DT', description: 'Phone bill' },
        // { id: '13', month: 'May', amount: '60 DT', description: 'Clothes' },
        // { id: '14', month: 'May', amount: '35 DT', description: 'Dinner' },
        // { id: '15', month: 'May', amount: '25 DT', description: 'Parking fee' },
        // { id: '16', month: 'June', amount: '45 DT', description: 'Haircut' },
        // { id: '17', month: 'June', amount: '90 DT', description: 'Car payment' },
        // { id: '18', month: 'June', amount: '15 DT', description: 'Netflix subscription' },
        // { id: '19', month: 'July', amount: '50 DT', description: 'Concert tickets' },
        // { id: '20', month: 'July', amount: '100 DT', description: 'Dentist appointment' },
      



          { id: '1', month: 'January', amount: '50 DT', description: 'Textbooks', date: '2023-01-01' },
          { id: '2', month: 'January', amount: '25 DT', description: 'Rent', date: '2023-01-05' },
          { id: '3', month: 'January', amount: '15 DT', description: 'Internet bill', date: '2023-01-10' },
          { id: '4', month: 'February', amount: '20 DT', description: 'Lunch', date: '2023-02-02' },
          { id: '5', month: 'February', amount: '30 DT', description: 'Supplies', date: '2023-02-07' },
          { id: '6', month: 'February', amount: '75 DT', description: 'Gas bill', date: '2023-02-15' },
          { id: '7', month: 'March', amount: '40 DT', description: 'Transportation', date: '2023-03-03' },
          { id: '8', month: 'March', amount: '50 DT', description: 'Electricity bill', date: '2023-03-10' },
          { id: '9', month: 'March', amount: '100 DT', description: 'Groceries', date: '2023-03-17' },
          { id: '10', month: 'April', amount: '30 DT', description: 'Gym membership', date: '2023-04-01' },
          { id: '11', month: 'April', amount: '20 DT', description: 'Movie tickets', date: '2023-04-10' },
          { id: '12', month: 'April', amount: '80 DT', description: 'Phone bill', date: '2023-04-11'},
        
    ];
  
    const ExpenseScreen = () => {
      const [expenseList, setExpenseList] = useState(expenses);
  
      const renderExpense = ({ item }) => (
        <View style={styles.expenseContainer}>
          <Text style={styles.expenseMonth}>{item.month}</Text>
          <Text style={styles.expenseAmount}>{item.amount}</Text>
          <Text style={styles.expenseDescription}>{item.description}</Text>
        </View>
      );
  
      const sortExpenses = () => {
        const sortedExpenses = expenseList.sort((a, b) => {
          const dateA = new Date(a.month);
          const dateB = new Date(b.month);
          return dateA - dateB;
        });
        setExpenseList(sortedExpenses);
      };
  
      return (
        <>
          <View>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Expenses</Text>
            <FlatList
              data={expenseList}
              renderItem={renderExpense}
              keyExtractor={item => item.id}
            />
          </View>
        </>
      );
    };
  
    return <ExpenseScreen />;
  }

    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
        paddingTop: 50,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      expenseContainer: {
        flexDirection: 'row',
         justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      expenseMonth: {
        fontWeight: 'bold',
      },
      expenseAmount: {
      },
      expenseDescription: {},
    })
