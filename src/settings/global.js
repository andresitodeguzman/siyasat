const s = {
    browser: chrome,
    setBrowser() {
        return new Promise((resolve, reject) => {
            try {
                if (chrome) this.browser = chrome;
                if (firefox) this.browser = firefox;
            } finally {
                resolve();
            }
        });
    }
}

const data  = {
    url: {
        organization: {
            all:"http://localhost:8080/api/organization/getAll.php"
        }
    },

}

const actions =  {
    organization: {
        
        getAll(){
            return new Promise((resolve,reject)=>{
                if(navigator.onLine){
                    fetch(data.url.organization.all).then(res=>{return res.json()}).then(res=>{
                        s.browser.storage.local.set({'organization':res},()=>{ resolve(res); });
                    }).catch((e)=>{ reject(e); })
                } else {
                    s.browser.storage.local.get(['organization'],result=>{
                        if(result.organization){
                            resolve(result.organization)
                        } else {
                            reject(false);
                        }
                    });
                }
            });
        },

        get(){
            return new Promise((resolve,reject)=>{
                s.browser.storage.local.get(['organization'],result=>{
                    
                }).catch(e=>{
                    reject(e);
                });
            });
        },

        local: {
            listAll(){
                return new Promise((resolve,reject)=>{
                    s.browser.storage.local.get(['local-organization'],result=>{
                        if(result['local-organization']){
                            return result['local-organization'];
                        } else {
                            return [];
                        }
                    });
                });
            },
            add(id){

            }
        }

    }
}

$(document).ready(()=>{
    s.setBrowser().then(()=>{
        s.browser.storage.local.get(['user'],res=>{
            if(!res.user) window.location.replace("../account/login.html");
            $(".first_name").html(res.user.first_name);
        });
    });

});

$("#logoutButton").click(()=>{
    s.browser.storage.local.clear();
    window.location.replace("../account/login.html");
});