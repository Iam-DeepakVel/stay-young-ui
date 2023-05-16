import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto mt-20 h-screen flex items-start justify-center">
      <Image src="/assets/loading.svg" alt="loading" width={200} height={200} />
    </div>
  );
};

export default Loading;
