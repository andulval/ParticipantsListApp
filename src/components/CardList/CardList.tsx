import React, { useEffect, useState } from "react";
import { Participant } from "../../utils/interfaces/interfaces";
import { CardContainer } from "../CardContainer/CardContainer";

export const CardList: React.FC = () => {
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
      {participants.map((participant) => (
        <CardContainer key={participant.id} participant={participant} />
      ))}
    </div>
  );
};
