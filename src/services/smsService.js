import SmsAndroid from 'react-native-get-sms-android';
import { PermissionsAndroid } from 'react-native';
import { parseSmsForExpenses } from '../utils/smsParser';

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
      }
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
        box: 'inbox',
        indexFrom: 0,  
        maxCount: 500,  
      }),
      (fail) => {
        console.log('Failed with this error: ' + fail);
        reject(fail);
      },
      (count, smsList) => {
        const parsedList = JSON.parse(smsList);

        const expenseMessages = parsedList.filter((message) =>
          /rs\.|inr/i.test(message.body)
        );

        resolve(expenseMessages);
      }
    );
  });
};
