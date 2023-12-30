let input = document.querySelector(".taskname")
let input2 = document.querySelector(".taskcategory")
let submit = document.querySelector(".add")
let tasksDiv = document.querySelector(".tasks")



let tasks = []

if(localStorage.getItem("mytasks"))
{
    tasks=JSON.parse(localStorage.getItem("mytasks"));
}

get_tasks_from_localStorage()

submit.onclick = function()
{
    if(input.value !== "" && input2.value !== "" )
    {
        // fuction to add the tasks
        add_task_to_tasks(input.value , input2.value)
        input.value = ""
                
        console.log(tasks)
        console.log(tasks[tasks.length - 1])
        console.log(tasks[tasks.length - 1].title)


    }
}

tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) 
    {
        console.log(e.target.parentElement.getAttribute("id"))
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
      
      // Remove Element From Page
          e.target.parentElement.remove();
    }
    
    if (e.target.classList.contains("task"))  
    {

        toggleStatusTaskWith(e.target.getAttribute("data-id"))

       e.target.classList.toggle("task-done")
    }

})

function add_task_to_tasks(task_name , task_category) 
{
    // the data of the task
    const task = 
    {
        id: Date.now(),
        cat:task_category,
        title: task_name,
        completed: false
    };

    // add the task to tasks list 
    tasks.push(task)


    // -------------------- // 

    // add tasks to the page 
    add_ell_to_body(tasks)

    // add tasks to local storage
    save_tasks_in_localStorage(tasks)
}

function add_ell_to_body(tasks)
{
    tasksDiv.innerHTML = "";

    // Looping On Array Of Tasks
    tasks.forEach((task) => {
        // Create Main Div
        let div = document.createElement("div");
        div.id = "id" + task.id 
        div.className = "task";
        // Check If Task is Done
        if (task.completed) 
        {
          div.className = "task-done";
        }

        
        let h4 = document.createElement("h4") 


        let p = document.createElement("p")

        
        let taskTitle_text = document.createTextNode(task.title)
  
        let taskStatus_text = document.createTextNode(task.cat)   

        h4.appendChild(taskTitle_text)
        p.appendChild(taskStatus_text)
        
        div.appendChild(h4)

        div.appendChild(p)
        // console.log(div.className)
        div.setAttribute("onclick" , "done(id)")
        div.setAttribute("data-id", task.id);
        // div.appendChild(document.createTextNode(task.title));
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("X"));
        // Append Button To Main Div
        div.appendChild(span);
        // Add Task Div To Tasks Container
        tasksDiv.appendChild(div)
        
    })
}


function done(id)
{
    // let task = document.querySelector(`#${id}`)
    
    // if(task.className === "task")
    // {
    //     task.className = "task-done"         
    // }
    // else
    // {
    //     task.className = "task"    
    // }    
    
}

function save_tasks_in_localStorage(tasks)
{
    window.localStorage.setItem("mytasks" , JSON.stringify(tasks))
}

function get_tasks_from_localStorage()
{
    let data = window.localStorage.getItem("mytasks")
    if(data)
    {
        let mytasks = JSON.parse(data)
        add_ell_to_body(mytasks)
    }
    
}

function deleteTaskWith(taskId) 
{
    tasks = tasks.filter((task) => task.id != taskId);
    save_tasks_in_localStorage(tasks);
  }

  function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == taskId) {
        tasks[i].completed === false ? (tasks[i].completed = true) : (tasks[i].completed = false);
      }
      console.log(tasks[i].completed)
    }
    
    save_tasks_in_localStorage(tasks);
  }
