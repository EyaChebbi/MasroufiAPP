import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import CalendarModal from './CalendarModal';

function CalendarComponent(props) {
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <View>
      <Pressable onPress={toggleCalendar}>
        <Text style={styles.options}>
          {selectedDate ? selectedDate : 'Select Date'}
        </Text>
      </Pressable>
      <CalendarModal
        isVisible={showCalendar}
        onDayPress={handleDayPress}
        selectedDate={selectedDate}
      />
    </View>
  );
}

export default CalendarComponent;

const styles = StyleSheet.create({
  options: {
    marginRight: 60,
    fontWeight: '600',
  },
});