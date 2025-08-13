import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:5000/team";

const primaryColor = "teal-600"; // teal base color
const accentColor = "teal-400";

function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        `px-4 py-2 bg-${primaryColor} text-white rounded-md shadow-md hover:bg-${accentColor} focus:outline-none focus:ring-2 focus:ring-${accentColor} transition-colors duration-200 ` +
        className
      }
    >
      {children}
    </button>
  );
}

function Navbar() {
  const linkClass = "px-3 py-2 rounded hover:bg-teal-200 transition-colors";
  const activeClass = "bg-teal-300 font-semibold";

  return (
    <nav className="bg-teal-600 text-white flex justify-between items-center px-6 py-3 shadow-md sticky top-0 z-10">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        Developer Students Club
        <span className="text-teal-300 text-3xl font-mono select-none">{`</>`}</span>
      </h1>
      <div className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          About Us
        </NavLink>
        <NavLink
          to="/team"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Team Members
        </NavLink>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 text-center">
      <h2 className="text-4xl font-extrabold mb-6 text-teal-700">
        Welcome to DSC!
      </h2>
      <p className="text-lg text-gray-700 max-w-xl mx-auto">
        We are a community of passionate developers working on exciting
        projects and learning together.
      </p>
    </div>
  );
}

function About() {
  return (
    <motion.div
      className="max-w-3xl mx-auto p-8 mt-10 bg-gradient-to-r from-teal-100 to-teal-50 rounded-xl shadow-lg prose prose-teal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-4xl font-extrabold mb-4 tracking-wide text-teal-700 flex items-center gap-3">
        <span className="text-5xl select-none font-mono">{`</>`}</span>
        About Us
      </h2>
      <p className="text-lg text-teal-900">
        The Developer Students Club (DSC) is a vibrant student developer community
        focused on collaboration, learning, and building impactful projects.
      </p>
      <p className="text-lg text-teal-900">
        We organize workshops, hackathons, coding sessions, and other events to
        help members grow both technical and soft skills in a supportive
        environment.
      </p>

      <blockquote className="border-l-4 border-teal-400 italic pl-4 my-6 text-teal-600">
        “Join us to connect with like-minded peers, work on real-world projects,
        and become the developer you aspire to be!”
      </blockquote>

      <p className="text-lg text-teal-900">
        Together, we build skills, friendships, and the future of technology —
        one line of code at a time.
      </p>
    </motion.div>
  );
}
function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [form, setForm] = useState({ name: "", role: "" });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setTeamMembers(data);
        setLoading(false);
      })
      .catch(() => alert("Failed to load team members"));
  }, []);

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ name: "", role: "" });
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim())
      return alert("Please fill all fields");

    try {
      if (editing) {
        const res = await fetch(`${API_URL}/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();
        setTeamMembers((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m))
        );
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Add failed");
        const newMember = await res.json();
        setTeamMembers((prev) => [...prev, newMember]);
      }
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  const startEdit = (member) => {
    setForm({ name: member.name, role: member.role });
    setEditing(member);
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-teal-700">Team Members</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 mb-8"
        noValidate
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInput}
          placeholder="Name"
          className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />
        <input
          type="text"
          name="role"
          value={form.role}
          onChange={handleInput}
          placeholder="Role"
          className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />
        <Button type="submit">{editing ? "Update" : "Add"}</Button>
        {editing && (
          <Button
            type="button"
            className="bg-gray-400 hover:bg-gray-500"
            onClick={resetForm}
          >
            Cancel
          </Button>
        )}
      </form>

      {/* Team members list with animations */}
      {loading ? (
        <p>Loading team members...</p>
      ) : (
        <AnimatePresence>
          <ul className="grid gap-6 md:grid-cols-2">
            {teamMembers.map(({ id, name, role }) => (
              <motion.li
                key={id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-teal-800">{name}</h3>
                  <p className="text-gray-600">{role}</p>
                </div>
                <div className="mt-4 flex space-x-2 justify-end">
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-black"
                    onClick={() => startEdit({ id, name, role })}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => deleteMember(id)}
                  >
                    Delete
                  </Button>
                </div>
              </motion.li>
            ))}
          </ul>
        </AnimatePresence>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="text-center p-6 mt-20 border-t border-gray-300 text-gray-500">
      &copy; {new Date().getFullYear()} Developer Students Club. All rights reserved.
    </footer>
  );
}

export default function App() {
  // Splash screen state
  const [showSplash, setShowSplash] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash)
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-teal-700 to-teal-900 flex-col">
      <motion.h1
        className="text-8xl font-extrabold text-teal-300 font-mono select-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        {"</>"}
      </motion.h1>
      <motion.p
        className="mt-6 text-white text-3xl font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        Welcome to DSC App
      </motion.p>
    </div>
  );


  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
