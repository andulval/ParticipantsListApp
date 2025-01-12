import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ParticipantsList } from "./routes/ParticipantsList/ParticipantsList";
import { EditParticipant } from "./routes/EditParticipant/EditParticipant";
import { AddParticipant } from "./routes/AddParticipant/AddParticipant";
import { Navigation } from "./routes/Navigation/Navigation";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
        <Route path='/' element={<Navigation />}>
                <Route index element={<ParticipantsList />} />
                <Route path="/participants/:id" element={<EditParticipant />} />
                <Route path="/participants/new" element={<AddParticipant />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
