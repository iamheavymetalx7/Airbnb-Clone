import { Suspense } from "react";
import { ChartsLoadingContainer, StatsLoadingContainer } from "./Loading";
import StatsContainer from "./StatsContainer";
import ChartsContainer from "./ChartsContainer";
async function AdminPage() {
  return (
    <>
      <Suspense fallback={<StatsLoadingContainer />}>
        <StatsContainer />
      </Suspense>
      <Suspense fallback={<ChartsLoadingContainer />}>
        <ChartsContainer />
      </Suspense>
    </>
  );
}
export default AdminPage;
