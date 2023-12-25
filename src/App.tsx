import { useState } from "react";

export default function App() {
    function handleOnDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    function handleOnDrag(e: React.DragEvent, name: string) {
        e.dataTransfer.setData("name", name);
    }

    function handleOnDrop(e: React.DragEvent) {
        if (tasks) {
            setTasks([
                ...tasks.filter(
                    (taskName) => taskName !== e.dataTransfer.getData("name")
                ),
                e.dataTransfer.getData("name"),
            ]);
        } else {
            setTasks([e.dataTransfer.getData("name")]);
        }
    }

    const [tasks, setTasks] = useState<string[]>();

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
                <div className="bg-zinc-900 m-5 flex flex-col">
                    <h1 className="text-center">TODO</h1>
                    <div
                        className="flex-grow flex flex-col gap-5 justify-start items-center border-2 border-white"
                        onDragOver={handleOnDragOver}
                        onDrop={handleOnDrop}
                    >
                        {tasks &&
                            tasks.map((taskName) => {
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
