const form = document.querySelector('#formtask');
const tasklist = document.querySelector(".collection");
const clearbtn = document.querySelector('.clear-task ');
const filter = document.querySelector('#filter');
const taskinput = document.querySelector('#task'); 
console.log(taskinput);
// EVENT LOADER
loadeventlistner();
function loadeventlistner(){
document.addEventListener('DOMContentLoaded' ,getTask);
form.addEventListener('submit' , addtask);
tasklist.addEventListener('click' , deleteTask);
clearbtn.addEventListener('click' , cleartask);
filter.addEventListener('keyup' , filterTask);
}
//GET TASK FROM  LS AND DISPLAY IN LIST 
function getTask()
{
    let tasks;
        if(localStorage.getItem('tasks') === null)
        {
            tasks = [];

        }
        else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task)
        {
            const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'; 
    link.innerHTML ='<i class = " fa fa-remove"></i>';
    li.appendChild(link); 
    tasklist.appendChild(li);

        });
}
function addtask(e)
{
    
    if(taskinput.value === '')
    {
        alert('enter the task');
    }
    else{
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskinput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'; 
    link.innerHTML ='<i class = " fa fa-remove"></i>';
    li.appendChild(link); 
    tasklist.appendChild(li);
    StoreInLocalStorage(taskinput.value);
    function StoreInLocalStorage(task)
    {
        let tasks;
        if(localStorage.getItem('tasks') === null)
        {
            tasks = [];

        }
        else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks' , JSON.stringify(tasks));
    }
    taskinput.value = '';
    }
    e.preventDefault();
    
}
// DELETE THE PARTICULAR TASK X
function deleteTask(e)
{ 
    
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm(`are u shure to delete the task ${e.target.parentElement.parentElement.textContent}`))
        {
        e.target.parentElement.parentElement.remove();
        removedatafromls( e.target.parentElement.parentElement);
        }
    }
}
//REMOVE THE DELETED TASK FROM LS
function removedatafromls(taskItem)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
        {
            tasks = [];

        }
        else
        {
 tasks = JSON.parse(localStorage.getItem('tasks'));
        }

tasks.forEach(function (task1 , index)
{
    if(taskItem.textContent === task1)
    {
        tasks.splice(index , 1);
    }


});
localStorage.setItem('tasks' , JSON.stringify(tasks));

}
//CLEAR ALL TASK
function cleartask(e)
{
 tasklist.innerHTML = '';
 localStorage.clear();
}
// FILTER THROUGH ALL TASK IN LIST
function filterTask(e)
{
const ftext  = e.target.value.toLowerCase();
document.querySelectorAll('.collection-item').forEach(
    function(task)
    {
        const item =  task.firstChild.textContent;
        if(item.toLowerCase().indexOf(ftext) != -1)
        {
            task.style.display = 'block';
        }
        else
        {
            task.style.display = 'none';

        }

    }
);
}