export interface TrumfTransaction {
  registeredDate: string;
  purchaseDate: string;
  description: string;
  rate?: string;
  currency: string;
  amount: string;
  amountNOK: string;
}

const DATE_REGEXP =
  /^([0|1|2][0-9]|[3][0|1])[.]([0][1-9]|[1][0-2])[.]([0-9]{4})$/; // DD.MM.YYYY
const isDate = (text?: string) => text?.match(DATE_REGEXP);
const RATE_REGEXP = /^(\d)+[,](\d)+$/;
const isRate = (text?: string) => text?.match(RATE_REGEXP);

const extractTransaction = (
  content: Array<string>,
  index: number
): TrumfTransaction => {
  const rateOffset = isRate(content[index + 6]) ? 2 : 0;
  return {
    registeredDate: content[index],
    purchaseDate: content[index + 2],
    description: content[index + 4],
    rate: rateOffset === 2 ? content[index + 6] : undefined,
    currency: content[index + 6 + rateOffset],
    amount: content[index + 8 + rateOffset],
    amountNOK: content[index + 10 + rateOffset],
  };
};

export const parseTrumfVisa = (
  content: Array<string>
): Array<TrumfTransaction> => {
  let i = 0;
  const transactions: Array<TrumfTransaction> = [];
  while (i <= content.length) {
    if (isDate(content[i]) && isDate(content[i + 2])) {
      transactions.push(extractTransaction(content, i));
      i = i + 10;
    } else {
      i++;
    }
  }
  return transactions;
};
