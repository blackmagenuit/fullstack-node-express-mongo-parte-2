const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/posts', async (req, res) => {
  try {
    const configuredUrl = process.env.WP_API_URL || 'https://public-api.wordpress.com/wp/v2/sites/example.wordpress.com';
    const baseUrl = configuredUrl.includes('localhost') || configuredUrl.includes('127.0.0.1')
      ? 'https://public-api.wordpress.com/wp/v2/sites/example.wordpress.com'
      : configuredUrl.replace(/\/$/, '');

    const perPage = Number(req.query.per_page) || 10;

    const response = await axios.get(`${baseUrl}/wp-json/wp/v2/posts`, {
      params: { per_page: Math.min(Math.max(perPage, 1), 20) },
      timeout: 10000,
    });

    const posts = Array.isArray(response.data) ? response.data : [];
    res.json({ posts });
  } catch (error) {
    res.status(502).json({
      message: 'No se pudieron cargar las publicaciones de WordPress',
      error: error.message,
    });
  }
});

module.exports = router;
