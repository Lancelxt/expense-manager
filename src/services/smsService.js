import SmsAndroid from 'react-native-get-sms-android';
import { PermissionsAndroid } from 'react-native';

export const requestSmsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'SMS Permission',
        message: 'This app needs access to your SMS to read expenses.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const fetchSms = async () => {
  return new Promise((resolve, reject) => {
    SmsAndroid.list(
      JSON.stringify({
        box: 'inbox', // 'inbox' to list SMS received
        indexFrom: 0, // Start from the first message
        maxCount: 100, // Maximum number of SMS to read
      }),
      (fail) => {
        console.log('Failed with this error: ' + fail);
        reject(fail);
      },
      (count, smsList) => {
        const parsedList = JSON.parse(smsList);

        const expenseMessages = parsedList.filter((message) =>
          /amount|rs\.|rs|inr/i.test(message.body),
        );

        resolve(expenseMessages);
      },
    );
  });
};
