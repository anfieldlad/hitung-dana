import { formatCurrency } from "@kalkulator-finance/shared";

import type { SimulationSummary } from "../types";

type ComparisonSummaryProps = {
  leftLabel: string;
  leftSummary: SimulationSummary;
  rightLabel: string;
  rightSummary: SimulationSummary;
};

function formatDifference(left: number, right: number): string {
  return formatCurrency(Math.abs(left - right));
}

export function ComparisonSummary({
  leftLabel,
  leftSummary,
  rightLabel,
  rightSummary
}: ComparisonSummaryProps) {
  const cheaperTotalPaymentLabel =
    leftSummary.totalPayment <= rightSummary.totalPayment ? leftLabel : rightLabel;
  const cheaperInterestLabel =
    leftSummary.totalInterest <= rightSummary.totalInterest ? leftLabel : rightLabel;

  const items = [
    {
      label: "Lower total paid",
      winner: cheaperTotalPaymentLabel,
      difference: formatDifference(leftSummary.totalPayment, rightSummary.totalPayment)
    },
    {
      label: "Lower total interest",
      winner: cheaperInterestLabel,
      difference: formatDifference(leftSummary.totalInterest, rightSummary.totalInterest)
    }
  ];

  return (
    <section className="comparison-card">
      <div className="comparison-header">
        <div>
          <h2>Compare Options</h2>
          <p>See which option gives you a lower total cost.</p>
        </div>
      </div>

      <div className="comparison-grid">
        {items.map((item) => (
          <article className="comparison-item" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.winner}</strong>
            <p>Difference: {item.difference}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
