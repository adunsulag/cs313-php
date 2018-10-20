webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/activitylog-list/activitylog-list.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/activitylog-list/activitylog-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Activity Log</h2>\n<form>\n  <label>\n    Entity\n    <select name=\"filter\" [(ngModel)]=\"searchFilter.filter\" class=\"browser-default\">\n      <option [value]=\"entity\" *ngFor=\"let entity of entities\">{{entity}}</option>\n    </select>\n  </label>\n  <input type=\"button\" (click)=\"filter()\" value=\"Filter\" class=\"btn btn-primary\" />\n  <input type=\"button\" (click)=\"reset()\" value=\"Reset\" class=\"btn btn-secondary\" />\n</form>\n<p *ngIf=\"!hasLoaded\" class=\"alert alert-info\">Loading data...</p>\n<table class=\"table table-striped\" *ngIf=\"hasLoaded\">\n  <thead>\n    <tr>\n      <th>\n        Date\n      </th>\n      <th>\n        Entity\n      </th>\n      <th>\n        Entity ID\n      </th>\n      <th>\n        Action\n      </th>\n      <th>\n          Notes\n        </th>\n        <th>\n          System User\n        </th>\n    </tr>\n  </thead>\n  <tbody *ngIf=\"logs.length == 0\">\n    <tr>\n      <td colspan=\"6\">\n        <div class=\"alert alert-warning\">No logs exist in the system</div>\n      </td>\n    </tr>\n  </tbody>\n  <tbody>\n    <tr *ngFor=\"let log of logs\">\n      <td>{{log.date | date:'medium' }}</td>\n      <td>{{log.tableName}}</td>\n      <td>{{log.tableID}}</td>\n      <td>{{log.action}}</td>\n      <td>{{log.notes}}</td>\n      <td>{{log.systemUserEmail}}</td>\n    </tr>\n  </tbody>\n</table>"

/***/ }),

/***/ "./src/app/activitylog-list/activitylog-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitylogListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_activitylog_service__ = __webpack_require__("./src/app/services/activitylog.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ActivitylogListComponent = /** @class */ (function () {
    function ActivitylogListComponent(activityLogService) {
        this.activityLogService = activityLogService;
        this.entities = [
            "",
            "SystemUser",
            "Client",
            "Therapist",
            "Appointment"
        ];
        this.logs = [];
        this._searchFilter = {
            searchEntity: ""
        };
    }
    Object.defineProperty(ActivitylogListComponent.prototype, "searchFilter", {
        get: function () {
            return this._searchFilter;
        },
        set: function (v) {
            this._searchFilter = v;
        },
        enumerable: true,
        configurable: true
    });
    ActivitylogListComponent.prototype.filter = function () {
        var _this = this;
        if (!this.searchFilter || this.searchFilter == "") {
            return this.reset();
        }
        this.hasLoaded = false;
        this.activityLogService.search(this.searchFilter.filter).then(function (logs) {
            _this.setLogs(logs);
            _this.hasLoaded = true;
        })
            .catch(function (error) {
            console.log(error);
            _this.hasLoaded = true;
        });
    };
    ActivitylogListComponent.prototype.reset = function () {
        var _this = this;
        this.hasLoaded = false;
        this.activityLogService.list().then(function (logs) {
            _this.setLogs(logs);
            _this.hasLoaded = true;
        })
            .catch(function (error) {
            console.log(error);
            _this.hasLoaded = true;
        });
    };
    ActivitylogListComponent.prototype.setLogs = function (logs) {
        console.log("Logs are now: ", logs);
        this.logs = logs;
    };
    ActivitylogListComponent.prototype.ngOnInit = function () {
        this.reset();
    };
    ActivitylogListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-activitylog-list',
            template: __webpack_require__("./src/app/activitylog-list/activitylog-list.component.html"),
            styles: [__webpack_require__("./src/app/activitylog-list/activitylog-list.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_activitylog_service__["a" /* ActivitylogService */]])
    ], ActivitylogListComponent);
    return ActivitylogListComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_not_found_page_not_found_component__ = __webpack_require__("./src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login_component__ = __webpack_require__("./src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__therapist_list_therapist_list_component__ = __webpack_require__("./src/app/therapist-list/therapist-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__client_list_client_list_component__ = __webpack_require__("./src/app/client-list/client-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__activitylog_list_activitylog_list_component__ = __webpack_require__("./src/app/activitylog-list/activitylog-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__appointment_list_appointment_list_component__ = __webpack_require__("./src/app/appointment-list/appointment-list.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_5__login_login_component__["a" /* LoginComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_3__home_home_component__["a" /* HomeComponent */] },
    { path: 'therapists', component: __WEBPACK_IMPORTED_MODULE_6__therapist_list_therapist_list_component__["a" /* TherapistListComponent */] },
    { path: 'clients', component: __WEBPACK_IMPORTED_MODULE_7__client_list_client_list_component__["a" /* ClientListComponent */] },
    { path: 'activitylog', component: __WEBPACK_IMPORTED_MODULE_8__activitylog_list_activitylog_list_component__["a" /* ActivitylogListComponent */] },
    { path: 'appointments', component: __WEBPACK_IMPORTED_MODULE_9__appointment_list_appointment_list_component__["a" /* AppointmentListComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_4__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */].forRoot(routes, { enableTracing: false })
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */]],
            declarations: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<mdb-navbar SideClass=\"navbar navbar-expand-md\" [containerInside]=\"false\">\n    <logo>\n        <a class=\"navbar-brand mr-0\" [routerLink]=\"['/']\">\n            <img width=\"50\" alt=\"Angular Logo\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\">\n        </a>\n    </logo>   \n    <links>\n      <ul class=\"navbar-nav ml-auto\">\n            <li class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                <a class=\"nav-link waves-light\" mdbRippleRadius (click)=\"goHome()\">Home</a>\n            </li>\n            <li *ngIf=\"isNotLoggedIn\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n              <a class=\"nav-link waves-light\" mdbRippleRadius [routerLink]=\"['/login']\">Login</a>\n            </li>\n            <li *ngIf=\"!isNotLoggedIn\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                <a class=\"nav-link waves-light\" mdbRippleRadius [routerLink]=\"['/therapists']\">Therapists</a>\n            </li>\n            <li *ngIf=\"!isNotLoggedIn\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n              <a class=\"nav-link waves-light\" mdbRippleRadius [routerLink]=\"['/clients']\">Clients</a>\n            </li>\n            <li *ngIf=\"!isNotLoggedIn\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n              <a class=\"nav-link waves-light\" mdbRippleRadius [routerLink]=\"['/appointments']\">Appointments</a>\n            </li>\n            <li *ngIf=\"!isNotLoggedIn\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n              <a class=\"nav-link waves-light\" mdbRippleRadius [routerLink]=\"['/activitylog']\">Activity Log</a>\n            </li>\n            <li *ngIf=\"!isNotLoggedIn\" class=\"logout nav-item\">\n              <a class=\"nav-link waves-light\" mdbRippleRadius (click)=\"logout()\"><span>Hello {{Username}}</span> - Logout</a></li>\n        </ul>\n    </links>\n</mdb-navbar>\n<div style=\"text-align:center\">\n  <h1>\n    Welcome to {{ title }}!\n  </h1>\n</div>\n<main>\n    <div class=\"container-fluid\">\n        <router-outlet></router-outlet>\n    </div>\n  </main>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_aws_amplify_angular__ = __webpack_require__("./node_modules/aws-amplify-angular/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__aws_exports__ = __webpack_require__("./src/aws-exports.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(amplifyService, router) {
        var _this = this;
        this.amplifyService = amplifyService;
        this.router = router;
        this.title = 'Therapist Admin History Tracker';
        this.amplifyService.auth().configure({
            // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
            identityPoolId: __WEBPACK_IMPORTED_MODULE_2__aws_exports__["a" /* awsmobile */].aws_cognito_identity_pool_id,
            // REQUIRED - Amazon Cognito Region
            region: __WEBPACK_IMPORTED_MODULE_2__aws_exports__["a" /* awsmobile */].aws_cognito_region,
            // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
            // Required only if it's different from Amazon Cognito Region
            // identityPoolRegion: 'XX-XXXX-X',
            // OPTIONAL - Amazon Cognito User Pool ID
            userPoolId: __WEBPACK_IMPORTED_MODULE_2__aws_exports__["a" /* awsmobile */].aws_user_pools_id,
            // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
            userPoolWebClientId: __WEBPACK_IMPORTED_MODULE_2__aws_exports__["a" /* awsmobile */].aws_user_pools_web_client_id,
            // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
            mandatorySignIn: false,
        });
        this._isNotLoggedIn = true;
        this.amplifyService.authStateChange$
            .subscribe(function (authState) {
            _this._isNotLoggedIn = !(authState.state === 'signedIn');
            if (!authState.user) {
                _this._user = null;
            }
            else {
                _this._user = authState.user;
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.amplifyService.auth().currentAuthenticatedUser().then(function (user) {
            _this._isNotLoggedIn = false;
            _this._user = user;
        })
            .catch(function (error) {
            // if we first load and we are not logged in we need to make sure we go to the login route if we are not there already.
            _this.router.navigate(["/login"]);
        });
    };
    AppComponent.prototype.goHome = function () {
        if (this._user) {
            this.router.navigate(['/home']);
        }
        else {
            this.router.navigate(['/login']);
        }
    };
    Object.defineProperty(AppComponent.prototype, "Username", {
        get: function () {
            return this._user ? this._user.username : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "isNotLoggedIn", {
        get: function () {
            return this._isNotLoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.logout = function () {
        var _this = this;
        this._isNotLoggedIn = true;
        this._user = null;
        // @see https://aws-amplify.github.io/docs/js/authentication
        this.amplifyService.auth().signOut({ global: true })
            .then(function (data) {
            console.log(data);
            _this.router.navigate(["/login"]);
        })
            .catch(function (err) { return console.log(err); });
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_aws_amplify_angular__["b" /* AmplifyService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_mdb_pro__ = __webpack_require__("./node_modules/ng-mdb-pro/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__client_list_client_list_component__ = __webpack_require__("./src/app/client-list/client-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__therapist_list_therapist_list_component__ = __webpack_require__("./src/app/therapist-list/therapist-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__activitylog_list_activitylog_list_component__ = __webpack_require__("./src/app/activitylog-list/activitylog-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_activitylog_service__ = __webpack_require__("./src/app/services/activitylog.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_client_service__ = __webpack_require__("./src/app/services/client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_therapist_service__ = __webpack_require__("./src/app/services/therapist.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_http_service__ = __webpack_require__("./src/app/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_aws_amplify_angular__ = __webpack_require__("./node_modules/aws-amplify-angular/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__page_not_found_page_not_found_component__ = __webpack_require__("./src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__login_login_component__ = __webpack_require__("./src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__appointment_list_appointment_list_component__ = __webpack_require__("./src/app/appointment-list/appointment-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__app_routing_module__ = __webpack_require__("./src/app/app-routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_4__client_list_client_list_component__["a" /* ClientListComponent */],
                __WEBPACK_IMPORTED_MODULE_5__therapist_list_therapist_list_component__["a" /* TherapistListComponent */],
                __WEBPACK_IMPORTED_MODULE_6__activitylog_list_activitylog_list_component__["a" /* ActivitylogListComponent */],
                __WEBPACK_IMPORTED_MODULE_14__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */],
                __WEBPACK_IMPORTED_MODULE_15__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_16__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_17__appointment_list_appointment_list_component__["a" /* AppointmentListComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_13_aws_amplify_angular__["a" /* AmplifyAngularModule */],
                __WEBPACK_IMPORTED_MODULE_2_ng_mdb_pro__["a" /* MDBBootstrapModules */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_18__app_routing_module__["a" /* AppRoutingModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_7__services_activitylog_service__["a" /* ActivitylogService */], __WEBPACK_IMPORTED_MODULE_8__services_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_9__services_therapist_service__["a" /* TherapistService */], __WEBPACK_IMPORTED_MODULE_10__services_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_13_aws_amplify_angular__["b" /* AmplifyService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/appointment-list/appointment-list.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  appointment-list works!\n</p>\n"

/***/ }),

/***/ "./src/app/appointment-list/appointment-list.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/appointment-list/appointment-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppointmentListComponent = /** @class */ (function () {
    function AppointmentListComponent() {
    }
    AppointmentListComponent.prototype.ngOnInit = function () {
    };
    AppointmentListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-appointment-list',
            template: __webpack_require__("./src/app/appointment-list/appointment-list.component.html"),
            styles: [__webpack_require__("./src/app/appointment-list/appointment-list.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AppointmentListComponent);
    return AppointmentListComponent;
}());



/***/ }),

/***/ "./src/app/client-list/client-list.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/client-list/client-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Clients List</h2>\n<p *ngIf=\"!hasLoaded\" class=\"alert alert-info\">Loading client data...</p>\n<table class=\"table table-striped\" *ngIf=\"hasLoaded\">\n  <thead>\n    <tr>\n      <th>\n        ID\n      </th>\n      <th>\n        Name\n      </th>\n    </tr>\n  </thead>\n  <tbody *ngIf=\"clients.length == 0\">\n    <tr>\n      <td colspan=\"2\">\n        <div class=\"alert alert-warning\">No clients exist in the system</div>\n      </td>\n    </tr>\n  </tbody>\n  <tbody>\n    <tr *ngFor=\"let client of clients\">\n      <td>{{client.id}}</td>\n      <td>{{client.name}}</td>\n    </tr>\n  </tbody>\n</table>"

/***/ }),

/***/ "./src/app/client-list/client-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_client_service__ = __webpack_require__("./src/app/services/client.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ClientListComponent = /** @class */ (function () {
    function ClientListComponent(clientService) {
        this.clientService = clientService;
        this.clients = [];
    }
    ClientListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hasLoaded = false;
        this.clientService.list().then(function (clients) {
            console.log(clients);
            _this.clients = clients;
            _this.hasLoaded = true;
        })
            .catch(function (error) {
            console.error(error);
            _this.hasLoaded = true;
        });
    };
    ClientListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-client-list',
            template: __webpack_require__("./src/app/client-list/client-list.component.html"),
            styles: [__webpack_require__("./src/app/client-list/client-list.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_client_service__["a" /* ClientService */]])
    ], ClientListComponent);
    return ClientListComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Welcome -- Helpful Information For You</h1>\n<p>If this is your first time using the app here is some helpful instructions.</p>\n<ol>\n  <li>The navigation bar at the top will take you to the different sections of the app</li>\n  <li>\n    The Therapists tab will let you see a list of your current therapists as well as add or remove therapists from the system.\n    You can also see the details of a therapist, recent activity that has happened with that therapist and any appointments the therapist has.\n  </li>\n  <li>The Clients tab will let you see a list of the clients currently in the system as well as add or remove clients from the system.\n      You can also see the details of a client, recent activity that has happened with that client and any appointments the client has.</li>\n  <li>The Appointments tab will let you see a list of both past and future appointments in the system as well as add or remove appointments from the system.\n          You can also see the details of an appointment, recent activity that has happened with that appointment and the therapist as well as client connected with the appointment.\n  </li>\n</ol>"

/***/ }),

/***/ "./src/app/home/home.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-home',
            template: __webpack_require__("./src/app/home/home.component.html"),
            styles: [__webpack_require__("./src/app/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<amplify-authenticator></amplify-authenticator>"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_aws_amplify_angular__ = __webpack_require__("./node_modules/aws-amplify-angular/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = /** @class */ (function () {
    function LoginComponent(amplifyService, router) {
        var _this = this;
        this.amplifyService = amplifyService;
        this.router = router;
        this.amplifyService.authStateChange$
            .subscribe(function (authState) {
            if (authState.state == 'signedIn') {
                // TODO: stephen need to sync the state with the server here... creating the user or updating any information about them
                // that we have.
                _this.router.navigate(['/home']);
            }
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        // @see https://aws-amplify.github.io/docs/js/authentication
        var session = this.amplifyService.auth().currentAuthenticatedUser().then(function (user) {
            _this.router.navigate(['home']);
        })
            .catch(function (error) {
            // not logged in so we can just ignore this error.
        });
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-login',
            template: __webpack_require__("./src/app/login/login.component.html"),
            styles: [__webpack_require__("./src/app/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_aws_amplify_angular__["b" /* AmplifyService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>404: Page not found!</h1>\n<p>I'm sorry but the page you requested could not be found</p>"

/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    PageNotFoundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-page-not-found',
            template: __webpack_require__("./src/app/page-not-found/page-not-found.component.html"),
            styles: [__webpack_require__("./src/app/page-not-found/page-not-found.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());



/***/ }),

/***/ "./src/app/services/activitylog.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitylogService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http_service__ = __webpack_require__("./src/app/services/http.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ActivitylogService = /** @class */ (function () {
    function ActivitylogService(httpService) {
        this.httpService = httpService;
    }
    ActivitylogService.prototype.list = function () {
        return this.httpService.get("activitylog.list").then(function (resp) {
            var data = resp.json();
            return data;
        });
    };
    ActivitylogService.prototype.search = function (entity) {
        return this.httpService.get("activitylog.list", { entity: entity }).then(function (resp) {
            var data = resp.json();
            return data;
        });
    };
    ActivitylogService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__http_service__["a" /* HttpService */]])
    ], ActivitylogService);
    return ActivitylogService;
}());



/***/ }),

/***/ "./src/app/services/client.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http_service__ = __webpack_require__("./src/app/services/http.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ClientService = /** @class */ (function () {
    function ClientService(httpService) {
        this.httpService = httpService;
    }
    ClientService.prototype.list = function () {
        return this.httpService.get("clients.list").then(function (resp) {
            var data = resp.json();
            return data;
        });
    };
    ClientService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__http_service__["a" /* HttpService */]])
    ], ClientService);
    return ClientService;
}());



/***/ }),

/***/ "./src/app/services/http.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HttpService = /** @class */ (function () {
    function HttpService(_$http) {
        this._$http = _$http;
    }
    HttpService.prototype.generateUrl = function (path) {
        // TODO: stephen I think this will have an error if the path already contained a query parameter... 
        // we need to find a better way to do this.
        var url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + path;
        return url;
    };
    HttpService.prototype.get = function (action, data) {
        if (!data) {
            data = {};
        }
        var payload = {
            action: action,
            data: data
        };
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ params: payload });
        return this._$http.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl, options).toPromise();
    };
    HttpService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], HttpService);
    return HttpService;
}());



/***/ }),

/***/ "./src/app/services/therapist.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TherapistService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http_service__ = __webpack_require__("./src/app/services/http.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TherapistService = /** @class */ (function () {
    function TherapistService(httpService) {
        this.httpService = httpService;
    }
    TherapistService.prototype.list = function () {
        return this.httpService.get("therapists.list").then(function (resp) {
            var data = resp.json();
            return data;
        });
    };
    TherapistService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__http_service__["a" /* HttpService */]])
    ], TherapistService);
    return TherapistService;
}());



/***/ }),

/***/ "./src/app/therapist-list/therapist-list.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/therapist-list/therapist-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Therapists List</h2>\n<p *ngIf=\"!hasLoaded\" class=\"alert alert-info\">Loading data...</p>\n<table class=\"table table-striped\" *ngIf=\"hasLoaded\">\n  <thead>\n    <tr>\n      <th>\n        ID\n      </th>\n      <th>\n        Name\n      </th>\n    </tr>\n  </thead>\n  <tbody *ngIf=\"therapists.length == 0\">\n    <tr>\n      <td colspan=\"2\">\n        <div class=\"alert alert-warning\">No therapists exist in the system</div>\n      </td>\n    </tr>\n  </tbody>\n  <tbody>\n    <tr *ngFor=\"let therapist of therapists\">\n      <td>{{therapist.id}}</td>\n      <td>{{therapist.name}}</td>\n    </tr>\n  </tbody>\n</table>"

/***/ }),

/***/ "./src/app/therapist-list/therapist-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TherapistListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_therapist_service__ = __webpack_require__("./src/app/services/therapist.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TherapistListComponent = /** @class */ (function () {
    function TherapistListComponent(therapistService) {
        this.therapistService = therapistService;
        this.therapists = [];
    }
    TherapistListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hasLoaded = false;
        this.therapistService.list().then(function (therapists) {
            console.log(therapists);
            _this.therapists = therapists;
            _this.hasLoaded = true;
        })
            .catch(function (error) {
            console.log(error);
            _this.hasLoaded = true;
        });
    };
    TherapistListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-therapist-list',
            template: __webpack_require__("./src/app/therapist-list/therapist-list.component.html"),
            styles: [__webpack_require__("./src/app/therapist-list/therapist-list.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_therapist_service__["a" /* TherapistService */]])
    ], TherapistListComponent);
    return TherapistListComponent;
}());



/***/ }),

/***/ "./src/aws-exports.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return awsmobile; });
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.
var awsmobile = {
    aws_project_region: "us-east-1",
    aws_cognito_identity_pool_id: "us-east-1:0c4629df-3bcc-49b5-be6e-5861d5283b56",
    aws_cognito_region: "us-east-1",
    aws_user_pools_id: "us-east-1_s9iDqPquj",
    aws_user_pools_web_client_id: "1271f4r7a3f24kk53j6emll9nb",
    aws_user_files_s3_bucket: "client6c4d284790104a1c85ba6a0f621440bb",
    aws_user_files_s3_bucket_region: "us-east-1"
};


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    apiUrl: 'http://localhost:4000/'
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map