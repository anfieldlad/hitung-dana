import { formatCurrency, formatPercent, type MortgageSimulationResult } from "@kalkulator-finance/shared";

type ResultTableProps = {
  result: MortgageSimulationResult;
};

export function ResultTable({ result }: ResultTableProps) {
  return (
    <section className="card table-card">
      <div className="section-head">
        <div className="table-heading">
          <h2>Amortization Table</h2>
          <p>{result.totalMonths} monthly payments based on yearly changing interest rates.</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="amortization-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Rate / Year</th>
              <th>Payment</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Remaining Principal</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row) => (
              <tr key={row.monthNumber}>
                <td data-label="Month">{row.monthNumber}</td>
                <td data-label="Year">{row.yearNumber}</td>
                <td data-label="Rate / Year">{formatPercent(row.annualInterestRate)}%</td>
                <td data-label="Payment">{formatCurrency(row.monthlyInstallment)}</td>
                <td data-label="Principal">{formatCurrency(row.principalPayment)}</td>
                <td data-label="Interest">{formatCurrency(row.interestPayment)}</td>
                <td data-label="Remaining Principal">{formatCurrency(row.remainingPrincipal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
