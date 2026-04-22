type EmptyStateProps = {
  description: string;
  title: string;
};

export function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <section className="card empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
