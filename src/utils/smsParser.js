export const parseSmsForExpenses = (smsBody, smsDate) => {
  const amountMatch = smsBody.match(/(?:Rs\.?|INR)\s?(\d+[,.]?\d*)/i);
    const isUpiPayment = /upi|vpa|unified payment/i.test(smsBody);
  let descriptionMatch = smsBody.match(/(?:at|for|to|from)\s([A-Za-z\s]+)/i);

  if (!descriptionMatch) {
    descriptionMatch = smsBody.match(/(?:on|at|in)\s([A-Za-z\s]+)/i);
  }

  const description = isUpiPayment
    ? 'UPI Payment'
    : descriptionMatch 
      ? descriptionMatch[1].trim() 
      : 'No description available';

  return {
    amount: amountMatch ? amountMatch[1] : 'N/A',
    date: smsDate ? new Date(smsDate).toLocaleDateString() : 'N/A',  
    description,
  };
};
