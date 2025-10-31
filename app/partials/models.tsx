export interface Tx_expenses {
  ID?: number;
  Date: string;
  Amount: string;
  Institution: string;
  Category: string;
  Subcategory: string;
  Comment: string;
}

/* Helper models for aggregating expenses by category */
export interface categoryData {
  name: string;
  amount: number;
  subcategory: Map<string, subcategoryData>;
}

export interface subcategoryData {
  name: string;
  amount: number;
}
