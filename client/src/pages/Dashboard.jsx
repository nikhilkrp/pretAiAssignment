import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [profile, setProfile] = useState({ username: "", email: "", profile: "", bio:"" });

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/profile/me");
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchNotes = async () => {
    try {
      const { data } = await api.get("/notes");
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/notes/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/notes", form);
      }
      setForm({ title: "", content: "" });
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditingId(note._id);
  };

  const handleLogout = async() =>{
    const res = await api.post("/auth/logout");
    navigate('/');
    console.log("logout successfully");
  }

  return (
    <div className=" bg-gradient-to-br from-blue-100 via-indigo-100 to-pink-100 p-4 md:p-8 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-4 py-8 h-[100vh] md:h-[95vh] overflow-hidden ">

        {/* ---------- Profile Section ---------- */}
        <div className="md:w-1/3 w-full md:h-[65vh] bg-white/60 backdrop-blur-md shadow-lg rounded-2xl p-4 sticky  h-fit ">
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <img
              src={profile?.profile || "https://via.placeholder.com/100"}
              alt="Profile"
              className="md:w-20 md:h-20 w-14 h-14 rounded-full object-cover border-4 border-blue-200"
            />
            <div>
              <h2 className="md:text-2xl text-xl font-semibold text-gray-800">
                Welcome, {profile.username || "User"}
              </h2>
              <p className="text-gray-600
              md:py-4">{profile.email}</p>
              <hr className="border-gray-700 py-4 hidden md:block"/>

              <p className="hidden md:block py-4 text-gray-600">
                {profile.bio}
              </p>
              <hr className="border-gray-700 hidden md:block "/>
            </div>
            
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
            >
              Edit Profile
            </button>

             <button onClick={handleLogout} className="bg-indigo-600 px-2 py-1 rounded full text-white ">Logout</button>
          </div>
         
        </div>

        {/* ---------- Notes Section ---------- */}
        <div className="md:w-2/3 w-full flex flex-col bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-lg h-[65vh]">
          {/* Form */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">
              {editingId ? "Update Note" : "Add New Note"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                placeholder="Enter note title..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-1 md:p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
              <textarea
                placeholder="Write your note content here..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-1 md:p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                rows="4"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-200"
              >
                {editingId ? "Update Note" : "Add Note"}
              </button>
            </form>
          </div>

          {/* Notes List */}
          <div className="flex flex-col divide-y divide-gray-200 overflow-y-auto max-h-[60vh] no-scrollbar">
            {notes.map((note) => (
              <div
                key={note._id}
                className="flex justify-between items-start p-2 hover:bg-gray-50 transition"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">{note.title}</h4>
                  <p className="text-gray-600 text-sm">{note.content}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {notes.length === 0 && (
              <p className="text-center text-gray-500 py-6">
                No notes found. Start by adding a new one!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;

