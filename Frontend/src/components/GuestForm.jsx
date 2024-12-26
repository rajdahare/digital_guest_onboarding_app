import React, { useState } from "react";
import { registerGuest } from "../api";
import Swal from "sweetalert2"; // Import SweetAlert2

const GuestForm = ({ id,closeModal }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    address: "",
    purposeOfVisit: "Business",
    stayDates: { from: "", to: "" },
    email: "",
    idProofNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp  =  await registerGuest({ ...formData, hotelId: id });

      console.log(resp.data);
      
      localStorage.setItem('userId', resp.data.guest._id)
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Guest registered successfully!",
        confirmButtonText: "OK",
      });

      closeModal();
    } catch (error) {
      console.error(error);
      
      // Show error message using SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to register guest. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <form className="text-black" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Guest Information</h2>
      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-2 mb-2 border rounded"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Mobile Number"
        className="w-full p-2 mb-2 border rounded"
        value={formData.mobileNumber}
        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
        required
      />
      <textarea
        placeholder="Address"
        className="w-full p-2 mb-2 border rounded"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      ></textarea>
      <select
        className="w-full p-2 mb-2 border rounded"
        value={formData.purposeOfVisit}
        onChange={(e) => setFormData({ ...formData, purposeOfVisit: e.target.value })}
      >
        <option value="Business">Business</option>
        <option value="Personal">Personal</option>
        <option value="Tourist">Tourist</option>
      </select>
      <div className="flex gap-2">
        <input
          type="date"
          className="w-full p-2 mb-2 border rounded"
          value={formData.stayDates.from}
          onChange={(e) =>
            setFormData({ ...formData, stayDates: { ...formData.stayDates, from: e.target.value } })
          }
          required
        />
        <input
          type="date"
          className="w-full p-2 mb-2 border rounded"
          value={formData.stayDates.to}
          onChange={(e) =>
            setFormData({ ...formData, stayDates: { ...formData.stayDates, to: e.target.value } })
          }
          required
        />
      </div>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-2 border rounded"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="ID Proof Number"
        className="w-full p-2 mb-2 border rounded"
        value={formData.idProofNumber}
        onChange={(e) => setFormData({ ...formData, idProofNumber: e.target.value })}
        required
      />
      <button className="bg-blue-600 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default GuestForm;
