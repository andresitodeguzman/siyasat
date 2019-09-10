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