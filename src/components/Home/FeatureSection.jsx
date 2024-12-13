import React from "react";
import { UserCheck, DollarSign, Activity, Wrench } from "lucide-react";

function FeatureSection() {
  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="py-1 px-4 bg-indigo-100 rounded-full text-xs font-medium text-indigo-600 text-center">
              Features
            </span>
            <h2 className="text-4xl text-center font-bold text-gray-900 py-5">
              Revolutionary Features
            </h2>
            <p className="text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto">
              OptiSEO provides advanced tools and services designed to optimize
              your website effortlessly—no sign-ups, no hassles, just powerful
              SEO solutions.
            </p>
          </div>
          <div className="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
            <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
              <div className="bg-indigo-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-indigo-600">
                <UserCheck className="stroke-indigo-600 transition-all duration-500 group-hover:stroke-white" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">
                No Account Needed
              </h4>
              <p className="text-sm font-normal text-gray-500">
                Start using our SEO tools instantly without the need to create
                an account. Hassle-free and quick access!
              </p>
            </div>
            <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
              <div className="bg-pink-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-pink-600">
                <DollarSign className="stroke-pink-600 transition-all duration-500 group-hover:stroke-white" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">
                Completely Free
              </h4>
              <p className="text-sm font-normal text-gray-500">
                Enjoy unlimited access to all our SEO tools at no cost. No
                hidden charges or premium subscriptions required.
              </p>
            </div>
            <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
              <div className="bg-teal-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-teal-600">
                <Activity className="stroke-teal-600 transition-all duration-500 group-hover:stroke-white" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">
                Real-Time Analysis
              </h4>
              <p className="text-sm font-normal text-gray-500">
                Get instant insights with real-time website analysis to enhance
                your SEO strategy effectively.
              </p>
            </div>
            <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
              <div className="bg-orange-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-orange-600">
                <Wrench className="stroke-orange-600 transition-all duration-500 group-hover:stroke-white" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">
                All-in-One Toolbox
              </h4>
              <p className="text-sm font-normal text-gray-500">
                Access a comprehensive suite of tools for keyword research,
                backlink checks, meta tags, and more in one place.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeatureSection;
