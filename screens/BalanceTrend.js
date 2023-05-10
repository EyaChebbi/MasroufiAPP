import React, { useState, useEffect, useContext } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
  Image} from 'react-native';

const screenWidth = Dimensions.get('window').width - 85;
import api from '../api';
import UserContext from '../server/UserContext';

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

const chartConfig = {
  backgroundColor: '#feffff',
  backgroundGradientFrom: '#feffff',
  backgroundGradientTo: '#feffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `#405754`,
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

  const [balanceTrnd, setBalanceTrnd] = useState([]);

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


  const { user } = useContext(UserContext);
  const userId = user?.userId;
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
        {
                        balanceTrnd.length === 0 ?
                        <>
                        <View style={styles.innerContainer}>
                          <Image source={require('../assets/images/decline.png')} style={styles.image}/>
                          <Text style = {styles.noData}>No data has been recorded</Text>
                        </View>  
                      </>
                      :
                      <>
        <TimeFrameBar setTimeFrame={setTimeFrame} />
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
              width={screenWidth}
              height={400}
              chartConfig={chartConfig}
              bezier
          />
          </>
            }

      </View>
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
    // fontFamily: 'Helvetica Neue',
    color: '#405754',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    // fontFamily: 'Helvetica Neue',
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
    // fontFamily: 'Helvetica Neue',
  },
  selectedButton: {
    backgroundColor: '#405754',
  },
  selectedButtonText: {
    color: '#feffff',
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

export default BalanceTrend;