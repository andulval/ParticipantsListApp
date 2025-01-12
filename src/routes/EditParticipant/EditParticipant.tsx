import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Form } from "../../components/FormComponent/Form";
import { Participant } from "../../utils/interfaces/interfaces";
import { SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  workStart: string;
  workEnd: string;
}

export const EditParticipant: React.FC = () => {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const response = await fetch(`http://localhost:3001/participants/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch participant");
        }
        const participant: Participant = await response.json();
        setParticipant(participant);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchParticipant();
  }, [id]);

  const handleEditParticipant: SubmitHandler<FormData> = async (formData) => {
    if (!participant) return;

    const updatedParticipant: Participant = {
      ...participant,
      name: formData.name,
      email: formData.email,
      workStart: new Date(formData.workStart).toISOString(),
      workEnd: new Date(formData.workEnd).toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:3001/participants/${participant.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedParticipant),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Participant successfully updated:", result);
      } else {
        console.error("Failed to update participant");
      }
    } catch (error) {
      console.error("Error occurred while updating participant:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container-forms mx-auto">
        <div className="container container__main px-0">
            <div className="">
                <h1>Edit Participant</h1>
            </div>
        {participant && <Form participant={participant} submitHandler={handleEditParticipant} />}
        </div>
    </div>
  );
};
