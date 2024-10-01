import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Alert, Text, StyleSheet } from "react-native";
import { fetchSms, requestSmsPermission } from "./src/services/smsService";
import ExpenseList from "./src/components/expenseList";
import { parseSmsForExpenses } from "./src/utils/smsParser";
import { StatusBar } from "expo-status-bar";
import { calcHeight, calcWidth } from "./src/helper/res";
import { MaterialIcons } from "@expo/vector-icons";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true); 

  // check permission 
  const checkPermissionAndFetchExpenses = async () => {
    const hasPermission = await requestSmsPermission();
    if (hasPermission) {
      try {
        const messages = await fetchSms();

        const parsedExpenses = messages
          .map((sms) => parseSmsForExpenses(sms.body, sms.date))
          .filter((expense) => expense.amount !== "N/A");
        setExpenses(parsedExpenses); 
      } catch (error) {
        console.error("Error fetching SMS: ", error);
      }
    } else {
      Alert.alert("SMS permission is required to read expenses.");
    }
    setLoading(false); 
  };

  useEffect(() => {
    checkPermissionAndFetchExpenses(); // Initial fetch

    const interval = setInterval(checkPermissionAndFetchExpenses, 10000); // Poll every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="black"
          translucent={false}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="black"
        translucent={false}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <MaterialIcons name="refresh" size={20} color="white" />
          <Text
            onPress={checkPermissionAndFetchExpenses}
            style={{ color: "white" }}
          >
            {" "}
            Refetch Expenses
          </Text>
        </View>
      </View>
      {expenses.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.noExpensesText}>No expenses found.</Text>
        </View>
      ) : (
        <ExpenseList expenses={expenses} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1c1c1c",
    padding: calcWidth(4),
    marginBottom: calcWidth(2),
    borderRadius: calcWidth(3),
  },
  button: {
    backgroundColor: "#8B008B", 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: calcWidth(2),
    paddingVertical: calcHeight(1),
    borderRadius: calcHeight(1.6),
  },
  noExpensesText: {
    color: "white",
    fontSize: 16,
  },
  loadingText: {
    color: "white", 
    fontSize: 18, 
    fontWeight: "bold", 
  },
});
