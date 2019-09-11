$(document).ready(()=>{
    actions.organization.getAll().then(orgs=>{
        orgs.forEach(obj=>{
            var tpl = `
             <tr>
                 <td>${obj.name}</td>
                 <td>${obj.region}</td>
                 <td>
                     <a class="black-text" href="#!"><i class="material-icons">add</i> Add</a>
                 </td>
             </tr>
             `;
            $("#orgList").append(tpl);
        }); 
    })

});