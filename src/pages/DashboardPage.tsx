import { AgendamentoForm } from "../features/agendamentos/AgendamentoForm";
import { AgendamentoList } from "../features/agendamentos/AgendamentoList";
import { useAuthStore } from "../store/authStore";

export function DashboardPage() {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700">🌿 Protea Agenda</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Olá, {user?.nome}</span>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:text-red-700 font-medium"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Novo Agendamento
          </h2>
          <AgendamentoForm />
        </div>

        {/* Lista */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Agendamentos
          </h2>
          <AgendamentoList />
        </div>
      </main>
    </div>
  );
}
