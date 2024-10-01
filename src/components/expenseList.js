import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';
import { MaterialIcons } from '@expo/vector-icons';  

const ExpenseList = ({ expenses }) => {  
  if (!expenses || expenses.length === 0) {
    return <Text style={styles.noExpenses}>No expenses found.</Text>;  
  }

    const formatDate = (dateString) => {
      const [day, month, year] = dateString.split('/'); 
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return `${day} ${monthNames[parseInt(month) - 1]} ${year}`; 
    };

  const renderExpense = ({ item }) => (
    <View style={styles.card}>
      <MaterialIcons name="payment" size={24} color="white" />
      <Text style={styles.amount}>₹{item.amount}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>{formatDate(item.date)}</Text>
    </View>
  );

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderExpense}
      showsVerticalScrollIndicator={false}  
    />
  );
};

const styles = StyleSheet.create({
  noExpenses: {
    color: 'white',
    fontSize: 16,
  },
  card: {
    flexDirection: 'column',
    gap: calcHeight(0.2),
    paddingVertical: calcHeight(2),
    paddingHorizontal: calcWidth(4),
    marginVertical: calcHeight(1),
    marginHorizontal: calcHeight(2),
    backgroundColor: '#333',
    borderRadius: calcWidth(3.6),
    borderColor: '#555',
    borderWidth: calcHeight(0.12),
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    color: 'white',
    paddingBottom:calcHeight(1.6)
  },
  date: {
    position: 'absolute',
    right: calcWidth(2),
    bottom: calcHeight(1),
    color: 'white',
  },
});

export default ExpenseList;
