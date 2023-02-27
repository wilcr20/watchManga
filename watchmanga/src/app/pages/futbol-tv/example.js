var func = (function f() { 
    var iframes = document.getElementsByTagName("iframe"); 
    var links = document.getElementsByTagName("a"); 
    setInterval(() => { 
        for (var index = 1; index < iframes.length; index++) { 
            iframes[index].style.display = "none"; 
        }; 
        for (var index = 0; index < links.length; index++) { 
            links[index].style.display = "none"; 
        }; 
        }, 50); return f; })()


var func = (function f() { var iframes = document.getElementsByTagName("iframe"); var links = document.getElementsByTagName("a"); setInterval(() => { for (var index = 1; index < iframes.length; index++) { iframes[index].style.display = "none"; }; for (var index = 0; index < links.length; index++) { links[index].style.display = "none"; }; }, 50); return f; })()