import { getTodos, getTodosByUser } from "@/models/ToDoModel.js";
import PageContent from "@/app/components/PageContent";
import Header from "@/app/components/Header";
export default function Home() {
  let tasks = null


  //getTodosByUser("user_2hgxmegc8x4m9BchdYFRSJCLrKk").then((todos) => {console.log(todos);} );
  getTodos()
  .then((todos) => {tasks = todos

    return (
      <>
        <Header />
        <main className="flex flex-col items-center justify-between p-24">
            <PageContent tasks={tasks}/>
        </main>
      </>
    );



  })
  .catch((error) => {console.log(error)});

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between p-24">
          <PageContent tasks={tasks}/>
      </main>
    </>
  );

}
