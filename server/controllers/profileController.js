import User from "../models/user.model.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { username, email, bio, profile } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { username, email, bio, profile },
      { new: true, runValidators: true, select: "-password" }
    );

      return res.status(404).json({ message: "User not found" });

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.userId);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting profile" });
  }
};
