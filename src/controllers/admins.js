import Admin from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find({});
    return res.status(200).json({
      msg: 'This is the complete list of admins',
      data: allAdmins,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'An error ocurred',
      success: false,
    });
  }
};

const addAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isActive: req.body.isActive,
    });
    const adminSaved = await newAdmin.save();
    return res.status(201).json({
      msg: 'Admin created successfully',
      data: adminSaved,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Admin creation failed. Please review and correct the data',
      success: false,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (result) {
      return res.status(200).json({
        msg: `Admin ${req.params.id} successfully updated`,
        data: result,
        success: true,
      });
    } return res.status(404).json({
      msg: `No admin with the id of ${req.params.id}`,
      data: undefined,
      success: false,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'There was an error',
      success: false,
    });
  }
};

const findAdminById = async (req, res) => {
  try {
    const result = await Admin.findById(req.params.id);
    if (result) {
      return res.status(200).json({
        msg: `Admin ${req.params.id} found`,
        data: result,
        success: true,
      });
    } return res.status(404).json({
      msg: `No admin with the id of ${req.params.id}`,
      data: undefined,
      success: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There was an error',
      success: false,
    });
  }
};

const delAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json({
        msg: `Admin ${req.params.id} deleted successfully`,
        data: result,
        success: true,
      });
    } return res.status(404).json({
      msg: `Admin ${req.params.id} not found`,
      data: undefined,
      success: false,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'There was an error',
      success: false,
    });
  }
};

export default {
  getAllAdmins,
  delAdmin,
  addAdmin,
  findAdminById,
  updateAdmin,
};
