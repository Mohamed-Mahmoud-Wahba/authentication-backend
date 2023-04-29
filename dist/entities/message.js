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
exports.Message = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
let Message = class Message extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", Date)
], Message.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", Date)
], Message.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (User) => User.msg, {
        cascade: true,
    }),
    __metadata("design:type", user_1.User)
], Message.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (User) => User.msg, {
        cascade: true,
    }),
    __metadata("design:type", user_1.User)
], Message.prototype, "recever", void 0);
Message = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Message);
exports.Message = Message;
//# sourceMappingURL=Message.js.map