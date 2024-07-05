import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const createFilial = async (filial: string, quantidadeColaboradores: number) => {
  const response = await api.post("/filial", { filial, quantidadeColaboradores });
  return response.data;
};

export const fetchAllFiliais = async () => {
    const response = await api.get('/filial');
    return response.data;
};

export const deleteFilial = async (id: number) => {
  const response = await api.delete(`/filial/${id}`);
  return response.data;
};

export const createUser = async (userData: FormData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const fetchVisibilitySettings = async () => {
  const response = await api.get("/form-visibility");
  return response.data;
};

export const updateVisibilitySettings = async (
  updates: { field: string; isVisible: boolean }[]
) => {
  await Promise.all(
    updates.map((update) => api.patch("/form-visibility", update))
  );
};

export const loginAdmin = async (login: string, senha: string) => {
  const response = await api.post("/admin/login", { login, senha });
  return response.data;
};

export const fetchAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const submitUserResponse = async (userId: number, responses: Record<number, number>) => {
  const response = await api.post(`/users/${userId}/responses`, responses);
  return response.data;
};

export const fetchUserResponses = async (userId: number) => {
  const response = await api.get(`/users/${userId}/responses`);
  return response.data;
};

export default api;

