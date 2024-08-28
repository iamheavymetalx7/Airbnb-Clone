"use client";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";
export const maxDuration = 60; // This function can run for a maximum of 5 seconds

function NavSearch() {
  const searchParams = useSearchParams();

  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/?${params.toString()}`);
  }, 300);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams.get("search")]);

  return (
    <Input
      type="search"
      placeholder="find a property..."
      className="max-w-xs dark:bg-muted "
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
}
export default NavSearch;

/*


The NavSearch component is a search input field that
 updates the URL based on user input. 
 It leverages client-side hooks and debouncing 
 to ensure that search query updates are managed 
 efficiently and reflect in the URL, providing a better user 
 experience and enabling URL sharing/bookmarking of search results.


replace from useRouter updates the URL without causing a full page reload.


searchParams: This provides access to the current URL parameters, allowing the component to read the initial search query and to update the URL based on new searches.

setSearch: Updates the local state of the search query, ensuring the input field displays the correct value.

handleSearch: Debounced function that updates the URL with the current search query, improving performance and preventing excessive updates.






*/
