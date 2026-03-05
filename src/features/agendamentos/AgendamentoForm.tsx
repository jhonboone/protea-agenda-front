import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { criarAgendamento } from "../../api/agendamentoAPI";
import { useAuthStore } from "../../store/authStore";
import type { AxiosError } from "axios";

const schema = z.object({
  profissional: z.string().min(2, "Nome do profissional obrigatório"),
  paciente: z.string().min(2, "Nome do paciente obrigatório"),
  dataHora: z.string().refine((val) => {
    return new Date(val) > new Date();
  }, "A data deve ser futura"),
});

type FormData = z.infer<typeof schema>;

export function AgendamentoForm() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: criarAgendamento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] });
      reset();
      alert("Agendamento criado!");
    },
    onError: (error: AxiosError) => {
      alert(error.response?.data || "Erro ao criar agendamento");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({
      ...data,
      tenantId: user!.tenantId,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Profissional
        </label>
        <input
          {...register("profissional")}
          className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          placeholder="Nome do profissional"
        />
        {errors.profissional && (
          <p className="text-red-500 text-sm mt-1">
            {errors.profissional.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Paciente
        </label>
        <input
          {...register("paciente")}
          className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          placeholder="Nome do paciente"
        />
        {errors.paciente && (
          <p className="text-red-500 text-sm mt-1">{errors.paciente.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Data e Hora
        </label>
        <input
          type="datetime-local"
          {...register("dataHora")}
          className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
        />
        {errors.dataHora && (
          <p className="text-red-500 text-sm mt-1">{errors.dataHora.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700
                   disabled:opacity-50 transition-colors font-semibold"
      >
        {mutation.isPending ? "Salvando..." : "Criar Agendamento"}
      </button>
    </form>
  );
}
