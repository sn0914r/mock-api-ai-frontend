import { Link } from "react-router-dom";
import { ArrowLeft, Terminal } from "lucide-react";
import * as S from "../pages/PlaygroundPage.styles";
import * as G from "../../Generate/pages/GeneratePage.styles";

export const PlaygroundEmpty = () => {
  return (
    <S.PageShell>
      <G.EmptyPanel style={{ width: "100%", height: "100%" }}>
        <G.EmptyIcon>
          <Terminal size={32} />
        </G.EmptyIcon>
        <G.EmptyTitle>No API Selected</G.EmptyTitle>
        <G.EmptySub>
          Go back to the Generate page to create and test an API.
        </G.EmptySub>
        <Link
          to="/"
          style={{
            marginTop: "16px",
            color: "var(--accent)",
            textDecoration: "none",
          }}
        >
          <ArrowLeft
            size={16}
            style={{ verticalAlign: "middle", marginRight: "4px" }}
          />
          Back to Generate
        </Link>
      </G.EmptyPanel>
    </S.PageShell>
  );
};
