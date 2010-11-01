var gliloader = {};

(function () {

    function injectCSS(filename) {
        var url = pathRoot + filename;
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        (document.body || document.head || document.documentElement).appendChild(link);
    };

    function injectScript(filename, injectState) {
        
        injectState.toLoad++;
        function scriptsLoaded() {
            if (injectState.callback) {
                injectState.callback();
            }
            injectState.callback = null; // To prevent future calls
        }

        var url = injectState.pathRoot + filename;

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.onload = function () { 
            if (--injectState.toLoad == 0) {
                scriptsLoaded();
            }
        };
        script.onreadystatechange = function () {
            if ("loaded" === script.readyState || "complete" === script.readyState) {
                if (--injectState.toLoad == 0) {
                    scriptsLoaded();
                }
            }
        };
        (document.body || document.head || document.documentElement).appendChild(script);
    };

    var hasLoadedHost = false;
    var hasLoadedUI = false;

    function loadHost(pathRoot, callback) {
        if (hasLoadedHost) {
            return;
        }
        hasLoadedHost = true;

        var injectState = {
            pathRoot: pathRoot,
            toLoad: 0,
            callback: callback
        };

        injectScript("dependencies/stacktrace.js", injectState);

        injectScript("shared/Utilities.js", injectState);
        injectScript("shared/Hacks.js", injectState);

        injectScript("host/CaptureContext.js", injectState);
        injectScript("host/StateSnapshot.js", injectState);
        injectScript("host/Frame.js", injectState);
        injectScript("host/Resource.js", injectState);
        injectScript("host/ResourceCache.js", injectState);
        injectScript("host/Statistics.js", injectState);

        injectScript("host/resources/Buffer.js", injectState);
        injectScript("host/resources/Framebuffer.js", injectState);
        injectScript("host/resources/Program.js", injectState);
        injectScript("host/resources/Renderbuffer.js", injectState);
        injectScript("host/resources/Shader.js", injectState);
        injectScript("host/resources/Texture.js", injectState);
    };

    function loadUI(pathRoot, callback){
        if (hasLoadedUI) {
            return;
        }
        hasLoadedUI = true;

        var injectState = {
            pathRoot: pathRoot,
            toLoad: 0,
            callback: callback
        };

        injectCSS("inspector/ui/gli.css");

//        injectScript("inspector/ui/dom.js", injectState);
//        injectScript("inspector/ui/window.js", injectState);
//        injectScript("inspector/ui/framelisting.js", injectState);
//        injectScript("inspector/ui/traceview.js", injectState);
//        injectScript("inspector/ui/tracelisting.js", injectState);
//        injectScript("inspector/ui/traceinspector.js", injectState);
//        injectScript("inspector/ui/statehud.js", injectState);
//        injectScript("inspector/ui/outputhud.js", injectState);
    }

    gliloader.loadHost = loadHost;
    gliloader.loadUI = loadUI;

})();