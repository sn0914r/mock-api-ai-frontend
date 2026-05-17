import * as S from "../pages/GeneratePage.styles";

interface ApiResponseTabsProps {
  activeTab: string;
  setActiveTab: (tab: "response" | "schema" | "details") => void;
  itemCount: number;
}

export const ApiResponseTabs = ({
  activeTab,
  setActiveTab,
  itemCount,
}: ApiResponseTabsProps) => {
  return (
    <S.TabBar>
      <S.Tab
        active={activeTab === "response"}
        onClick={() => setActiveTab("response")}
      >
        Response ({itemCount})
      </S.Tab>
      <S.Tab
        active={activeTab === "schema"}
        onClick={() => setActiveTab("schema")}
      >
        Schema
      </S.Tab>
      <S.Tab
        active={activeTab === "details"}
        onClick={() => setActiveTab("details")}
      >
        Details
      </S.Tab>
    </S.TabBar>
  );
};
