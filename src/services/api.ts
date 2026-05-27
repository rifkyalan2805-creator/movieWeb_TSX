export interface ApiMovie {
  id: string;
  title: string;
  image: string;
  genre: string;
  type: "film" | "series";
  rating: string;
  badges: string[];
  isTrending: boolean;
  isNewRelease: boolean;
}

export const fetchMovies = async (): Promise<ApiMovie[]> => {
  try {
    const response = await fetch("https://6a16ce441b90031f81b17ff6.mockapi.io/movies");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
};
