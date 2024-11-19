export interface PersonalInfoType {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
}

export interface FinancialDetailsType {
  currentSavings: number;
  monthlyExpenses: number;
  expectedReturn: number;
  inflationRate: number;
}

export interface RetirementIncomeType {
  socialSecurity: number;
  pension: number;
  otherIncome: number;
}

export interface ExtraWithdrawalType {
  age: number;
  amount: number;
  description: string;
}

export interface ProjectionsType {
  monthlyWithdrawal: number;
  portfolioLongevity: number;
  successRate: number;
  legacyAmount: number;
  insights: string[];
  years: number[];
  balances: number[];
  incomeSources: number[];
  withdrawals: number[];
  extraWithdrawals: ExtraWithdrawalType[];
}