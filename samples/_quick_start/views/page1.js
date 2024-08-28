class Page1 extends vanilla.BaseView {
    constructor(...args) {
        super(...args);
        super.init("./views/page1.html", {text: "PAGE 1"});
    }

    onAfterCreate() {
        console.log("onAfterCreate()", "PAGE 1");
    }

    onShow(){
        console.log("onShow()", "PAGE 1");
    }

    onHide(){
        console.log("onHide()", "PAGE 1");
    }

}

// exports
module.exports = {Page1};