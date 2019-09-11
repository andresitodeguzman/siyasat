$(document).ready(()=>{
    render();
});

function render(){
    actions.whitelist.local.listAll().then(res=>{
        res.forEach(obj=>{
            var tpl = `
                <tr>
                    <td>${obj.url}</td>
                    <td>
                        <a href="#!" class="black-text">
                            <i class="material-icons">edit</i>
                        </a>
                        <a href="#!" class="red-text" style="margin-left: 10px;">
                            <i class="material-icons">delete</i>
                        </a>
                    </td>
                </tr>
            `;
            $("#whitelistTable").append(tpl);
        });
    });
}