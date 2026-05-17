import * as S from "../pages/PlaygroundPage.styles";

export const ResponseSkeleton = () => {
  return (
    <S.ResponseContainer>
      <S.ResponseHeaderRow>
        <div
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
              animation: "pulse 1.5s infinite ease-in-out",
            }}
          />
          Executing request...
        </div>
      </S.ResponseHeaderRow>
      <S.LoadingSkeleton>
        <S.SkeletonLine width="15%" />
        <S.SkeletonLine width="40%" />
        <S.SkeletonLine width="60%" />
        <S.SkeletonLine width="55%" />
        <S.SkeletonLine width="30%" />
        <S.SkeletonLine width="75%" />
        <S.SkeletonLine width="45%" />
        <S.SkeletonLine width="20%" />
      </S.LoadingSkeleton>
    </S.ResponseContainer>
  );
};
