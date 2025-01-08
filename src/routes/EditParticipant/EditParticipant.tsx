import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Form } from "../../components/FormComponent/Form";
import { Participant } from "../../utils/interfaces/interfaces";


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
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div>
        <NavLink to="/">Back to list</NavLink>
        {participant && <Form participant={participant} />}
      </div>
    );
  };
