import { AgendamentoForm } from "../features/agendamentos/AgendamentoForm";
import { AgendamentoList } from "../features/agendamentos/AgendamentoList";
import { useAuthStore } from "../store/authStore";

export function DashboardPage() {
  const { user, logout } = useAuthStore();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: "#e0e0e0",
    }}>
      {/* Header */}
      <header style={{
        background: "#0f0f0f",
        borderBottom: "1px solid #1c1c1c",
        padding: "0 32px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>🌿</span>
          <span style={{
            color: "#efefef", fontSize: "15px", fontWeight: "600",
            fontFamily: "Georgia, serif", letterSpacing: "-0.3px",
          }}>Protea Agenda</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {user?.nome && (
            <span style={{
              fontSize: "13px", color: "#3a3a3a",
              background: "#141414", border: "1px solid #1c1c1c",
              borderRadius: "8px", padding: "5px 12px",
            }}>
              {user.nome}
            </span>
          )}
          <button
            onClick={logout}
            style={{
              fontSize: "13px", color: "#3a3a3a",
              background: "transparent", border: "none",
              cursor: "pointer", padding: "5px 0",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3a3a")}
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* Título da página */}
        <div>
          <h2 style={{ color: "#efefef", fontSize: "20px", fontWeight: "600", margin: "0 0 4px 0", letterSpacing: "-0.4px" }}>
            Agendamentos
          </h2>
          <p style={{ color: "#2e2e2e", fontSize: "13px", margin: 0 }}>
            Gerencie suas sessões terapêuticas
          </p>
        </div>

        {/* Formulário */}
        <div style={{
          background: "#0f0f0f",
          border: "1px solid #1c1c1c",
          borderRadius: "18px",
          padding: "28px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#4ade80",
            }} />
            <h3 style={{ color: "#efefef", fontSize: "14px", fontWeight: "600", margin: 0, letterSpacing: "0.02em" }}>
              Novo Agendamento
            </h3>
          </div>
          <AgendamentoForm />
        </div>

        {/* Lista */}
        <div style={{
          background: "#0f0f0f",
          border: "1px solid #1c1c1c",
          borderRadius: "18px",
          padding: "28px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#60a5fa",
            }} />
            <h3 style={{ color: "#efefef", fontSize: "14px", fontWeight: "600", margin: 0, letterSpacing: "0.02em" }}>
              Agendamentos
            </h3>
          </div>
          <AgendamentoList />
        </div>
      </main>
    </div>
  );
}
