import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchSms } from '../services/smsService';
import { parseSmsForExpenses } from '../utils/smsParser';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const smsList = await fetchSms();
        const parsedExpenses = smsList.map((sms) => {
          return parseSmsForExpenses(sms.body);
        });
        setExpenses(parsedExpenses);
      } catch (error) {
        console.error('Error fetching SMS: ', error);
      }
    }

    loadExpenses();
  }, []);

  const renderExpense = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.amount}>₹{item.amount}</Text>
      <Text>{item.description}</Text>
      <Text>{item.date}</Text>
    </View>
  );

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderExpense}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExpenseList;
