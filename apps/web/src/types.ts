export type FormState = {
  downPayment: string;
  principal: string;
  propertyPrice: string;
  tenorYears: string;
  yearlyInterestRates: string[];
};

export type SimulationSummary = {
  totalInterest: number;
  totalPayment: number;
  firstInstallment: number;
  lastInstallment: number;
};
