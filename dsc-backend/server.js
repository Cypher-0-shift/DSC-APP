const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory "database"
let teamMembers = [
  { id: 1, name: "Alice", role: "Lead Developer" },
  { id: 2, name: "Bob", role: "UI/UX Designer" },
];

// GET all team members
app.get("/team", (req, res) => {
  res.json(teamMembers);
});

// POST add new member
app.post("/team", (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: "Name and role are required" });
  }
  const newMember = { id: Date.now(), name, role };
  teamMembers.push(newMember);
  res.status(201).json(newMember);
});

// PUT update member
app.put("/team/:id", (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;

  const memberIndex = teamMembers.findIndex((m) => m.id == id);
  if (memberIndex === -1) {
    return res.status(404).json({ error: "Member not found" });
  }
  if (!name || !role) {
    return res.status(400).json({ error: "Name and role are required" });
  }

  teamMembers[memberIndex] = { id: Number(id), name, role };
  res.json(teamMembers[memberIndex]);
});

// DELETE a member
app.delete("/team/:id", (req, res) => {
  const { id } = req.params;
  const memberIndex = teamMembers.findIndex((m) => m.id == id);
  if (memberIndex === -1) {
    return res.status(404).json({ error: "Member not found" });
  }
  const deleted = teamMembers.splice(memberIndex, 1);
  res.json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
