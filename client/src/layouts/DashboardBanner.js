import React, { useEffect, useState } from "react";
import BASE_URL from "../config";

const DashboardBanner = () => {
const [banners, setBanners] = useState([]);
const [editingBanner, setEditingBanner] = useState(null);
const [form, setForm] = useState({ name: "", description: "", image: "" });
const [imagePreview, setImagePreview] = useState(null);

useEffect(() => {
fetch(`${BASE_URL}/banners`)
.then((res) => res.json())
.then(setBanners)
.catch(console.error);
}, []);

const handleDelete = (_id) => {
if (window.confirm("Are you sure you want to delete this banner?")) {
fetch(`${BASE_URL}/banners/${_id}`, { method: "DELETE" })
.then(() => setBanners((prev) => prev.filter((b) => b._id !== _id)))
.catch(console.error);
}
};

const handleEdit = (banner) => {
setEditingBanner(banner);
setForm({
name: banner.name,
description: banner.description,
image: banner.image,
});
setImagePreview(`${BASE_URL}${banner.image}`);
};

const handleSave = () => {
const method = editingBanner ? "PUT" : "POST";
const url = editingBanner
? `${BASE_URL}/banners/${editingBanner._id}`
: `${BASE_URL}/banners`;

const formData = new FormData();
formData.append("name", form.name);
formData.append("description", form.description);

if (form.image instanceof File) {
formData.append("image", form.image);
}

fetch(url, {
method,
body: formData,
})
.then(() => {
window.location.reload();
})
.catch(console.error);
};

return (
<div>
    <div className="p-6 bg-white rounded-xl shadow">
    <h2 className="text-2xl font-bold mb-4">Manage Banners</h2>
    </div>
    {/* <button onClick={()=> {
        setEditingBanner(null);
        setForm({ name: "", description: "", image: "" });
        setImagePreview(null);
        }}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
        + Create New Banner
    </button> */}

    <div className="space-y-4">
        {banners.map((banner) => (
        <div key={banner._id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
                <img src={`${BASE_URL}${banner.image}`} alt={banner.name} className="w-24 h-24 rounded object-cover" />
                <div>
                    <h3 className="text-lg font-semibold">{banner.name}</h3>
                    <p className="text-sm text-gray-600">{banner.description}</p>
                </div>
            </div>
            <div className="flex space-x-2">
                <button onClick={()=> handleEdit(banner)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                    Edit
                </button>
                <button onClick={()=> handleDelete(banner._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
        ))}
    </div>

    {(editingBanner || form.name) && (
    <div className="mt-8 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold mb-2">
            {editingBanner ? "Edit Banner" : "Create New Banner"}
        </h3>
        <input type="text" placeholder="Name" className="block w-full mb-2 p-2 border rounded" value={form.name}
            onChange={(e)=> setForm({ ...form, name: e.target.value })}
        />
        <textarea placeholder="Description" className="block w-full mb-2 p-2 border rounded" value={form.description}
            onChange={(e)=>
              setForm({ ...form, description: e.target.value })
            }
          />

 {/* Preview image */}
    {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 rounded object-cover mb-2"
            />
          )}
          {/* File input */}
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
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      )}

    </div>
  );
};

export default DashboardBanner;
