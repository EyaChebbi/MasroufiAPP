// import React from 'react';

// import { LineChart } from 'react-native-chart-kit';
// import {
//   Dimensions,
//   StyleSheet,
//   FlatList,
//   ScrollView,
//   TouchableOpacity,
//   View,
//   Text,
// } from "react-native";

// const screenWidth = Dimensions.get('window').width - 85;

// const chartData = {
//   labels: [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
//   ],
//   datasets: [
//     {
//       data: [1200, 900, 700, 1000, 1500, 1300, 1100, 1000, 900, 700, 800, 600],
//       color: () => '#405457',
//       strokeWidth: 2,
//     },
//   ],
// };

// const chartConfig = {
//   backgroundColor: '#feffff',
//   backgroundGradientFrom: '#feffff',
//   backgroundGradientTo: '#feffff',
//   decimalPlaces: 0,
//   color: (opacity = 1) => `#405754`,
// };
// const Accounts = () => {
//   return (
//     <View>
//        <Text style={styles.title}> Accounts</Text>
//     </View>
//   );
// };

// const BalanceTrend= () => {
//   return (
//     <>
//     <View style={styles.card}>
//     <Text style={styles.title}> Balance Trend</Text>
//     {/* <View style={{ flex: 1 }}> */}
//     <LineChart
//       data={chartData}
//       width={screenWidth}
//       height={400}
//       chartConfig={chartConfig}
//       bezier
//     />
//      </View>
//     <View style={styles.card}>
//     <Accounts/>
//     </View>
//     </>
   

//   );
// };

import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity,
    View,
    Text} from 'react-native';
import BalanceByCategory from './BalanceByCategory';
const screenWidth = Dimensions.get('window').width - 85;
const chartData = {
  labels: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ],
  datasets: [
    {
      data: [1200, 900, 700, 1000, 1500, 1300, 1100, 1000, 900, 700, 800, 600],
      color: () => '#405457',
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundColor: '#feffff',
  backgroundGradientFrom: '#feffff',
  backgroundGradientTo: '#feffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `#405754`,
};
const Accounts = () => {
  return (
    <View>
       <Text style={styles.title}> Accounts</Text>
    </View>
  );
};
const TimeFrameBar = ({ setTimeFrame }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('month');

  const handleTimeFrameChange = (timeFrame) => {
    setSelectedTimeFrame(timeFrame);
    setTimeFrame(timeFrame);
  };

  return (
    <View style={styles.bar}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedTimeFrame === 'week' && styles.selectedButton,
        ]}
        onPress={() => handleTimeFrameChange('week')}
      >
        <Text
          style={[
            styles.buttonText,
            selectedTimeFrame === 'week' && styles.selectedButtonText,
          ]}
        >
          Week
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedTimeFrame === 'month' && styles.selectedButton,
        ]}
        onPress={() => handleTimeFrameChange('month')}
      >
        <Text
          style={[
            styles.buttonText,
            selectedTimeFrame === 'month' && styles.selectedButtonText,
          ]}
        >
          Month
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedTimeFrame === 'year' && styles.selectedButton,
        ]}
        onPress={() => handleTimeFrameChange('year')}
      >
        <Text
          style={[
            styles.buttonText,
            selectedTimeFrame === 'year' && styles.selectedButtonText,
          ]}
        >
          Year
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const BalanceTrend = () => {
  const [timeFrame, setTimeFrame] = useState('Year');

  const chartData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: [1200, 900, 700, 1000, 1500, 1300, 1100, 1000, 900, 700, 800, 600],
        color: () => '#405457',
        strokeWidth: 2,
      },
    ],
  };

  if (timeFrame === 'week') {
    // calculate data for week
  } else if (timeFrame === 'year') {
    // calculate data for year
  }

  
  return (
    <>
     <ScrollView>
      <View style={styles.card}>
        <Text style={styles.title}> Balance Trend</Text>
        <TimeFrameBar setTimeFrame={setTimeFrame} />
        <LineChart
          data={chartData}
          width={screenWidth}
          height={400}
          chartConfig={chartConfig}
          bezier
        />
      </View>
      {/* <View style={styles.card}>
        <ScrollView>
        <BalanceByCategory/>
        </ScrollView>
      </View> */}
      </ScrollView>
    </>
  );
};


const styles = StyleSheet.create({
  
  bar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },

  container: {
    flex: 1,
    backgroundColor: '#6eccaf',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
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
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Helvetica Neue',
    color: '#405754',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Helvetica Neue',
    color: '#405754',
  },
  chart: {
    backgroundColor: '#feffff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  timeFrameBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#feffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#405754',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
  },
  selectedButton: {
    backgroundColor: '#405754',
  },
  selectedButtonText: {
    color: '#feffff',
  },
});

export default BalanceTrend;