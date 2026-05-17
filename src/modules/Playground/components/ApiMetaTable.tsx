import * as S from "../pages/PlaygroundPage.styles";

interface ApiMetaTableProps {
  apiId: string;
  route: string;
  totalRecords: number;
  createdAt: string;
}

export const ApiMetaTable = ({
  apiId,
  route,
  totalRecords,
  createdAt,
}: ApiMetaTableProps) => {
  return (
    <div>
      <S.SectionTitle>API Details</S.SectionTitle>
      <S.MetaTable>
        <S.MetaRow>
          <S.MetaKey>API ID</S.MetaKey>
          <S.MetaValue title={apiId}>{apiId}</S.MetaValue>
        </S.MetaRow>
        <S.MetaRow>
          <S.MetaKey>Route</S.MetaKey>
          <S.MetaValue>{route}</S.MetaValue>
        </S.MetaRow>
        <S.MetaRow>
          <S.MetaKey>Records</S.MetaKey>
          <S.MetaValue>{totalRecords}</S.MetaValue>
        </S.MetaRow>
        <S.MetaRow>
          <S.MetaKey>Created</S.MetaKey>
          <S.MetaValue>{createdAt}</S.MetaValue>
        </S.MetaRow>
      </S.MetaTable>
    </div>
  );
};
