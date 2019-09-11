$(document).ready(()=>{
    render();
});


var render = ()=>{
    actions.organization.local.listAll().then(orgs=>{
        $("#organizationList").html("");
        orgs.forEach(org=>{                
            var tpl = `
                <tr>
                    <td>${org.name}</td>
                    <td>${org.region}</td>
                    <td>
                        <a class="red-text delete">
                            <i data-action="deleteOrganization" data-id="${org.id}" class="material-icons">delete</i>
                        </a>
                    </td>
                </tr>
            `;
            $("#organizationList").append(tpl);
        });
    });
}

document.addEventListener('click',e=>{
    if(e.target.dataset.action == "deleteOrganization"){
        id = e.target.dataset.id;
        actions.organization.local.remove(id);
        render();
    }
})