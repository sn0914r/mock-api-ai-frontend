import * as S from "../pages/GeneratePage.styles";

interface ApiMetaTableProps {
  apiId: string;
  route: string;
  itemsCount: number;
  createdAt: string;
  fullUrl: string;
}

export const ApiMetaTable = ({
  apiId,
  route,
  itemsCount,
  createdAt,
  fullUrl,
}: ApiMetaTableProps) => {
  return (
    <S.MetaTable>
      <S.MetaRow>
        <S.MetaKey>API ID</S.MetaKey>
        <S.MetaValue>{apiId}</S.MetaValue>
      </S.MetaRow>
      <S.MetaRow>
        <S.MetaKey>Route</S.MetaKey>
        <S.MetaValue>{route}</S.MetaValue>
      </S.MetaRow>
      <S.MetaRow>
        <S.MetaKey>Items</S.MetaKey>
        <S.MetaValue>{itemsCount}</S.MetaValue>
      </S.MetaRow>
      <S.MetaRow>
        <S.MetaKey>Created</S.MetaKey>
        <S.MetaValue>{createdAt}</S.MetaValue>
      </S.MetaRow>
      <S.MetaRow>
        <S.MetaKey>Full URL</S.MetaKey>
        <S.MetaValue>{fullUrl}</S.MetaValue>
      </S.MetaRow>
    </S.MetaTable>
  );
};
