import { ViewTransition, type ReactNode } from "react";

/**
 * The project's picture keeps its identity between a card and its page: the browser morphs one
 * into the other on navigation. `default="none"` keeps it still during unrelated transitions.
 */
export function SharedMedia({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <ViewTransition name={`project-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
