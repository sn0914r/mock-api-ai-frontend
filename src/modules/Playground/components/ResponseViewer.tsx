import { ResponseEmpty } from "./ResponseEmpty";
import { ResponseSkeleton } from "./ResponseSkeleton";
import { ResponseDisplay } from "./ResponseDisplay";

interface ResponseViewerProps {
  lastResponse: { status: number; data: unknown } | null;
  isPending: boolean;
  handleCopy: (text: string, label: string) => void;
}

export const ResponseViewer = ({
  lastResponse,
  isPending,
  handleCopy,
}: ResponseViewerProps) => {
  if (isPending) {
    return <ResponseSkeleton />;
  }

  if (!lastResponse) {
    return <ResponseEmpty />;
  }

  return (
    <ResponseDisplay
      lastResponse={lastResponse}
      handleCopy={handleCopy}
    />
  );
};
