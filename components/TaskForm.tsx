// components/TaskForm.tsx
import { useForm } from "react-hook-form";
import { Button, TextField, Stack, Paper, Typography } from "@mui/material";

export type TaskFormData = { title: string };

interface TaskFormProps {
    onSubmit: (data: TaskFormData) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TaskFormData>();

    const submit = (data: TaskFormData) => {
        onSubmit(data);
        reset();
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Nova Tarefa
            </Typography>
            <form onSubmit={handleSubmit(submit)} noValidate>
                <Stack spacing={2}>
                    <TextField
                        label="Título da tarefa"
                        fullWidth
                        {...register("title", {
                            required: "Informe um título",
                            minLength: { value: 3, message: "Mínimo de 3 caracteres" },
                        })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                        Adicionar
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}
