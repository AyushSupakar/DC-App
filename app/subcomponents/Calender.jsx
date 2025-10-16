import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Colors from '../utils/Colors';

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM",
  "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
];

const bookedSlots = [
  { date: "2025-01-02", time: "10:30 AM" },
  { date: "2025-01-15", time: "10:30 AM" }
];

export default function Calendar({ onDateSelect, onTimeSelect }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const [selectedDate, setSelectedDate] = useState(tomorrow);
  
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const now = new Date();
    const threeHoursLater = new Date();
    threeHoursLater.setHours(now.getHours() + 3);

    if (threeHoursLater.getHours() <= 21) {
      setSelectedDate(new Date(today.setDate(today.getDate() + 1)));
    }
    onDateSelect(selectedDate);
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  
  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
    dates.push(date);
  }

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const isBooked = (time) =>
    bookedSlots.some(slot => slot.date === selectedDate.toISOString().split("T")[0] && slot.time === time);

  const isPastDate = (date) => date < today;

  const isPastTime = (time) => {
    if (selectedDate.toDateString() === today.toDateString()) {
      const [hourMinute, period] = time.split(" ");
      let [hour, minutes] = hourMinute.split(":").map(Number);

      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      const selectedTimeDate = new Date();
      selectedTimeDate.setHours(hour, minutes, 0, 0);

      return selectedTimeDate < new Date(new Date().setHours(new Date().getHours() + 3));
    }
    return false;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.selectedDateText}>
        Selected Date: {selectedDate?.toDateString()} {selectedTime ? `at ${selectedTime}` : ""}
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i + 1);
          return date;
        })}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dateButton,
              selectedDate?.toDateString() === item.toDateString() && styles.selectedButton
            ]}
            onPress={() => handleDateSelect(item)}
          >
            <Text style={[
              styles.dateText,
              selectedDate?.toDateString() === item.toDateString() && styles.selectedText
            ]}>
              {item.toDateString()}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.getTime().toString()}
      />

      <Text style={styles.sectionTitle}>Select a Time Slot</Text>
      <View style={styles.timeSlotsContainer}>
        {timeSlots.map((time, index) => (
          <TouchableOpacity
            key={index}
            disabled={isBooked(time) || isPastTime(time)}
            onPress={() => handleTimeSelect(time)}
            style={[
              styles.timeSlot,
              isBooked(time) && styles.bookedSlot,
              isPastTime(time) && styles.disabledSlot,
              selectedTime === time && styles.selectedSlot
            ]}
          >
            <Text style={[
              styles.timeText,
              selectedTime === time && styles.selectedText
            ]}>
              {time} {isBooked(time) ? "(Booked)" : ""}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  selectedDateText: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  timeSlotsContainer: { flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  timeSlot: { margin: 5, padding: 10, borderRadius: 5, backgroundColor: Colors.PRIMARY_LIGHT, borderWidth:1,borderColor:Colors.PRIMARY },
  bookedSlot: { backgroundColor: '#F08080' },
  disabledSlot: { backgroundColor: '#E0E0E0' },
  selectedSlot: { backgroundColor: Colors.PRIMARY },
  selectedButton: { backgroundColor: Colors.PRIMARY },
  selectedText: { color: 'white' },
  timeText: { fontSize: 14 },
  dateButton: { padding: 10, borderWidth: 1, borderColor: Colors.PRIMARY, borderRadius: 5, marginRight: 10 },
  dateText: { color: Colors.PRIMARY },
});
