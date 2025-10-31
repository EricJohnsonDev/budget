export const formatCentAmount = (centsIn: number): string => {
  let dollars = centsIn.toString().slice(0, -2);
  let cents = centsIn.toString().slice(-2);

  return `$${dollars}.${cents}`;
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
