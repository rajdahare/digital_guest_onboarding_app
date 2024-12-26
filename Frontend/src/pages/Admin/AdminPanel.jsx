import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchHotels, addHotel } from "../../api";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";

const AdminPanel = ({ selectedHotel, editModel, setSelectHotel }) => {
  const [formData, setFormData] = useState({ name: "", address: "", logo: null });
  const baseURL = import.meta.env.VITE_API_URL; // Correctly define baseURL

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("address", formData.address);
    if (formData.logo) form.append("logo", formData.logo);

    try {
      if (editModel) {
        try {
          await axios.put(
            `${baseURL}/api/admin/hotels/${selectedHotel._id}`,
            form,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Hotel updated successfully.",
            confirmButtonColor: "#4CAF50",
          });
          setSelectHotel(null);
          editModel(false);
        } catch (error) {
          console.error("Failed to update hotel", error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to update hotel. Please try again.",
            confirmButtonColor: "#FF4D4D",
          });
        }
      } else {
        await addHotel(form);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Hotel added successfully.",
          confirmButtonColor: "#4CAF50",
        });
      }

      // Fetch updated hotels list
      const { data } = await fetchHotels();
      console.log("Updated Hotels:", data);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Failed to ${editModel ? "update" : "add"} hotel. Please try again.`,
        confirmButtonColor: "#FF4D4D",
      });
    }
  };

  useEffect(() => {
    if (selectedHotel) {
      setFormData({
        name: selectedHotel.name || "",
        address: selectedHotel.address || "",
        logo: null,
      });
    } else {
      setFormData({ name: "", address: "", logo: null });
    }
  }, [selectedHotel]);

  const handleOnClose = () => {
    setSelectHotel(null); 
    editModel(false);
  };

  return (
    <div className="container mx-auto p-6 text-gray-900 bg-black m-6">
      <form
        className="bg-lightGray p-6 rounded-xl shadow-lg max-w-md mx-auto space-y-6"
        onSubmit={handleSubmit}
      >
        {editModel && (
          <IoIosCloseCircleOutline
            className="text-4xl text-white cursor-pointer"
            onClick={handleOnClose}
          />
        )}
        <h2 className="text-2xl font-semibold text-gray-300 text-center mb-4">
          {editModel ? "Edit Hotel" : "Add New Hotel"}
        </h2>

        <input
          type="text"
          placeholder="Hotel Name"
          className="w-full p-4 border border-lightBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Address"
          className="w-full p-4 border border-lightBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />

        {/* Logo input should not be required for editing */}
        <input
          type="file"
          className="w-full p-4 border border-lightBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setFormData({ ...formData, logo: e.target.files[0] })}
          required={!editModel}
          placeholder="Logo"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white p-4 rounded-lg hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-darkPrimary"
        >
          {editModel ? "Update Hotel" : "Add Hotel"}
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
