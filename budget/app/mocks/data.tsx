export const createTestRow = (
  date: string,
  amount: string,
  institution: string,
  category: string,
  subcategory: string,
  comment: string,
) => {
  return {
    Date: date,
    Amount: amount,
    Institution: institution,
    Category: category,
    Subcategory: subcategory,
    Comment: comment,
  };
};

export const createIncrementalTestRows = (
  count: number,
  date: string,
  amount: string,
  institution: string,
  category: string,
  subcategory: string,
  comment: string,
) => {
  let result = [];

  for (let i = 0; i < count; i++) {
    let d = new Date(date);
    d.setDate(d.getDate() + i);
    let newDate = formatDate(d.getFullYear(), d.getMonth(), d.getDate());

    let amt = Number(amount) + i;

    result.push(
      createTestRow(
        newDate,
        String(amt.toFixed(2)),
        institution,
        category,
        subcategory,
        comment,
      ),
    );
  }

  return result;
};

const formatDate = (year: number, month: number, day: number) => {
  const fMonth = ("0" + (month + 1)).slice(-2);
  const fDay = ("0" + day).slice(-2);

  return year + "-" + fMonth + "-" + fDay;
};
