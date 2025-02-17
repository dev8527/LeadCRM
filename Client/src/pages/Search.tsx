import { useState } from "react";
import DashboardLayout from "../components/MainLayout";
import SearchInterface from "../components/SearchContent"; // Ensure this is the correct path

const SearchPage = () => {
  const [prospects, setProspects] = useState([]); // Holds search results

  return (
    <DashboardLayout>
      {/* Pass prospects and setProspects to SearchInterface */}
      <SearchInterface onSearch={setProspects} prospects={prospects} />
    </DashboardLayout>
  );
};

export default SearchPage;
