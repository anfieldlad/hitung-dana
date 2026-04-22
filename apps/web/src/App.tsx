import { EmptyState } from "./components/EmptyState";
import { ResultTable } from "./components/ResultTable";
import { SimulationForm } from "./components/SimulationForm";
import { SummaryCards } from "./components/SummaryCards";
import {
  EMPTY_TABLE_DESCRIPTION,
  EMPTY_TABLE_TITLE,
  PAGE_DESCRIPTION,
  PAGE_TITLE
} from "./content";
import { useMortgageSimulation } from "./hooks/useMortgageSimulation";

export default function App() {
  const currentYear = new Date().getFullYear();
  const {
    errorMessage,
    formIsReady,
    formState,
    formattedPrincipal,
    handleSubmit,
    result,
    summary,
    tenorNumber,
    updatePrincipal,
    updateTenor,
    updateYearlyRate
  } = useMortgageSimulation();

  return (
    <main className="app-shell">
      <section className="page-header">
        <h1>{PAGE_TITLE}</h1>
        <p>{PAGE_DESCRIPTION}</p>
      </section>

      <SimulationForm
        errorMessage={errorMessage}
        formattedPrincipal={formattedPrincipal}
        formState={formState}
        isFormReady={formIsReady}
        tenorNumber={tenorNumber}
        onPrincipalChange={updatePrincipal}
        onSubmit={handleSubmit}
        onTenorChange={updateTenor}
        onYearlyRateChange={updateYearlyRate}
      />

      {summary ? <SummaryCards summary={summary} /> : null}
      {result ? (
        <ResultTable result={result} />
      ) : (
        <EmptyState description={EMPTY_TABLE_DESCRIPTION} title={EMPTY_TABLE_TITLE} />
      )}

      <footer className="app-footer">
        <p>
          &copy; {currentYear}{" "}
          <a href="https://badai.tech/" rel="noreferrer" target="_blank">
            BAD AI
          </a>
        </p>
      </footer>
    </main>
  );
}
