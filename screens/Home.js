import React, { useState, useEffect, useContext } from "react";
import {
    Dimensions,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Modal,
    View,
    TextInput,
    Alert,
    Button
} from "react-native";
import { Text } from "../components";
import { FontAwesome5 } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from "@react-navigation/native";
import BalanceTrend from "./BalanceTrend";
import axios from 'axios';
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../server/UserContext";

export default function Home() {

    const { user } = useContext(UserContext);
    const userId = user?.userId;
    //console.log("userId Home " + userId)

    const [isAddAccountModalVisible, setIsAddAccountModalVisible] = useState(false);
    const [newAccountType, setNewAccountType] = useState('');
    const [newAccountNumber, setNewAccountNumber] = useState('');
    const [newAccountBalance, setNewAccountBalance] = useState('');

     const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        fetchAccounts();
    }, []);
    const fetchAccounts = async () => {
        try {
          if (userId) {
            const response = await api.get(`/budgets`, { params: { userId } });
            const formattedAccounts = response.data.map((account) => ({
              id: account.id,
              type: account.account_type,
              value: parseFloat(account.balance),
            }));
            setAccounts(formattedAccounts);
          }
        } catch (error) {
          console.error(error);
        }
    };
     
      const AddAccountCard = () => {
        const handleAddAccount = () => {
            // console.log("Add account");
            setIsAddAccountModalVisible(true);
        };
      
        return (
            <TouchableOpacity onPress={handleAddAccount} style={styles.card2}>
                <FontAwesome5 name="plus" size={24} color="blue" />
                <Text style={styles.title}>Add Account</Text>
            </TouchableOpacity>
        );
    };

    const handleAddAccountSubmit = async () => {
        try {
          const response = await api.post("/budgets/add", {
            userId,
            account_number: newAccountNumber,
            account_type: newAccountType,
            balance: newAccountBalance,
          });
      
          const newAccount = response.data;
        //   console.log("new account" + newAccount);
          setAccounts([...accounts, newAccount]);
          setNewAccountType("");
          setNewAccountBalance("");
          setIsAddAccountModalVisible(false);
          Alert.alert("Account successfully added.");
          fetchAccounts();
        } catch (error) {
          console.error(error);
          Alert.alert("Error", "An error occurred while adding the account.");
        }
      };

    const handleAddAccountCancel = () => {
        // Reset input values and close the modal
        setNewAccountType('');
        setNewAccountNumber('');
        setNewAccountBalance('');
        setIsAddAccountModalVisible(false);
    };

    const BudgetCard = ({ type, value }) => {
        let icon;
        if (type === 'Bitcoin') {
            icon = <FontAwesome5 name="bitcoin" size={24} color='blue' />;
        } else if (type === 'Bank Account') {
            icon = <FontAwesome5 name="university" size={24} color='blue' />;
        } else {
            icon = <FontAwesome5 name="money-bill" size={24} color='blue' />;

        }
        return (
            <View style={styles.card2}>
                {icon}
                <Text style={styles.title}>{type}</Text>
                <Text style={styles.value}>{`${value} DT`}</Text>
            </View>
        );
    };

    const [topExpenses, setTopExpenses] = useState([]);

    const fetchTopExpenses = async () => {
        try {
          const response = await api.get("/topExpenses", {
            params: {
              period: 30,
              id: userId,
            },
          });
          const data = response.data;
          setTopExpenses(data);
        } catch (error) {
          console.error("Error fetching top expenses:", error);
        }
    };
    useEffect(() => {
        fetchTopExpenses();
        }, []
    );



    const [balance, setBalance] = useState(0);
    const [balanceTrnd, setBalanceTrnd] = useState([{ month: 'Jan', balance: 1200 },
    { month: 'Feb', balance: 900 }]);
//fetch the user balance

    const fetchBalanceTrnd = async () => {
        try {
            if(userId){
          const response = await api.get('/balanceHistory', { params: { userId:userId } });
          const balanceHistory = response.data;
          const newBalanceTrnd = balanceHistory.map((history) => {
            const month = new Date(history.balanceDate).toLocaleString('default', { month: 'long' });
            return { month: month, balance: history.amount };
          });

          setBalanceTrnd(newBalanceTrnd);  
        //   await AsyncStorage.setItem('balanceTrnd', JSON.stringify(newBalanceTrnd)); // Store data in AsyncStorage
        }
        } catch (error) {
          console.error('Error fetching balance history:', error);
        }
      };
    useEffect(() => {
        fetchBalanceTrnd();
      }, [userId]);
      
      

    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
            navigation.navigate('BalanceTrend');
          };
   

    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
   <Modal
            animationType="slide"
            transparent={true}
            visible={isAddAccountModalVisible}
        >
            <View style={styles.modalBackdrop}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add Account</Text>
                    <TextInput
                        style={styles.modalInput}
                        onChangeText={setNewAccountType}
                        value={newAccountType}
                        placeholder="Account Type"
                    />
                     <TextInput
                        style={styles.modalInput}
                        onChangeText={setNewAccountNumber}
                        value={newAccountNumber}
                        placeholder="Number"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.modalInput}
                        onChangeText={setNewAccountBalance}
                        value={newAccountBalance}
                        placeholder="Balance"
                        keyboardType="numeric"
                    />
                    <View style={styles.modalButtons}>
                        <Button onPress={handleAddAccountSubmit} title="Submit" />
                        <Button
                            onPress={handleAddAccountCancel}
                            title="Cancel"
                            color="red"
                        />
                    </View>
                </View>
            </View>
        </Modal>


       <FlatList
            data={[...accounts, { isAddAccountCard: true }]}
            horizontal={true}
            renderItem={({ item }) => {
                if (item.isAddAccountCard) {
                    return <AddAccountCard />;
                }
                return (
                    <BudgetCard style={styles.card2} type={item.type} value={item.value} />
                );
            }}
        />

<View style={styles.card}>
          <Text style={styles.title}>Top Expenses</Text>
          {topExpenses.map((expense) => (
            <View key={expense.transactionID}>
              <Text style={styles.topExpenseAmount}>{expense.amount}</Text>
              <Text style={styles.topExpenseName}>{expense.categoryName}</Text>
              <Text style={styles.topExpenseDate}>{expense.transactionDate.toString()}</Text>
              {/* <Text style={styles.topExpenseColor}>{expense.color}</Text> */}
            </View>
          ))}
          <Text style={styles.title}>Test</Text>
        </View>
           
            <View style={styles.card}>
                <Text style={styles.title}> Balance Trend</Text>
                <View style={{ flex: 1 }}>
                    <LineChart
                        style={styles.chart}
                        data={{
                            labels: balanceTrnd.map((data) => data.month),
                            datasets: [
                                {
                                    data: balanceTrnd.map((data) => data.balance),
                                    color: () => 'black',
                                    id: 'balance',
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width - 85}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#feffff',
                            backgroundGradientFrom: '#feffff',
                            backgroundGradientTo: '#feffff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `blue`,
                        }}
                        bezier
                    />
                    <TouchableOpacity onPress={toggleExpanded}>
                <Text style={{ color: "blue", marginTop: 10 ,  fontWeight: 'bold', textAlign: 'right'}}>
                    {expanded ? "See Less" : "See More"}
                </Text>
            </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.card}>
                <Text style={styles.title}>Current Balance</Text>
                <Text style={styles.value}>{`${balance} DT`}</Text>
            </View>
        </ScrollView>
        
    );
                    
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#6eccaf',
    },
    card2: {
        backgroundColor: '#feffff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width: 175,
    },
    card: {
        backgroundColor: '#feffff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 20,
        
    },
    value: {
        fontSize: 18,
        color: '#666',
    },


    modalBackdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        width: '80%',
        backgroundColor: "#6eccaf",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    modalTitle: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
    },
    modalInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "#feffff",
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    chart: {
        backgroundColor: '#feffff',
        borderRadius: 10,
        paddingLeft: -50,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    }
});




























//THIS VERSION WORKS FINE BUT WITH NOT DATABASE
//TO RETRIEVE IN CASE OF ERRORS IN THE ONE WITH THE DATABASE

// import React, { useState } from "react";
// import {
//     Dimensions,
//     StyleSheet,
//     FlatList,
//     ScrollView,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { Text } from "../components";
// import { FontAwesome5 } from '@expo/vector-icons';
// import { LineChart } from 'react-native-chart-kit';
// import { useNavigation } from "@react-navigation/native";
// import BalanceTrend from "./BalanceTrend";

// export default function Home() {
//     const budget = 1500;

//     const budgets = [

//         { type: 'Cash', value: 500 },
//         { type: 'Bank Account', value: 1000 },
//         { type: 'Crypto Account', value: -200 }
//     ]
//     const BudgetCard = ({ type, value }) => {
//         let icon;
//         if (type === 'Cash') {
//             icon = <FontAwesome5 name="money-bill" size={24} color='blue' />;
//         } else if (type === 'Bank Account') {
//             icon = <FontAwesome5 name="university" size={24} color='blue' />;
//         } else {
//             icon = <FontAwesome5 name="bitcoin" size={24} color='blue' />;
//         }
//         return (
//             <View style={styles.card2}>
//                 {icon}
//                 <Text style={styles.title}>{type}</Text>
//                 <Text style={styles.value}>{`${value} DT`}</Text>
//             </View>
//         );
//     };

//     const topExpenses = [
//         { name: 'Groceries', amount: 200 },
//         { name: 'Rent', amount: 800 },
//         { name: 'Utilities', amount: 100 },
//     ];
//     const balanceTrend = [
//         { month: 'Jan', balance: 1200 },
//         { month: 'Feb', balance: 900 },
//         { month: 'Mar', balance: 700 },
//         { month: 'Apr', balance: 1000 },
//         { month: 'May', balance: 1500 },
//         { month: 'Jun', balance: 1300 },
//         { month: 'Jul', balance: 1100 },
//         { month: 'Aug', balance: 1000 },
//         { month: 'Sep', balance: 900 },
//         { month: 'Oct', balance: 700 },
//         { month: 'Nov', balance: 800 },
//         { month: 'Dec', balance: 600 },
//     ];

//     const totalExpenses = topExpenses.reduce((acc, expense) => acc + expense.amount, 0);
//     const balance = budget - totalExpenses;

//     const [expanded, setExpanded] = useState(false);
//     const toggleExpanded = () => {
//             navigation.navigate('BalanceTrend');
//           };
   

//     const navigation = useNavigation();

//     return (
//         <ScrollView style={styles.container}>
//             <FlatList
//                 data={budgets}
//                 horizontal={true}
//                 renderItem={({ item }) => <BudgetCard style={styles.card2}
//                     type={item.type} value={item.value} />}
//             />

//             <View style={styles.card}>
//                 <Text style={styles.title}>Top Expenses</Text>
//                 {topExpenses.map((expense) => (
//                     <View key={expense.name}>
//                         <Text>{expense.name}</Text>
//                         <Text style={styles.value}>{`${expense.amount} DT`}</Text>
//                     </View>
//                 ))}
//                 <Text style={styles.title}>{`Total Expenses: ${totalExpenses} DT`}</Text>
//             </View>
           
//             <View style={styles.card}>
//                 <Text style={styles.title}> Balance Trend</Text>
//                 <View style={{ flex: 1 }}>
//                     <LineChart
//                         style={styles.chart}
//                         data={{
//                             labels: balanceTrend.map((data) => data.month),
//                             datasets: [
//                                 {
//                                     data: balanceTrend.map((data) => data.balance),
//                                     color: () => 'black',
//                                 },
//                             ],
//                         }}
//                         width={Dimensions.get('window').width - 85}
//                         height={220}
//                         chartConfig={{
//                             backgroundColor: '#feffff',
//                             backgroundGradientFrom: '#feffff',
//                             backgroundGradientTo: '#feffff',
//                             decimalPlaces: 0,
//                             color: (opacity = 1) => `blue`,
//                         }}
//                         bezier
//                     />
//                     <TouchableOpacity onPress={toggleExpanded}>
//                 <Text style={{ color: "blue", marginTop: 10 ,  fontWeight: 'bold', textAlign: 'right'}}>
//                     {expanded ? "See Less" : "See More"}
//                 </Text>
//             </TouchableOpacity>
//                 </View>
//             </View>
            
//             <View style={styles.card}>
//                 <Text style={styles.title}>Current Balance</Text>
//                 <Text style={styles.value}>{`${balance} DT`}</Text>
//             </View>
//         </ScrollView>
        
//     );
                    
// };


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#6eccaf',
//     },
//     card2: {
//         backgroundColor: '#feffff',
//         borderRadius: 10,
//         padding: 20,
//         marginBottom: 20,
//         marginRight: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 5,
//         width: 175,
//     },
//     card: {
//         backgroundColor: '#feffff',
//         borderRadius: 10,
//         padding: 20,
//         marginBottom: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 5,
//     },
//     title: {
//         fontWeight: 'bold',
//         marginBottom: 10,
//         fontSize: 20,
        
//     },
//     value: {
//         fontSize: 18,
//         color: '#666',
//     },
//     chart: {
//         backgroundColor: '#feffff',
//         borderRadius: 10,
//         paddingLeft: -50,
//         marginBottom: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 5,
//     }
// });
