import React, { useEffect, useState } from "react";
import BASE_URL from "../config";

const Banner = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/banners`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setBanner(data[0]);
        }
      })
      .catch((error) => console.error("Error fetching banner:", error));
  }, []);

  if (!banner) return <div className="text-white text-center p-10">Loading...</div>;

   // Scroll to the specified section when a button is clicked
   const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white py-16 lg:py-24">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Left Side - Banner Info */}
        <div className="w-full lg:w-1/2 text-black text-center lg:text-left">
          <p className="text-lg lg:text-xl font-light mb-2">Hi! I am</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-purple-800 mb-4">{banner.name}</h1>
          <p className="text-base sm:text-lg lg:text-xl font-light text-black-300 mb-6">
            {banner.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          <button
              onClick={() => scrollToSection("aboutSection")}
              className="border-2 border-black text-black px-6 py-2 rounded-lg hover:bg-white hover:text-purple-800 transition"
            >
              About →
            </button>
            <button
              onClick={() => scrollToSection("experienceSection")}
              className="border-2 border-black text-black px-6 py-2 rounded-lg hover:bg-white hover:text-purple-800 transition"
            >
              Experience →
            </button>
            <button
              onClick={() => scrollToSection("projectsSection")}
              className="border-2 border-black text-black px-6 py-2 rounded-lg hover:bg-white hover:text-purple-800 transition"
            >
              Projects →
            </button>
          </div>
        </div>

        {/* Right Side - Banner Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={`${BASE_URL}${banner.image}`}
            alt="Banner"
            className="w-[60%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-contain rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
