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
    Button,
    Image
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
import moment from 'moment';


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
    const fetchUserBalance = async () => {
      try {
        if (userId) {
          const response = await api.get('/balance', { params: { userId } });
          setBalance(response.data.balance);
        }
      } catch (error) {
        console.error('Error fetching user balance:', error);
      }
    };
    
    useEffect(() => {
      fetchUserBalance();
    }, [userId]);
    


//fetch the user balance


    const [balanceTrnd, setBalanceTrnd] = useState([]);
const [balanceHistory, setBalanceHistory] = useState(null);


    // const fetchBalanceTrnd = async () => {
    //     try {
    //         if(userId){
    //       const response = await api.get('/balanceHistory', { params: { userId:userId } });
          
    //           //let balanceHistory = [null];

    //       if (response.data){
    //           balanceHistory = response.data;
    //           {
    //             balanceHistory === null ? (
    //               // Show a message or a loader while data is being fetched or when no data is available
    //               <Text>Loading...</Text>
    //             ) : (
    //               balanceHistory.map((history, index) => {
    //                 // Render the balance history data here
    //               })
    //             );
    //           }
              
    //         }
    //       console.log("balance history" + balanceHistory)
    //       const newBalanceTrnd = balanceHistory.map((history) => {
    //         const month = new Date(history.balanceDate).toLocaleString('default', { month: 'long' });
    //         return { month: month, balance: history.amount };
    //       });

    //       setBalanceTrnd(newBalanceTrnd);  
    //     }
    //   }
    //    catch (error) {
    //       console.error('Error fetching balance history:', error);
    //     }
    //   };
    // useEffect(() => {
    //     fetchBalanceTrnd();
    //   }, [userId]);
    

    const fetchBalanceTrnd = async () => {
      try {
        if (userId) {
          const response = await api.get('/balanceHistory', { params: { userId: userId } });
    
          if (response.data) {
            setBalanceHistory(response.data); // Use setBalanceHistory to update the state
    
            const newBalanceTrnd = response.data.map((history) => {
              const month = new Date(history.balanceDate).toLocaleString('default', { month: 'long' });
              return { month: month, balance: history.amount };
            });
    
            setBalanceTrnd(newBalanceTrnd);
          }
        }
      } catch (error) {
        console.error('Error fetching balance history:', error);
      }
    };
    

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
          <Text style={styles.title}>Top 5 Expenses</Text>
            {
                topExpenses.length == 0 ?
                <>
                <View style={styles.innerContainer}>
                  <Image source={require('../assets/images/decline.png')} style={styles.image}/>
                  <Text style = {styles.noData}>No data has been recorded</Text>
                </View>  
              </>
              :
<>
          {topExpenses.map((expense) => (
            <View key={expense.transactionID} style={styles.transaction}>
                <Text style={styles.topExpenseAmount}>{expense.amount}</Text>
          <Text style={styles.topExpenseName}>{expense.categoryName}</Text>
          <Text style={styles.topExpenseDate}>
            {moment(expense.transactionDate).format('DD/MM/YYYY')}
          </Text>
            </View>
          ))}
          </>
}
        </View>
          
           
            <View style={styles.card}>
                <Text style={styles.title}> Balance Trend</Text>
                    {
                        balanceTrnd.length === 0 ?
                        <>
                        <View style={styles.innerContainer}>
                          <Image source={require('../assets/images/decline.png')} style={styles.image}/>
                          <Text style = {styles.noData}>No data has been recorded</Text>
                        </View>  
                      </>
                      :
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
                </View> }
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
    },
      transaction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      },
      topExpenseAmount: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      topExpenseName: {
        fontSize: 16,
      },
      topExpenseDate: {
        fontSize: 14,
        color: '#777',
      },
      noData: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 25,
      },
      image:{ 
        width: 130, 
        height: 130,
        alignSelf: 'center', 
      },




});
