import type { FormEvent } from "react";

import {
  ACTION_HELPER_TEXT,
  FORM_DESCRIPTION,
  FORM_TITLE,
  SUBMIT_LABEL,
  YEARLY_RATES_COUNT_NOTE,
  YEARLY_RATES_EMPTY_MESSAGE,
  YEARLY_RATES_READY_MESSAGE,
  YEARLY_RATES_TITLE
} from "../content";
import type { FormState } from "../types";

type SimulationFormProps = {
  errorMessage: string | null;
  formattedPrincipal: string;
  formState: FormState;
  isFormReady: boolean;
  tenorNumber: number;
  onPrincipalChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onTenorChange: (value: string) => void;
  onYearlyRateChange: (index: number, value: string) => void;
};

export function SimulationForm({
  errorMessage,
  formattedPrincipal,
  formState,
  isFormReady,
  tenorNumber,
  onPrincipalChange,
  onSubmit,
  onTenorChange,
  onYearlyRateChange
}: SimulationFormProps) {
  return (
    <section className="card form-card">
      <form onSubmit={onSubmit}>
        <div className="section-head">
          <div>
            <h2>{FORM_TITLE}</h2>
            <p>{FORM_DESCRIPTION}</p>
          </div>
        </div>

        <div className="field-grid">
          <label className="field">
            <span>Principal</span>
            <div className="currency-input">
              <span className="currency-prefix">Rp</span>
              <input
                inputMode="numeric"
                placeholder="Example: 500,000,000"
                type="text"
                value={formattedPrincipal}
                onChange={(event) => onPrincipalChange(event.target.value)}
              />
            </div>
          </label>

          <label className="field">
            <span>Term (Years)</span>
            <input
              inputMode="numeric"
              min="1"
              step="1"
              placeholder="Example: 15"
              type="number"
              value={formState.tenorYears}
              onChange={(event) => onTenorChange(event.target.value)}
            />
            {tenorNumber > 0 ? (
              <small className="field-note">{YEARLY_RATES_COUNT_NOTE(tenorNumber)}</small>
            ) : null}
          </label>
        </div>

        <div className="section-head compact">
          <div>
            <h2>{YEARLY_RATES_TITLE}</h2>
            <p>
              {formState.yearlyInterestRates.length > 0
                ? YEARLY_RATES_READY_MESSAGE(formState.yearlyInterestRates.length)
                : YEARLY_RATES_EMPTY_MESSAGE}
            </p>
          </div>
        </div>

        <div className="rate-grid">
          {formState.yearlyInterestRates.map((rate, index) => (
            <label className="field field-small" key={`year-rate-${index + 1}`}>
              <span>Year {index + 1}</span>
              <div className="suffix-input">
                <input
                  aria-label={`Interest rate for year ${index + 1}`}
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  placeholder="5"
                  type="number"
                  value={rate}
                  onChange={(event) => onYearlyRateChange(index, event.target.value)}
                />
                <span>%</span>
              </div>
            </label>
          ))}
        </div>

        <div className="action-row">
          <p className="helper-text">{ACTION_HELPER_TEXT}</p>
          <button className="primary-button" disabled={!isFormReady} type="submit">
            {SUBMIT_LABEL}
          </button>
        </div>

        {errorMessage ? (
          <p aria-live="polite" className="error-banner">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </section>
  );
}
