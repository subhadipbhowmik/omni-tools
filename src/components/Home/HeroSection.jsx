import React from "react";
import HeroImage from "../../assets/images/demo.png";

const HeroSection = () => {
  return (
    <>
      <section className="pt-8 lg:pt-32 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="border border-indigo-600 p-1 w-60 mx-auto rounded-full flex items-center justify-between gap-2 mb-4">
            <span className="font-inter text-xs font-medium text-gray-900 ml-3">
              Unlock the power of SEO Tools
            </span>
            <a
              href="/tools"
              className="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-600"
            >
              <svg
                width={17}
                height={16}
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
          <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px]">
            Optimize Your Website with Our
            <span className="text-indigo-600"> Powerful SEO Tools</span>
          </h1>
          <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
            <span className="text-green-600 font-bold px-2 bg-green-100 rounded-full animate-typing">
              OptiSEO
            </span>{" "}
            offers free online{" "}
            <span className="text-indigo-600 font-bold px-2 bg-indigo-100 rounded-full animate-bounceIn">
              SEO
            </span>{" "}
            tools to optimize your website effortlessly.
          </p>

          {/* Combined Use Tools button and Product Hunt Badge */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-14">
            <a
              href="/tools"
              className="inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-white rounded-full bg-indigo-600 shadow-xs hover:bg-indigo-700 transition-all duration-500"
            >
              Use Tools
              <svg
                className="ml-2"
                width={16}
                height={16}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="https://www.producthunt.com/products/optiseo?utm_source=badge-follow&utm_medium=badge&utm_souce=badge-optiseo"
              target="_blank"
              className="inline-flex items-center justify-center h-11"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=813606&theme=light"
                alt="OptiSEO - Optimize Your Website with Our Powerful SEO Tools | Product Hunt"
                className="w-full h-full"
              />
            </a>
          </div>

          <div className="flex justify-center">
            <img
              src={HeroImage}
              alt="Dashboard image"
              className="rounded-t-3xl h-auto object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
