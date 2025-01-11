import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Participant } from "../../utils/interfaces/interfaces";

export const ParticipantsList: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await fetch("http://localhost:3001/participants");
      const participants: Participant[] = await response.json();
      setParticipants(participants);
    };
    fetchParticipants();
  }, []);

  return (
    <div>
        <NavLink to={`/participants/new`}>New</NavLink>
      {participants.map((participant) => (
        <div key={participant.id}>
          {participant.name}{" "}
          <NavLink to={`/participants/${participant.id}`}>Edit</NavLink>
        </div>
      ))}
    </div>
  );
};
