$(document).ready(()=>{
    render();
});


var render = ()=>{
    actions.organization.local.listAll().then(orgs=>{
        $("#organizationList").html("");
        if(orgs.length == 0){
            $("#factcheckersTable").hide();
            $("#emptyLocalOrganizations").fadeIn();
        } else {
            $("#factcheckersTable").fadeIn();
            orgs.forEach(org=>{                
                var tpl = `
                    <tr>
                        <td>${org.name}</td>
                        <td>${org.region}</td>
                        <td>
                            <a class="red-text delete" href="#!">
                                <i data-action="deleteOrganization" data-id="${org.id}" class="material-icons">delete</i>
                            </a>
                        </td>
                    </tr>
                `;
                $("#organizationList").append(tpl);
            });
        }
    });
}

document.addEventListener('click',e=>{
    if(e.target.dataset.action == "deleteOrganization"){
        id = e.target.dataset.id;
        actions.organization.local.remove(id).then(()=>{
            $("#organizationList").hide();
            render();
            $("#organizationList").fadeIn();
        });
    }
});