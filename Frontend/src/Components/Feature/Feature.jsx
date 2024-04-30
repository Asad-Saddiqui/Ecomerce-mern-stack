import React from 'react';

// Component to represent a single feature with a centered image
const FeatureItem = ({ title, description, imageIndex }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="w-20 h-20 relative flex justify-center items-center">
        <div className="w-20 h-20 absolute rounded-full bg-zinc-800 opacity-30"></div>
        <div
          className="w-[58px] h-[58px] rounded-full absolute flex justify-center items-center"
          style={{
            backgroundImage: `url("https://source.unsplash.com/random?sig=${imageIndex}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      <div className="flex flex-col justify-start items-center gap-2">
        <h3 className="text-black text-xl font-semibold leading-7">{title}</h3>
        <p className="text-center text-black text-sm font-normal leading-[21px]">
          {description}
        </p>
      </div>
    </div>
  );
};

const Feature = () => {
  const features = [
    {
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140',
      imageIndex: 1,
    },
    {
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support',
      imageIndex: 2,
    },
    {
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days',
      imageIndex: 3,
    },
  ];

  return (
    <div className="px-10 flex justify-center mb-20 mt-10">
      <div className="max-w-screen-lg w-full flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6 md:gap-[88px]">
        {features.map((feature, index) => (
          <FeatureItem
            key={index}
            title={feature.title}
            description={feature.description}
            imageIndex={feature.imageIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default Feature;
