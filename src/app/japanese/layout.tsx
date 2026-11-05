import "./museum.css";

export default function JapaneseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="museum">{children}</div>;
}
