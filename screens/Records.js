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


  console.log("userId records " + userId)

  useEffect(() => {

    if (!userId) {
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await api.get(`/transactions?userId=${userId}`);
  
        const transactions = response.data;
        const expenses = [];
        const incomes = [];
  
        transactions.forEach(transaction => {
          const month = new Date(transaction.transactionDate).toLocaleString('default', { month: 'long' });
  
          if (transaction.transactionType === 'Spending') {
            expenses.push({
              month: month,
              amount: `$${transaction.amount}`,
              categoryName: transaction.categoryName
            });
          } else {
            incomes.push({
              month: month,
              amount: `$${transaction.amount}`,
              categoryName: transaction.categoryName
            });
          }
        });
  
        setExpenses(expenses);
        setIncomes(incomes);
        fetchTransactions();

      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
  
    fetchTransactions();
  }, [userId]);
  


  const renderExpense = ({ item }) => (
    <View style={styles.expenseContainer}>
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
    // alignContent: 'center'
  },
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    flex: 1,
    // height: 50%,
    // marginBottom: 20,    
    // justifyContent: 'center'    
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
    //marginRight: 15,
    //alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  expenseMonth: {
    //
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
    width: 80,
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


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
// import axios from 'axios';

// export default function Records() {
//   const [expenses, setExpenses] = useState([]);
//   const [incomes, setIncomes] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios('http://localhost:3000/expenses');
//       const data = result.data;

//       const expenses = data.filter(item => item.type === 'expense');
//       setExpenses(expenses);

//       const incomes = data.filter(item => item.type === 'income');
//       setIncomes(incomes);
//     };

//     fetchData();
//   }, []);

//   const Records = () => {
//     const renderExpense = ({ item }) => (
//       <View style={styles.expenseContainer}>
//         <Text style={styles.expenseMonth}>{item.month}</Text>
//         <Text style={styles.expenseAmount}>{item.amount}</Text>
//         <Text style={styles.expenseDescription}>{item.description}</Text>
//       </View>
//     );

//     return (
//       <>
//         <View style={styles.container}>
//           <Text style={styles.title}>Expenses</Text>
//           <FlatList
//             data={expenses}
//             renderItem={renderExpense}
//             keyExtractor={item => item.id}
//           />
//         </View>

//         <View style={styles.container}>
//           <Text style={styles.title}>Incomes</Text>
//           <FlatList
//             data={incomes}
//             renderItem={renderExpense}
//             keyExtractor={item => item.id}
//           />
//         </View>
//       </>
//     );
//   };

//   return <Records />;
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     paddingTop: 50,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   expenseContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   expenseMonth: {
//     fontWeight: 'bold',
//   },
//   expenseAmount: {},
//   expenseDescription: {},
// });