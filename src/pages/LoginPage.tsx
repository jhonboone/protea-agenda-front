import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = async () => {
    setLoading(true);
    setErro("");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        { email, senha },
      );
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data || error.message;
        setErro(typeof msg === "string" ? msg : JSON.stringify(msg));
      } else {
        setErro("Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow de fundo */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,222,128,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          padding: "0 20px",
          position: "relative",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              marginBottom: "16px",
              background: "rgba(74,222,128,0.08)",
              border: "1px solid rgba(74,222,128,0.15)",
            }}
          >
            <span style={{ fontSize: "24px" }}>🌿</span>
          </div>
          <h1
            style={{
              color: "#efefef",
              fontSize: "22px",
              fontWeight: "600",
              letterSpacing: "-0.5px",
              margin: "0 0 6px 0",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Protea Agenda
          </h1>
          <p style={{ color: "#3a3a3a", fontSize: "13px", margin: 0 }}>
            Gestão de sessões terapêuticas
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#0f0f0f",
            border: "1px solid #1c1c1c",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  color: "#3a3a3a",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: "#080808",
                  border: "1px solid #1c1c1c",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#e0e0e0",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(74,222,128,0.3)")
                }
                onBlur={(e) => (e.target.style.borderColor = "#1c1c1c")}
              />
            </div>

            {/* Senha */}
            <div>
              <label
                style={{
                  display: "block",
                  color: "#3a3a3a",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: "#080808",
                  border: "1px solid #1c1c1c",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#e0e0e0",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(74,222,128,0.3)")
                }
                onBlur={(e) => (e.target.style.borderColor = "#1c1c1c")}
              />
            </div>

            {/* Erro */}
            {erro && (
              <div
                style={{
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.15)",
                  borderRadius: "10px",
                  padding: "10px 14px",
                }}
              >
                <span style={{ color: "#f87171", fontSize: "13px" }}>
                  ⚠ {erro}
                </span>
              </div>
            )}

            {/* Botão */}
            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                background: loading ? "#111" : "rgba(74,222,128,0.1)",
                border: `1px solid ${loading ? "#1c1c1c" : "rgba(74,222,128,0.2)"}`,
                borderRadius: "12px",
                color: loading ? "#333" : "#4ade80",
                fontSize: "14px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "rgba(74,222,128,0.15)";
                  e.currentTarget.style.borderColor = "rgba(74,222,128,0.35)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "rgba(74,222,128,0.1)";
                  e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)";
                }
              }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
