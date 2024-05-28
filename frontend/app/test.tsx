"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState, useEffect } from "react";

const Body = () => {
  // State variables
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  function handleOnChangeEvent(e: any) {
    setSearchText(e.target.value);
  }
  const { data: user, isLoading } = useQuery({
    queryKey: ["userss"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=11.01420&lng=76.99410`,
          {
            mode: "no-cors",
          }
        );
        const data = await res.json();
        console.log("data", data);
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  useEffect(() => {
    console.log("learning useEffect Hook");
  }, []);

  const filterRestaurant = async () => {
    const filterData = restaurants.filter((restaurant: any) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredRestaurants(filterData);
    console.log("filtered restaurant", filterData);
  };

  console.log("restaurants", restaurants);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          onChange={() => handleOnChangeEvent}
          value={searchText}
        />
        <button onClick={() => filterRestaurant}>Search</button>
      </div>
      {filteredRestaurants.length === 0 ? (
        <h1>loading</h1>
      ) : (
        <div className="restaurant-container">
          {filteredRestaurants.map((restaurant: any) => (
            <Link
              href={`/restaurant/${restaurant.info.id}`}
              key={restaurant.info.id}
            >
              hello
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Body;
