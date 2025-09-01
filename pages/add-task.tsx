// pages/add-task.tsx
import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container, Stack, Button, Typography } from "@mui/material";
import { TaskForm, TaskFormData } from "../components/TaskForm";
import { addTask } from "../utils/taskStorage";
import Link from "next/link";

export default function AddTaskPage() {
    const router = useRouter();

    const onSubmit = (data: TaskFormData) => {
        addTask(data.title);
        router.push("/");
    };

    return (
        <>
            <Head>
                <title>Tasks | Nova</title>
            </Head>
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h4">Adicionar Tarefa</Typography>
                    <Button component={Link} href="/" variant="outlined">Voltar</Button>
                </Stack>

                <TaskForm onSubmit={onSubmit} />
            </Container>
        </>
    );
}
