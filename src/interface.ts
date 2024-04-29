export interface IPaymentJob {
  amount: number;
  beneficiaryAccountNo: string;
  sourceAccountNo: string;
}

export interface IMakeTransactionResult {
  status: string;
  beneficiaryAccountNo: string;
  amount: number;
}
