import React, { useEffect, useState } from "react";
import BASE_URL from "../config";
import { FaLaptop } from "react-icons/fa";

const Projects = () => {
  const [project, setProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // For storing the selected project for the popup

  useEffect(() => {
    fetch(`${BASE_URL}/project`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setProject(data);
        }
      })
      .catch((error) => console.error("Error fetching project:", error));
  }, []);

  if (project.length === 0) return <div>Loading...</div>;

  const handleCardClick = (proj) => {
    setSelectedProject(proj);
  };

  const handleClosePopup = () => {
    setSelectedProject(null);
  };

  const handleOpenWebsite = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div id="projectsSection" className="w-full bg-white py-10 lg:py-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-black underline underline-offset-8 mb-10">
          Projects
        </h2>
        <p className="text-xl sm:text-4xl lg:text-xl font-bold text-center text-black mb-10">
          Click on a project to learn more!
        </p>

        {/* Cards Grid */}
        <div className="flex flex-wrap gap-6 justify-center">
          {project.map((proj, index) => (
            <div
              key={index}
              className="p-6 shadow-lg flex flex-col items-center rounded-xl bg-white w-full sm:w-[48%] lg:w-[30%] transition-transform hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(proj)}
            >
              {/* Title */}
              <h3 className="text-xl font-semibold mb-2 text-center">{proj.title}</h3>

              {/* Image */}
              <img
                src={`${BASE_URL}${proj.image}`}
                alt={proj.title}
                className="w-full h-[200px] object-cover rounded-lg mb-4"
              />

              {/* Frameworks */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {proj.frameworks.map((framework, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg text-sm"
                  >
                    {framework}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-lg w-full relative">
            {/* Close Button (X) */}
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-black"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
            <p className="text-lg mb-6">{selectedProject.description}</p>

            {/* PC Icon at the bottom */}
            {selectedProject.website_url && (
              <div
                className="flex justify-center items-center mt-6 cursor-pointer"
                onClick={() => handleOpenWebsite(selectedProject.website_url)}
              >
                <FaLaptop className="text-3xl text-gray-700 hover:text-purple-500" />
                <span className="ml-2 text-lg text-gray-700">Visit Website</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
