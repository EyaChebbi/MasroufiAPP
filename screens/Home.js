import React, { useState } from "react";
import {
    Dimensions,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import { Text } from "../components";
import { FontAwesome5 } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from "@react-navigation/native";
import BalanceTrend from "./BalanceTrend";

export default function Home() {
    const budget = 1500;


    const [salaryAccountBalance, setSalaryAccountBalance] = useState(0);
    const [balanceAccountBalance, setBalanceAccountBalance] = useState(0);
    
    // const budgets = [

    //     { type: 'Cash', value: 500 },
    //     { type: 'Bank Account', value: 1000 },
    //     { type: 'Crypto Account', value: -200 }
    // ]

    const BudgetCard = ({ type, value }) => {
        let icon;
        if (type === 'Cash') {
            icon = <FontAwesome5 name="money-bill" size={24} color='blue' />;
        } else if (type === 'Bank Account') {
            icon = <FontAwesome5 name="university" size={24} color='blue' />;
        } else {
            icon = <FontAwesome5 name="bitcoin" size={24} color='blue' />;
        }
        return (
            <View style={styles.card2}>
                {icon}
                <Text style={styles.title}>{type}</Text>
                <Text style={styles.value}>{`${value} DT`}</Text>
            </View>
        );
    };

    const topExpenses = [
        { name: 'Groceries', amount: 200 },
        { name: 'Rent', amount: 800 },
        { name: 'Utilities', amount: 100 },
    ];
    const balanceTrend = [
        { month: 'Jan', balance: 1200 },
        { month: 'Feb', balance: 900 },
        { month: 'Mar', balance: 700 },
        { month: 'Apr', balance: 1000 },
        { month: 'May', balance: 1500 },
        { month: 'Jun', balance: 1300 },
        { month: 'Jul', balance: 1100 },
        { month: 'Aug', balance: 1000 },
        { month: 'Sep', balance: 900 },
        { month: 'Oct', balance: 700 },
        { month: 'Nov', balance: 800 },
        { month: 'Dec', balance: 600 },
    ];

    const totalExpenses = topExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    const balance = budget - totalExpenses;

    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
            navigation.navigate('BalanceTrend');
          };
   

    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={budget}
                horizontal={true}
                renderItem={({ item }) => <BudgetCard style={styles.card2}
                    type={item.type} value={item.value} />}
            />

            <View style={styles.card}>
                <Text style={styles.title}>Top Expenses</Text>
                {topExpenses.map((expense) => (
                    <View key={expense.name}>
                        <Text>{expense.name}</Text>
                        <Text style={styles.value}>{`${expense.amount} DT`}</Text>
                    </View>
                ))}
                <Text style={styles.title}>{`Total Expenses: ${totalExpenses} DT`}</Text>
            </View>
           
            <View style={styles.card}>
                <Text style={styles.title}> Balance Trend</Text>
                <View style={{ flex: 1 }}>
                    <LineChart
                        style={styles.chart}
                        data={{
                            labels: balanceTrend.map((data) => data.month),
                            datasets: [
                                {
                                    data: balanceTrend.map((data) => data.balance),
                                    color: () => 'black',
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
