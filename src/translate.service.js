"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var flat = require("flat");
var Rx_1 = require("rxjs/Rx");
var TranslateService = (function () {
    function TranslateService(config) {
        this.config = {};
        this.default = 'en';
        this.current = this.default;
        for (var key in config) {
            Object.defineProperty(this.config, key, { value: flat(config[key]) });
        }
    }
    TranslateService.prototype.setDefault = function (lang) {
        this.default = lang;
        this.use(this.default);
    };
    TranslateService.prototype.use = function (lang) {
        if (lang && this.config[lang]) {
            this.current = lang;
            return true;
        }
        else if (lang && !this.config[lang]) {
            return false;
        }
        else {
            return this.current;
        }
    };
    TranslateService.prototype.instance = function (key, param) {
        if (param) {
            return this.searchByKeyWithParams(key, param);
        }
        else {
            return this.searchByKey(key);
        }
    };
    TranslateService.prototype.instanceFromObservable = function (key, param) {
        var _this = this;
        var observer = Rx_1.Observable.create(function (_observer) {
            setTimeout(function () {
                _observer.next(_this.instance(key, param));
            }, 10000);
        });
        return observer;
    };
    TranslateService.prototype.searchByKey = function (key) {
        if (this.config[this.current] &&
            this.config[this.current][key]) {
            return this.config[this.current][key];
        }
        else {
            return key;
        }
    };
    TranslateService.prototype.searchByKeyWithParams = function (key, param) {
        var content = this.searchByKey(key);
        var parameter = param;
        var expressionRegex = new RegExp(/{{[^{}]*}}/, 'gi');
        var matchResult = content.match(expressionRegex);
        var paramFactory = function (expression) {
            var varName = expression.replace(/{{\s*([\w$]+)\s*}}/g, '$1');
            if (parameter[varName]) {
                return parameter[varName];
            }
            else {
                return expression;
            }
        };
        if (matchResult) {
            return content.replace(expressionRegex, function (matchItem) {
                return paramFactory(matchItem);
            });
        }
        else {
            return content;
        }
    };
    return TranslateService;
}());
TranslateService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Object])
], TranslateService);
exports.TranslateService = TranslateService;
//# sourceMappingURL=translate.service.js.map