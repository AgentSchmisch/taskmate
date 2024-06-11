import NewTask from "./Task";

export default function TaskList(tasks) {

    return (
        <div>
            {tasks.map((task) => (
                NewTask
            ))}
        </div>
    )

}