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

const ui = {
    message: {
        show(msg){
            $("#messageBoxContent").html(msg);
            $("#messageBox").slideDown();        
        }
    }
}

const data  = {
    url: {
        organization: {
            all:"https://siyasat-ph.000webhostapp.com/api/organization/getAll.php"
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
                            s.browser.contextMenus.create({
                                "parent_id":"fact_check",
                                "contexts":["selection"],
                                "title":obj.title,
                                "onclick": (info,tab)=>{
                                    s.browser.tabs.create({
                                        url: `${obj.url}${encodeURIComponent(info.selectionText)}`,
                                        active: true
                                    });
                                }
                            });
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

    },

    whitelist:{
        local: {
            listAll(){
                return new Promise((resolve,reject)=>{
                    s.browser.storage.local.get(['local-whitelist'],result=>{
                        if(result['local-whitelist']){
                            resolve(result['local-whitelist']);
                        } else {
                            resolve([]);
                        }
                    })
                });
            },
            add(obj){
                return new Promise((resolve,reject)=>{                    
                    s.browser.storage.local.get(['local-whitelist'],result=>{
                        function e1() {
                            var u='',i=0;
                            while(i++<36) {
                              var c='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i-1],r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);
                              u+=(c=='-'||c=='4')?c:v.toString(16)
                            }
                            return u;
                        };

                        var ar = [];
                        if(result['local-whitelist']) ar = result['local-whitelist'];
                        obj['id'] = e1();
                        ar.push(obj);
                        s.browser.storage.local.set({'local-whitelist':ar},()=>{
                            resolve(ar);
                        })
                    });
                });
            },
            remove(id){
                return new Promise((resolve,reject)=>{
                    s.browser.storage.local.get(['local-whitelist'],result=>{
                        if(result['local-whitelist']){
                            var ar = result['local-whitelist'];
                            ar = ar.filter(obj=>{ if(obj.id !== id) return id; });
                            s.browser.storage.local.set({'local-whitelist':ar},()=>{
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
            $(".info.first_name").html(res.user.first_name);
            $(".info.last_name").html(res.user.last_name);
            $(".info.email").html(res.user.email);
            $(".info.country").html(res.user.country);
            $(".info.username").html(res.user.username);
            $("#email").val(res.user.email);
        });
    });

});

$("#logoutButton").click(()=>{
    s.browser.storage.local.clear();
    window.location.replace("../account/login.html");
});

