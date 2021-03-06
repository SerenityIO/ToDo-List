var list = document.getElementById('list');
var array = [];

// 1. Создаём новый объект XMLHttpRequest
var xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', true);

// 3. Отсылаем запрос
xhr.send();

xhr.onreadystatechange = function() { // (3)
    
    if (xhr.readyState != 4) return;
    // document.write('Готово!');
    document.getElementById("Load").style.display = "none";
    document.getElementById("image").style.display = "none";
    document.getElementById("main").style.opacity = "1";
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
      try {
        var arr = JSON.parse(xhr.responseText);
        
      } catch (e){
        alert("error");
      }
    }
    SaveArray(arr);
    // window.onunload = () => {
    //   window.localStorage.setItem('array', JSON.stringify(array));
    // };
    render();
  }

  function SaveArray(mas){
    mas.forEach(function(arr) {
      array.push({
        name: arr.title,
        done: arr.compleated,
        id: arr.id
    });
    });
    render();
  }

  function render() {
    list.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        if(array[i]) {
            var li = document.createElement('li');
            var check = document.createElement('input');
            var div = document.createElement('div');
            var but = document.createElement('div');
            var done = document.createElement('button');
            var edit = document.createElement('button');
            var copy = document.createElement('button');
            
            done.type = 'submit';
            done.addEventListener('click', function() {
                audit(i);
            });
            if(array[i].done) {
                done.innerText = 'Undone';
                done.className = 'Undone';
                li.style.backgroundColor = "rgb(193, 255, 193)";
                li.style.borderTop = "1px solid rgb(0, 255, 13)";
                li.style.borderBottom = "1px solid rgb(0, 255, 13)";
                li.style.height = "30px";
            } else {
                done.innerText = 'Done';
                done.className = 'Done';
                li.style.backgroundColor = "";
                li.style.border = "";
                li.style.height = "";
            }
            edit.type = 'submit';
            edit.innerText = 'Edit';
            edit.className = 'Edit';
            edit.addEventListener('click', function(){
                editText(i);
            });
            copy.type = 'submit';
            copy.innerText = 'Copy';
            copy.className = 'Copy';
            copy.addEventListener('click', function(){
                copyrate(i);
            });
            but.className = "DoneEditCopy";
            but.appendChild(done);
            but.appendChild(edit);
            but.appendChild(copy);
            check.type = "checkbox";
            check.className = "check"; 
            check.addEventListener('click', function(){
                checkLi(i);
            });
            li.innerText = array[i].name;
            li.id = i;
            div.addEventListener('click', function(){
                remove(i);
            });
        
            div.className = "button";
            li.appendChild(check);
            li.appendChild(div);
            li.appendChild(but);
            list.appendChild(li); 
        }  
    }
}


  
function handleSubmitForm(event) {
  event.preventDefault();
  
  var li = document.createElement('li');
  var check = document.createElement('input');
  
  check.type = "checkbox";
  check.className = "check"; 
  li.appendChild(check);

  li.innerText = event.target[0].value;
  array.push({
      name: event.target[0].value,
      done: false
  });
  event.target.reset();
  render();
}

function copyrate(id){
  array.push({
      name: array[id].name,
      done: array[id].done
  });
  render();
}

function checkLi(id){
  var li = document.getElementsByTagName('li');
  var box = document.getElementsByClassName('check');
 
  li[id].className = (box[id].checked) ? 'red' : '';
}

function removeCheck(){
  var box = document.getElementsByClassName('check');
  var MainCheck = document.getElementById('all');

  array = array.filter(function(value, index){
      return !box[index].checked;
  });
  MainCheck.checked = false;
  render();
}

function checkAll(){
  var check = document.getElementsByClassName('check');
  var all = document.getElementById('all');
  
  if(all.checked){
      for (var i = 0; i < check.length; i++){
          var per = check[i].parentNode;
          
          check[i].checked = true;
          per.className = 'red';
      }
  } else {
      for (var i = 0; i < check.length; i++){
          var per = check[i].parentNode;
          
          check[i].checked = false;
          per.className = '';
      }
  }
}

function remove(id){
  array = array.filter(function(value, index){
      return id != index;
  });
  render();
}

function audit(id){
  array[id].done = !array[id].done;
  render();
}

function editText(id) {
  var newName = prompt('Write new name this row', );
  
  if(newName != 0){
      array[id].name = newName; 
  }
  render();
}


// window.onload = function() {

//   setTimeout(function() {

//     document.getElementById("Load").style.display = "none";
//     document.getElementById("image").style.display = "none";
//     document.getElementById("main").style.opacity = "1";

//   }, 2000);

// };
// $(function () {
//   document.getElementById("Load").style.display = "none";
//   document.getElementById("image").style.display = "none";
//   document.getElementById("main").style.opacity = "1";
// });
