import type { DiffSegment } from "@/types/analysis";

export function diffWords(original: string, proposed: string): DiffSegment[] {
  const oldWords = original.split(/(\s+)/);
  const newWords = proposed.split(/(\s+)/);
  const segments: DiffSegment[] = [];

  const m = oldWords.length;
  const n = newWords.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        oldWords[i - 1] === newWords[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const result: DiffSegment[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldWords[i - 1] === newWords[j - 1]) {
      result.push({ type: "equal", text: oldWords[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.push({ type: "insert", text: newWords[j - 1] });
      j--;
    } else {
      result.push({ type: "delete", text: oldWords[i - 1] });
      i--;
    }
  }

  result.reverse();

  for (const seg of result) {
    const last = segments[segments.length - 1];
    if (last && last.type === seg.type) {
      last.text += seg.text;
    } else {
      segments.push({ ...seg });
    }
  }

  return segments;
}
