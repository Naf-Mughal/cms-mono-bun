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

export const updatePassword = async (email: string, currentPassword: string, newPassword: string) => {
    try {
        if (!email || !currentPassword || !newPassword) {
            return {
                data: makeApiResponse("Missing required fields", StatusCodes.BAD_REQUEST, {}),
                status: StatusCodes.BAD_REQUEST
            };
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return {
                data: makeApiResponse("User not found", StatusCodes.NOT_FOUND, {}),
                status: StatusCodes.NOT_FOUND
            };
        }

        const isPasswordValid = await user.matchPassword(currentPassword);
        if (!isPasswordValid) {
            return {
                data: makeApiResponse("Current password is incorrect", StatusCodes.UNAUTHORIZED, {}),
                status: StatusCodes.UNAUTHORIZED
            };
        }

        if (currentPassword === newPassword) {
            return {
                data: makeApiResponse("New password must be different from current password", StatusCodes.BAD_REQUEST, {}),
                status: StatusCodes.BAD_REQUEST
            };
        }

        user.password = newPassword;
        await user.save();

        return {
            data: {
                success: true,
                message: "Password updated successfully",
                data: { userId: user._id }
            },
            status: StatusCodes.OK
        };
    } catch (error: any) {
        console.error("Password update error:", error);

        if (error.name === 'ValidationError') {
            return {
                data: makeApiResponse("Validation error: " + error.message, StatusCodes.BAD_REQUEST, error),
                status: StatusCodes.BAD_REQUEST
            };
        }

        return {
            data: {
                success: false,
                message: "An error occurred while updating the password",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            status: StatusCodes.INTERNAL_SERVER_ERROR
        };
    }
};

export const update = async ({ name, email, phone }: UserData) => {
    try {
        const user = await Users.findOne({ email: email });
        if (!user) return { data: makeApiResponse("User not found", StatusCodes.NOT_FOUND, {}), status: StatusCodes.NOT_FOUND };
        const updatedUser = await Users.findOneAndUpdate({ email: email }, { name, email, phone }, { new: true });
        if (!updatedUser) return { data: makeApiResponse("User not Updated", StatusCodes.BAD_REQUEST, {}), status: StatusCodes.BAD_REQUEST };
        const token = await getJWTToken({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            lang: updatedUser.lang
        });

        return {
            data: makeApiResponse("Update successful", StatusCodes.OK, {
                ...updatedUser,
                token
            }),
            status: StatusCodes.OK
        };
    }
    catch (error: any) {
        console.log(error);
        return {
            data: makeApiResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error),
            status: StatusCodes.INTERNAL_SERVER_ERROR
        };
    }
}

