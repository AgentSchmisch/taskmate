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
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getTaskForUser(user.id).then((_tasks) => { setTasks(_tasks) });
  }, [])


  return (

    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div className="flex flex-row">
        <NewTask createTask={createTask} showModal={showModal} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} userid={user.id} />
        {
          tasks.length > 0 &&
          tasks.map((task) => (
            <div className="m-4" key={task.id}>
              <Task updateTask={updateTask} deleteTask={deleteTask} task={task} showModal={showModal} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} setShowModal={setShowModal} userid={user.id}/>
            </div>
          ))
        }
      </div>

    </div>

  )
}