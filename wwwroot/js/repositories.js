const api = 'https://api.github.com/users/02David03/repos';

// Função responsavel por pegar os dados da api
async function getapi(url) {

    const response = await fetch(url);

    var data = await response.json();
    if (response) {
        hideloader();
    }
    show(data);
}

getapi(api);

// Função que irá esconder o loading-style
function hideloader() { 
    document.getElementById('loading').style.display = 'none';
} 

//Filtragem dentre os repositorios 
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

//Criando tabela a partir dos dados fornecidos pela api para depois ser incrementada na página Html
function show (data) {
    let tab = 
        `<thread>
            <tr>
                <th scope = "col" class = text-center> Nome </th>
                <th scope = "col" class = text-center> Descrição </th>
                <th scope = "col" class = text-center> Link </th>
                <th scope = "col" class = text-center> </th>
            </tr>
        </thread>`;
    
    for (let rep of data){
        tab +=  
        `   
        <tr id = "${rep.id}">     
        <td scope = "row" class = text-center>${rep.name} <a asp-area="" asp-controller="Home" asp-action="Index" class = "text-info"><i class="fas fa-external-link-alt"></i></a> </td>
        <td class = "text-center"> ${rep.description}</td>
        <td class = "text-center"><a href = "https://github.com/${rep.full_name}" class = "text-primary" >${rep.full_name} <a </td>
        <td class = "text-center"><i class="far fa-star"></i> </td> 
        </tr>
        `;
    }
    document.getElementById("repositories").innerHTML = tab;
}