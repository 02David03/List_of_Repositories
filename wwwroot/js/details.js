const api = `https://api.github.com/repos/${localStorage.getItem("login")}`;
var url = window.location.pathname;
//getting the name from the URL
var nome = url.substring(url.lastIndexOf('/') + 1);

//Here is where are fetched the repositories data and the contributors data too
Promise.all([
	fetch(`${api}/${nome}`),
	fetch((`${api}/${nome}/contributors`))
]).then(function (responses) {
	return Promise.all(responses.map(function (response) {
		return response.json();
	}));
}).then(function (data) {
	showData(data[0],data[1]);
}).catch(function (error) {
	console.log(error);
});
    
//This function set or remove a repository from the storage 
function setFavorite(id, name) {
    if(localStorage.getItem(id) == null){
        localStorage.setItem(id,name);
        alert(name + "Foi Adicionado aos Favoritos!");
    } else{
        localStorage.removeItem(id);
        alert(name + "Foi Removido dos Favoritos!");
    }
    location.reload();
}
// This function is responsible to difine the style of the star
function setStarStyle(id){
    if(localStorage.getItem(id) == null){
        return `<i class="far fa-star"></i>`;
    } else return `<i class="fas fa-star"></i>`;
}

// this function give to the Html page the data 
function showData(data, contributors){
    //inserting the button before the others
    document.getElementById("favBtn").innerHTML = `<button type="button" class= "btn btn-warning" style = "margin-top: 5px;"
    id = "${data.id}" value = "${data.name}" onclick = {setFavorite(this.id,this.value)}>Favoritar ${setStarStyle(data.id)} </button>`
    let name;
    let owner;
    let description;
    let language;
    let lastATT;
    let contributorsList;
    // All this ifs is just to check if the data exists, if exists, okay, if not then a message is displayed
    if (data.name == null){
        let message= `Esse repositorio não tem nome <i class="fas fa-frown"></i>`;
        name = message;
    } else{ 
        name = data.name;
    }
    document.getElementById("name").innerHTML = name;
    if (data.owner.login == null) {
        let message= `Esse repositorio não tem dono <i class="fas fa-frown"></i>`;
        owner = message;
    } else{
        owner = data.owner.login;
    }
    document.getElementById("owner").innerHTML = owner ;
    if (data.description == null) {
        let message= `Esse repositorio não tem uma descrição <i class="fas fa-frown"></i>`;
        description = message;
    } else{
        description = data.description;
    }
    document.getElementById("description").innerHTML = description;
    if (data.language == null) {
        let message= `Esse repositorio não tem linguagem definida <i class="fas fa-frown"></i>`;
        language = message;
    } else{
        language = data.language;
    }
    document.getElementById("language").innerHTML = language;
    if (data.pushed_at == null){
        let message= `Esse repositorio não tem ultima data de atualização <i class="fas fa-frown"></i>`;
        document.getElementById("lastAtt").innerHTML = message;
    } else {
        let message = data.pushed_at.split('-',3);
        let day = message[2].split('T',1); 
        lastATT = day + '/' + message[1] + '/' + message[0];
    }
    document.getElementById("lastAtt").innerHTML = lastATT;
    if (contributors == null){
        let message= `Esse repositorio não tem contribuidores <i class="fas fa-frown"></i>`;
        contributorsList = message;
    } else{
        contributorsList = `<ul class="text-left list-group list-group-flush">`;
        for (let contb of contributors){
            contributorsList += `<li class ="bg-light list-group-item"> ${contb.login}</li>`
        }
        contributorsList += `</ul>`
    }
    document.getElementById("contributors").innerHTML = contributorsList;
}