const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    // Lấy giá trị khi user nhập vào
    let userEnteredValue = inputBox.value;
    // Nếu user nhập vào giá trị ( không phải là khoảng trắng )
    if(userEnteredValue.trim() != 0){
        //  Thì nút add sẽ sáng lên
        // Trường hợp nhập toàn khoảng trắng ( space ) thì sẽ không sáng 
        addBtn.classList.add("active");
    } else {
        // Ngược lại thì không sáng
        addBtn.classList.remove("active");
    }
}
showTasks();
// Thao tác với nút add
addBtn.onclick = ()=>{
    //lấy ra task ID
    let taskID = addBtn.getAttribute('id');
    // Khi user nhấn vào nút Add 
    // Lấy giá trị mà user đã nhập ở ô input
    let userEnteredValue = inputBox.value;
    // Lấy localStorage ( biến lưu trữ cục bộ )
    let getLocalStorageData = localStorage.getItem("New todo");
    if(getLocalStorageData == null){
        // Nếu như localStorage = null
        // Thì sẽ tạo ra 1 mảng rỗng
        listTasks = [];
    } else {
        // Ngược lại thì sẽ chuyển JSON từ dạng string sang Object
        listTasks = JSON.parse(getLocalStorageData);
    }

    // Kiểm tra xem là update hay add
    if(taskID == 0 || taskID){
      //update
      listTasks[taskID] = userEnteredValue;
      addBtn.removeAttribute('id');
    }
    else{
      // Đẩy giá trị mới vào mảng đã tạo
      listTasks.push(userEnteredValue);
    }
    localStorage.setItem("New todo", JSON.stringify(listTasks)); // Chuyển JSON từ dạng Object sang String
    showTasks();
    addBtn.classList.remove("active");
}
function showTasks(){
    let getLocalStorageData = localStorage.getItem("New todo");
    if(getLocalStorageData == null){
        // Nếu như localStorage = null
        // Thì sẽ tạo ra 1 mảng rỗng
        listTasks = [];
    } else {
        // Ngược lại thì sẽ chuyển JSON từ dạng string sang Object
        listTasks = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNum = document.querySelector(".pendingTasks");
  pendingTasksNum.textContent = listTasks.length; 
  if(listTasks.length > 0){ 
    deleteAllBtn.classList.add("active"); 
  }else{
    deleteAllBtn.classList.remove("active"); 
  }
  let newLiTag = "";
  listTasks.forEach((element, index) => {
    newLiTag += `
    <li>
      ${element}
      <span class="icon" onclick="deleteTask(${index})">
      <i class="fas fa-trash"></i></span>

      <span class="icon" onclick="editTask(${index})">
      <i class="fas fa-edit" id = "edit"></i></span>
    </li>`;
  });
  todoList.innerHTML = newLiTag; 
  inputBox.value = ""; 
}

function editTask(index){
  let getLocalStorageData = localStorage.getItem("New todo");
  listTasks = JSON.parse(getLocalStorageData);
  if(listTasks.length > 0){
    inputBox.value = listTasks[index];
    addBtn.setAttribute('id',index);
  }
}

function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New todo");
  listTasks = JSON.parse(getLocalStorageData);
  listTasks.splice(index, 1); 
  localStorage.setItem("New todo", JSON.stringify(listTasks));
  showTasks();
}

deleteAllBtn.onclick = ()=>{
  listTasks = []; 
  localStorage.setItem("New todo", JSON.stringify(listTasks)); 
  showTasks(); 
}