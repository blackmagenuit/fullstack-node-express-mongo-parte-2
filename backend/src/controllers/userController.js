const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const search = String(req.query.search || '').trim();
    const role = String(req.query.role || '').trim();
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(limit, 50) : 10;

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    if (role) {
      filter.role = role;
    }

    const total = await User.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(total / safeLimit));
    const currentPage = Math.min(safePage, totalPages || 1);

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * safeLimit)
      .limit(safeLimit);

    res.json({
      total,
      page: currentPage,
      pageSize: safeLimit,
      totalPages,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error al obtener usuarios' });
  }
};

module.exports = { getUsers };
