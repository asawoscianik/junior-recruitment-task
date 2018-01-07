window.onload=function(){
    let count = 0;
    let addTaskBtn = document.getElementById('add_btn');
    let addTaskInput = document.getElementById('add_task');
    let container = document.getElementById('container'); 
    let task_get ="";
    
    //if checkbox is checked add class done and post changes to server else remove class done and post changes to server
    function addDoneClass(){

        $(document).on('change', '.checkbox_task', function (){

            let parent = $(this).parent().parent();

            if(this.checked){

                let data = {};
                data.update = parent.text();

                $.ajax({
                    type: 'POST',
                    headers: {"Content-Type": "application/json"},
                    url: 'http://localhost:3000/update1',	
                    data: JSON.stringify(data),                     					
                    success: function(res) {
                        // console.log(res);
                        // console.log(JSON.stringify(data));
                        // console.log('Succes')
                    },
                    error: function(res, err){
                        // console.log(res);
                        // console.log(err);
                    }
                });

                parent.addClass("done");
            }

            else{

                let data = {};
                data.update = parent.text();

                $.ajax({
                    type: 'POST',
                    headers: {"Content-Type": "application/json"},
                    url: 'http://localhost:3000/update2',	
                    data: JSON.stringify(data),                     					
                    success: function(res) {
                        // console.log(res);
                        // console.log(JSON.stringify(data));
                        // console.log('Succes')
                    },
                    error: function(res, err){
                        // console.log(res);
                        // console.log(err);
                    }
                });

                parent.removeClass("done");

            }
            
        });
    }    

    //if input is active change color of add button
    function changeBtnColor(){

        document.addEventListener('click', function(event) {
            var isClickInside = addTaskInput.contains(event.target);
          
            if (isClickInside) {
                addTaskBtn.src = "assets/add_green.png";
            }
            else{
                addTaskBtn.src = "assets/add.png";
            }
          });
    }      

    //check if input is empty and when it is dont post/add task 
    function checkIfEmpty(){

        addTaskInput.addEventListener("keydown", function(e){
            
            if (e.keyCode === 13) { 
    
                if(addTaskInput.value !== ""){
                    postTask();
                    addTask();
                }
                else{
                    alert("Empty field!");
                }
            }
        });

        addTaskBtn.addEventListener("click", function() {    

            if(addTaskInput.value !== ""){
                postTask();
                addTask();
            }
            else{
                alert("Empty field!");
            }
        });
    }

    //add tash to html
    function addTask(){

        let task = '<li class="content"><div class="left content_left"><input class="checkbox_task" id="checkbox_active'+count+'" type="checkbox"><label for="checkbox_active'+count+'"></label></div>'
        + '<div class="middle conent_middle"></div>'
        + '<div class="right content_right">' +'<div class="task_text">'+ addTaskInput.value + '</div>'+'<img class="trash_can" src="assets/trash-can-active.png"></div></li>';

        container.innerHTML += task;
        addTaskInput.value = "";
        count++;
    }

    //when click on trash can image delete task from db html
    function removeTask(){

        $(document).on('click', '.trash_can', function (){

            let data = {};
            data.delete = $(this).parent().text();

            $.ajax({
                type: 'POST',
                headers: {"Content-Type": "application/json"},
                url: 'http://localhost:3000/delete',	
                data: JSON.stringify(data),                     					
                success: function(res) {
                    // console.log(res);
                    // console.log(JSON.stringify(data));
                    // console.log('Succes')
                },
                error: function(res, err){
                    // console.log(res);
                    // console.log(err);
                }
            });

            $(this).parent().parent().remove();

        });

    }

    //get tasks from localhost json and insert into html
    function getTask(){

        $.ajax({
            type: 'GET',
            url: "http://localhost:3000/tasks",

            success: function (result) {
                
                var totalTasks = Object.keys(result).length;

                for(var i =0;i<totalTasks;i++){

                    if(result[i].isdone==0){

                        task_get = '<li class="content"><div class="left content_left"><input class="checkbox_task" id="checkbox_active'+count+'" type="checkbox"><label for="checkbox_active'+count+'"></label></div>'
                        + '<div class="middle conent_middle"></div>'
                        + '<div class="right content_right">' +'<div class="task_text">'+ result[i].task + '</div>'+'<img class="trash_can" src="assets/trash-can-active.png"></div></li>';
                        count++;
                    }
                    
                    else{
                        task_get = '<li class="done content"><div class="left content_left"><input class="checkbox_task" id="checkbox_active'+count+'" type="checkbox" checked><label for="checkbox_active'+count+'"></label></div>'
                        + '<div class="middle conent_middle"></div>'
                        + '<div class="right content_right">' +'<div class="task_text">'+ result[i].task + '</div>'+'<img class="trash_can" src="assets/trash-can-active.png"></div></li>';
                        count++;
                    }

                    container.innerHTML += task_get;

                }
                //console.log("got it!");
            }
        });
    }        


    //post task to server
    function postTask(){

        let data = {};
        data.task = addTaskInput.value;
        data.isdone = 0;

        $.ajax({
            type: 'POST',
            headers: {"Content-Type": "application/json"},
            url: 'http://localhost:3000/tasks',	
            data: JSON.stringify(data),                     					
            success: function(res) {
                // console.log(res);
                // console.log(JSON.stringify(data));
                // console.log('Succes')
            },
            error: function(res, err){
                // console.log(res);
                // console.log(err);
            }
        });
    }
    
    changeBtnColor();
    removeTask();
    checkIfEmpty();
    addDoneClass();
    getTask();  

}
