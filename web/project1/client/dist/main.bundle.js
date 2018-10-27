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

module.exports = "<h2>Activity Log</h2>\n<form>\n  <label>\n    Entity\n    <select name=\"filter\" [(ngModel)]=\"searchFilter.entity\" class=\"browser-default custom-select\">\n      <option [value]=\"entity\" *ngFor=\"let entity of entities\">{{entity}}</option>\n    </select>\n  </label>\n  <label>\n      Action\n      <select name=\"filter\" [(ngModel)]=\"searchFilter.action\" class=\"browser-default custom-select\">\n        <option [value]=\"action\" *ngFor=\"let action of actions\">{{action}}</option>\n      </select>\n    </label>\n    <label>\n      ID\n      <input type=\"number\" name=\"entityID\" [(ngModel)]=\"searchFilter.entityID\" />\n    </label>\n  <input type=\"button\" (click)=\"filter()\" value=\"Filter\" class=\"btn btn-primary\" />\n  <input type=\"button\" (click)=\"reset()\" value=\"Reset\" class=\"btn btn-secondary\" />\n</form>\n<p *ngIf=\"!hasLoaded\" class=\"alert alert-info\">Loading data...</p>\n<dac-activitylog-table [logs]=\"logs\" *ngIf=\"hasLoaded\"></dac-activitylog-table>"

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
        this.actions = [
            "",
            "SELECT",
            "INSERT",
            "DELETE",
            "UPDATE"
        ];
        this.logs = [];
        this._searchFilter = {
            entity: "",
            action: "",
            entityID: ""
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
        this.activityLogService.search(this.searchFilter).then(function (logs) {
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
        this.logs = [];
        this._searchFilter = {
            entity: "",
            action: "",
            entityID: ""
        };
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

/***/ "./src/app/activitylog-table/activitylog-table.component.html":
/***/ (function(module, exports) {

module.exports = "<table class=\"table table-striped\">\n    <thead>\n      <tr>\n        <th>\n          Date\n        </th>\n        <th>\n          Entity\n        </th>\n        <th>\n          Entity ID\n        </th>\n        <th>\n          Action\n        </th>\n        <th>\n            Notes\n          </th>\n          <th>\n            System User\n          </th>\n      </tr>\n    </thead>\n    <tbody *ngIf=\"Logs.length == 0\">\n      <tr>\n        <td colspan=\"6\">\n          <div class=\"alert alert-warning\">No logs exist in the system</div>\n        </td>\n      </tr>\n    </tbody>\n    <tbody>\n      <tr *ngFor=\"let log of Logs\">\n        <td>{{log.date | date:'medium' }}</td>\n        <td>{{log.tableName}}</td>\n        <td>{{log.tableID}}</td>\n        <td>{{log.action}}</td>\n        <td>{{log.notes}}</td>\n        <td>{{log.systemUserEmail}}</td>\n      </tr>\n    </tbody>\n  </table>"

/***/ }),

/***/ "./src/app/activitylog-table/activitylog-table.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/activitylog-table/activitylog-table.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivitylogTableComponent; });
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

var ActivitylogTableComponent = /** @class */ (function () {
    function ActivitylogTableComponent() {
        this.logs = [];
    }
    ActivitylogTableComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(ActivitylogTableComponent.prototype, "Logs", {
        get: function () {
            if (this.logs && this.logs.length > 0) {
                return this.logs;
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Array)
    ], ActivitylogTableComponent.prototype, "logs", void 0);
    ActivitylogTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-activitylog-table',
            template: __webpack_require__("./src/app/activitylog-table/activitylog-table.component.html"),
            styles: [__webpack_require__("./src/app/activitylog-table/activitylog-table.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ActivitylogTableComponent);
    return ActivitylogTableComponent;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__client_edit_client_edit_component__ = __webpack_require__("./src/app/client-edit/client-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__client_new_client_new_component__ = __webpack_require__("./src/app/client-new/client-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__therapist_edit_therapist_edit_component__ = __webpack_require__("./src/app/therapist-edit/therapist-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__therapist_new_therapist_new_component__ = __webpack_require__("./src/app/therapist-new/therapist-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__appointment_edit_appointment_edit_component__ = __webpack_require__("./src/app/appointment-edit/appointment-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__appointment_new_appointment_new_component__ = __webpack_require__("./src/app/appointment-new/appointment-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__logout_logout_component__ = __webpack_require__("./src/app/logout/logout.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_5__login_login_component__["a" /* LoginComponent */] },
    { path: 'logout', component: __WEBPACK_IMPORTED_MODULE_16__logout_logout_component__["a" /* LogoutComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_3__home_home_component__["a" /* HomeComponent */] },
    { path: 'therapists', component: __WEBPACK_IMPORTED_MODULE_6__therapist_list_therapist_list_component__["a" /* TherapistListComponent */] },
    { path: 'therapists/edit/:id', component: __WEBPACK_IMPORTED_MODULE_12__therapist_edit_therapist_edit_component__["a" /* TherapistEditComponent */] },
    { path: 'therapists/new', component: __WEBPACK_IMPORTED_MODULE_13__therapist_new_therapist_new_component__["a" /* TherapistNewComponent */] },
    { path: 'clients', component: __WEBPACK_IMPORTED_MODULE_7__client_list_client_list_component__["a" /* ClientListComponent */] },
    { path: 'clients/edit/:id', component: __WEBPACK_IMPORTED_MODULE_10__client_edit_client_edit_component__["a" /* ClientEditComponent */] },
    { path: 'clients/new', component: __WEBPACK_IMPORTED_MODULE_11__client_new_client_new_component__["a" /* ClientNewComponent */] },
    { path: 'activitylog', component: __WEBPACK_IMPORTED_MODULE_8__activitylog_list_activitylog_list_component__["a" /* ActivitylogListComponent */] },
    { path: 'appointments', component: __WEBPACK_IMPORTED_MODULE_9__appointment_list_appointment_list_component__["a" /* AppointmentListComponent */] },
    { path: 'appointments/edit/:id', component: __WEBPACK_IMPORTED_MODULE_14__appointment_edit_appointment_edit_component__["a" /* AppointmentEditComponent */] },
    { path: 'appointments/new', component: __WEBPACK_IMPORTED_MODULE_15__appointment_new_appointment_new_component__["a" /* AppointmentNewComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_4__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["g" /* RouterModule */].forRoot(routes, { enableTracing: false })
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_2__angular_router__["g" /* RouterModule */]],
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

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<mdb-navbar SideClass=\"navbar navbar-expand-md mb-3\" [containerInside]=\"false\">\n    <logo>\n        <a class=\"navbar-brand mr-0\" [routerLink]=\"['/']\">\n            <img width=\"50\" alt=\"Angular Logo\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\">\n            <span>{{ title }}</span>\n        </a>\n        \n    </logo>   \n    <links>\n      <ul class=\"navbar-nav ml-auto\">\n            <li class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                <a class=\"nav-link waves-light\" mdbRippleRadius (click)=\"goHome()\">Home</a>\n            </li>\n            <li *ngIf=\"isNotLoggedIn\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n              <a class=\"nav-link waves-light\" mdbRippleRadius [routerLink]=\"['/login']\">Login</a>\n            </li>\n            <li *ngIf=\"!isNotLoggedIn\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                <a class=\"nav-link waves-light\" mdbRippleRadius [routerLink]=\"['/therapists']\">Therapists</a>\n            </li>\n            <li *ngIf=\"!isNotLoggedIn\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n              <a class=\"nav-link waves-light\" mdbRippleRadius [routerLink]=\"['/clients']\">Clients</a>\n            </li>\n            <li *ngIf=\"!isNotLoggedIn\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n              <a class=\"nav-link waves-light\" mdbRippleRadius [routerLink]=\"['/appointments']\">Appointments</a>\n            </li>\n            <li *ngIf=\"!isNotLoggedIn\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n              <a class=\"nav-link waves-light\" mdbRippleRadius [routerLink]=\"['/activitylog']\">Activity Log</a>\n            </li>\n            <li *ngIf=\"!isNotLoggedIn\" class=\"logout nav-item\">\n              <a class=\"nav-link waves-light\" mdbRippleRadius (click)=\"logout()\"><span>Hello {{Username}}</span> - Logout</a></li>\n        </ul>\n    </links>\n</mdb-navbar>\n<main>\n    <div class=\"container-fluid\">\n        <router-outlet></router-outlet>\n    </div>\n  </main>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
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
    function AppComponent(authService, router) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.title = 'Therapist Admin History Tracker';
        this._isNotLoggedIn = true;
        this.authService.authStateChange()
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
        this.authService.currentAuthenticatedUser().then(function (user) {
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
        this.authService.signOut()
            .then(function (data) {
            console.log(data);
            _this.router.navigate(["/login"]);
        })
            .catch(function (err) {
            console.log(err);
            // we still want to send people to login if we fail to logout for some reason.
            _this.router.navigate(["/login"]);
        });
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_appointment_service__ = __webpack_require__("./src/app/services/appointment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__client_edit_client_edit_component__ = __webpack_require__("./src/app/client-edit/client-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__appointment_list_table_appointment_list_table_component__ = __webpack_require__("./src/app/appointment-list-table/appointment-list-table.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__activitylog_table_activitylog_table_component__ = __webpack_require__("./src/app/activitylog-table/activitylog-table.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__client_new_client_new_component__ = __webpack_require__("./src/app/client-new/client-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__therapist_edit_therapist_edit_component__ = __webpack_require__("./src/app/therapist-edit/therapist-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__therapist_new_therapist_new_component__ = __webpack_require__("./src/app/therapist-new/therapist-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__appointment_edit_appointment_edit_component__ = __webpack_require__("./src/app/appointment-edit/appointment-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__appointment_new_appointment_new_component__ = __webpack_require__("./src/app/appointment-new/appointment-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__logout_logout_component__ = __webpack_require__("./src/app/logout/logout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__services_alert_service__ = __webpack_require__("./src/app/services/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_ng_mdb_pro_pro_alerts__ = __webpack_require__("./node_modules/ng-mdb-pro/pro/alerts/index.ts");
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
                __WEBPACK_IMPORTED_MODULE_17__appointment_list_appointment_list_component__["a" /* AppointmentListComponent */],
                __WEBPACK_IMPORTED_MODULE_20__client_edit_client_edit_component__["a" /* ClientEditComponent */],
                __WEBPACK_IMPORTED_MODULE_21__appointment_list_table_appointment_list_table_component__["a" /* AppointmentListTableComponent */],
                __WEBPACK_IMPORTED_MODULE_22__activitylog_table_activitylog_table_component__["a" /* ActivitylogTableComponent */],
                __WEBPACK_IMPORTED_MODULE_23__client_new_client_new_component__["a" /* ClientNewComponent */],
                __WEBPACK_IMPORTED_MODULE_24__therapist_edit_therapist_edit_component__["a" /* TherapistEditComponent */],
                __WEBPACK_IMPORTED_MODULE_25__therapist_new_therapist_new_component__["a" /* TherapistNewComponent */],
                __WEBPACK_IMPORTED_MODULE_26__appointment_edit_appointment_edit_component__["a" /* AppointmentEditComponent */],
                __WEBPACK_IMPORTED_MODULE_27__appointment_new_appointment_new_component__["a" /* AppointmentNewComponent */],
                __WEBPACK_IMPORTED_MODULE_29__logout_logout_component__["a" /* LogoutComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_31_ng_mdb_pro_pro_alerts__["a" /* ToastModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_13_aws_amplify_angular__["a" /* AmplifyAngularModule */],
                __WEBPACK_IMPORTED_MODULE_2_ng_mdb_pro__["a" /* MDBBootstrapModules */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_18__app_routing_module__["a" /* AppRoutingModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_7__services_activitylog_service__["a" /* ActivitylogService */], __WEBPACK_IMPORTED_MODULE_8__services_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_9__services_therapist_service__["a" /* TherapistService */], __WEBPACK_IMPORTED_MODULE_10__services_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_13_aws_amplify_angular__["b" /* AmplifyService */], __WEBPACK_IMPORTED_MODULE_19__services_appointment_service__["a" /* AppointmentService */], __WEBPACK_IMPORTED_MODULE_28__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_30__services_alert_service__["a" /* AlertService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/appointment-edit/appointment-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-10\"><h2>Editing Appointment {{editItem.id}}</h2></div>\n    <div class=\"col-2\"><a [routerLink]=\"['/appointments']\">Back to list</a></div>\n  </div>\n  <p *ngIf=\"!hasLoaded\" class=\"alert alert-info\">Loading data...</p>\n  <div *ngIf=\"hasLoaded\">\n    <form class=\"card card-body mb-3\">\n      <h3>Appointments Profile</h3>\n      <label>\n        Start Date:\n        <input type=\"text\" class=\"form-control\" name=\"name\" [(ngModel)]=\"editItem.startDate\" />\n      </label>\n      <label>\n          End Date:\n          <input type=\"text\" class=\"form-control\" name=\"name\" [(ngModel)]=\"editItem.endDate\" />\n        </label>\n        <label>\n            Status:\n            <select name=\"status\" [(ngModel)]=\"editItem.status\" class=\"browser-default custom-select w-100\">\n              <option [value]=\"status\" *ngFor=\"let status of statii\">{{status}}</option>\n            </select>   \n          </label>\n          <label>\n              Therapist:\n              <select name=\"therapist\" [(ngModel)]=\"editItem.therapistID\" class=\"browser-default custom-select w-100\">\n                <option [value]=\"therapist.id\" *ngFor=\"let therapist of therapists\">{{therapist.name}}</option>\n              </select>\n            </label>\n            <label>\n                Client:\n                <select name=\"client\" [(ngModel)]=\"editItem.clientID\" class=\"browser-default custom-select w-100\">\n                  <option [value]=\"client.id\" *ngFor=\"let client of clients\">{{client.name}}</option>\n                </select>\n              </label>\n      <a  [routerLink]=\"['/appointments']\" class=\"btn btn-primary\">Save</a>\n    </form>\n  </div>"

/***/ }),

/***/ "./src/app/appointment-edit/appointment-edit.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/appointment-edit/appointment-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_appointment_service__ = __webpack_require__("./src/app/services/appointment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_therapist_service__ = __webpack_require__("./src/app/services/therapist.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_client_service__ = __webpack_require__("./src/app/services/client.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppointmentEditComponent = /** @class */ (function () {
    function AppointmentEditComponent(route, router, apptService, therapistService, clientService) {
        this.route = route;
        this.router = router;
        this.apptService = apptService;
        this.therapistService = therapistService;
        this.clientService = clientService;
        this._appointment = {};
        this._therapists = [];
        this._clients = [];
    }
    AppointmentEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hasLoaded = false;
        this.route.params.subscribe(function (params) {
            if (!params['id'] || isNaN(+params['id'])) {
                _this.router.navigate(['/page-not-found']);
                return;
            }
            var therapistsPromise = _this.therapistService.list().then(function (therapists) {
                _this._therapists = therapists;
            });
            var clientsPromise = _this.clientService.list().then(function (clients) {
                _this._clients = clients;
            });
            var id = +params['id'];
            var apptProfilePromise = _this.apptService.get(id).then(function (appointment) {
                _this._appointment = appointment;
            });
            Promise.all([therapistsPromise, clientsPromise, apptProfilePromise]).then(function (results) {
                _this.hasLoaded = true;
            })
                .catch(function (error) {
                _this.hasLoaded = true;
                console.error(error);
            });
        });
    };
    Object.defineProperty(AppointmentEditComponent.prototype, "statii", {
        get: function () {
            return ['pending', 'canceled', 'noshow', 'completed'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentEditComponent.prototype, "therapists", {
        get: function () {
            return this._therapists;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentEditComponent.prototype, "clients", {
        get: function () {
            return this._clients;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentEditComponent.prototype, "editItem", {
        get: function () {
            return this._appointment || {};
        },
        enumerable: true,
        configurable: true
    });
    AppointmentEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-appointment-edit',
            template: __webpack_require__("./src/app/appointment-edit/appointment-edit.component.html"),
            styles: [__webpack_require__("./src/app/appointment-edit/appointment-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */],
            __WEBPACK_IMPORTED_MODULE_1__services_appointment_service__["a" /* AppointmentService */],
            __WEBPACK_IMPORTED_MODULE_3__services_therapist_service__["a" /* TherapistService */],
            __WEBPACK_IMPORTED_MODULE_4__services_client_service__["a" /* ClientService */]])
    ], AppointmentEditComponent);
    return AppointmentEditComponent;
}());



/***/ }),

/***/ "./src/app/appointment-list-table/appointment-list-table.component.html":
/***/ (function(module, exports) {

module.exports = "<table class=\"table table-striped\">\n    <thead>\n      <tr>\n        <th>\n          ID\n        </th>\n        <th>\n          Start Date\n        </th>\n        <th>\n            End Date\n          </th>\n          <th>\n              Status\n            </th>\n            <th>Client</th>\n            <th>Therapist</th>\n            <th>Edit</th>\n      </tr>\n    </thead>\n    <tbody *ngIf=\"Appointments.length == 0\">\n      <tr>\n        <td colspan=\"7\">\n          <div class=\"alert alert-warning\">No appointments exist</div>\n        </td>\n      </tr>\n    </tbody>\n    <tbody>\n      <tr *ngFor=\"let appt of Appointments\">\n        <td>{{appt.id}}</td>\n        <td>{{appt.startDate | date: 'medium'}}</td>\n        <td>{{appt.endDate | date: 'medium'}}</td>\n        <td>{{appt.status}}</td>\n        <td><h5><a class=\"badge badge-info\" [routerLink]=\"['/clients', 'edit', appt.clientID]\">{{appt.clientName}}</a></h5></td>\n        <td><h5><a class=\"badge badge-info\" [routerLink]=\"['/therapists', 'edit', appt.therapistID]\">{{appt.therapistName}}</a></h5></td>\n        <td>\n            <button class=\"btn btn-sm btn-primary\" [routerLink]=\"['/appointments', 'edit', appt.id]\">\n              <i class=\"fa fa-edit\" aria-hidden=\"true\" aria-label=\"View\"></i>\n            </button>\n          </td>\n      </tr>\n    </tbody>\n  </table>"

/***/ }),

/***/ "./src/app/appointment-list-table/appointment-list-table.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/appointment-list-table/appointment-list-table.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentListTableComponent; });
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

var AppointmentListTableComponent = /** @class */ (function () {
    function AppointmentListTableComponent() {
        this.appointments = [];
    }
    AppointmentListTableComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(AppointmentListTableComponent.prototype, "Appointments", {
        get: function () {
            if (this.appointments && this.appointments.length > 0) {
                return this.appointments;
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Array)
    ], AppointmentListTableComponent.prototype, "appointments", void 0);
    AppointmentListTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-appointment-list-table',
            template: __webpack_require__("./src/app/appointment-list-table/appointment-list-table.component.html"),
            styles: [__webpack_require__("./src/app/appointment-list-table/appointment-list-table.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AppointmentListTableComponent);
    return AppointmentListTableComponent;
}());



/***/ }),

/***/ "./src/app/appointment-list/appointment-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Appointments List</h2>\n<p *ngIf=\"!hasLoaded\" class=\"alert alert-info\">Loading data...</p>\n<a [routerLink]=\"['/appointments', 'new']\" class=\"btn btn-secondary\">Schedule Appointment</a>\n<dac-appointment-list-table [appointments]=\"appointments\" *ngIf=\"hasLoaded\"></dac-appointment-list-table>"

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_appointment_service__ = __webpack_require__("./src/app/services/appointment.service.ts");
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
    function AppointmentListComponent(apptService) {
        this.apptService = apptService;
        this.appointments = [];
    }
    AppointmentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hasLoaded = false;
        this.apptService.list().then(function (appointments) {
            console.log(appointments);
            _this.appointments = appointments;
            _this.hasLoaded = true;
        })
            .catch(function (error) {
            console.error(error);
            _this.hasLoaded = true;
        });
    };
    AppointmentListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-appointment-list',
            template: __webpack_require__("./src/app/appointment-list/appointment-list.component.html"),
            styles: [__webpack_require__("./src/app/appointment-list/appointment-list.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_appointment_service__["a" /* AppointmentService */]])
    ], AppointmentListComponent);
    return AppointmentListComponent;
}());



/***/ }),

/***/ "./src/app/appointment-new/appointment-new.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-10\"><h2>Schedule New Appointment</h2></div>\n    <div class=\"col-2\"><a [routerLink]=\"['/appointments']\">Back to list</a></div>\n  </div>\n  <p *ngIf=\"!hasLoaded\" class=\"alert alert-info\">Loading data...</p>\n  <div *ngIf=\"hasLoaded\">\n    <form class=\"card card-body mb-3 mt-3\">\n      <h3>Appointments Profile</h3>\n      <label>\n        Start Date:\n        <input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"YYYY-MM-DD HH:ii\" [(ngModel)]=\"editItem.startDate\" />\n      </label>\n      <label>\n          End Date:\n          <input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"YYYY-MM-DD HH:ii\" [(ngModel)]=\"editItem.endDate\" />\n        </label>\n        <label>\n            Status:\n            <select name=\"status\" [(ngModel)]=\"editItem.status\" class=\"browser-default custom-select w-100\">\n              <option [value]=\"status\" *ngFor=\"let status of statii\">{{status}}</option>\n            </select>   \n          </label>\n          <label>\n              Therapist:\n              <select name=\"therapist\" [(ngModel)]=\"editItem.therapistID\" class=\"browser-default custom-select w-100\">\n                <option [value]=\"therapist.id\" *ngFor=\"let therapist of therapists\">{{therapist.name}}</option>\n              </select>\n            </label>\n            <label>\n                Client:\n                <select name=\"client\" [(ngModel)]=\"editItem.clientID\" class=\"browser-default custom-select w-100\">\n                  <option [value]=\"client.id\" *ngFor=\"let client of clients\">{{client.name}}</option>\n                </select>\n              </label>\n      <a  [routerLink]=\"['/appointments']\" class=\"btn btn-primary\">Save</a>\n    </form>\n  </div>"

/***/ }),

/***/ "./src/app/appointment-new/appointment-new.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/appointment-new/appointment-new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_therapist_service__ = __webpack_require__("./src/app/services/therapist.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_client_service__ = __webpack_require__("./src/app/services/client.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppointmentNewComponent = /** @class */ (function () {
    function AppointmentNewComponent(therapistService, clientService) {
        this.therapistService = therapistService;
        this.clientService = clientService;
        this._appointment = {};
        this._therapists = [];
        this._clients = [];
        this.editItem = {};
    }
    AppointmentNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hasLoaded = false;
        var therapistsPromise = this.therapistService.list().then(function (therapists) {
            _this._therapists = therapists;
        });
        var clientsPromise = this.clientService.list().then(function (clients) {
            _this._clients = clients;
        });
        Promise.all([therapistsPromise, clientsPromise]).then(function (results) {
            _this.hasLoaded = true;
        })
            .catch(function (error) {
            _this.hasLoaded = true;
            console.error(error);
        });
    };
    Object.defineProperty(AppointmentNewComponent.prototype, "statii", {
        get: function () {
            return ['pending', 'canceled', 'noshow', 'completed'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentNewComponent.prototype, "therapists", {
        get: function () {
            return this._therapists;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentNewComponent.prototype, "clients", {
        get: function () {
            return this._clients;
        },
        enumerable: true,
        configurable: true
    });
    AppointmentNewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-appointment-new',
            template: __webpack_require__("./src/app/appointment-new/appointment-new.component.html"),
            styles: [__webpack_require__("./src/app/appointment-new/appointment-new.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_therapist_service__["a" /* TherapistService */],
            __WEBPACK_IMPORTED_MODULE_2__services_client_service__["a" /* ClientService */]])
    ], AppointmentNewComponent);
    return AppointmentNewComponent;
}());



/***/ }),

/***/ "./src/app/client-edit/client-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-10\"><h2>Editing Client {{editItem.id}}</h2></div>\n  <div class=\"col-2\"><a [routerLink]=\"['/clients']\">Back to list</a></div>\n</div>\n<p *ngIf=\"!hasLoaded\" class=\"alert alert-info\">Loading data...</p>\n<div *ngIf=\"hasLoaded\">\n  <form class=\"card card-body mb-3\">\n    <h3>Client Profile</h3>\n    <label>\n      Name:\n      <input type=\"text\" class=\"form-control\" name=\"name\" [(ngModel)]=\"editItem.name\" />\n    </label>\n    <a   class=\"btn btn-primary\" (click)=\"save()\">Save</a>\n  </form>\n  <div class=\"card card-body mb-3\">\n    <h3>Appointments</h3>\n    <dac-appointment-list-table [appointments]=\"editItem.appointments\"></dac-appointment-list-table>\n  </div>\n  <div class=\"card card-body mb-3\">\n    <h3>Activity Log</h3>\n    <dac-activitylog-table [logs]=\"editItem.logs\"></dac-activitylog-table>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/client-edit/client-edit.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/client-edit/client-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_client_service__ = __webpack_require__("./src/app/services/client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_alert_service__ = __webpack_require__("./src/app/services/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClientEditComponent = /** @class */ (function () {
    function ClientEditComponent(route, router, clientService, alertService) {
        this.route = route;
        this.router = router;
        this.clientService = clientService;
        this.alertService = alertService;
        this._client = {
            logs: [],
            appointments: []
        };
    }
    ClientEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hasLoaded = false;
        this.route.params.subscribe(function (params) {
            if (!params['id'] || isNaN(+params['id'])) {
                _this.router.navigate(['/page-not-found']);
                return;
            }
            var clientId = +params['id'];
            _this.clientService.get(clientId).then(function (client) {
                _this._client = client;
                _this.hasLoaded = true;
            })
                .catch(function (error) {
                console.error(error);
                _this.hasLoaded = true;
            });
        });
    };
    ClientEditComponent.prototype.save = function () {
        var _this = this;
        var alert = this.alertService.info("Saving...");
        this.clientService.save(this.editItem).then(function (result) {
            _this.alertService.clearAlert(alert);
            _this.alertService.success("Client saved");
            _this._client = result;
        })
            .catch(function (error) {
            console.log(error);
            _this.alertService.clearAlert(alert);
            _this.alertService.error("There was an error in saving the client");
        });
    };
    Object.defineProperty(ClientEditComponent.prototype, "editItem", {
        get: function () {
            return this._client || { logs: [], appointments: [] };
        },
        enumerable: true,
        configurable: true
    });
    ClientEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-client-edit',
            template: __webpack_require__("./src/app/client-edit/client-edit.component.html"),
            styles: [__webpack_require__("./src/app/client-edit/client-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */], __WEBPACK_IMPORTED_MODULE_2__services_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_3__services_alert_service__["a" /* AlertService */]])
    ], ClientEditComponent);
    return ClientEditComponent;
}());



/***/ }),

/***/ "./src/app/client-list/client-list.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/client-list/client-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Clients List</h2>\n<p *ngIf=\"!hasLoaded\" class=\"alert alert-info\">Loading client data...</p>\n<a [routerLink]=\"['/clients', 'new']\" class=\"btn btn-secondary\">Add Client</a>\n<table class=\"table table-striped\" *ngIf=\"hasLoaded\">\n  <thead>\n    <tr>\n      <th>\n        ID\n      </th>\n      <th>\n        Name\n      </th>\n      <th>Edit</th>\n    </tr>\n  </thead>\n  <tbody *ngIf=\"clients.length == 0\">\n    <tr>\n      <td colspan=\"3\">\n        <div class=\"alert alert-warning\">No clients exist in the system</div>\n      </td>\n    </tr>\n  </tbody>\n  <tbody>\n    <tr *ngFor=\"let client of clients\">\n      <td>{{client.id}}</td>\n      <td>{{client.name}}</td>\n      <td><button class=\"btn btn-sm btn-primary\" [routerLink]=\"['/clients', 'edit', client.id]\"><i class=\"fa fa-edit\" aria-hidden=\"true\" aria-label=\"View\" ></i></button></td>\n    </tr>\n  </tbody>\n</table>"

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

/***/ "./src/app/client-new/client-new.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-10\">\n    <h2>New Client</h2>\n  </div>\n  <div class=\"col-2\">\n    <a [routerLink]=\"['/clients']\">Back to list</a>\n  </div>\n</div>\n\n<form class=\"card card-body mb-3\">\n  <h3>Client Profile</h3>\n  <label>\n    Name:\n    <input type=\"text\" class=\"form-control\" name=\"name\" [(ngModel)]=\"editItem.name\" />\n  </label>\n  <a  class=\"btn btn-primary\" (click)=\"save()\">Save</a>\n</form>"

/***/ }),

/***/ "./src/app/client-new/client-new.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/client-new/client-new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alert_service__ = __webpack_require__("./src/app/services/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_client_service__ = __webpack_require__("./src/app/services/client.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClientNewComponent = /** @class */ (function () {
    function ClientNewComponent(clientService, alertService, router) {
        this.clientService = clientService;
        this.alertService = alertService;
        this.router = router;
        this.editItem = {};
    }
    ClientNewComponent.prototype.ngOnInit = function () {
    };
    ClientNewComponent.prototype.save = function () {
        var _this = this;
        var alert = this.alertService.info("Saving...");
        this.clientService.save(this.editItem).then(function (result) {
            _this.alertService.clearAlert(alert);
            _this.alertService.success("Client saved");
            _this.router.navigate(["/", "clients", "edit", result.id]);
        })
            .catch(function (error) {
            console.log(error);
            _this.alertService.clearAlert(alert);
            _this.alertService.error("There was an error in saving the client");
        });
    };
    ClientNewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-client-new',
            template: __webpack_require__("./src/app/client-new/client-new.component.html"),
            styles: [__webpack_require__("./src/app/client-new/client-new.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]])
    ], ClientNewComponent);
    return ClientNewComponent;
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

module.exports = "<div class=\"row justify-content-center\">\n    <div class=\"col-6 col-md-4\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h1 class=\"h1-responsive text-center\">Login</h1>\n            </div>\n            <div class=\"card-body\">\n                    <amplify-authenticator></amplify-authenticator>\n            </div>\n        </div>\n        \n    </div>\n</div>"

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
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
    function LoginComponent(amplifyService, authService, router) {
        this.amplifyService = amplifyService;
        this.authService = authService;
        this.router = router;
    }
    LoginComponent.prototype.ngOnDestroy = function () {
        this.authSubscription.unsubscribe();
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        // @see https://aws-amplify.github.io/docs/js/authentication
        var session = this.authService.currentAuthenticatedUser().then(function (user) {
            _this.router.navigate(['home']);
        })
            .catch(function (error) {
            // for some reason if you have logged in, then logged out again, the authStateChange subscriptions still send an initial signedIn event
            // TODO: stephen see if there is a way to fix this logic, for now we will just check the authenticated user and subscription 
            // if we are not authenticated
            _this.authSubscription = _this.authService.authStateChange()
                .subscribe(function (authState) {
                if (authState.state == 'signedIn') {
                    // TODO: stephen need to sync the state with the server here... creating the user or updating any information about them
                    // that we have.
                    _this.router.navigate(['/home']);
                }
            });
        });
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-login',
            template: __webpack_require__("./src/app/login/login.component.html"),
            styles: [__webpack_require__("./src/app/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_aws_amplify_angular__["b" /* AmplifyService */], __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/logout/logout.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Thank you for visiting!</h1>\n<p>You've been logged out.  If you'd like to login again click the button below</p>\n<a [routerLink]=\"['/login']\" class=\"btn btn-primary\">Login</a>"

/***/ }),

/***/ "./src/app/logout/logout.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/logout/logout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutComponent; });
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

var LogoutComponent = /** @class */ (function () {
    function LogoutComponent() {
    }
    LogoutComponent.prototype.ngOnInit = function () {
    };
    LogoutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-logout',
            template: __webpack_require__("./src/app/logout/logout.component.html"),
            styles: [__webpack_require__("./src/app/logout/logout.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LogoutComponent);
    return LogoutComponent;
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
    ActivitylogService.prototype.search = function (filter) {
        return this.httpService.get("activitylog.list", { entity: filter.entity, entityID: filter.entityID, action: filter.action }).then(function (resp) {
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

/***/ "./src/app/services/alert.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng_mdb_pro_pro_alerts__ = __webpack_require__("./node_modules/ng-mdb-pro/pro/alerts/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertService = /** @class */ (function () {
    function AlertService(toastService) {
        this.toastService = toastService;
    }
    AlertService.prototype.error = function (message, timeToDisplay) {
        var options = {
            positionClass: 'toast-bottom-right'
        };
        if (timeToDisplay) {
            options.timeOut = timeToDisplay;
        }
        var title = '';
        var toast = this.toastService.error(message, title, options);
        return toast.toastId;
    };
    AlertService.prototype.info = function (message, timeToDisplay) {
        var options = {
            positionClass: 'toast-bottom-right'
            // commenting these lines out for debugging purposes
            // ,extendedTimeOut: 60000
        };
        // timeToDisplay = 30000;
        if (timeToDisplay) {
            options.timeOut = timeToDisplay;
        }
        var title = '';
        var toast = this.toastService.info(message, title, options);
        return toast.toastId;
    };
    AlertService.prototype.clearAlert = function (alertId) {
        this.toastService.clear(alertId);
    };
    AlertService.prototype.success = function (message, timeToDisplay) {
        var options = {
            positionClass: 'toast-bottom-right'
            // commenting these lines out for debugging purposes
            // ,extendedTimeOut: 60000
        };
        // timeToDisplay = 30000;
        if (timeToDisplay) {
            options.timeOut = timeToDisplay;
        }
        var title = '';
        var toast = this.toastService.success(message, title, options);
        return toast.toastId;
    };
    AlertService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ng_mdb_pro_pro_alerts__["b" /* ToastService */]])
    ], AlertService);
    return AlertService;
}());



/***/ }),

/***/ "./src/app/services/appointment.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentService; });
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


var AppointmentService = /** @class */ (function () {
    function AppointmentService(httpService) {
        this.httpService = httpService;
    }
    AppointmentService.prototype.list = function () {
        return this.httpService.get("appointments.list").then(function (resp) {
            var data = resp.json();
            return data;
        });
    };
    AppointmentService.prototype.get = function (appointmentId) {
        return this.httpService.get("appointments.get", { id: appointmentId }).then(function (resp) {
            var data = resp.json();
            return data;
        });
    };
    AppointmentService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__http_service__["a" /* HttpService */]])
    ], AppointmentService);
    return AppointmentService;
}());



/***/ }),

/***/ "./src/app/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_aws_amplify_angular__ = __webpack_require__("./node_modules/aws-amplify-angular/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__aws_exports__ = __webpack_require__("./src/aws-exports.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__("./node_modules/rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__http_service__ = __webpack_require__("./src/app/services/http.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = /** @class */ (function () {
    function AuthService(amplifyService, http) {
        var _this = this;
        this.amplifyService = amplifyService;
        this.http = http;
        this.changeSubject = new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Subject"]();
        // TODO: stephen look at pulling all of the amplify stuff into this file.
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
        this.amplifyService.authStateChange$.subscribe(function (authState) {
            if (authState.state == 'signedIn') {
                var syncUserData = authState.user.signInUserSession.idToken;
                if (!_this._inAuthentication) {
                    _this._inAuthentication = true;
                    _this.http.post('users.login', syncUserData)
                        .then(function (result) {
                        _this._inAuthentication = false;
                        _this.changeSubject.next({ state: authState.state, user: authState.user });
                    })
                        .catch(function (error) {
                        console.error(error);
                        _this.changeSubject.next({ state: 'error', user: null });
                    });
                }
            }
        });
    }
    AuthService.prototype.signOut = function () {
        var systemSignout = this.http.post('users.logout');
        // @see https://aws-amplify.github.io/docs/js/authentication
        var amplifySignout = this.amplifyService.auth().signOut({ global: true });
        return Promise.all([systemSignout, amplifySignout]);
    };
    AuthService.prototype.authStateChange = function () {
        return this.changeSubject;
    };
    AuthService.prototype.currentAuthenticatedUser = function () {
        return this.amplifyService.auth().currentAuthenticatedUser();
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_aws_amplify_angular__["b" /* AmplifyService */], __WEBPACK_IMPORTED_MODULE_4__http_service__["a" /* HttpService */]])
    ], AuthService);
    return AuthService;
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
    ClientService.prototype.get = function (clientId) {
        return this.httpService.get("clients.get", { id: clientId }).then(function (resp) {
            var data = resp.json();
            return data;
        });
    };
    ClientService.prototype.save = function (client) {
        return this.httpService.post("clients.save", { id: client.id, name: client.name })
            .then(function (resp) {
            // return the most up to date client here.
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
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ params: payload, withCredentials: true });
        return this._$http.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl, options).toPromise();
    };
    HttpService.prototype.post = function (action, data) {
        if (!data) {
            data = {};
        }
        var payload = {
            action: action,
            data: data
        };
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ withCredentials: true });
        return this._$http.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl, payload, options).toPromise();
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
    TherapistService.prototype.get = function (therapistId) {
        return this.httpService.get("therapists.get", { id: therapistId }).then(function (resp) {
            var data = resp.json();
            return data;
        });
    };
    TherapistService.prototype.save = function (therapist) {
        return this.httpService.post("therapists.save", { id: therapist.id, name: therapist.name })
            .then(function (resp) {
            // return the most up to date client here.
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

/***/ "./src/app/therapist-edit/therapist-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-10\"><h2>Editing Therapist {{editItem.id}}</h2></div>\n    <div class=\"col-2\"><a [routerLink]=\"['/therapists']\">Back to list</a></div>\n  </div>\n  <p *ngIf=\"!hasLoaded\" class=\"alert alert-info\">Loading data...</p>\n  <div *ngIf=\"hasLoaded\">\n    <form class=\"card card-body mb-3\">\n      <h3>Therapist Profile</h3>\n      <label>\n        Name:\n        <input type=\"text\" class=\"form-control\" name=\"name\" [(ngModel)]=\"editItem.name\" />\n      </label>\n      <a  (click)=\"save()\" class=\"btn btn-primary\">Save</a>\n    </form>\n    <div class=\"card card-body mb-3\">\n      <h3>Appointments</h3>\n      <dac-appointment-list-table [appointments]=\"editItem.appointments\"></dac-appointment-list-table>\n    </div>\n    <div class=\"card card-body mb-3\">\n      <h3>Activity Log</h3>\n      <dac-activitylog-table [logs]=\"editItem.logs\"></dac-activitylog-table>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/therapist-edit/therapist-edit.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/therapist-edit/therapist-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TherapistEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_therapist_service__ = __webpack_require__("./src/app/services/therapist.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_alert_service__ = __webpack_require__("./src/app/services/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TherapistEditComponent = /** @class */ (function () {
    function TherapistEditComponent(route, router, therapistService, alertService) {
        this.route = route;
        this.router = router;
        this.therapistService = therapistService;
        this.alertService = alertService;
        this._therapist = {
            logs: [],
            appointments: []
        };
    }
    TherapistEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hasLoaded = false;
        this.route.params.subscribe(function (params) {
            if (!params['id'] || isNaN(+params['id'])) {
                _this.router.navigate(['/page-not-found']);
                return;
            }
            var id = +params['id'];
            _this.therapistService.get(id).then(function (therapist) {
                _this._therapist = therapist;
                _this.hasLoaded = true;
            })
                .catch(function (error) {
                console.error(error);
                _this.hasLoaded = true;
            });
        });
    };
    Object.defineProperty(TherapistEditComponent.prototype, "editItem", {
        get: function () {
            return this._therapist || { logs: [], appointments: [] };
        },
        enumerable: true,
        configurable: true
    });
    TherapistEditComponent.prototype.save = function () {
        var _this = this;
        var alert = this.alertService.info("Saving...");
        this.therapistService.save(this.editItem).then(function (result) {
            _this.alertService.clearAlert(alert);
            _this.alertService.success("Therapist saved");
            _this._therapist = result;
        })
            .catch(function (error) {
            console.log(error);
            _this.alertService.clearAlert(alert);
            _this.alertService.error("There was an error in saving the therapist");
        });
    };
    TherapistEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-therapist-edit',
            template: __webpack_require__("./src/app/therapist-edit/therapist-edit.component.html"),
            styles: [__webpack_require__("./src/app/therapist-edit/therapist-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */], __WEBPACK_IMPORTED_MODULE_2__services_therapist_service__["a" /* TherapistService */],
            __WEBPACK_IMPORTED_MODULE_3__services_alert_service__["a" /* AlertService */]])
    ], TherapistEditComponent);
    return TherapistEditComponent;
}());



/***/ }),

/***/ "./src/app/therapist-list/therapist-list.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/therapist-list/therapist-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Therapists List</h2>\n<a [routerLink]=\"['/therapists', 'new']\" class=\"btn btn-secondary\">Add Therapist</a>\n<p *ngIf=\"!hasLoaded\" class=\"alert alert-info\">Loading data...</p>\n<table class=\"table table-striped\" *ngIf=\"hasLoaded\">\n  <thead>\n    <tr>\n      <th>\n        ID\n      </th>\n      <th>\n        Name\n      </th>\n      <th>Edit</th>\n    </tr>\n  </thead>\n  <tbody *ngIf=\"therapists.length == 0\">\n    <tr>\n      <td colspan=\"3\">\n        <div class=\"alert alert-warning\">No therapists exist in the system</div>\n      </td>\n    </tr>\n  </tbody>\n  <tbody>\n    <tr *ngFor=\"let therapist of therapists\">\n      <td>{{therapist.id}}</td>\n      <td>{{therapist.name}}</td>\n      <td>\n        <button class=\"btn btn-sm btn-primary\" [routerLink]=\"['/therapists', 'edit', therapist.id]\">\n          <i class=\"fa fa-edit\" aria-hidden=\"true\" aria-label=\"View\"></i>\n        </button>\n      </td>\n    </tr>\n  </tbody>\n</table>"

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

/***/ "./src/app/therapist-new/therapist-new.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-10\">\n      <h2>New Therapist</h2>\n    </div>\n    <div class=\"col-2\">\n      <a [routerLink]=\"['/therapists']\">Back to list</a>\n    </div>\n  </div>\n  \n  <form class=\"card card-body mb-3\">\n    <h3>Therapist Profile</h3>\n    <label>\n      Name:\n      <input type=\"text\" class=\"form-control\" name=\"name\" [(ngModel)]=\"editItem.name\" />\n    </label>\n    <a  (click)=\"save()\" class=\"btn btn-primary\">Save</a>\n  </form>"

/***/ }),

/***/ "./src/app/therapist-new/therapist-new.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/therapist-new/therapist-new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TherapistNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alert_service__ = __webpack_require__("./src/app/services/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_therapist_service__ = __webpack_require__("./src/app/services/therapist.service.ts");
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




var TherapistNewComponent = /** @class */ (function () {
    function TherapistNewComponent(alertService, therapistService, router) {
        this.alertService = alertService;
        this.therapistService = therapistService;
        this.router = router;
        this.editItem = {};
    }
    TherapistNewComponent.prototype.ngOnInit = function () {
    };
    TherapistNewComponent.prototype.save = function () {
        var _this = this;
        var alert = this.alertService.info("Saving...");
        this.therapistService.save(this.editItem).then(function (result) {
            _this.alertService.clearAlert(alert);
            _this.alertService.success("Therapist saved");
            _this.router.navigate(["/", "therapists", "edit", result.id]);
        })
            .catch(function (error) {
            console.log(error);
            _this.alertService.clearAlert(alert);
            _this.alertService.error("There was an error in saving the therapist");
        });
    };
    TherapistNewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'dac-therapist-new',
            template: __webpack_require__("./src/app/therapist-new/therapist-new.component.html"),
            styles: [__webpack_require__("./src/app/therapist-new/therapist-new.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_alert_service__["a" /* AlertService */], __WEBPACK_IMPORTED_MODULE_2__services_therapist_service__["a" /* TherapistService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["e" /* Router */]])
    ], TherapistNewComponent);
    return TherapistNewComponent;
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