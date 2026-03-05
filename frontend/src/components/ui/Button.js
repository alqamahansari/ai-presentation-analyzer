import { theme } from "../../theme";

export default function Button({ children, onClick, variant = "primary" }) {

  const colors = {
    primary: theme.colors.primary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
    neutral: theme.colors.neutral
  };

  return (
    <button
      onClick={onClick}
      style={{
        padding: "14px 30px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: colors[variant],
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  );
}