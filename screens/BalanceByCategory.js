import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const BalanceByCategory = () => {
  const [data, setData] = useState([]);

  const categories = ['Food', 'Transportation', 'Shopping', 'Entertainment'];
  const transactions = [    { id: 1, category: 'Food', amount: 20 },    { id: 2, category: 'Transportation', amount: 10 },    { id: 3, category: 'Shopping', amount: 50 },    { id: 4, category: 'Entertainment', amount: 30 },    { id: 5, category: 'Food', amount: 15 },    { id: 6, category: 'Transportation', amount: 5 },    { id: 7, category: 'Shopping', amount: 20 },    { id: 8, category: 'Entertainment', amount: 10 },    { id: 9, category: 'Food', amount: 25 },    { id: 10, category: 'Transportation', amount: 15 },  ];

  useEffect(() => {
    const balanceByCategory = {};
    transactions.forEach((transaction) => {
      if (balanceByCategory[transaction.category]) {
        balanceByCategory[transaction.category] += transaction.amount;
      } else {
        balanceByCategory[transaction.category] = transaction.amount;
      }
    });
    const chartData = Object.keys(balanceByCategory).map((category) => ({
      name: category,
      amount: balanceByCategory[category],
      color: getRandomColor(),
    }));
    setData(chartData);
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Balance by Category</Text>
      <LineChart
        data={{
          labels: data.map((item) => item.name),
          datasets: [
            {
              data: data.map((item) => item.amount),
              color: (opacity = 1) =>
                `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${opacity})`,
            },
          ],
        }}
        width={350}
        height={200}
        // chartConfig={{
        //   backgroundColor: '#FFFFFF',
        //   backgroundGradientFrom: '#FFFFFF',
        //   backgroundGradientTo: '#FFFFFF',
        //   decimalPlaces: 2,
        //   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        //   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        //   style: {
        //     borderRadius: 16,
        //   },
        //   propsForDots: {
        //     r: '6',
        //     strokeWidth: '2',
        //     stroke: '#ffa726',
        //   },
        // }}

        chartConfig = {{
            backgroundColor: '#feffff',
            backgroundGradientFrom: '#feffff',
            backgroundGradientTo: '#feffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `#405754`,
          }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Helvetica Neue',
    color: '#405754',
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
  },
});

export default BalanceByCategory;
