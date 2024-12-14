import { Locate, Mail, Phone } from "lucide-react";
import React from "react";
import { Github, Linkedin, Twitter, Globe, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | OptiSEO</title>
        <meta
          name="description"
          content="Get in touch with OptiSEO to learn more about our comprehensive SEO tools, services, and support for optimizing your website's performance."
        />
        <link rel="canonical" href="https://optiseo.vercel.app/contact" />
        <meta
          name="keywords"
          content="contact OptiSEO, SEO tools support, website optimization help, improve site ranking"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="OptiSEO Team" />

        {/* <!-- Open Graph Metadata --> */}
        <meta property="og:title" content="Contact Us | OptiSEO" />
        <meta
          property="og:description"
          content="Reach out to the OptiSEO team for expert advice on using our SEO tools to boost your website's ranking and performance."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://optiseo.vercel.app/contact" />
        <meta property="og:locale" content="en_US" />

        {/* <!-- Twitter Metadata --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | OptiSEO" />
        <meta
          name="twitter:description"
          content="Need help with SEO? Contact OptiSEO to explore our all-in-one SEO solutions and expert support for your website."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta name="twitter:site" content="@YourTwitterHandle" />

        {/*  Favicon  */}
        <link rel="icon" href="https://optiseo.vercel.app/favicon.ico" />
      </Helmet>

      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
            <div className="flex items-center lg:mb-0 mb-10">
              <div className="">
                <h4 className="text-indigo-600 text-base font-medium leading-6 mb-4 lg:text-left text-center">
                  Contact Us
                </h4>
                <h2 className="text-gray-900 font-manrope text-4xl font-semibold leading-10 mb-9 lg:text-left text-center">
                  Reach Out To Us
                </h2>
                <form action="">
                  <input
                    type="text"
                    className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4 mb-8"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4 mb-8"
                    placeholder="Email"
                  />
                  <textarea
                    name=""
                    id="text"
                    className="w-full h-48 shadow-sm resize-none text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-2xl border border-gray-200 focus:outline-none px-4 py-4 mb-8"
                    placeholder="Phone"
                    defaultValue={""}
                  />
                  <button className="w-full h-12 text-center text-white text-base font-semibold leading-6 rounded-full bg-indigo-600 shadow transition-all duration-700 hover:bg-indigo-800">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:max-w-xl w-full h-[600px] flex items-center justify-center  bg-cover bg-no-repeat bg-[url('https://pagedone.io/asset/uploads/1696245837.png')] ">
              <div className="">
                <div className="lg:w-96 w-auto h-auto bg-white shadow-xl lg:p-6 p-4 rounded-lg">
                  <a
                    href="https://optiseo.vercel.app/"
                    className="flex justify-center mb-3"
                  >
                    <TrendingUp className="w-8 h-8 text-indigo-600" />
                    <span className="ml-2 text-xl font-bold text-indigo-600">
                      OptiSEO
                    </span>
                  </a>
                  <a
                    href="callto:7550814404"
                    className="flex items-center mb-6"
                  >
                    <Phone className="w-8 h-8 text-indigo-600" />
                    <h5 className="text-black text-base font-normal leading-6 ml-5">
                      75508-14404
                    </h5>
                  </a>
                  <a
                    href="mailto:shubhadipbhowmikdev@gmail.com"
                    className="flex items-center mb-6"
                  >
                    <Mail className="w-8 h-8 text-indigo-600" />
                    <h5 className="text-black text-base font-normal leading-6 ml-5">
                      shubhadipbhowmikdev@gmail
                    </h5>
                  </a>
                  <a href="#" className="flex items-center mb-6">
                    <Locate className="w-8 h-8 text-indigo-600" />
                    <h5 className="text-black text-base font-normal leading-6 ml-5">
                      Kolkata, India
                    </h5>
                  </a>
                  <div className="flex items-center justify-center border-t border-gray-100 pt-6">
                    <a
                      href="https://github.com/subhadipbhowmik"
                      target="_blank"
                      className="w-8 h-8 mr-4 rounded-full transition-all duration-500 flex justify-center items-center bg-black"
                    >
                      <Github className="w-4 h-4 text-white" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/shubhadip-bhowmik/"
                      target="_blank"
                      className="relative w-8 h-8 mr-4 rounded-full transition-all duration-500 flex justify-center items-center bg-[#0077B5]  
                  "
                    >
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                    <a
                      href="https://x.com/myselfshubhadip"
                      target="_blank"
                      className="relative w-8 h-8 rounded-full mr-4 transition-all duration-500 flex justify-center items-center bg-[#337FFF]  hover:bg-gray-900 "
                    >
                      <Twitter className="w-4 h-4 text-white" />
                    </a>
                    <a
                      href="https://shubhadipbhowmik.vercel.app/"
                      target="_blank"
                      className="relative w-8 h-8 rounded-full mr-4 transition-all duration-500 flex justify-center items-center bg-[#FF0000]  hover:bg-gray-900 "
                    >
                      <Globe className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
