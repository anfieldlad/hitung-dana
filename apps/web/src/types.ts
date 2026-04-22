export type FormState = {
  principal: string;
  tenorYears: string;
  yearlyInterestRates: string[];
};

export type SimulationSummary = {
  totalInterest: number;
  totalPayment: number;
  firstInstallment: number;
  lastInstallment: number;
};
