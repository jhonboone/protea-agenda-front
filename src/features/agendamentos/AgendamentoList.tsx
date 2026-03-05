import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listarAgendamentos,
  deletarAgendamento,
} from "../../api/agendamentoAPI";
import { useAuthStore } from "../../store/authStore";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash2 } from "lucide-react";

export function AgendamentoList() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    data: agendamentos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agendamentos", user?.tenantId],
    queryFn: () => listarAgendamentos(user!.tenantId),
    enabled: !!user?.tenantId,
    staleTime: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: deletarAgendamento,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] }),
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
      </div>
    );

  if (error)
    return <p className="text-red-500">Erro ao carregar agendamentos.</p>;

  return (
    <div className="space-y-3">
      {agendamentos?.map((ag) => (
        <div
          key={ag.id}
          className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm
                     border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div>
            <p className="font-semibold text-gray-800">{ag.nomePaciente}</p>
            <p className="text-sm text-gray-500">com {ag.nomeProfissional}</p>
            <p className="text-sm text-green-600 font-medium">
              {format(
                new Date(ag.dataHoraAgendamento),
                "dd 'de' MMMM 'às' HH:mm",
                { locale: ptBR },
              )}
            </p>
          </div>
          <button
            onClick={() => deleteMutation.mutate(ag.id)}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
      {agendamentos?.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          Nenhum agendamento encontrado.
        </p>
      )}
    </div>
  );
}
