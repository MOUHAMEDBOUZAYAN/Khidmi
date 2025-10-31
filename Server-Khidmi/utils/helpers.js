// Format user object (remove password)
exports.formatUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    avatar: user.avatar,
    profession: user.profession,
    bio: user.bio,
    rating: user.rating,
    numReviews: user.numReviews,
    location: user.location,
    isVerified: user.isVerified,
    isPremium: user.isPremium,
    createdAt: user.createdAt
  };
};

// Generate conversation ID
exports.generateConversationId = (userId1, userId2) => {
  return [userId1, userId2].sort().join('_');
};

// Calculate distance between two coordinates
exports.calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

// Sanitize phone number
exports.sanitizePhone = (phone) => {
  return phone.replace(/[\s\-\(\)]/g, '');
};

