export interface AgendamentoRequest {
  profissional: string;
  paciente: string;
  dataHora: string;
  tenantId: string;
}

export interface Agendamento {
  id: number;
  nomeProfissional: string;
  nomePaciente: string;
  dataHoraAgendamento: string;
  tenantId: string;
}

export interface AgendamentoFormData {
  profissional: string;
  paciente: string;
  dataHora: string;
}
