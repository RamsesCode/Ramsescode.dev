import { TypingText } from "@/components/animations/typing-text";

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
    <div className="section-heading" data-typing-group="scroll">
      <p className="eyebrow">
        <span className="section-number">{number}</span> <TypingText>{label}</TypingText>
      </p>
      <div className="section-heading-row">
        <h2 id={id}>
          <TypingText>{title}</TypingText>
        </h2>
        {description && (
          <p className="section-description">
            <TypingText>{description}</TypingText>
          </p>
        )}
      </div>
    </div>
  );
}
