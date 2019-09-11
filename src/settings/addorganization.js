$(document).ready(()=>{
    render();
});

var render = async ()=>{
    $("#orgList").html(" ");
    let orgs = await actions.organization.getAll();
    let listLocal = await actions.organization.local.listAll();

    orgs.forEach(obj=>{
		if(!listLocal.find(obj2=>{ if(obj2.id == obj.id) return obj2; })){
			var tpl = `
                 <tr>
                     <td>${obj.name}</td>
                     <td>${obj.region}</td>
                     <td>
                         <a class="black-text" href="#!" data-action="addOrganization" data-obj='${JSON.stringify(obj)}'>
                            <i class="material-icons" data-action="addOrganization" data-obj='${JSON.stringify(obj)}'>add</i> Add
                        </a>
                     </td>
                 </tr>
                 `;
            $("#orgList").append(tpl);
        }
    });
}

document.addEventListener('click',e=>{
    if(e.target.dataset.action == "addOrganization"){
        actions.organization.local.add(JSON.parse(e.target.dataset.obj));
        ui.message.show(`Added ${JSON.parse(e.target.dataset.obj).name} to the organization list`);
        render();
    }
});