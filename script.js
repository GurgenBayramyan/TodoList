const task_input=document.querySelector('.task_input');
const add_btn=document.querySelector('.add_btn');
const content_todo=document.querySelector('.content_todo');
const todoAll=JSON.parse(localStorage.getItem('todo')) ?? [];
const finishedArr = [];
let all = document.querySelector(".all");
let count = document.querySelector(".count");
document.querySelector("h2").addEventListener("click",()=>{
    location.reload();
})

function update(){
    count.textContent = `${finishedArr.length} complated is ${todoAll.length}`
}



function creatHtmlElement(task){
    
    let div=document.createElement('div');
    div.id = createTodo().id;
    div.innerHTML=`<input type="checkbox" class="checked"  >
    <input type="text" value="${task}" readonly class="todo_task">
    <span class="text_messege">finished</span>
    <button class="pen"><i class="fa-solid fa-pen"></i></button>
    <button class="delete"><i class="fa-solid fa-trash"></i></button>

    `
   functionality(div)
   return div
}

function deleteElement(item){
    if(localStorage.hasOwnProperty("todo")){
        let elementIndex = todoAll.findIndex((el)=>el.id == item.id);
        todoAll.splice(elementIndex,1);
        localStorage.setItem("todo",JSON.stringify(todoAll));
        item.remove();
        finishedArr.splice(elementIndex,1);
        update();
    }
}

function functionality(div){
    let finished = div.querySelector(".text_messege");
    let checkbox = div.querySelector(".checked");
    let mainInput = div.querySelector(".todo_task");
    let pen = div.querySelector(".pen");
    let btn = div.querySelector(".delete");
    let val;
    update();
   
    
    pen.addEventListener("click",()=>{
        
        mainInput.removeAttribute("readonly");
        mainInput.className = "todo_task_active";
        val = mainInput.value;
    })

    mainInput.addEventListener("blur",()=>{
        mainInput.setAttribute("readonly","readonly");
        mainInput.className= "todo_task";
        todoAll.map(elem=>{
            if(elem.task.trim().match(val.trim())){
                elem.task = mainInput.value;   
            }    
        })
        localStorage.setItem("todo",JSON.stringify(todoAll))
        
        
    })
  
    btn.addEventListener("click", ()=>{
        deleteElement(div);
        
    })
  
    checkbox.addEventListener("change",()=>{
        let item = todoAll.find(elem=> elem.id == div.id);
        
        if(localStorage.hasOwnProperty("todo") && checkbox.checked){
            div.classList.add("cheked");
            finished.style.display = "inline-block";
            finishedArr.push(item);
            update(); 
            localStorage.setItem("todo",JSON.stringify(todoAll));
        }else{
            div.classList.remove("cheked");
            finished.style.display = "none";
            finishedArr.splice(item,1);
            update(); 
            localStorage.setItem("todo",JSON.stringify(todoAll));
        }
        
        
    })
    
   
}



function createTodo(){
    return{
        id:Date.now(),
        task:task_input.value.trim(),
        chekt:false

    }
    
}
 

add_btn.addEventListener('click',()=>{
    update();
    if(task_input.value.trim()){
      todoAll.push(createTodo());
      
    }
    if(task_input.value.trim() != ""){
    content_todo.append(creatHtmlElement(createTodo().task));
    localStorage.setItem("todo",JSON.stringify(todoAll))
    }
    task_input.value="";
    
     
})

window.onload = () =>{

if(localStorage.hasOwnProperty("todo")){

       if(todoAll.length){

            todoAll.map(item=>{

              content_todo.append(creatHtmlElement(item.task));
            })

       }
        
    }
}


