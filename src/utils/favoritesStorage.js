export const getFavorites = () => {
  const favoritesString = localStorage.getItem('favorites');
  return favoritesString ? JSON.parse(favoritesString) : [];
}

export const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}