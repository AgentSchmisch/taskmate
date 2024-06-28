import { getTodosForToday, getTodosByUser,createTodo, deleteTodo, updateTodo, getFinishedTodos } from "@/models/ToDoModel.js";
import PageContent from "@/app/components/PageContent";


export default async function Home() {

  return (
    // this is the basic page layout 
    // it has to be done this way because a server component in the root is needed to get the information from the database in an async way
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <PageContent getTaskForUser={getTodosByUser} createTask={createTodo} deleteTask={deleteTodo} updateTask={updateTodo} getTaskForToday={getTodosForToday} getFinishedTodos={getFinishedTodos}/>
      </main>
    </>
  );
}