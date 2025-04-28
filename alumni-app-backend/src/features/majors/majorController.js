import majorService from './majorService.js';

export const getAllMajors = async (req, res) => {
  try {
    const majors = await majorService.getAllMajors();
    res.status(200).json(majors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMajorById = async (req, res) => {
  try {
    const major = await majorService.getMajorById(req.params.id);
    if (!major) {
      return res.status(404).json({ message: 'Major not found' });
    }
    res.status(200).json(major);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMajor = async (req, res) => {
  try {
    const savedMajor = await majorService.createMajor(req.body);
    res.status(201).json(savedMajor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMajor = async (req, res) => {
  try {
    const updatedMajor = await majorService.updateMajor(req.params.id, req.body);
    if (!updatedMajor) {
      return res.status(404).json({ message: 'Major not found' });
    }
    res.status(200).json(updatedMajor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMajor = async (req, res) => {
  try {
    const deletedMajor = await majorService.deleteMajor(req.params.id);
    if (!deletedMajor) {
      return res.status(404).json({ message: 'Major not found' });
    }
    res.status(200).json({ message: 'Major deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

