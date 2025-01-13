import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Participant } from "../../utils/interfaces/interfaces";
import "./ParticipantList.styles.scss";
import { ReactComponent as Edit } from '../../assets/edit.svg';
import Spinner from "../../components/Spinner/Spinner.component"; 

export const ParticipantsList: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await fetch("http://localhost:3001/participants");
      const participants: Participant[] = await response.json();
      setParticipants(participants);
      setLoading(false); 
    };
    fetchParticipants();
  }, []);

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
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-12">
          <h1>Participants</h1>
          <button className="btn__black" aria-label="Add a new participant">
            <NavLink to={`/participants/new`}>Add participant</NavLink>
          </button>
        </div>
        <div className="c-participant__container">
          {participants.map((participant) => (
            <NavLink 
              to={`/participants/${participant.id}`} 
              key={participant.id} 
              className="c-participant__row" 
              role="link"
              aria-label={`View details for ${participant.name}`}
            >
              <div className="c-participant__name-email">
                <span className="c-participant__name">
                  {participant.name}
                </span>
                <span className="c-participant__email">
                  ({participant.email})
                </span>
              </div>
              <div className="c-participant__edit" aria-label="Edit participant">
                <Edit aria-hidden="true" />
                <span className="sr-only">Edit</span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
