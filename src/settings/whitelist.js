$(document).ready(()=>{
    render();
});

function render(){
    $(".whitelistTableDisplay").hide();
    $("#whitelistTable").html("");
    actions.whitelist.local.listAll().then(res=>{
        if(res.length == 0){
            $("#emptyLocalWhitelist").fadeIn();
        } else {
            $("#emptyLocalWhitelist").hide();
            res.forEach(obj=>{
                var tpl = `
                    <tr>
                        <td>${obj.url}</td>
                        <td>
                            <a href="#!" class="black-text">
                                <i class="material-icons">edit</i>
                            </a>
                            <a href="#!" class="red-text" style="margin-left: 10px;">
                                <i class="material-icons" data-id="${obj.id}" data-action="deleteWhitelist">delete</i>
                            </a>
                        </td>
                    </tr>
                `;
                $("#whitelistTable").append(tpl);
            });

            $(".whitelistTableDisplay").fadeIn();
        }
    });
}

document.addEventListener('click',e=>{
    if(e.target.dataset.action == "deleteWhitelist"){
        actions.whitelist.local.remove(e.target.dataset.id).then(()=>{
            render();
        });
    }
})