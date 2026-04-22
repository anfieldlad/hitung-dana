export const PAGE_TITLE = "HitungDana";

export const PAGE_DESCRIPTION =
  "Estimate your monthly mortgage payments with a different interest rate for each year.";

export const FORM_TITLE = "Scenario";

export const FORM_DESCRIPTION =
  "Enter the loan amount, loan term, and yearly interest rates. Use extra options only if you need them.";

export const YEARLY_RATES_TITLE = "Interest Rate by Year";

export const YEARLY_RATES_EMPTY_MESSAGE =
  "Add the loan term first to show the yearly rate fields.";

export const YEARLY_RATES_READY_MESSAGE = (count: number) =>
  `${count} yearly rate fields are ready.`;

export const YEARLY_RATES_COUNT_NOTE = (count: number) =>
  `${count} yearly rate fields will be shown.`;

export const ACTION_HELPER_TEXT =
  "Your monthly payment updates at the start of each year based on that year's interest rate.";

export const SUBMIT_LABEL = "Show Payment Table";

export const ADVANCED_OPTIONS_TITLE = "Optional Inputs";

export const ADVANCED_OPTIONS_DESCRIPTION =
  "Want help calculating the loan amount? Add the property price and down payment here.";

export const PROPERTY_PRICE_LABEL = "Property Price";

export const DOWN_PAYMENT_LABEL = "Down Payment";

export const CALCULATED_PRINCIPAL_LABEL = "Loan Amount";

export const USE_CALCULATED_PRINCIPAL_LABEL = "Use This Amount";

export const COMPARE_SCENARIO_BUTTON = "Compare Another Option";

export const HIDE_COMPARE_SCENARIO_BUTTON = "Hide Compare";

export const SCENARIO_A_LABEL = "Option A";

export const SCENARIO_B_LABEL = "Option B";

export const EMPTY_TABLE_TITLE = "Payment Table";

export const EMPTY_TABLE_DESCRIPTION =
  "Fill in the required fields to see your monthly payment schedule.";

export const TABLE_FILTER_LABEL = "View";

export const TABLE_FILTER_ALL = "All Months";

export const TABLE_FILTER_YEAR = (year: number) => `Year ${year}`;

export const TABLE_RESULTS_DESCRIPTION = (visibleMonths: number, totalMonths: number) =>
  visibleMonths === totalMonths
    ? `${totalMonths} monthly payments based on the yearly rates you entered.`
    : `Showing ${visibleMonths} monthly payments for the selected year.`;
