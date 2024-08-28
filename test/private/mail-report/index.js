/**
 * index.js
 */
!(() => {
    // set vanilla reference
    const vanilla = window.vanilla;
    if (!vanilla) {
        console.error("VANILLA-ZILLA not found!");
        return null;
    }

    // wait until VANILLA is completely loaded
    vanilla.ready((vanilla) => {
        // add some pages to main application.
        vanilla.app.pages.push(
            {name: "Page 1", url: "./views/page1.js", data: {"title": "Home Page"}},
            {name: "Page 2", url: "./views/page2.js", data: {"title": "Page number #2"}},
        );

        // The first page added is also the "home page"
        if (!vanilla.routing.enabled) {
            vanilla.app.pages.home().catch((err) => {
                console.error("Error redirecting to home page:", err);
            });
        }
    });
})();