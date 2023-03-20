import React from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    FlatList,
    Animated,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import { Text } from "../components";
import { FontAwesome5 } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

export default function Home() {
    const budget = 1500;

    const budgets = [

        { type: 'Cash', value: 500 },
        { type: 'Bank Account', value: 1000 },
        { type: 'Crypto Account', value: -200 }
    ]
    const BudgetCard = ({ type, value }) => {
        let icon;
        if (type === 'Cash') {
            icon = <FontAwesome5 name="money-bill" size={24} color='#6cb1a7' />;
        } else if (type === 'Bank Account') {
            icon = <FontAwesome5 name="university" size={24} color= '#6cb1a7' />;
        } else {
            icon = <FontAwesome5 name="bitcoin" size={24} color='#6cb1a7' />;
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



    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={budgets}
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
            {/* <View style={styles.card}>
                <Text style={styles.title}>Balance Trend</Text>
                {balanceTrend.map((data) => (
                    <View key={data.month}>
                        <Text>{data.month}</Text>
                        <Text style={styles.value}>{`${data.balance} DT`}</Text>
                    </View>
                ))}
            </View> */}
            <View style={styles.card}>
  <Text style={styles.title}> Balance Trend</Text>
  <LineChart
  style={styles.chart}
    data={{
      labels: balanceTrend.map((data) => data.month),
      datasets: [
        {
          data: balanceTrend.map((data) => data.balance),
          color: () => '#405457',
        },
      ],
    }}
    width={Dimensions.get('window').width - 70}
    height={220}
    chartConfig={{
      backgroundColor: '#feffff',
      backgroundGradientFrom: '#feffff',
      backgroundGradientTo: '#feffff',
      decimalPlaces: 0,
      color: (opacity = 1) => `#405754`,
    }}
    bezier
  />
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
