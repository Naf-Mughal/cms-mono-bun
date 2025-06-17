import Users from "@/db/user.model";
import { getJWTToken } from "@/utils/jwt";
import { makeApiResponse } from "@/utils/response";
import { LangEnum, type LoginData, type UserData } from "@schemas/index";
import { StatusCodes } from "http-status-codes";

export const login = async ({ email, password }: LoginData) => {
    try {
        const user = await Users.findOne({ email: email });
        if (!user) return { data: makeApiResponse("User not found", StatusCodes.NOT_FOUND, {}), status: StatusCodes.NOT_FOUND };
        if (!(await user.matchPassword(password))) return { data: makeApiResponse("Invalid password", StatusCodes.UNAUTHORIZED, {}), status: StatusCodes.UNAUTHORIZED };
        const resUser = { id: user._id, name: user.name, email: user.email, lang: user.lang };
        const token = await getJWTToken(resUser)
        return { data: makeApiResponse("Login successful", StatusCodes.OK, { ...resUser, token }), status: StatusCodes.OK };
    }
    catch (error: any) {
        console.log(error);
        return { data: makeApiResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error), status: StatusCodes.INTERNAL_SERVER_ERROR };
    }
}

export const register = async ({ name, email, password, phone, userType, organizationName }: UserData) => {
    try {
        const user = new Users({
            name: name,
            email: email,
            password: password,
            phone: phone,
            userType: userType,
            organizationName: organizationName,
            lang: LangEnum.En
        });
        await user.save();
        return { data: makeApiResponse("Registration successful", StatusCodes.OK, user), status: StatusCodes.OK };
    }
    catch (error: any) {
        console.log(error);
        return { data: makeApiResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error), status: StatusCodes.INTERNAL_SERVER_ERROR };
    }
};
