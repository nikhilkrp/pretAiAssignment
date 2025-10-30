import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    bio: "",
    profile: "",
  });
  const [form, setForm] = useState({ ...profile });

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/profile/me");
      setProfile(data);
      setForm(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put("/profile", {
        bio: form.bio,
        profile: form.profile,
      });
      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex justify-center items-center p-9">
      <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md transition hover:shadow-blue-200">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Edit Profile
        </h2>

        <form onSubmit={handleSave} className="space-y-5">

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={form.username}
              disabled
              className="w-full border border-gray-200 bg-gray-100 p-2 rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full border border-gray-200 bg-gray-100 p-2 rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Bio
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Tell something about yourself..."
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 p-2 rounded-lg outline-none h-24 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              value={form.profile}
              onChange={(e) => setForm({ ...form, profile: e.target.value })}
              placeholder="Enter image link"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 p-2 rounded-lg outline-none"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
             onClick={() => navigate("/dashboard")}
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;



