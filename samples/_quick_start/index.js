/**
 * index.js
 */
!(()=>{
    // set vanilla reference
    const vanilla = window.vanilla;
    if (!vanilla) {
        console.error("VANILLA-ZILLA not found!");
        return null;
    }
    // wait until VANILLA is completely loaded
    vanilla.ready((vanilla)=>{
        console.info("VANILLA-ZILLA is ready to go...");

    });
})();