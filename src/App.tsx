import { useState } from "react";

export default function App() {
    const [todo, setTodo] = useState<string[]>();
    const [ongoing, setOngoing] = useState<string[]>();
    const [completed, setCompleted] = useState<string[]>();

    function handleOnDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    function handleOnDrag(e: React.DragEvent, name: string) {
        e.dataTransfer.setData("name", name);
    }

    function handleOnDropTodo(e: React.DragEvent) {
        // Set the dropped task to todo state
        if (todo) {
            setTodo([
                ...todo.filter(
                    (taskName) => taskName !== e.dataTransfer.getData("name")
                ),
                e.dataTransfer.getData("name"),
            ]);
        } else {
            setTodo([e.dataTransfer.getData("name")]);
        }

        // If dropping from ongoing --> todo
        // Delete from ongoing
        ongoing?.forEach((task) => {
            if (task === e.dataTransfer.getData("name")) {
                setOngoing([
                    ...ongoing.filter(
                        (taskName) =>
                            taskName !== e.dataTransfer.getData("name")
                    ),
                ]);
            }
        });

        // If dropping from completed --> todo
        // Delete from completed
        completed?.forEach((task) => {
            if (task === e.dataTransfer.getData("name")) {
                setCompleted([
                    ...completed.filter(
                        (taskName) =>
                            taskName !== e.dataTransfer.getData("name")
                    ),
                ]);
            }
        });
    }

    function handleOnDropOngoing(e: React.DragEvent) {
        // Set the dropped task to todo state
        if (ongoing) {
            setOngoing([
                ...ongoing.filter(
                    (taskName) => taskName !== e.dataTransfer.getData("name")
                ),
                e.dataTransfer.getData("name"),
            ]);
        } else {
            setOngoing([e.dataTransfer.getData("name")]);
        }

        // If dropping from todo --> ongoing
        // Delete from todo
        todo?.forEach((task) => {
            if (task === e.dataTransfer.getData("name")) {
                setTodo([
                    ...todo.filter(
                        (taskName) =>
                            taskName !== e.dataTransfer.getData("name")
                    ),
                ]);
            }
        });

        // If dropping from completed --> ongoing
        // Delete from completed
        completed?.forEach((task) => {
            if (task === e.dataTransfer.getData("name")) {
                setCompleted([
                    ...completed.filter(
                        (taskName) =>
                            taskName !== e.dataTransfer.getData("name")
                    ),
                ]);
            }
        });
    }

    function handleOnDropCompleted(e: React.DragEvent) {
        // Set the dropped task to todo state
        if (completed) {
            setCompleted([
                ...completed.filter(
                    (taskName) => taskName !== e.dataTransfer.getData("name")
                ),
                e.dataTransfer.getData("name"),
            ]);
        } else {
            setCompleted([e.dataTransfer.getData("name")]);
        }

        // If dropping from todo --> completed
        // Delete from todo
        todo?.forEach((task) => {
            if (task === e.dataTransfer.getData("name")) {
                setTodo([
                    ...todo.filter(
                        (taskName) =>
                            taskName !== e.dataTransfer.getData("name")
                    ),
                ]);
            }
        });

        // If dropping from ongoing --> completed
        // Delete from ongoing
        ongoing?.forEach((task) => {
            if (task === e.dataTransfer.getData("name")) {
                setOngoing([
                    ...ongoing.filter(
                        (taskName) =>
                            taskName !== e.dataTransfer.getData("name")
                    ),
                ]);
            }
        });
    }

    return (
        <div className="flex flex-col h-screen text-white">
            <div className="flex justify-center items-center bg-black p-10">
                <div className="w-[500px] h-[300px] bg-slate-900 flex flex-col justify-center items-center gap-5 text-center">
                    <div
                        className="w-[400px] h-[50px] bg-gray-700 border"
                        draggable
                        onDragStart={(e) => {
                            handleOnDrag(e, "Task 1");
                        }}
                    >
                        Task 1
                    </div>
                    <div
                        className="w-[400px] h-[50px] bg-gray-700 border"
                        draggable
                        onDragStart={(e) => {
                            handleOnDrag(e, "Task 2");
                        }}
                    >
                        Task 2
                    </div>
                    <div
                        className="w-[400px] h-[50px] bg-gray-700 border"
                        draggable
                        onDragStart={(e) => {
                            handleOnDrag(e, "Task 3");
                        }}
                    >
                        Task 3
                    </div>
                    <div
                        className="w-[400px] h-[50px] bg-gray-700 border"
                        draggable
                    >
                        Task 4
                    </div>
                </div>
            </div>
            <div className="flex-grow bg-black w-full grid grid-cols-3 mx-auto text-white">
                {/* todo column */}
                <div className="bg-zinc-900 m-5 flex flex-col">
                    <h1 className="text-center">TODO</h1>
                    <div
                        className="flex-grow flex flex-col gap-5 justify-start items-center border-2 border-white"
                        onDragOver={handleOnDragOver}
                        onDrop={handleOnDropTodo}
                    >
                        {todo &&
                            todo.map((taskName) => {
                                return (
                                    <div
                                        className="w-[400px] h-[50px] bg-gray-700 border text-center"
                                        draggable
                                        onDragStart={(e) => {
                                            handleOnDrag(e, taskName);
                                        }}
                                    >
                                        {taskName}
                                    </div>
                                );
                            })}
                    </div>
                </div>
                {/* ongoing column */}
                <div className="bg-zinc-900 m-5 flex flex-col">
                    <h1 className="text-center">Ongoing</h1>
                    <div
                        className="flex-grow flex flex-col gap-5 justify-start items-center border-2 border-white"
                        onDragOver={handleOnDragOver}
                        onDrop={handleOnDropOngoing}
                    >
                        {ongoing &&
                            ongoing.map((taskName) => {
                                return (
                                    <div
                                        className="w-[400px] h-[50px] bg-gray-700 border text-center"
                                        draggable
                                        onDragStart={(e) => {
                                            handleOnDrag(e, taskName);
                                        }}
                                    >
                                        {taskName}
                                    </div>
                                );
                            })}
                    </div>
                </div>
                {/* completed column */}
                <div className="bg-zinc-900 m-5 flex flex-col">
                    <h1 className="text-center">Completed</h1>
                    <div
                        className="flex-grow flex flex-col gap-5 justify-start items-center border-2 border-white"
                        onDragOver={handleOnDragOver}
                        onDrop={handleOnDropCompleted}
                    >
                        {completed &&
                            completed.map((taskName) => {
                                return (
                                    <div
                                        className="w-[400px] h-[50px] bg-gray-700 border text-center"
                                        draggable
                                        onDragStart={(e) => {
                                            handleOnDrag(e, taskName);
                                        }}
                                    >
                                        {taskName}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}
