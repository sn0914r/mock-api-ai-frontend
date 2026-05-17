import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ApiMetaTable } from "./ApiMetaTable";
import { SchemaPreview } from "./SchemaPreview";

interface PlaygroundSidebarProps {
  apiId: string;
  route: string;
  totalRecords: number;
  createdAt: string;
  schemaJson: string;
  handleCopy: (text: string, label: string) => void;
}

export const PlaygroundSidebar = ({
  apiId,
  route,
  totalRecords,
  createdAt,
  schemaJson,
  handleCopy,
}: PlaygroundSidebarProps) => {
  return (
    <>
      <div style={{ marginBottom: "var(--space-2)" }}>
        <Link
          to="/"
          style={{
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "13px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <ArrowLeft size={14} /> Back to Generate
        </Link>
      </div>

      <ApiMetaTable
        apiId={apiId}
        route={route}
        totalRecords={totalRecords}
        createdAt={createdAt}
      />

      <SchemaPreview
        schemaJson={schemaJson}
        handleCopy={handleCopy}
      />
    </>
  );
};
