export const parseSmsForExpenses = (smsBody) => {
    const amountMatch = smsBody.match(/(?:Rs\.?|INR)\s?(\d+[,.]?\d*)/i);
    const dateMatch = smsBody.match(/\d{2}\/\d{2}\/\d{4}/);
    const descriptionMatch = smsBody.match(/at\s([A-Za-z\s]+)/i);
  
    return {
      amount: amountMatch ? amountMatch[1] : 'N/A',
      date: dateMatch ? dateMatch[0] : 'N/A',
      description: descriptionMatch ? descriptionMatch[1] : 'N/A',
    };
  };
  