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

        get(id){
            return new Promise((resolve,reject)=>{
                s.browser.storage.local.get(['organization'],result=>{
                    console.log(result);
                    if(result.organization){
                        resolve(result.organization.filter(obj=>{ if(id == result.organization.id) return obj; }));
                    } else {
                        reject({});
                    }
                });
            }).catch(e=>{
                reject(e);
            });
        },

        local: {
            listAll(){
                return new Promise((resolve,reject)=>{
                    s.browser.storage.local.get(['local-organization'],result=>{
                        if(result['local-organization']){
                            resolve(result['local-organization']);
                        } else {
                            resolve([]);
                        }
                    });
                });
            },
            add(obj){
                return new Promise((resolve,reject)=>{
                    s.browser.storage.local.get(['local-organization'],result=>{
                        var ar = [];
                        if(result['local-organization']) ar = result['local-organization'];
                        ar.push(obj);
                        s.browser.storage.local.set({'local-organization':ar},()=>{
                            resolve(ar);
                        })
                    });
                });
            },
            remove(id){
                return new Promise((resolve,reject)=>{
                    s.browser.storage.local.get(['local-organization'],result=>{
                        if(result['local-organization']){
                            var ar = result['local-organization'];
                            ar = ar.filter(obj=>{ if(obj.id !== id) return id; });
                            s.browser.storage.local.set({'local-organization':ar},()=>{
                                resolve(ar);
                            });
                        }
                    });
                });
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