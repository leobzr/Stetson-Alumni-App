const Major = require('../models/major');

exports.getAllMajors = async (req, res) => {
  try {
    const majors = await Major.find();
    res.status(200).json(majors);
  } catch (error) {
    console.error("Error retrieving majors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}; 

exports.getMajorById = async (req, res) => {
    try {
        const major = await Major.findById(req.params.id);
        if (!major) {
        return res.status(404).json({ message: "Major not found" });
        }
        res.status(200).json(major);
    } catch (error) {
        console.error("Error retrieving major:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.createMajor = async (req, res) => {
    try {
        const newMajor = new Major(req.body);
        const savedMajor = await newMajor.save();
        res.status(201).json(savedMajor);
    } catch (error) {
        res.status(400).json({
            message: "Error creating major",
            error: error.message
        });
    }
};

exports.updateMajor = async (req, res) => {
    try {
        const updatedMajor = await Major.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMajor) {
            return res.status(404).json({ message: "Major not found" });
        }
        res.status(200).json(updatedMajor);
    } catch (error) {
        console.error("Error updating major:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteMajor = async (req, res) => {
    try {
        const deletedMajor = await Major.findByIdAndDelete(req.params.id);
        if (!deletedMajor) {
            return res.status(404).json({ message: "Major not found" });
        }
        res.status(200).json({ message: "Major deleted successfully" });
    } catch (error) {
        console.error("Error deleting major:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

