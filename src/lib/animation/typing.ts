interface TypingWord {
  element: HTMLElement;
  text: Text;
  offsets: number[];
  boundaries: number[];
  start: number;
  originalClip: string;
  originalPriority: string;
  lastClip: string;
}

export interface TypingTrack {
  state: { count: number };
  length: number;
  render: (force?: boolean) => void;
  measure: () => void;
  restore: () => void;
}

const graphemes =
  typeof Intl.Segmenter === "function"
    ? new Intl.Segmenter("en", { granularity: "grapheme" })
    : null;

function characterOffsets(text: string): number[] {
  if (graphemes) {
    return Array.from(
      graphemes.segment(text),
      ({ index, segment }) => index + segment.length,
    );
  }
  // Older browsers can still type this copy without splitting UTF-16 surrogate pairs.
  let offset = 0;
  return Array.from(text, (character) => (offset += character.length));
}

/** Measure once, then reveal whole glyphs without changing text, wrapping, or React state. */
export function createTypingTrack(element: HTMLElement): TypingTrack {
  let length = 0;
  let lastCount = -1;
  const state = { count: 0 };
  const originalProgress = element.getAttribute("data-typing-progress");
  const words: TypingWord[] = [];

  for (const word of element.querySelectorAll<HTMLElement>("[data-typing-word]")) {
    const text = word.firstChild;
    if (!(text instanceof Text)) continue;
    const offsets = characterOffsets(text.data);
    words.push({
      element: word,
      text,
      offsets,
      boundaries: [],
      start: length,
      originalClip: word.style.getPropertyValue("clip-path"),
      originalPriority: word.style.getPropertyPriority("clip-path"),
      lastClip: "",
    });
    length += offsets.length;
  }

  function render(force = false) {
    const count = Math.max(0, Math.min(length, Math.floor(state.count + 0.0001)));
    if (!force && count === lastCount) return;
    lastCount = count;

    for (const word of words) {
      const visible = Math.max(0, Math.min(word.offsets.length, count - word.start));
      let clip: string;
      if (visible === 0) clip = "inset(0 100% 0 0)";
      else if (visible === word.offsets.length) clip = "none";
      else {
        const right = (1 - word.boundaries[visible - 1]) * 100;
        clip = `inset(-0.3em ${right.toFixed(4)}% -0.3em -0.15em)`;
      }
      if (force || clip !== word.lastClip) {
        word.element.style.clipPath = clip;
        word.lastClip = clip;
      }
    }
    element.setAttribute("data-typing-progress", String(length ? count / length : 1));
  }

  function measure() {
    const range = document.createRange();
    for (const word of words) {
      range.setStart(word.text, 0);
      range.collapse(true);
      // Subtract the rotated caret width so the hero's rotation/scale cancel out.
      const caretWidth = range.getBoundingClientRect().width;
      range.setEnd(word.text, word.text.length);
      const fullWidth = range.getBoundingClientRect().width - caretWidth;
      word.boundaries = word.offsets.map((offset, index) => {
        if (index === word.offsets.length - 1) return 1;
        range.setEnd(word.text, offset);
        const fraction =
          fullWidth > 0
            ? (range.getBoundingClientRect().width - caretWidth) / fullWidth
            : (index + 1) / word.offsets.length;
        return Math.max(0, Math.min(1, fraction));
      });
    }
    render(true);
  }

  function restore() {
    for (const word of words) {
      if (word.originalClip) {
        word.element.style.setProperty(
          "clip-path",
          word.originalClip,
          word.originalPriority,
        );
      } else word.element.style.removeProperty("clip-path");
    }
    if (originalProgress === null) element.removeAttribute("data-typing-progress");
    else element.setAttribute("data-typing-progress", originalProgress);
  }

  measure();
  return { state, length, render, measure, restore };
}
