import axios from "axios";
import type { Agendamento, AgendamentoRequest } from "../types/agendamento";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// POST
export const criarAgendamento = (data: AgendamentoRequest) =>
  api.post<Agendamento>("/api/v1/agendamento", data).then((r) => r.data);

// GET
export const listarAgendamentos = (tenantId: string) =>
  api.get<Agendamento[]>(`/api/v1/agendamento/${tenantId}`).then((r) => r.data);

// DELETE
export const deletarAgendamento = (id: number) =>
  api.delete(`/api/v1/agendamento/${id}`).then((r) => r.data);
