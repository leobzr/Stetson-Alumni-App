import { Major } from './major.js';

/**
 * Service for major-related operations
 */
class MajorService {
  /**
   * Get all majors
   */
  async getAllMajors() {
    return Major.find();
  }

  /**
   * Get a major by ID
   */
  async getMajorById(id) {
    return Major.findById(id);
  }

  /**
   * Create a new major
   */
  async createMajor(data) {
    const newMajor = new Major(data);
    return newMajor.save();
  }

  /**
   * Update a major
   */
  async updateMajor(id, data) {
    return Major.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Delete a major
   */
  async deleteMajor(id) {
    return Major.findByIdAndDelete(id);
  }
}

export default new MajorService();