import React from 'react';

export const categoryStyles: Record<string, string> = {
  intern: 'bg-coffee-brown/10 text-coffee-brown',
  lecture: 'bg-coffee-latte/50 text-coffee-dark',
  hackathon: 'bg-coffee-espresso/10 text-coffee-espresso',
};

export function formatDescription(description: string): React.ReactNode {
  const sep = description.match(/技術スタック:|Tech stack:/);
  if (!sep || sep.index === undefined) return description;
  return <>{description.slice(0, sep.index)}<br />{description.slice(sep.index)}</>;
}
