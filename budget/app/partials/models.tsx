export interface Tx_expenses {
  ID: number;
  Date: string;
  Amount: string;
  Institution: string;
  Category: string;
  Subcategory: {String: string, Valid: boolean};
  Comment: string;
}
