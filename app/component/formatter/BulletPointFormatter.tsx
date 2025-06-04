// components/BulletList.tsx
type BulletListProps = {
  text: string;
};

export function BulletList({ text }: BulletListProps) {
  const items = text
    .split("\n")
    .map((item) => item.trim().replace(/^•\s*/, ""))
    .filter((item) => item.length > 0);

  return (
    <ul className="list-disc pl-5 space-y-1">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
