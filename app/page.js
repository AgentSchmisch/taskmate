import { getTodosForToday, getTodosByUser,createTodo, deleteTodo, updateTodo } from "@/models/ToDoModel.js";
import PageContent from "@/app/components/PageContent";
import Header from "@/app/components/Header";
import { cookies } from "next/headers"


export default async function Home() {

  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <PageContent getTaskForUser={getTodosByUser} createTask={createTodo} deleteTask={deleteTodo} updateTask={updateTodo} getTaskForToday={getTodosForToday}/>
      </main>
    </>
  );

}