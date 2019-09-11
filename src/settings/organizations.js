$(document).ready(()=>{
    actions.organization.local.listAll().then(orgs=>{
            orgs.forEach(org=>{
                var tpl = `
                    <tr>
                        <td>${org.name}</td>
                        <td>${org.region}</td>
                        <td>
                            <a href="#!" class="red-text"><i class="material-icons">delete</i></a>
                        </td>
                    </tr>
                `;
                $("#organizationList").append(tpl);
            });
    });
});