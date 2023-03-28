import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';

function CalendarModal(props) {
  const { isVisible, onDayPress, selectedDate } = props;

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <Calendar onDayPress={onDayPress} markedDates={{ [selectedDate]: { selected: true } }} />
      </View>
    </Modal>
  );
}

export default CalendarModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
});