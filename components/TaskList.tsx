// components/TaskList.tsx
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Checkbox, Paper, Typography, Stack, Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { Task } from "../types/task";
import { format } from "date-fns";

interface TaskListProps {
    tasks: Task[];
    onToggleDone: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggleDone, onDelete }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <Paper sx={{ p: 4, textAlign: "center" }}>
                <Typography>Nenhuma tarefa ainda. Adicione a primeira!</Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="task table">
                <TableHead>
                    <TableRow>
                        <TableCell>Feita</TableCell>
                        <TableCell>Título</TableCell>
                        <TableCell>Criada em</TableCell>
                        <TableCell align="right">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((t) => (
                        <TableRow key={t.id} hover>
                            <TableCell padding="checkbox">
                                <Checkbox checked={t.done} onChange={() => onToggleDone(t.id)} />
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ textDecoration: t.done ? "line-through" : "none" }}>
                                    {t.title}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {(() => {
                                    const date = new Date(t.createdAt);
                                    return isNaN(date.getTime())
                                        ? "Data inválida"
                                        : format(date, "dd/MM/yyyy HH:mm");
                                })()}
                            </TableCell>
                            <TableCell align="right">
                                <Stack direction="row" spacing={1} justifyContent="flex-end">
                                    <Tooltip title="Excluir">
                                        <IconButton color="error" onClick={() => onDelete(t.id)} aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
