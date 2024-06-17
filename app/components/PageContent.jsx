"use client"
import NewTask from "./NewTask.jsx";
import { useUser } from "@clerk/nextjs";
import { RedirectToSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Task from "./Task.jsx";


export default function PageContent({ getTaskForUser, createTask, updateTask, deleteTask }) {

  const { isLoaded, isSignedIn, user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [visibleModal, setShowModal] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    loadData();
  }, [])

  useEffect(()=>{
    loadData();
    setReload(false)
  },[reload])
  
  useEffect(()=>{
    loadData()
  },[user])

  if (!isLoaded || !isSignedIn) {
    return <RedirectToSignIn />
  }


  function loadData(){
    if (!user){
      return
    }
    getTaskForUser(user.id).then((_tasks) => { setTasks(_tasks) });
  }

  const handleCloseModal = () => {
    setShowModal(null);
    setReload(true)
  };


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