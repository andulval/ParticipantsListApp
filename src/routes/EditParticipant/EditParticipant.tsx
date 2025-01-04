import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Form } from "../../components/FormComponent/Form";

export const EditParticipant: React.FC = () => {
  const { id } = useParams();

  useEffect(() => {
    //TODO: get participant from REST api http://localhost:3001/participants/:id
    console.log(`I want to get participant with id: ${id}!`);
  }, [id]);

  return (
    <div>
      <NavLink to="/">Back to list </NavLink>
      <Form />
    </div>
  );
};
