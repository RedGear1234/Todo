
import TextField from "@mui/material/TextField";
import { useState,useEffect } from "react"






const Main = () => {


  const [userData, setUserData] = useState([])
  const [Todo, setTodo] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
     .then(response => response.json())
     .then(data => setUserData(data)) 
  }, [])
  

  const [search, setsearch] = useState('')
  const [Filter, setFilter] = useState([])
  const [visible, setvisible] = useState(false)



  const searchItems = (searchValue) =>{
      setsearch(searchValue)
      console.log(typeof(search))
      if(search !== ''){
        const filterData = userData.filter((item)=>{
          return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())
        })
        setFilter(filterData)
      }else{
        setFilter(userData)
      }
    }

    
    
    function Selectuser  (id){
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
          method:"GET"
        })
        .then(res => res.json())
        .then(result => setTodo(result))

        setvisible(true)
    }

    

  return (
    <>
          <form className="SearchBar">
            <TextField
            id="search-bar"
            className="text"
            label="Enter Any Title"
            variant="outlined"
            placeholder="Search..."
            size="small"
            onChange={(e)=> searchItems(e.target.value)}
            />
        </form>
        <main className="d-flex justify-content-between " style={{height : 300 }} >
          <table className="table" style={{width: 2000}} >
                  <thead>
                    <tr className="d-flex justify-content-between p-2">
                      <th scope="col">ToDo</th>
                      <th scope="col">ToDo title</th>
                      <th scope="col">Task</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  
              
                    {search.length > 1 ? (Filter.map((item)=>{
                      return (
                        <div className="d-flex justify-content-between p-2" key={item.id}>
                          <tr>{item.title}</tr>
                        <button className="btn bg-success pt-1 pb-1 m-2 text-light" onClick={()=>Selectuser(item.id)} >View all</button>
                        </div>
                       )
                    })) : (userData.map((item)=>{
                      return <>
                      <div className="d-flex justify-content-between p-3" id="table" key={item.id}>
                        <p>{item.id}</p> 
                        <p>{item.title}</p> 
                        <p>{item.completed ? "completed" : "Incompleted"}</p> 
                        <button className="btn bg-success pt-1 pb-1 m-2 text-light" onClick={()=>Selectuser(item.id)} >View all</button>
                      </div>
                      </>
                    }))}
                </table>  

                {/* Card start Here  */}
            {
              visible ? (<div className="container d-flex justify-content-center mt-5 " key={Todo.id}>
              <div className="card">
                <div className="top-container">                  
                  <div className="ml-3">
                    <h5 className="name">action: {Todo.completed ? "completed" :  "incompleted"}</h5>
                  </div>
                </div>
                <div className="ml-3">
                    <h5 className="name">Todo List : {Todo.title}</h5>
                  </div>
                <div className="recent-border mt-4">
                  <span className="recent-orders">User Id : {Todo.id}</span>
                </div>
              <button className="btn bg-danger mt-3 text-light" onClick={() => setvisible(false)}>Close</button>
              </div>
            </div> )  
            : 
            (<div className="container d-flex justify-content-center mt-5 invisible">
              <div className="card">
                <div className="top-container">                  
                  <div className="ml-3">
                    <h5 className="name">Name: </h5>
                  </div>
                </div>
                <div className="ml-3">
                    <h5 className="name">Todo List :</h5>
                  </div>
                <div className="recent-border mt-4">
                  <span className="recent-orders">User Id : </span>
                </div>
              </div>
            </div> )
            }
        </main> 
        
    </>    
      
  )

}

export default Main