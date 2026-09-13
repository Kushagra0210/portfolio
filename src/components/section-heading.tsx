export function SectionHeading({ number, eyebrow, title, copy }: { number: string; eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="section-heading">
      <div className="section-index">{number}</div>
      <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy ? <p className="section-copy">{copy}</p> : null}</div>
    </div>
  );
}
