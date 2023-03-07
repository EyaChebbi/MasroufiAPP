import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';


export default function Expenses() {
    // const expenses = [
    //     { id: 1, date: '2022-02-01', description: 'Textbook', amount: 50.0 },
    //     { id: 2, date: '2022-02-03', description: 'Rent', amount: 500.0 },
    //     { id: 3, date: '2022-02-08', description: 'Groceries', amount: 75.0 },
    //     { id: 4, date: '2022-03-01', description: 'Internet Bill', amount: 40.0 },
    //     { id: 5, date: '2022-03-05', description: 'Gas', amount: 30.0 },
    //     { id: 6, date: '2022-03-10', description: 'Dinner', amount: 20.0 },
    // ];
    // const MonthlyExpenses = () => {
    //     const [selectedMonth, setSelectedMonth] = useState(2); // default to February

    //     // filter expenses to only show the selected month
    //     const filteredExpenses = expenses.filter(
    //         (expense) => new Date(expense.date).getMonth() + 1 === selectedMonth
    //     );

    //     return (
    //         <View style={styles.container}>
    //             <ScrollView>
    //                 <View style={styles.monthSelector}>
    //                     <Text style={styles.monthSelectorText}>Select Month:</Text>
    //                     <View style={styles.monthButtons}>
    //                         <Text
    //                             style={[
    //                                 styles.monthButton,
    //                                 selectedMonth === 1 && styles.selectedMonthButton,
    //                             ]}
    //                             onPress={() => setSelectedMonth(1)}
    //                         >
    //                             Jan
    //                         </Text>
    //                         <Text
    //                             style={[
    //                                 styles.monthButton,
    //                                 selectedMonth === 2 && styles.selectedMonthButton,
    //                             ]}
    //                             onPress={() => setSelectedMonth(2)}
    //                         >
    //                             Feb
    //                         </Text>
    //                         <Text
    //                             style={[
    //                                 styles.monthButton,
    //                                 selectedMonth === 3 && styles.selectedMonthButton,
    //                             ]}
    //                             onPress={() => setSelectedMonth(3)}
    //                         >
    //                             Mar
    //                         </Text>
    //                         {/* add more months here as needed */}
    //                     </View>
    //                 </View>
    //                 <View style={styles.expenseList}>
    //                     {filteredExpenses.map((expense) => (
    //                         <View key={expense.id} style={styles.expenseItem}>
    //                             <Text style={styles.expenseDescription}>{expense.description}</Text>
    //                             <Text style={styles.expenseAmount}>${expense.amount.toFixed(2)}</Text>
    //                         </View>
    //                     ))}
    //                 </View>
    //             </ScrollView>
    //         </View>
    //     );
    // };
    const expenses = [
        { id: '1', month: 'January', amount: '$50.00', description: 'Textbooks' },
        { id: '2', month: 'February', amount: '$20.00', description: 'Lunch' },
        { id: '3', month: 'February', amount: '$30.00', description: 'Supplies' },
        { id: '4', month: 'March', amount: '$40.00', description: 'Transportation' },
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
          <View style={styles.container}>
            <Text style={styles.title}>Expenses</Text>
            <FlatList
              data={expenseList}
              renderItem={renderExpense}
              keyExtractor={item => item.id}
            />
          </View>
        );
      };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 50,
        },
        monthSelector: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        },
        monthSelectorText: {
            marginRight: 10,
        },
        monthButtons: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        monthButton: {
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            marginRight: 10,
        },
        selectedMonthButton: {
            backgroundColor: '#ccc',
        },
        expenseList: {
            paddingHorizontal: 20,
        }
    })
}