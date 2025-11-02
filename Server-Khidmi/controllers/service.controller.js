const Service = require('../models/Service');
const cloudinary = require('../config/cloudinary');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ name: 1 });
    
    res.json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get service by ID
// @route   GET /api/services/:id
// @access  Public
exports.getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé'
      });
    }

    res.json({
      success: true,
      service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create service
// @route   POST /api/services
// @access  Private/Admin
exports.createService = async (req, res, next) => {
  try {
    // Upload image si fournie
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'khidmi/services'
      });
      imageUrl = result.secure_url;
    }

    const service = await Service.create({
      ...req.body,
      image: imageUrl
    });

    res.status(201).json({
      success: true,
      service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updateService = async (req, res, next) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé'
      });
    }

    // Upload nouvelle image si fournie
    if (req.file) {
      // Supprimer l'ancienne image si elle existe
      if (service.image) {
        const publicId = service.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`khidmi/services/${publicId}`);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'khidmi/services'
      });
      service.image = result.secure_url;
    }

    // Mettre à jour les autres champs
    const fieldsToUpdate = ['name', 'description', 'category', 'icon'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field]) {
        service[field] = req.body[field];
      }
    });

    service = await service.save();

    res.json({
      success: true,
      service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé'
      });
    }

    await service.remove();

    res.json({
      success: true,
      message: 'Service supprimé'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get services by category
// @route   GET /api/services/category/:category
// @access  Public
exports.getServicesByCategory = async (req, res, next) => {
  try {
    const services = await Service.find({ 
      category: req.params.category,
      isActive: true 
    });

    res.json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



