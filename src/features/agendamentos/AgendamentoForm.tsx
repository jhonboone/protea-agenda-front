import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { criarAgendamento } from "../../services/api";
import { useAuthStore } from "../../store/authStore";

const schema = z.object({
  profissional: z.string().min(2, "Nome do profissional obrigatório"),
  paciente: z.string().min(2, "Nome do paciente obrigatório"),
  dataHora: z.string().min(1, "Data e hora obrigatórias"),
});

type FormData = z.infer<typeof schema>;

const inputStyle = {
  width: "100%", boxSizing: "border-box" as const,
  background: "#080808", border: "1px solid #1c1c1c",
  borderRadius: "12px", padding: "11px 14px",
  color: "#e0e0e0", fontSize: "14px", outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block", color: "#3a3a3a", fontSize: "11px",
  fontWeight: "600" as const, letterSpacing: "0.1em",
  textTransform: "uppercase" as const, marginBottom: "7px",
};

export function AgendamentoForm() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => criarAgendamento({
      ...data,
      tenantId: user?.tenantId ?? "default",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] });
      reset();
    },
    onError: () => {
      alert("Erro ao criar agendamento. Verifique os dados.");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* Profissional */}
        <div>
          <label style={labelStyle}>Profissional</label>
          <input
            {...register("profissional")}
            placeholder="Nome do profissional"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(74,222,128,0.3)")}
            onBlur={(e) => (e.target.style.borderColor = "#1c1c1c")}
          />
          {errors.profissional && (
            <p style={{ color: "#f87171", fontSize: "12px", marginTop: "5px" }}>
              {errors.profissional.message}
            </p>
          )}
        </div>

        {/* Paciente */}
        <div>
          <label style={labelStyle}>Paciente / Cliente</label>
          <input
            {...register("paciente")}
            placeholder="Nome do paciente"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(74,222,128,0.3)")}
            onBlur={(e) => (e.target.style.borderColor = "#1c1c1c")}
          />
          {errors.paciente && (
            <p style={{ color: "#f87171", fontSize: "12px", marginTop: "5px" }}>
              {errors.paciente.message}
            </p>
          )}
        </div>
      </div>

      {/* Data e hora */}
      <div style={{ maxWidth: "260px" }}>
        <label style={labelStyle}>Data e Hora</label>
        <input
          type="datetime-local"
          {...register("dataHora")}
          style={{ ...inputStyle, colorScheme: "dark" }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(74,222,128,0.3)")}
          onBlur={(e) => (e.target.style.borderColor = "#1c1c1c")}
        />
        {errors.dataHora && (
          <p style={{ color: "#f87171", fontSize: "12px", marginTop: "5px" }}>
            {errors.dataHora.message}
          </p>
        )}
      </div>

      {/* Botão */}
      <div>
        <button
          type="submit"
          disabled={mutation.isPending}
          style={{
            padding: "11px 28px",
            background: mutation.isPending ? "#111" : "rgba(74,222,128,0.1)",
            border: `1px solid ${mutation.isPending ? "#1c1c1c" : "rgba(74,222,128,0.2)"}`,
            borderRadius: "12px",
            color: mutation.isPending ? "#333" : "#4ade80",
            fontSize: "13px", fontWeight: "600",
            cursor: mutation.isPending ? "not-allowed" : "pointer",
            transition: "all 0.2s", letterSpacing: "0.04em",
          }}
          onMouseEnter={(e) => {
            if (!mutation.isPending) {
              e.currentTarget.style.background = "rgba(74,222,128,0.15)";
              e.currentTarget.style.borderColor = "rgba(74,222,128,0.35)";
            }
          }}
          onMouseLeave={(e) => {
            if (!mutation.isPending) {
              e.currentTarget.style.background = "rgba(74,222,128,0.1)";
              e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)";
            }
          }}
        >
          {mutation.isPending ? "Salvando..." : "Criar Agendamento"}
        </button>
      </div>
    </form>
  );
}
