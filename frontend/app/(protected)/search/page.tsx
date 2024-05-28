import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "SearchPage",
};

const SearchPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className=""> Search page </h1>
    </div>
  );
};

export default SearchPage;
