class Page1 extends vanilla.BaseView {
    constructor(...args) {
        super(...args);
        super.init("./views/page1.html", {text: "PAGE 1"});
    }

    onAfterCreate() {
        console.log("Page1.onAfterCreate()", "PAGE 1");
    }

    onShow() {
        console.log("Page1.onShow()", "PAGE 1");
    }

    onHide() {
        console.log("Page1.onHide()", "PAGE 1");
    }

    async onReady() {
        console.log("Page1.onReady()", "PAGE 1");
        const btnRequest1 = await this.child("request1");
        this.on(btnRequest1, "click", this.onBtnRequest1Click.bind(this));
    }

    onBtnRequest1Click() {
        const request = vanilla.request("https://httpbin.org/post");
        request.method("POST")
            .mode("cors")
            .body({id: 1, name: "test"});
        request.asJson().then((respObj) => {
            this.child("response1").then((elem) => {
                console.log("https://httpbin.org/post: ", respObj);
                elem.innerHTML = JSON.stringify(respObj);
            });
        });

    }
}

// exports
module.exports = {Page1};