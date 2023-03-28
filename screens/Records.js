// import React, {useState} from 'react'
// import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';


// export default function Expenses() {
//     const expenses = [

//           { id: '1', month: 'January', amount: '50 DT', description: 'Textbooks', date: '2023-01-01' },
//           { id: '2', month: 'January', amount: '25 DT', description: 'Rent', date: '2023-01-05' },
//           { id: '3', month: 'January', amount: '15 DT', description: 'Internet bill', date: '2023-01-10' },
//           { id: '4', month: 'February', amount: '20 DT', description: 'Lunch', date: '2023-02-02' },
//           { id: '5', month: 'February', amount: '30 DT', description: 'Supplies', date: '2023-02-07' },
//           { id: '6', month: 'February', amount: '75 DT', description: 'Gas bill', date: '2023-02-15' },
//           { id: '7', month: 'March', amount: '40 DT', description: 'Transportation', date: '2023-03-03' },
//           { id: '8', month: 'March', amount: '50 DT', description: 'Electricity bill', date: '2023-03-10' },
//           { id: '9', month: 'March', amount: '100 DT', description: 'Groceries', date: '2023-03-17' },
//           { id: '10', month: 'April', amount: '30 DT', description: 'Gym membership', date: '2023-04-01' },
//           { id: '11', month: 'April', amount: '20 DT', description: 'Movie tickets', date: '2023-04-10' },
//           { id: '12', month: 'April', amount: '80 DT', description: 'Phone bill', date: '2023-04-11'},
        
//     ];
  
//     const ExpenseScreen = () => {
//       const [expenseList, setExpenseList] = useState(expenses);
  
//       const renderExpense = ({ item }) => (
//         <View style={styles.expenseContainer}>
//           <Text style={styles.expenseMonth}>{item.month}</Text>
//           <Text style={styles.expenseAmount}>{item.amount}</Text>
//           <Text style={styles.expenseDescription}>{item.description}</Text>
//         </View>
//       );
  
//       const sortExpenses = () => {
//         const sortedExpenses = expenseList.sort((a, b) => {
//           const dateA = new Date(a.month);
//           const dateB = new Date(b.month);
//           return dateA - dateB;
//         });
//         setExpenseList(sortedExpenses);
//       };
  
//       return (
//         <>
//           <View>
//           </View>
//           <View style={styles.container}>
//             <Text style={styles.title}>Expenses</Text>
//             <FlatList
//               data={expenseList}
//               renderItem={renderExpense}
//               keyExtractor={item => item.id}
//             />
//           </View>
//         </>
//       );
//     };
  
//     return <ExpenseScreen />;
//   }

//     const styles = StyleSheet.create({
//       container: {
//         backgroundColor: '#fff',
//         paddingTop: 50,
//       },
//       title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//       },
//       expenseContainer: {
//         flexDirection: 'row',
//          justifyContent: 'space-between',
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//       },
//       expenseMonth: {
//         fontWeight: 'bold',
//       },
//       expenseAmount: {
//       },
//       expenseDescription: {},
//     })


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import axios from 'axios';

export default function Records() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:3000/expenses');
      const data = result.data;

      const expenses = data.filter(item => item.type === 'expense');
      setExpenses(expenses);

      const incomes = data.filter(item => item.type === 'income');
      setIncomes(incomes);
    };

    fetchData();
  }, []);

  const Records = () => {
    const renderExpense = ({ item }) => (
      <View style={styles.expenseContainer}>
        <Text style={styles.expenseMonth}>{item.month}</Text>
        <Text style={styles.expenseAmount}>{item.amount}</Text>
        <Text style={styles.expenseDescription}>{item.description}</Text>
      </View>
    );

    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>Expenses</Text>
          <FlatList
            data={expenses}
            renderItem={renderExpense}
            keyExtractor={item => item.id}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Incomes</Text>
          <FlatList
            data={incomes}
            renderItem={renderExpense}
            keyExtractor={item => item.id}
          />
        </View>
      </>
    );
  };

  return <Records />;
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
});
