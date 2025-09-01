// pages/index.tsx
import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Stack, Button, Typography } from "@mui/material";
import { TaskList } from "../components/TaskList";
import { Task } from "../types/task";
import { getTasks, toggleTask, deleteTask } from "../utils/taskStorage";

export default function HomePage() {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleToggle = (id: string) => {
    const updated = toggleTask(id);
    setTasks(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteTask(id);
    setTasks(updated);
  };

  return (
    <>
      <Head>
        <title>Tasks | Home</title>
      </Head>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4">Minhas Tarefas</Typography>
          <Button component={Link} href="/add-task" variant="contained">
            Nova tarefa
          </Button>
        </Stack>

        <TaskList tasks={tasks} onToggleDone={handleToggle} onDelete={handleDelete} />
      </Container>
    </>
  );
}
