import React from 'react';

const ImageComp = () => {
  return (
    <div className="mx-auto max-w-screen-lg"> {/* Centering the content and setting maximum width */}
      <div className="imgCom mt-24 rounded-3xl py-32 px-6 sm:px-14"> {/* Adding padding with responsive padding on small screens */}
        <h1 className="text-green-400 font-semibold">Categories</h1>
        <h1 className="text-3xl font-bold text-white overflow-y-hidden">
          Enhance Your <br /> Footwear Experience
        </h1>
        <h1 className="px-4 py-2 text-black bg-green-400 font-semibold w-min rounded">
          Categories
        </h1>
      </div>
    </div>
  );
};

export default ImageComp;
