$(document).ready(function () {
    
    fetchGames();
    $('#newGameForm').submit(function (e) { 
            if ($('#title').val() != "" && $('#description').val() != "" && $('#image').val() != "") {
            const postData = {
                title: $('#title').val(),
                description: $('#description').val(),
                image: $('#image').val()
            }
             console.log(postData);
             const url ='game-add.php';
            
            $.post(url, postData,
                function (response) {
                    console.log(response);  
                    fetchGames();
                    $('#newGameForm').trigger('reset');
                    $('#games').show();
                    $('#newGame').hide(); 
                });
            e.preventDefault();
        }
        
    });
});
$('#search').keyup(function () { 
    let search = $('#search').val();
    //console.log(search);
    $.ajax({
        type: "post",
        url: "game-search.php",
        data: {search},
        success: function (response) {
            fillTemplate(response); 
            $('#games').show();
            $('#newGame').hide();  
        }
    });
});


//#region Games List
function fetchGames() {
    $.ajax({
        type: "GET",
        url: "games-list.php",
        success: function (response) {
            //console.log(response);
            fillTemplate(response);
            $('#games').show();
            $('#newGame').hide();
        }
    });
}
//#endregion
/*
<a class="btn btn-info btn-block">
                                    EDIT
                                </a>*/
function fillTemplate(response){
    let games = JSON.parse(response);
            let template = '';
             games.forEach(game => {
              template +=
                    `
                   <div class="col-md-4 p-4">
                        <div class="card text-center">
                            <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                                ${game.title}
                                <button class="btn btn-danger">
                                    <i class="far fa-trash-alt"></i>
                                </button>
                            </div>
                            <img src="${game.image}" class="card-img-top">
                            <div class="card-body">
                                <p> ${game.description} </p>
                                <button class="btn btn-warning btn-block" type="submit">
                                <i class="fas fa-edit"></i>
                                EDIT
                            </button>    
                            </div>
                        </div>
                    </div>
                    
                `
            });
            $('#games').html(template);
}

function addGame(){
    $('#games').hide();
    $('#newGame').show();
}
