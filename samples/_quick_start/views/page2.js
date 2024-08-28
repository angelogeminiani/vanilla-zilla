class Page1 extends vanilla.BaseView {
    constructor(...args) {
        super(...args);
        super.init("./views/page2.html", {text: "PAGE 2"});
    }

    onAfterCreate() {
        console.log("onAfterCreate()", "PAGE 2");
    }

    onShow(){
        console.log("onShow()", "PAGE 2");
    }

    onHide(){
        console.log("onHide()", "PAGE 2");
    }

}

// exports
module.exports = {Page1};