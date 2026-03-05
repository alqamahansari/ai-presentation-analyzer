import { theme } from "../../theme";

export default function Card({ children, style }) {
  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: "12px",
        padding: "40px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
        ...style
      }}
    >
      {children}
    </div>
  );
}