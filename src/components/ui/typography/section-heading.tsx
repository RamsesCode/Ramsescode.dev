interface SectionHeadingProps {
  number: string;
  label: string;
  title: string;
  description?: string;
  id: string;
}

export function SectionHeading({
  number,
  label,
  title,
  description,
  id,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span className="section-number">{number}</span> {label}
      </p>
      <div className="section-heading-row">
        <h2 id={id}>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
    </div>
  );
}
