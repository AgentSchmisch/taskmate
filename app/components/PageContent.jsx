"use client"
import NewTask from "./NewTask.jsx";
import { useUser } from "@clerk/nextjs";
import { RedirectToSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Task from "./Task.jsx";


export default function PageContent({ getTaskForUser, createTask, updateTask, deleteTask }) {

  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <RedirectToSignIn />
  }

  const [tasks, setTasks] = useState([]);
  const [visibleModal, setShowModal] = useState(null);
  const [reload, setReload] = useState(false);

  function loadData(){
    getTaskForUser(user.id).then((_tasks) => { setTasks(_tasks) });
  }

  const handleCloseModal = () => {
    setShowModal(null);
    setReload(true)
  };

  useEffect(() => {
    loadData();
  }, [])

  useEffect(()=>{
    loadData();
    setReload(false)
  },[reload])

  return (

    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div className="flex flex-row">
        <div className="m-4">
        <NewTask createTask={createTask} showModal={visibleModal === "new"} handleOpenModal={setShowModal} handleCloseModal={handleCloseModal} userid={user.id} />
        </div>

      </div>
      {
          tasks.length > 0 &&
          tasks.map((task) => (
            <div className="m-4" key={task.id}>
              <Task updateTask={updateTask} deleteTask={deleteTask} task={task} showModal={visibleModal === task.id} handleOpenModal={setShowModal} handleCloseModal={handleCloseModal} setShowModal={setShowModal} userid={user.id}/>
            </div>
          ))
        }

    </div>

  )
}