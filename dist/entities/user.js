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
exports.dataUpdate = exports.Login = exports.User = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const message_1 = require("../resolvers/message");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", Date)
], User.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", Date)
], User.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
let Login = class Login {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Login.prototype, "access_Token", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User),
    __metadata("design:type", User)
], Login.prototype, "user", void 0);
Login = __decorate([
    (0, type_graphql_1.ObjectType)()
], Login);
exports.Login = Login;
let dataUpdate = class dataUpdate {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], dataUpdate.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], dataUpdate.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], dataUpdate.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_1.Message, (Message) => Message.author),
    __metadata("design:type", Array)
], dataUpdate.prototype, "msg", void 0);
dataUpdate = __decorate([
    (0, type_graphql_1.InputType)()
], dataUpdate);
exports.dataUpdate = dataUpdate;
//# sourceMappingURL=user.js.map