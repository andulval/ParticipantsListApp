import React from "react";
import { SubmitHandler } from "react-hook-form";
import { Form } from "../../components/FormComponent/Form";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs
import { Participant } from "../../utils/interfaces/interfaces";
import { NavLink } from "react-router-dom";


export const AddParticipant: React.FC = () => {

  const handleAddParticipant: SubmitHandler<Omit<Participant, "id">> = async (formData) => {
    const newParticipant: Participant = {
      id: uuidv4(), // Generate a unique ID
      ...formData,
      workStart: new Date(formData.workStart).toISOString(),
      workEnd: new Date(formData.workEnd).toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3001/participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newParticipant),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Participant successfully added:", result);
      } else {
        console.error("Failed to add participant");
      }
    } catch (error) {
      console.error("Error occurred while adding participant:", error);
    }
  };

  return (
    <div className="container-forms mx-auto">
        <NavLink to="/">Back to list</NavLink>
        <h2>Add New Participant</h2>
        <Form submitHandler={handleAddParticipant} />
    </div>
  );
};
