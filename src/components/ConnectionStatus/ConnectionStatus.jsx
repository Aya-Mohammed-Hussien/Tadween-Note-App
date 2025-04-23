import React from "react";
import { Offline } from "react-detect-offline";

export default function ConnectionStatus() {
  return (
    <Offline>
      <div className="bg-red-800 px-4 py-2 text-white text-xs md:text-base fixed bottom-4 left-1/2 transform -translate-x-1/2 md:left-28 md:translate-x-0 border border-transparent rounded-md shadow-md z-50 w-[70%] md:w-auto">
        You are currently offline. Please check your internet connection.
      </div>
    </Offline>
  );
}
