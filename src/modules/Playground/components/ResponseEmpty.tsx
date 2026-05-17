import { Terminal } from "lucide-react";

export const ResponseEmpty = () => {
  return (
    <div
      style={{
        marginTop: "var(--space-4)",
        flex: 1,
        padding: "40px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-dim)",
        background: "var(--surface)",
        borderRadius: "var(--radius)",
        border: "1px dashed var(--border)",
      }}
    >
      <Terminal size={24} style={{ marginBottom: "12px", opacity: 0.5 }} />
      <span
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--text)",
        }}
      >
        Ready to send
      </span>
      <span style={{ fontSize: "12px", marginTop: "4px" }}>
        Click "Send Request" to fetch the response.
      </span>
    </div>
  );
};
