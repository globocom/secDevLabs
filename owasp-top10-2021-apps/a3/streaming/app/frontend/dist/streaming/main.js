(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/alexandre/owasp/a7/streaming/src/main.ts */"zUnb");


/***/ }),

/***/ "3v0d":
/*!**********************************************!*\
  !*** ./src/app/lives/play/play.component.ts ***!
  \**********************************************/
/*! exports provided: PlayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayComponent", function() { return PlayComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_user_user_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/user/user-utils */ "jAG7");
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../message */ "f8ew");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _lives_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lives.service */ "HwVj");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/scrolling */ "vxfF");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
var _selectedLive, _message;















function PlayComponent_mat_card_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-card-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "mat-card-actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.live.user.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("5 minutes left before @", ctx_r0.live.user.username, " starts live");
} }
function PlayComponent_mat_card_1_mat_card_subtitle_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Send your message to other peoples that are view @", ctx_r2.live.user.username, "");
} }
function PlayComponent_mat_card_1_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 19);
} }
function PlayComponent_mat_card_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Messages");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, PlayComponent_mat_card_1_mat_card_subtitle_5_Template, 2, 1, "mat-card-subtitle", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PlayComponent_mat_card_1_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r7.removeMessages(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-card-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "cdk-virtual-scroll-viewport", 10, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, PlayComponent_mat_card_1_div_12_Template, 1, 0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "mat-card-actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "form", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "mat-form-field", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Message");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "textarea", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function PlayComponent_mat_card_1_Template_textarea_ngModelChange_18_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r9.message = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "mat-hint", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Don't disclose personal info");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "mat-hint", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PlayComponent_mat_card_1_Template_button_click_24_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r10.addMessage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "send");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.live);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdkVirtualForOf", ctx_r1.live.messages);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx_r1.message);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r1.message.length, " / 100");
} }
class PlayComponent {
    constructor(router, activatedRoute, liveService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.liveService = liveService;
        _selectedLive.set(this, void 0);
        _message.set(this, void 0);
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldSet"])(this, _message, "");
        setInterval(() => {
            this.getMessages();
        }, 3000);
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            let username = params.username;
            this.liveService.findByUsername(username).subscribe(response => {
                Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldSet"])(this, _selectedLive, response);
                this.populateLiveMessage(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _selectedLive).messages);
            }, error => {
                alert('Unable to load live! :(');
            });
        });
    }
    getMessages() {
        this.liveService.getMessages(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _selectedLive).id).subscribe(response => {
            let responseArray = response;
            let newMessages = [];
            for (let i = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _selectedLive).messages.length; i < responseArray.length; i++) {
                newMessages.push(responseArray[i]);
            }
            Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _selectedLive).messages = [...Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _selectedLive).messages, ...newMessages];
            this.populateLiveMessage(newMessages);
        }, error => {
            alert('Unable to load messages! :(');
        });
    }
    removeHTMLMessages() {
        let htmlMessages = document.getElementById("messages");
        while (htmlMessages.firstChild) {
            htmlMessages.removeChild(htmlMessages.lastChild);
        }
    }
    populateLiveMessage(messages) {
        this.waitForElm("#messages").then(htmlMessages => {
            messages.forEach(message => {
                let htmlMessage = this.buildLiveHTMLMessage(message);
                htmlMessages.appendChild(htmlMessage);
            });
        });
    }
    waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }
            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
    buildLiveHTMLMessage(message) {
        let newMessageBox = document.createElement("span");
        newMessageBox.className = "example-item";
        let labelUserMessage = document.createElement("label");
        labelUserMessage.className = "user-message-label";
        let usernameUserMessage = document.createElement("b");
        usernameUserMessage.className = "user-message";
        usernameUserMessage.innerHTML = message.user.username;
        labelUserMessage.appendChild(usernameUserMessage);
        let contentMessage = document.createElement("p");
        contentMessage.className = "message";
        contentMessage.style.marginLeft = "10px";
        contentMessage.style.marginTop = "10px";
        contentMessage.style.padding = "10px";
        contentMessage.style.maxWidth = "100%";
        contentMessage.style.backgroundColor = "rgb(222, 230, 245)";
        contentMessage.style.color = "rgba(0, 0, 0, 0.8);";
        contentMessage.style.borderRadius = "5px";
        newMessageBox.appendChild(labelUserMessage);
        contentMessage.innerHTML = message.content;
        newMessageBox.appendChild(contentMessage);
        return newMessageBox;
    }
    populateLastLiveMessage(message) {
        let messages = document.getElementById("messages");
        let htmlMessage = this.buildLiveHTMLMessage(message);
        messages.appendChild(htmlMessage);
    }
    addMessage() {
        if (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _message).trim() == "") {
            return;
        }
        let username = src_app_user_user_utils__WEBPACK_IMPORTED_MODULE_2__["UserUtil"].user;
        let message = new _message__WEBPACK_IMPORTED_MODULE_3__["Message"](username, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _message));
        this.liveService.addMessage(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _selectedLive).id, message).subscribe(newMessage => {
            Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldSet"])(this, _message, "");
            Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _selectedLive).messages = [...Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _selectedLive).messages, newMessage];
            this.populateLastLiveMessage(newMessage);
        }, error => {
            alert('Unable to add message! :(');
        });
    }
    removeMessages() {
        this.liveService.deleteMessages(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _selectedLive).id).subscribe(response => {
            Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _selectedLive).messages = [];
            this.removeHTMLMessages();
        }, error => {
            alert('Unable to remove messages! :(');
        });
    }
    get live() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _selectedLive);
    }
    get message() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _message);
    }
    set message(message) {
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldSet"])(this, _message, message);
    }
}
_selectedLive = new WeakMap(), _message = new WeakMap();
PlayComponent.ɵfac = function PlayComponent_Factory(t) { return new (t || PlayComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_lives_service__WEBPACK_IMPORTED_MODULE_5__["LiveService"])); };
PlayComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: PlayComponent, selectors: [["app-play"]], decls: 2, vars: 2, consts: [["class", "user-live-card live-card", 4, "ngIf"], ["class", "messages-live-card", 4, "ngIf"], [1, "user-live-card", "live-card"], [1, "block-live-img"], ["src", "./assets/images/lives/live.gif", 1, "live-img"], [1, "messages-live-card"], ["mat-card-avatar", "", 1, "message-header-image"], [4, "ngIf"], ["mat-button", "", "type", "button", "matSuffix", "", "mat-icon-button", "", 3, "click"], ["aria-hidden", "false"], ["itemSize", "50", "minBufferPx", "200", "maxBufferPx", "400", "id", "messages", 1, "viewport"], ["messages", ""], ["class", "example-item", 4, "cdkVirtualFor", "cdkVirtualForOf"], [1, "form"], [1, "send-message"], ["matInput", "", "name", "message", "maxlength", "100", "rows", "2", "placeholder", "Ex. I need help with...", 3, "ngModel", "ngModelChange"], ["align", "start"], ["align", "end"], ["aria-hidden", "false", 1, "icon-send"], [1, "example-item"]], template: function PlayComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, PlayComponent_mat_card_0_Template, 10, 2, "mat-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, PlayComponent_mat_card_1_Template, 27, 4, "mat-card", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.live);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.live);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardSubtitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardContent"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardActions"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardAvatar"], _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButton"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatSuffix"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIcon"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_11__["CdkVirtualScrollViewport"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_11__["CdkFixedSizeVirtualScroll"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_11__["CdkVirtualForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["MaxLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgModel"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatHint"]], styles: [".live-image[_ngcontent-%COMP%] { \n  max-width: 30px;\n  max-height: 30px;\n  background-image: url('live.png');\n}\n\n.form[_ngcontent-%COMP%] {\n    min-width: 300px;\n    width: 100%;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  width: 200px;\n}\n\n.user-live-card[_ngcontent-%COMP%] {\n\tmax-width: 50%;\n  margin-bottom: 50px;\n  margin-right: 10px;\n  float: left;\n}\n\n.messages-live-card[_ngcontent-%COMP%] {\n  max-width: 50%;\n  max-height: 30%;;\n  margin-bottom: 50px;\n  margin-right: 10px;\n  float: left;\n}\n\n.viewport[_ngcontent-%COMP%] {\n  height: 300px;\n  width: 100%;\n}\n\n.send-message[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.icon-send[_ngcontent-%COMP%] {\n  margin-left: 5px;\n  width: 1.2rem !important;\n  height: 1.2rem !important;\n  font-size: 1.2rem !important;\n}\n\n.message-header-image[_ngcontent-%COMP%] {\n  background-image: url('message.png');\n  background-size: cover;\n}\n\n.message[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  margin-top: 10px;\n  padding: 10px;\n  max-width: 100%;\n  background-color: rgb(222, 230, 245);\n  color: rgba(0, 0, 0, 0.8);\n  \n  border-radius: 5px;\n}\n\n.block-live-img[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top : 20% !important;\n}\n\n.live-img[_ngcontent-%COMP%] {\n  max-width: 25%;\n}\n\n.live-card[_ngcontent-%COMP%] {\n  width: 1000px !important;\n  min-height: 460px !important;\n}\n\n.user-message-label[_ngcontent-%COMP%] {\n  margin-top: 100px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGl2ZXMvcGxheS9wbGF5LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGlDQUFvRDtBQUN0RDs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixXQUFXO0FBQ2Y7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7Q0FDQyxjQUFjO0VBQ2IsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQix3QkFBd0I7RUFDeEIseUJBQXlCO0VBQ3pCLDRCQUE0QjtBQUM5Qjs7QUFHQTtFQUNFLG9DQUF1RDtFQUN2RCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixlQUFlO0VBQ2Ysb0NBQW9DO0VBQ3BDLHlCQUF5Qjs7RUFFekIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvbGl2ZXMvcGxheS9wbGF5LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGl2ZS1pbWFnZSB7IFxuICBtYXgtd2lkdGg6IDMwcHg7XG4gIG1heC1oZWlnaHQ6IDMwcHg7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnfnNyYy9hc3NldHMvaW1hZ2VzL2xpdmUucG5nJyk7XG59XG5cbi5mb3JtIHtcbiAgICBtaW4td2lkdGg6IDMwMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xufVxuXG4uZm9ybS1maWVsZCB7XG4gIHdpZHRoOiAyMDBweDtcbn1cblxuLnVzZXItbGl2ZS1jYXJkIHtcblx0bWF4LXdpZHRoOiA1MCU7XG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgZmxvYXQ6IGxlZnQ7XG59XG5cbi5tZXNzYWdlcy1saXZlLWNhcmQge1xuICBtYXgtd2lkdGg6IDUwJTtcbiAgbWF4LWhlaWdodDogMzAlOztcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICBmbG9hdDogbGVmdDtcbn1cblxuLnZpZXdwb3J0IHtcbiAgaGVpZ2h0OiAzMDBweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5zZW5kLW1lc3NhZ2Uge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmljb24tc2VuZCB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIHdpZHRoOiAxLjJyZW0gIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAxLjJyZW0gIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAxLjJyZW0gIWltcG9ydGFudDtcbn1cblxuXG4ubWVzc2FnZS1oZWFkZXItaW1hZ2Uge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ35zcmMvYXNzZXRzL2ltYWdlcy9tZXNzYWdlLnBuZycpO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufVxuXG4ubWVzc2FnZSB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjIsIDIzMCwgMjQ1KTtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTtcbiAgXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLmJsb2NrLWxpdmUtaW1nIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tdG9wIDogMjAlICFpbXBvcnRhbnQ7XG59XG5cbi5saXZlLWltZyB7XG4gIG1heC13aWR0aDogMjUlO1xufVxuXG4ubGl2ZS1jYXJkIHtcbiAgd2lkdGg6IDEwMDBweCAhaW1wb3J0YW50O1xuICBtaW4taGVpZ2h0OiA0NjBweCAhaW1wb3J0YW50O1xufVxuXG4udXNlci1tZXNzYWdlLWxhYmVsIHtcbiAgbWFyZ2luLXRvcDogMTAwcHg7XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](PlayComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-play',
                templateUrl: './play.component.html',
                styleUrls: ['./play.component.css']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }, { type: _lives_service__WEBPACK_IMPORTED_MODULE_5__["LiveService"] }]; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "HwVj":
/*!****************************************!*\
  !*** ./src/app/lives/lives.service.ts ***!
  \****************************************/
/*! exports provided: LiveService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveService", function() { return LiveService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ "RjLs");



class LiveService extends _http_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"] {
    constructor() {
        super(...arguments);
        this.path = "http://localhost:8080/live";
    }
    listAll() {
        return this.http.get(this.path);
    }
    findByUsername(username) {
        username = username.replace("@", "");
        return this.http.get(`${this.path}/username/${username}`);
    }
    getMessages(liveId) {
        return this.http.get(`${this.path}/${liveId}/messages`);
    }
    addMessage(liveId, message) {
        return this.http.put(`${this.path}/${liveId}/messages`, message, this.headers);
    }
    deleteMessages(liveId) {
        return this.http.delete(`${this.path}/${liveId}/messages`);
    }
}
LiveService.ɵfac = function LiveService_Factory(t) { return ɵLiveService_BaseFactory(t || LiveService); };
LiveService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LiveService, factory: LiveService.ɵfac, providedIn: 'root' });
const ɵLiveService_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](LiveService);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LiveService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();


/***/ }),

/***/ "RjLs":
/*!**************************************!*\
  !*** ./src/app/http/http.service.ts ***!
  \**************************************/
/*! exports provided: HttpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpService", function() { return HttpService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
var _headers;




class HttpService {
    constructor(http) {
        this.http = http;
        _headers.set(this, void 0);
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldSet"])(this, _headers, new Headers());
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _headers).append('Content-type', 'application/json');
    }
    get headers() {
        return { headers: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _headers) };
    }
}
_headers = new WeakMap();
HttpService.ɵfac = function HttpService_Factory(t) { return new (t || HttpService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
HttpService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: HttpService, factory: HttpService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HttpService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _user_user_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user/user-utils */ "jAG7");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class AppComponent {
    constructor(router) {
        this.router = router;
        this.title = 'streaming';
    }
    get username() {
        return _user_user_utils__WEBPACK_IMPORTED_MODULE_1__["UserUtil"].user;
    }
    goHome() {
        this.router.navigate(['']);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 12, vars: 1, consts: [["role", "banner", 1, "toolbar"], [1, "home", 3, "click"], ["width", "40", "src", "./assets/images/live.png"], [1, "spacer"], [1, "username"], ["role", "main", 1, "content"], ["id", "clouds", "alt", "Gray Clouds Background", "xmlns", "http://www.w3.org/2000/svg", "width", "2611.084", "height", "485.677", "viewBox", "0 0 2611.084 485.677"], ["id", "Path_39", "data-name", "Path 39", "d", "M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z", "transform", "translate(142.69 -634.312)", "fill", "#eee"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_a_click_1_listener() { return ctx.goHome(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Quarantine Play");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "svg", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "path", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Hi, @", ctx.username, " ");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */", ".spacer[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .toolbar[_ngcontent-%COMP%] {\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    background-color: rgb(15, 15, 16);\n    color: rgb(247, 247, 247);\n    font-weight: 600;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    margin: 0 16px;\n  }\n\n  .content[_ngcontent-%COMP%] {\n    display: flex;\n    margin: 82px auto 32px;\n    padding: 0 16px;\n    max-width: 100%;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  svg#clouds[_ngcontent-%COMP%] {\n    position: fixed;\n    bottom: -160px;\n    left: -230px;\n    z-index: -10;\n    width: 1920px;\n  }\n\n  .home[_ngcontent-%COMP%] {\n    color: white;\n    display: contents;\n    cursor: pointer;\n  }\n\n  .username[_ngcontent-%COMP%] {\n    margin-right: 1%;\n  }"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _lives_lives_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lives/lives.component */ "vkEs");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _lives_play_play_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lives/play/play.component */ "3v0d");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/scrolling */ "vxfF");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
















class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        { provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MAT_FORM_FIELD_DEFAULT_OPTIONS"], useValue: { floatLabel: 'always' } }
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIconModule"],
            _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_13__["ScrollingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_14__["HttpClientModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _lives_lives_component__WEBPACK_IMPORTED_MODULE_8__["LivesComponent"],
        _lives_play_play_component__WEBPACK_IMPORTED_MODULE_11__["PlayComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIconModule"],
        _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_13__["ScrollingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_14__["HttpClientModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _lives_lives_component__WEBPACK_IMPORTED_MODULE_8__["LivesComponent"],
                    _lives_play_play_component__WEBPACK_IMPORTED_MODULE_11__["PlayComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIconModule"],
                    _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_13__["ScrollingModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_14__["HttpClientModule"],
                ],
                providers: [
                    { provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MAT_FORM_FIELD_DEFAULT_OPTIONS"], useValue: { floatLabel: 'always' } }
                ],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "f8ew":
/*!**********************************!*\
  !*** ./src/app/lives/message.ts ***!
  \**********************************/
/*! exports provided: Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
class Message {
    constructor(username, content) {
        this.username = username;
        this.content = content;
    }
}


/***/ }),

/***/ "jAG7":
/*!************************************!*\
  !*** ./src/app/user/user-utils.ts ***!
  \************************************/
/*! exports provided: UserUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserUtil", function() { return UserUtil; });
class UserUtil {
    static get user() {
        let username = localStorage.getItem('username');
        if (!username) {
            let number = Math.floor(Math.random() * 100);
            username = `anonymous${number}`;
            localStorage.setItem('username', username);
        }
        return username;
    }
}


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _lives_lives_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lives/lives.component */ "vkEs");
/* harmony import */ var _lives_play_play_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lives/play/play.component */ "3v0d");






const routes = [
    {
        path: '', component: _lives_lives_component__WEBPACK_IMPORTED_MODULE_2__["LivesComponent"]
    },
    {
        path: 'play/:username', component: _lives_play_play_component__WEBPACK_IMPORTED_MODULE_3__["PlayComponent"]
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "vkEs":
/*!******************************************!*\
  !*** ./src/app/lives/lives.component.ts ***!
  \******************************************/
/*! exports provided: LivesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LivesComponent", function() { return LivesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _lives_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lives.service */ "HwVj");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
var _lives;








function LivesComponent_mat_card_1_mat_card_header_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const live_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](live_r1.user.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("@", live_r1.user.username, "");
} }
function LivesComponent_mat_card_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, LivesComponent_mat_card_1_mat_card_header_1_Template, 6, 2, "mat-card-header", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "img", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-card-content", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-card-actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LivesComponent_mat_card_1_Template_button_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6); const live_r1 = ctx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r5.play(live_r1.user.username); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Play");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const live_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", live_r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("src", "./assets/images/lives/", live_r1.user.username, "/thumb.png", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", live_r1.description, " ");
} }
class LivesComponent {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        _lives.set(this, void 0);
        service.listAll().subscribe(response => {
            Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldSet"])(this, _lives, response);
        }, error => {
            Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldSet"])(this, _lives, []);
        });
    }
    ngOnInit() {
    }
    get lives() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__classPrivateFieldGet"])(this, _lives);
    }
    play(user) {
        this.router.navigate([`/play/@${user}`]);
    }
}
_lives = new WeakMap();
LivesComponent.ɵfac = function LivesComponent_Factory(t) { return new (t || LivesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_lives_service__WEBPACK_IMPORTED_MODULE_3__["LiveService"])); };
LivesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LivesComponent, selectors: [["app-lives"]], decls: 2, vars: 1, consts: [[1, "lives"], ["class", "example-card", 4, "ngFor", "ngForOf"], [1, "example-card"], [4, "ngIf"], [1, "image-channel"], ["mat-card-image", "", 3, "src"], [1, "live-description"], ["mat-button", "", 3, "click"], ["mat-card-avatar", "", 1, "live-header-image"]], template: function LivesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, LivesComponent_mat_card_1_Template, 10, 3, "mat-card", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.lives);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCard"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardImage"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardContent"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardAvatar"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardSubtitle"]], styles: [".example-card[_ngcontent-%COMP%] {\n\tmax-width: 250px;\n\tmargin-bottom: 50px;\n\tmargin-left: 30px;\n    float: left;\n}\n  \n.live-header-image[_ngcontent-%COMP%] {\n\tbackground-image: url('live.png');\n\tbackground-size: cover;\n}\n  \n.live-description[_ngcontent-%COMP%] {\n\tmin-height: 45px !important;\n}\n  \n.lives[_ngcontent-%COMP%] {\n\tmargin-top: 80px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGl2ZXMvbGl2ZXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtDQUNDLGdCQUFnQjtDQUNoQixtQkFBbUI7Q0FDbkIsaUJBQWlCO0lBQ2QsV0FBVztBQUNmOztBQUVBO0NBQ0MsaUNBQW9EO0NBQ3BELHNCQUFzQjtBQUN2Qjs7QUFFQTtDQUNDLDJCQUEyQjtBQUM1Qjs7QUFFQTtDQUNDLGdCQUFnQjtBQUNqQiIsImZpbGUiOiJzcmMvYXBwL2xpdmVzL2xpdmVzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS1jYXJkIHtcblx0bWF4LXdpZHRoOiAyNTBweDtcblx0bWFyZ2luLWJvdHRvbTogNTBweDtcblx0bWFyZ2luLWxlZnQ6IDMwcHg7XG4gICAgZmxvYXQ6IGxlZnQ7XG59XG4gIFxuLmxpdmUtaGVhZGVyLWltYWdlIHtcblx0YmFja2dyb3VuZC1pbWFnZTogdXJsKCd+c3JjL2Fzc2V0cy9pbWFnZXMvbGl2ZS5wbmcnKTtcblx0YmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cblxuLmxpdmUtZGVzY3JpcHRpb24ge1xuXHRtaW4taGVpZ2h0OiA0NXB4ICFpbXBvcnRhbnQ7XG59XG5cbi5saXZlcyB7XG5cdG1hcmdpbi10b3A6IDgwcHg7XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](LivesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-lives',
                templateUrl: './lives.component.html',
                styleUrls: ['./lives.component.css']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }, { type: _lives_service__WEBPACK_IMPORTED_MODULE_3__["LiveService"] }]; }, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map