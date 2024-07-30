
import { useEffect, useState } from 'react';
import './App.css';
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

function App() {

  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  
  const [allTodos,setAllTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDiscription ,setNewDiscription] = useState("");
  const [completedTodos , setCompletedTodos] = useState([])
  const [currentEdit ,setCurrentEdit] = useState("");
  const [currentEditedItem , setCurrentEditedItem] = useState("")



  const handleAddTodo = () =>{
    let newTodoItem = {
      title:newTitle,
      discription:newDiscription
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem)
    setAllTodos(updatedTodoArr);
    localStorage.setItem(`todolist`,JSON.stringify(updatedTodoArr))
  };
   
  const handleDeleteCompletedTodo = (index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index);

    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo))
    setCompletedTodos(reducedTodo)
  }

   
  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));

    if(savedTodo){
      setAllTodos(savedTodo);
    }

    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }

  },[])

  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem('todolist',JSON.stringify(reducedTodo))
    setAllTodos(reducedTodo)
  }

  const handleComplete = (index)=>{
    let  now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yy + 'at' + h + ':' + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index)
    localStorage.setItem(`completedTodos`,JSON.stringify(updatedCompletedArr))
  }

   const handleEdit = (ind,item)=>{
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
   }

   const handleUpdateTitile = (value)=>{
     setCurrentEditedItem((prev)=>{
      return{...prev,title:value}
     })
   }

   const handleUpdateDiscription = (value) =>{
    setCurrentEditedItem((prev)=>{
      return{...prev,discription:value}
     })
   }

   const handleUpdateTodo = ()=>{
       let newTodo = [...allTodos];
       newTodo[currentEdit] = currentEditedItem;
       setAllTodos(newTodo);
       setCurrentEdit("")
   }

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
            <div className='todo-input-item'>
              <label>Title</label>
              <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='What the task'/>
            </div>
            <div className='todo-input-item'>
              <label>Discription</label>
              <input type='text' value={newDiscription} onChange={(e)=>setNewDiscription(e.target.value)} placeholder='What the discription'/>
            </div>
            <div className='todo-input-item'>
              <button type='buton' onClick={handleAddTodo} className='primaryBtn'>Add</button>
            </div>
        </div>

        <div className='btn-area'> 
          <button className={`secondarybtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondarybtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>
          {isCompleteScreen===false && allTodos.map((item,index)=>{
            if(currentEdit===index){
              return(
                <div className='eidt-wrapper' key={index}>
                <input placeholder='Updated Ttile' onChange={(e)=>handleUpdateTitile(e.target.value)} value={currentEditedItem.title}/>
                <textarea placeholder='Updated Discription' rows={4} onChange={(e)=> handleUpdateDiscription(e.target.value)} value={currentEditedItem.discription} />
                <button type='buton' onClick={handleUpdateTodo} className='primaryBtn'>Update</button>
                </div>
              )
            }else{
              return(
                <div className='todo-list-item' key={index}>
              <div>
              <h3>{item.title}</h3>
              <p>{item.discription}</p>
              </div>
                
              <div>
                <MdDelete className='icon' onClick={()=>{handleDeleteTodo(index)}} title='Deleted'/>
                <FaCheckCircle className='check-icon' onClick={()=>handleComplete(index)}  title='Completed'/>
                <FaEdit className='check-icon' onClick={()=>handleEdit(index,index)}  title='Edit' />
            
              </div>
            </div>
              );
            }
           
          })}

          {isCompleteScreen===true && completedTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.discription}</p>
            <p><small>Completed on:{item.completedOn}</small></p>

            </div>
              
            <div>
              <MdDelete className='icon' onClick={()=>{handleDeleteCompletedTodo(index)}} title='Deleted'/>
            </div>
          </div>
            );
          })}

        </div>

      </div>


    </div>
  );
}

export default App;
