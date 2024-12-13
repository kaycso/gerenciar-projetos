const API_BASE_URL = "http://localhost:3333";

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.message || "Erro na API");
    }

    return response.json();
  } catch (error) {
    console.log(`Erro na requisição ${error.message}`);
    throw error;
  }
};
