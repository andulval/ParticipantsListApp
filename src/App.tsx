import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ParticipantsList } from "./routes/ParticipantsList/ParticipantsList";
import { EditParticipant } from "./routes/EditParticipant/EditParticipant";
import { AddParticipant } from "./routes/AddParticipant/AddParticipant";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ParticipantsList />} />
          <Route path="/participants/:id" element={<EditParticipant />} />
          <Route path="/participants/new" element={<AddParticipant />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
