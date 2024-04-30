import React from 'react';

const ImagesSec = () => {
  return (
    <section className='px-4 md:px-10 my-20'>
      <article className="w-full max-w-[1170px] h-[768px] md:flex-col md:justify-start md:items-start md:gap-[60px] md:inline-flex">
        <header className=" md:flex-col md:justify-start md:items-start md:gap-5 md:flex">
          <div className="md:justify-start md:items-center md:gap-4 md:inline-flex">
            <span className="w-5 h-10 flex-col justify-center items-center inline-flex">
              <span className="w-5 h-10 bg-red-500 rounded" />
            </span>
            <h2 className="text-red-500 text-base font-semibold font-Poppins leading-tight h-max overflow-y-hidden">Featured</h2>
          </div>
          <h1 className="text-black text-4xl font-semibold font-Inter leading-[48px] tracking-wider">New Arrival</h1>
        </header>
        <div className="md:justify-start md:items-start md:gap-[30px] md:inline-flex">
          <div className="w-full md:w-[570px] h-[600px] relative bg-black rounded">
            <img className="w-[511px] h-[511px] left-[29px] top-[89px] absolute" src="https://source.unsplash.com/random" alt="Featured Image" />
            <div className="left-[32px] top-[446px] absolute flex-col justify-start items-start gap-4 inline-flex">
              <div className="flex-col justify-start items-start gap-4 flex">
                <h3 className="text-neutral-50 text-2xl font-semibold font-Inter leading-normal tracking-wide">PlayStation 5</h3>
                <p className="w-full md:w-[255px] text-neutral-50 text-sm font-normal font-Poppins leading-[21px]">Black and White version of the PS5 coming out on sale.</p>
              </div>
              <div className="flex-col justify-start items-start flex">
                <p className="text-white text-base font-medium font-Poppins leading-normal">Shop Now</p>
                <div className="w-[81px] h-[0px] opacity-50 justify-center items-center inline-flex">
                  <div className="w-[81px] h-[0px] border border-white"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-center gap-8 md:inline-flex">
            <div className="w-full md:w-[570px] h-[284px] relative bg-stone-950 rounded">
              <img className="w-[432px] h-[286px] left-[570px] top-0 absolute origin-top-left rotate-180" src="https://source.unsplash.com/random" alt="Image 1" />
              <div className="left-[24px] top-[138px] absolute flex-col justify-start items-start gap-4 inline-flex">
                <div className="flex-col justify-start items-start gap-4 flex">
                  <h3 className="text-neutral-50 text-2xl font-semibold font-Inter leading-normal tracking-wide">Men’s Collections</h3>
                  <p className="w-full md:w-[255px] text-neutral-50 text-sm font-normal font-Poppins leading-[21px]">Featured woman collections that give you another vibe.</p>
                </div>
                <div className="flex-col justify-start items-start flex">
                  <p className="text-white text-base font-medium font-Poppins leading-normal">Shop Now</p>
                  <div className="w-[81px] h-[0px] opacity-50 justify-center items-center inline-flex">
                    <div className="w-[81px] h-[0px] border border-white"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-center items-center gap-[30px] md:inline-flex">
              <div className="w-full md:w-[270px] h-[284px] relative bg-black rounded">
                <div className="w-[210px] h-[222px] px-2.5 pb-px left-[30px] top-[31px] absolute flex-col justify-center items-center inline-flex">
                  <img className="w-[190px] h-[221px]" src="https://source.unsplash.com/random" alt="Image 2" />
                </div>
                <div className="left-[24px] top-[175px] absolute flex-col justify-start items-start gap-2 inline-flex">
                  <div className="flex-col justify-start items-start gap-2 flex">
                    <h3 className="text-neutral-50 text-2xl font-semibold font-Inter leading-normal tracking-wide">leather</h3>
                    <p className="w-full md:w-[191px] text-neutral-50 text-sm font-normal font-Poppins leading-[21px]">Amazon wireless speakers</p>
                  </div>
                  <div className="flex-col justify-start items-start flex">
                    <p className="text-white text-base font-medium font-Poppins leading-normal">Shop Now</p>
                    <div className="w-[81px] h-[0px] opacity-50 justify-center items-center inline-flex">
                      <div className="w-[81px] h-[0px] border border-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[270px] h-[284px] relative bg-black rounded">
                <div className="h-[222px] pl-1 pr-[5px] pt-2 pb-[11px] left-[30px] top-[30px] absolute flex-col justify-center items-center inline-flex">
                  <img className="w-[201px] h-[203px]" src="https://source.unsplash.com/random" alt="Image 3" />
                </div>
                <div className="left-[24px] top-[175px] absolute flex-col justify-start items-start gap-2 inline-flex">
                  <div className="flex-col justify-start items-start gap-2 flex">
                    <h3 className="text-neutral-50 text-2xl font-semibold font-Inter leading-normal tracking-wide">Belt</h3>
                    <p className="w-full md:w-[191px] text-neutral-50 text-sm font-normal font-Poppins leading-[21px]">GUCCI INTENSE OUD EDP</p>
                  </div>
                  <div className="flex-col justify-start items-start flex">
                    <p className="text-white text-base font-medium font-Poppins leading-normal">Shop Now</p>
                    <div className="w-[81px] h-[0px] opacity-50 justify-center items-center inline-flex">
                      <div className="w-[81px] h-[0px] border border-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ImagesSec;
