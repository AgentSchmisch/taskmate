"use client"
import NewTask from "./NewTask.jsx";
import { useUser } from "@clerk/nextjs";
import { RedirectToSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Task from "./Task.jsx";


export default function PageContent({ getTaskForUser, createTask, updateTask, deleteTask, getTaskForToday, getFinishedTodos }) {

  const { isLoaded, isSignedIn, user } = useUser();
  const [tasks, setTasks] = useState([]);
  const[todaysTasks, setTodaysTasks] = useState([]);
  const[finishedTasks, setFinishedTasks] = useState([]);

  const [visibleModal, setShowModal] = useState(null);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(()=>{
    loadData();
    setReload(false)
  },[reload]);

  useEffect(()=>{
    loadData()
  },[user]);


  if (!isLoaded || !isSignedIn) {
    return <RedirectToSignIn />
  }


  function loadData(){
    if (!user){
      return
    }
    getTaskForUser(user.id)
    .then((_tasks) => { setTasks(_tasks) })
    .catch((error) => {
      console.log(error.sqlMessage)
      setError("Error loading tasks")  
    })
    
    getTaskForToday(user.id)
    .then((_todaysTasks) => { setTodaysTasks(_todaysTasks) })
    .catch((error) => {
      console.log(error.sqlMessage)
      setError("Error loading tasks")  
    })

    getFinishedTodos(user.id)
    .then((_finished) => {
      console.log(_finished)
      setFinishedTasks(_finished)})
    .catch((error) => {
      console.log(error)
      setError("Error loading tasks")
    })
  }

  // this function is called when the Modal is able to be closed
  const handleCloseModal = () => {
    setShowModal(null);
    setReload(true)
  };


  return (

  <div className="z-10 max-w-5xl w-full justify-between font-mono text-sm flex-wrap flex-col lg:flex">
      <p>{error}</p>
      <div className="flex flex-row flex-wrap">
        <div className="m-4">
        <NewTask createTask={createTask} showModal={visibleModal === "new"} handleOpenModal={setShowModal} handleCloseModal={handleCloseModal} userid={user.id} />
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

    <div>
        <h1 className="font-bold">Your Tasks for Today</h1>
        <div className="flex flex-row flex-wrap">
          {
            todaysTasks.length > 0 &&
            todaysTasks.map((task) => (
              <div className="m-4" key={task.id}>
                <Task updateTask={updateTask} deleteTask={deleteTask} task={task} showModal={visibleModal === task.id} handleOpenModal={setShowModal} handleCloseModal={handleCloseModal} setShowModal={setShowModal} userid={user.id}/>
              </div>
            ))
          }
        </div>
    </div>

    <div>
        <h1 className="font-bold">Your finished Tasks</h1>
        <div className="flex flex-col md:flex-row flex-wrap">
          {
            finishedTasks.length > 0 &&
            finishedTasks.map((task) => (
              <div className="m-4" key={task.id}>
                <Task updateTask={updateTask} deleteTask={deleteTask} task={task} showModal={visibleModal === task.id} handleOpenModal={setShowModal} handleCloseModal={handleCloseModal} setShowModal={setShowModal} userid={user.id}/>
              </div>
            ))
          }
        </div>

    </div>

  </div>


  )
}