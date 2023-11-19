const getFavorites = () => {
  const favoritesString = localStorage.getItem('favorites');
  return favoritesString ? JSON.parse(favoritesString) : [];
}