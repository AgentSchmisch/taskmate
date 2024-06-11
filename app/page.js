import Image from "next/image";
import { getTodos, getTodosByUser } from "@/models/ToDoModel.js";
import PageContent from "@/app/components/PageContent";
export default function Home() {

  getTodos().then((todos) => {console.log(todos);} );
  getTodosByUser("user_2hgxmegc8x4m9BchdYFRSJCLrKk").then((todos) => {console.log(todos);} );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <PageContent/>
    </main>
  );
}
