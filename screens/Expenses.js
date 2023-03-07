import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';


export default function Expenses() {
    const expenses = [
      { id: '1', month: 'January', date: '2023-01-05', amount: '$50.00', description: 'Textbooks' },
      { id: '2', month: 'January', date: '2023-01-10', amount: '$25.00', description: 'Rent' },
      { id: '3', month: 'January', date: '2023-01-20', amount: '$15.00', description: 'Internet bill' },
      { id: '4', month: 'February', date: '2023-02-02', amount: '$20.00', description: 'Lunch' },
      { id: '5', month: 'February', date: '2023-02-14', amount: '$30.00', description: 'Supplies' },
      { id: '6', month: 'February', date: '2023-02-28', amount: '$75.00', description: 'Gas bill' },
      { id: '7', month: 'March', date: '2023-03-01', amount: '$40.00', description: 'Transportation' },
      { id: '8', month: 'March', date: '2023-03-15', amount: '$50.00', description: 'Electricity bill' },
      { id: '9', month: 'March', date: '2023-03-28', amount: '$100.00', description: 'Groceries' },
      { id: '10', month: 'April', date: '2023-04-03', amount: '$30.00', description: 'Gym membership' },
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
      expenseAmount: {},
      expenseDescription: {},
    })
