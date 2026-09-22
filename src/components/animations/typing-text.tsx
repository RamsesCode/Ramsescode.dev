/** Full text stays in the document, with each word reserving its final layout space. */
export function TypingText({ children }: { children: string }) {
  return (
    <span data-typing-text>
      {children.split(/(\s+)/u).map((part, index) =>
        /\S/u.test(part) ? (
          <span className="typing-word" data-typing-word key={index}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
}
