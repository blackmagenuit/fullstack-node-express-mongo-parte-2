const WORDPRESS_URL = import.meta.env.VITE_WORDPRESS_URL || 'https://wordpress.example.com';

export const fetchWordPressPosts = async () => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=10`);
    if (!response.ok) {
      throw new Error('Error al cargar publicaciones');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw error;
  }
};
