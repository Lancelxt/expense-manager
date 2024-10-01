import React, { useEffect } from 'react';
import { View, Button, SafeAreaView, Alert } from 'react-native';
import { requestSmsPermission } from './src/services/smsService';
import ExpenseList from './src/components/expenseList';

export default function App() {
  useEffect(() => {
    async function checkPermission() {
      const hasPermission = await requestSmsPermission();
      if (!hasPermission) {
        Alert.alert('SMS permission is required to read expenses.');
      }
    }

    checkPermission();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Button title="View All Expenses" onPress={() => {}} />
      </View>
      <ExpenseList />
    </SafeAreaView>
  );
}
