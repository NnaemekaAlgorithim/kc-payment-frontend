import React from "react";
import { DotLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-secondary opacity-75 flex items-center justify-center z-100">
      <DotLoader color="#a238ff" size={60} />
    </div>
  );
};

export default Loader;
