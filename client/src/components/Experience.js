import React, { useEffect, useState } from "react";
import BASE_URL from "../config";

const Experience = () => {
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/experience`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setExperience(data);
        }
      })
      .catch((error) => console.error("Error fetching experience:", error));
  }, []);

  if (!experience) return <div>Loading...</div>;

  return (
    <div id= "experienceSection" className="w-full bg-white py-10 lg:py-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-black underline underline-offset-8 mb-10">
          Experience
        </h2>

        {/* Cards Grid */}
        <div className="flex flex-wrap gap-6 justify-center">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="p-4 shadow-lg flex items-center rounded-xl bg-white w-full sm:w-[48%] lg:w-[30%] transition-transform hover:scale-105"
            >
              {/* Logo on the Left */}
              <img
                src={`${BASE_URL}${exp.logo}`}
                alt={exp.company_name}
                className="w-20 h-20 object-cover rounded-full mr-4"
              />

              {/* Text Content on the Right */}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{exp.company_name}</h3>
                <p className="text-gray-600">{exp.position}</p>
                <p className="text-sm text-gray-500">
                  {exp.start_date} - {exp.end_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
