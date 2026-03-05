import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listarAgendamentos, deletarAgendamento } from "../../services/agendamentoService";
import { useAuthStore } from "../../store/authStore";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function AgendamentoList() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: agendamentos, isLoading, error } = useQuery({
    queryKey: ["agendamentos", user?.tenantId],
    queryFn: () => listarAgendamentos(user?.tenantId ?? "default"),
    enabled: !!user?.tenantId,
    staleTime: 30_000,
  });

  const deleteMutation = useMutation({
    mutationFn: deletarAgendamento,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["agendamentos"] }),
  });

  if (isLoading) return (
    <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
      <div style={{
        width: "24px", height: "24px", borderRadius: "50%",
        border: "2px solid #1c1c1c", borderTopColor: "#4ade80",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <p style={{ color: "#f87171", fontSize: "13px", textAlign: "center", padding: "24px 0" }}>
      Erro ao carregar agendamentos.
    </p>
  );

  if (!agendamentos?.length) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ fontSize: "28px", marginBottom: "10px", opacity: 0.3 }}>📅</div>
      <p style={{ color: "#2e2e2e", fontSize: "13px" }}>Nenhum agendamento encontrado</p>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {agendamentos.map((ag) => (
        <div
          key={ag.id}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px 18px",
            background: "#080808",
            border: "1px solid #1c1c1c",
            borderRadius: "14px",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1c1c1c")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* Indicador */}
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(74,222,128,0.06)",
              border: "1px solid rgba(74,222,128,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", flexShrink: 0,
            }}>
              🌿
            </div>

            <div>
              <p style={{ color: "#e0e0e0", fontSize: "14px", fontWeight: "500", margin: "0 0 3px 0" }}>
                {ag.nomePaciente}
              </p>
              <p style={{ color: "#3a3a3a", fontSize: "12px", margin: 0 }}>
                com {ag.nomeProfissional}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{
              fontSize: "12px", color: "#4ade80",
              background: "rgba(74,222,128,0.06)",
              border: "1px solid rgba(74,222,128,0.1)",
              borderRadius: "8px", padding: "4px 10px",
              whiteSpace: "nowrap",
            }}>
              {format(new Date(ag.dataHoraAgendamento), "dd MMM · HH:mm", { locale: ptBR })}
            </span>

            <button
              onClick={() => deleteMutation.mutate(ag.id)}
              disabled={deleteMutation.isPending}
              style={{
                background: "transparent", border: "none",
                color: "#2a2a2a", cursor: "pointer", padding: "4px",
                fontSize: "14px", transition: "color 0.2s",
                lineHeight: 1,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#2a2a2a")}
              title="Excluir"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
