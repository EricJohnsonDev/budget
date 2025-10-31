export const formatCentAmount = (centsIn: number): string => {
  let dollars = Math.floor(centsIn / 100);
  let cents = centsIn % 100;
  let result = `$${dollars}.${cents}`;

  return result;
};

export const convertAmountToCents = (amount: string) => {
  let trimmedAmt = amount
    .replace(")", "")
    .replace("(", "-")
    .replace("$", "")
    .replace(",", "");

  let formattedAmt = trimmedAmt.split(".");
  let dollars = formattedAmt[0];
  let cents = formattedAmt[1];

  return parseInt(dollars) * 100 + parseInt(cents);
};