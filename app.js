
$(document).ready(function () {
    let edit = false;
    $('#hidDeleteId').hide();
    $('#hidEditId').hide();
    fetchGames();
    


   


$('#game-form').submit(function (e) { 
    if ($('#title').val() != "" && $('#description').val() != "" && $('#image').val() != "") {
    const postData = {
        title: $('#title').val(),
        description: $('#description').val(),
        image: $('#image').val(),
        id: $('#gameIdHidden').val()
    }
    const url = edit === false ? 'game-add.php' : 'game-edit.php';
   
    $.post(url, postData,
        function (response) {
            //console.log(response);  
            fetchGames();
            $('#game-form').trigger('reset');
            $('#games').show();
            $('#newGame').hide(); 
            edit = false;// tengo que ver porque tuve que agregar este edit=false
        });
    e.preventDefault();
}

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






$(document).on('click', '.game-delete', function () {
    if (confirm('Are you sure you want to delete it')) {
        let element = $(this)[0].firstElementChild;
        let id = $(element).attr('gameId');
        $.post('game-delete.php', { id },
            function (response) {
                fetchGames();
            }
        );
    }
});

$(document).on('click','.game-edit', function () {
    let element = $(this)[0].firstElementChild;
    let id = $(element).attr('gameId');
        $.post('game-getOne.php', { id },
            function (response) {
                const game = JSON.parse(response);
                $('#gameIdHidden').val(game.id);
                $('#title').val(game.title);
                $('#description').val(game.description);
                $('#image').val(game.image);


                $('#games').hide();
                $('#newGame').show(); 
                edit = true;
                
            }
        );
});

});

function addGame(){
    $('#games').hide();
    $('#game-form').trigger('reset');
    $('#newGame').show();
}

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
                                <button class="btn btn-danger game-delete">
                                <span id="hidDeleteId" gameId="${game.id}"></span>
                                    <i class="far fa-trash-alt"></i>
                                </button>
                            </div>
                            <img src="${game.image}" class="card-img-top">
                            <div class="card-body">
                                <p> ${game.description} </p>
                                <button class="btn btn-warning btn-block game-edit">
                                     <span id="hidEditId" gameId="${game.id}"></span>
                                
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
