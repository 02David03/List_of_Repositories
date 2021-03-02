const api = 'https://api.github.com/users/02David03/repos';

// This function fetchs the data from the api
async function getapi(url) {

    const response = await fetch(url);

    var data = await response.json();
    if (response) {
        hideloader();
    }
    show(data);
}

getapi(api);

// Function that hides the loading style when the data is completed
function hideloader() { 
    document.getElementById('loading').style.display = 'none';
} 

//Filter of the repositories
function searchFor() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("repositories");
    tr = table.getElementsByTagName("tr");
    
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
}
//This function set or remove a repository from the storage 
function setFavorite(id,name) {
    if(localStorage.getItem(id) == null){
        localStorage.setItem(id,name);
    } else{
        localStorage.removeItem(id);
    }
    location.reload();
}
// This function is responsible to difine the style of the star
function setStarStyle(id){
    if(localStorage.getItem(id) == null){
        return `<i class="far fa-star"></i>`;
    } else return `<i class="fas fa-star"></i>`;
}

// Creation of a table with the data, and then it goes to the HTML page
function show (data) {

    let favData = [];

    for (rep of data){
        if (localStorage.getItem(rep.id) == null) continue;
        else favData.push(rep);
    }
    
    let tab;
    console.log(favData);
    if (favData.length == 0){
        tab = `<h4 class ="text-center">Não há nenhum repositorio marcado como favorito <i class="fas fa-frown"></i></h4>`;
    }
    else {
        tab = 
        `<thread>
            <tr>
                <th scope = "col" class = text-center> Nome </th>
                <th scope = "col" class = text-center> Descrição </th>
                <th scope = "col" class = text-center> Link </th>
                <th scope = "col" class = text-center> </th>
            </tr>
        </thread>`;
    
        for (let rep of favData){
            tab +=  
            `   
            <tr id = "${rep.id}">     
            <td scope = "row" class = text-center> <a href= "/Home/Details/${rep.name}" class = "text-primary"> ${rep.name} <i class="fas fa-external-link-alt"></i></a> </td>
            <td class = "text-center"> ${rep.description}</td>
            <td class = "text-center"><a href = "https://github.com/${rep.full_name} " target="_blank" class = "text-primary" >${rep.full_name} <a </td>
            <td class = "text-center" id = "buttonStorage"><button type = "button" id = "${rep.id}" value = ${rep.name}
            onclick = "setFavorite(this.id,this.value)" style = "padding: 0; border: none; background: none;"> ${setStarStyle(rep.id)}</button> </td> 
            </tr>`;
        }
    }
    document.getElementById("repositories").innerHTML = tab;
}