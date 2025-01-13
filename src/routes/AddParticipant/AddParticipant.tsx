import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Form } from "../../components/FormComponent/Form";
import { v4 as uuidv4 } from "uuid";
import { Participant } from "../../utils/interfaces/interfaces";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner.component";

export const AddParticipant: React.FC = () => {
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const navigate = useNavigate();

  const handleAddParticipant: SubmitHandler<Omit<Participant, "id">> = async (formData) => {
    setLoading(true); // Set loading to true when form submission starts

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
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div role="status" aria-live="assertive">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container-forms mx-auto">
      <div className="container container__main px-0">
        <div>
          <h1>Add New Participant</h1>
        </div>
        <Form submitHandler={handleAddParticipant} />
      </div>
    </div>
  );
};
