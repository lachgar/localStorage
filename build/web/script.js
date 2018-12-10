var employes = Array();
var id = 0;
function load() {
    if (typeof localStorage !== 'undefined') {
        if ('employes' in localStorage) {
            employes = JSON.parse(localStorage.getItem('employes'));
            var contenu = $('#contenu');
            var ligne = '';
            var i = 0;
            employes.forEach(e => {
                ligne += '<tr><td>' + e.nom + '</td><td>' + e.prenom + '</td><td>' + e.email + '</td><td><a href="" class="delete" indice="' + i + '">Supprimer</a></td><td><a href="" class="update" indice="' + i + '">Modifier</a></td></tr>';
                i++;
            });
            contenu.html(ligne);
        }
    } else {
        alert("local storage n'est supporté");
    }
}
$(document).ready(function () {
    load();
    $('#valider').click(function () {
        var e = {
            nom: $('#nom').val(),
            prenom: $('#prenom').val(),
            email: $('#email').val()
        };
        if ($('#valider').html() === 'Modifier') {
            employes[id] = e;
        } else {
            employes.push(e);
        }
        localStorage.setItem("employes", JSON.stringify(employes));
        load();
    });

    $('#contenu').on('click', '.delete', function () {
        id = parseInt($(this).attr('indice'));
        employes.splice(id, 1);
        localStorage.removeItem("employes");
        localStorage.setItem("employes", JSON.stringify(employes));

    });
    $('#contenu').on('click', '.update', function () {
        id = parseInt($(this).attr('indice'));
        $('#nom').val(employes[id].nom);
        $('#prenom').val(employes[id].prenom);
        $('#email').val(employes[id].email);
        $('#valider').html('Modifier');
        return false;
    });

    $('#envoyer').click(function () {
        $.ajax({
            url: "SendData",
            data: {employes: JSON.stringify(employes)},
            type: 'GET',
            cache: false,
            success: function (data) {
                if (data == 'yes') {
                    localStorage.removeItem('employes');
                    load();
                }else {
                   alert('impossible d insérer');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    });

});