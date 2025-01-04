import { NavLink } from "react-router-dom";
import { Participant } from "../../utils/interfaces/interfaces";

interface CardContainerProps {
  participant: Participant;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  participant,
}) => {
  return (
    <div>
      {participant.name}{" "}
      <NavLink
        to={`/participants/${participant.id}`}
        aria-label={`Edit ${participant.name}`}
      >
        Edit
      </NavLink>
    </div>
  );
};
