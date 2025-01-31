"use client";
import React, { useEffect, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useLocationStore } from "@/zustandStore/location";
import { indianStatesAndUTs } from "@/data/global";
import { useGetLocation } from "@/app/_queryCall/csr";

export default function LocationTypeHead() {
  const { location, setLocation } = useLocationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<{ name: string; id: string }[]>([]);
  const { getLocation, loading, error } = useGetLocation();
  useEffect(() => {
    fetchAllOptions();
  }, []);

  // Fetch all options on component mount
  const fetchAllOptions = async () => {
    setIsLoading(true);
    let newOptions: any = [];
    // const newOptions = indianStatesAndUTs.map((opt) => ({ name: opt, id: opt }));
    const { searchResults }: any = await getLocation({ search: "" });
    // console.log(searchResults, "searchResults");
    if (searchResults?.pincodes?.length) {
      newOptions = searchResults.pincodes.map((item: any) => {
        return {
          id: item?.code,
          name: `${item?.code}, ${item?.city?.name}, ${item?.city?.state?.name}, ${item?.city?.state?.country?.name}`,
        };
      });
    }
    if (searchResults?.cities?.length) {
      newOptions = [
        ...newOptions,
        ...searchResults.cities.map((item: any) => ({
          id: item?.name,
          name: `${item?.name}, ${item?.state?.name}, ${item?.state?.country?.name}`,
        })),
      ];
    }
    if (searchResults?.states?.length) {
      newOptions = [
        ...newOptions,
        ...searchResults.states.map((item: any) => ({
          id: item?.name,
          name: `${item?.name}, ${item?.country?.name}`,
        })),
      ];
    }
    if (searchResults?.countries?.length) {
      newOptions = [
        ...newOptions,
        ...searchResults.countries.map((item: any) => ({
          id: item?.name,
          name: `${item?.name}`,
        })),
      ];
    }
    setOptions(newOptions);
    setIsLoading(false);
  };

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Handle search input
  const handleSearch = async (query: string) => {
    setOptions([]);
    setIsLoading(true);

    try {
      // Check query length before proceeding
      if (!query) {
        setIsLoading(false);
        return;
      }

      // Fetch search results
      const { searchResults } = await getLocation({ search: query });

      if (error) {
        console.error("Failed to fetch suggestions:", error);
        setIsLoading(false);
        return;
      }

      // Consolidate options from search results
      const newOptions = [
        ...(searchResults?.countries?.map((item: any) => ({
          id: item?.name,
          name: `${item?.name}`,
        })) || []),
        ...(searchResults?.states?.map((item: any) => ({
          id: item?.name,
          name: `${item?.name}, ${item?.country?.name}`,
        })) || []),
        ...(searchResults?.cities?.map((item: any) => ({
          id: item?.name,
          name: `${item?.name}, ${item?.state?.name}, ${item?.state?.country?.name}`,
        })) || []),
        ...(searchResults?.pincodes?.map((item: any) => ({
          id: item?.code,
          name: `${item?.code}, ${item?.city?.name}, ${item?.city?.state?.name}, ${item?.city?.state?.country?.name}`,
        })) || []),
      ];

      // Update options in one state update
      setOptions(newOptions);
    } catch (err) {
      console.error("Error during search:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedHandleSearch = React.useMemo(() => debounce(handleSearch, 500), []);

  // Update location when an option is selected
  const handleChange = (selected: any) => {
    console.log(selected, "selected");
    let selectedString = selected?.[0]?.name;
    const location = {
      pincode: "",
      city: "",
      state: "",
      country: "",
      selectedLocation: selected?.[0]?.name,
    };
    // console.log(location, "location");
    let selectedArrayLength = selectedString?.split(", ").length || null;
    // console.log(selectedArrayLength, "selectedArrayLength");
    if (selectedArrayLength !== null) {
      if (selectedArrayLength === 4) {
        location.pincode = selectedString?.split(",")[0].trim();
      }
      if (selectedArrayLength === 3) {
        location.city = selectedString?.split(",")[0].trim();
      }
      if (selectedArrayLength === 2) {
        location.state = selectedString?.split(",")[0].trim();
      }
      if (selectedArrayLength === 1) {
        location.country = selectedString?.split(",")[0].trim();
      }
      setLocation(location);
    }
  };

  return (
    <AsyncTypeahead
      id="location-typeahead"
      onFocus={() => {
        setOptions([]);
        fetchAllOptions();
      }}
      onSearch={debouncedHandleSearch}
      onChange={handleChange}
      options={options}
      labelKey="name"
      isLoading={isLoading}
      minLength={0}
      defaultInputValue={location?.selectedLocation}
      placeholder="Location"
      inputProps={{ className: "border-none rounded-lg p-1 pl-3 !w-full" }}
      useCache={true}
      renderMenuItemChildren={(option: any) => (
        <div className="z-[99999999] flex flex-col gap-3 bg-white px-2 py-1 capitalize hover:bg-gray-100">
          <p className="cursor-pointer text-sm capitalize">{option.name}</p>
        </div>
      )}
    />
  );
}
