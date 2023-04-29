"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = require("../entities/user");
const user_2 = require("../entities/user");
const user_3 = require("../entities/user");
let Auth = class Auth {
    Register() {
        return "Hello World!";
    }
    SingUp(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ckeckUser = yield user_1.User.findOne({
                    where: [
                        {
                            email: email,
                        },
                        {
                            username: username,
                        },
                    ],
                });
                console.log("first", ckeckUser);
                if (ckeckUser) {
                    const error = new Error("this user is already registered ");
                    throw error;
                }
                const hashedPw = yield bcryptjs_1.default.hash(password, 12);
                return user_1.User.create({ email, password: hashedPw, username }).save();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    SingIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ckeckUser = yield user_1.User.findOne({
                    where: [
                        {
                            email: email,
                        },
                    ],
                });
                if (!ckeckUser) {
                    const error = new Error("this user is not found");
                    throw error;
                }
                const compare = yield bcryptjs_1.default.compare(password, ckeckUser.password);
                if (compare) {
                    const access_Token = jwt.sign({ id: ckeckUser.id }, "mohamed");
                    return { user: ckeckUser, access_Token: access_Token };
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUser = yield user_1.User.findOne({
                where: {
                    id: id,
                },
            });
            if (!updateUser) {
                return null;
            }
            try {
                updateUser.email = data === null || data === void 0 ? void 0 : data.email;
                updateUser.password = yield bcryptjs_1.default.hash(data === null || data === void 0 ? void 0 : data.password, 12);
                updateUser.username = data === null || data === void 0 ? void 0 : data.username;
                user_1.User.save(updateUser);
                return updateUser;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], Auth.prototype, "Register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("username", () => String)),
    __param(1, (0, type_graphql_1.Arg)("email", () => String)),
    __param(2, (0, type_graphql_1.Arg)("password", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], Auth.prototype, "SingUp", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_2.Login),
    __param(0, (0, type_graphql_1.Arg)("email", () => String)),
    __param(1, (0, type_graphql_1.Arg)("password", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], Auth.prototype, "SingIn", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("data", () => user_3.dataUpdate)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_3.dataUpdate]),
    __metadata("design:returntype", Promise)
], Auth.prototype, "updateUser", null);
Auth = __decorate([
    (0, type_graphql_1.Resolver)()
], Auth);
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map