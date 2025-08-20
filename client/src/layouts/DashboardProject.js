import React, { useEffect, useState } from "react";
import BASE_URL from "../config";

const DashboardProject = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", image: "" });
  const [imagePreview, setImagePreview] = useState(null);
  const [popupImage, setPopupImage] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/project`)
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  const handleDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this Project?")) {
      fetch(`${BASE_URL}/project/${_id}`, { method: "DELETE" })
        .then(() => setProjects((prev) => prev.filter((b) => b._id !== _id)))
        .catch(console.error);
    }
  };

  const handleEdit = (Project) => {
    setEditingProject(Project);
    setForm({
      title: Project.title,
      website_url: Project.website_url,
      description: Project.description,
      image: Project.image,
    });
    setImagePreview(`${BASE_URL}${Project.image}`);
    setShowFormModal(true);
  };

  const handleSave = () => {
    const method = editingProject ? "PUT" : "POST";
    const url = editingProject
      ? `${BASE_URL}/project/${editingProject._id}`
      : `${BASE_URL}/project`;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("website_url", form.website_url);
    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    fetch(url, {
      method,
      body: formData,
    })
      .then(() => {
        setShowFormModal(false);
        setEditingProject(null);
        setForm({ title: "", description: "", image: "", website_url: "" });
        setImagePreview(null);
        return fetch(`${BASE_URL}/project`).then((res) => res.json()).then(setProjects);
      })
      .catch(console.error);
  };

  const handleCreateNew = () => {
    setEditingProject(null);
    setForm({ title: "", description: "", image: "", website_url: "" });
    setImagePreview(null);
    setShowFormModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>

      <button
        onClick={handleCreateNew}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create New Project
      </button>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white border rounded-lg shadow-sm p-4 space-y-2"
          >
            <h3 className="text-lg font-semibold text-center">{project.title}</h3>

            <img
              src={`${BASE_URL}${project.image}`}
              alt={project.title}
              className="w-full h-48 object-cover rounded cursor-pointer hover:opacity-90"
              onClick={() => setPopupImage(`${BASE_URL}${project.image}`)}
            />

            <p className="text-gray-600 text-sm">{project.description}</p>

            {project.website_url && (
              <a
                href={project.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Visit Website
              </a>
            )}

            {Array.isArray(project.frameworks) && (
              <div className="flex flex-wrap gap-1 mt-2">
                {project.frameworks.map((fw, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-800 px-2 py-0.5 text-xs rounded-full"
                  >
                    {fw?.trim()}
                  </span>
                ))}
              </div>
            )}

            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEdit(project)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-4">
              {editingProject ? "Edit Project" : "Create New Project"}
            </h3>

            <input
              type="text"
              placeholder="Title"
              className="block w-full mb-2 p-2 border rounded"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              type="text"
              placeholder="Website Url"
              className="block w-full mb-2 p-2 border rounded"
              value={form.website_url}
              onChange={(e) => setForm({ ...form, website_url: e.target.value })}
            />

            <textarea
                placeholder="Description"
                className="block w-full mb-2 p-2 border rounded h-72"
                value={form.description}
                 onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded mb-2"
              />
            )}

            <input
              type="file"
              accept="image/*"
              className="block w-full mb-2"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setForm({ ...form, image: file });
                  const reader = new FileReader();
                  reader.onload = () => {
                    setImagePreview(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />

            <button
              onClick={handleSave}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Image Popup Modal */}
      {popupImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPopupImage(null)}
        >
          <img
            src={popupImage}
            alt="Zoomed"
            className="max-w-full max-h-full rounded-lg shadow-lg border-4 border-white"
          />
        </div>
      )}
    </div>
  );
};

export default DashboardProject;
