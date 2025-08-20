import React, { useEffect, useState } from "react";
import BASE_URL from "../config";

const About = () => {
  const [aboutList, setAboutList] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/about`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setAboutList(data);
        }
      })
      .catch((error) => console.error("Error fetching AboutUs:", error));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/skills`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setSkills(data);
        }
      })
      .catch((error) => console.error("Error fetching Skills:", error));
  }, []);

  if (aboutList.length === 0 || skills.length === 0)
    return <div>Loading...</div>;

  return (
    <div id="aboutSection" className="w-full bg-white py-10 lg:py-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
        {/* About Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black underline underline-offset-8 mb-6">
            About
          </h2>
          <div className="space-y-4 text-black lg:text-xl text-base font-light">
            {aboutList.map((about, index) => (
              <p key={index} className="text-black">
                {about.description}
              </p>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black underline underline-offset-8 mb-6">
            Skills
          </h2>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center mb-2">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    className="text-purple-800 mr-2"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M96 52v408l320-204L96 52z" />
                  </svg>
                  <h4 className="text-xl font-semibold text-black">
                    {skill.category}
                  </h4>


                </div>
                <ul className="flex flex-wrap gap-2 ml-6">
                  {skill.skills.map((item, idx) => (
                    <li
                      key={idx}
                      className={`py-1 px-3 text-sm font-medium rounded-xl border text-black
                        ${
                          idx % 3 === 0
                            ? "bg-green-100 border-green-500"
                            : idx % 3 === 1
                            ? "bg-yellow-100 border-yellow-500"
                            : "bg-gray-100 border-gray-500"
                        }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
