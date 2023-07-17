import { zodResolver } from "@mantine/form";
import { z } from "zod";

const zodSchema = {
	createUser: z
		.object({
			name: z.string().min(2, { message: "Error" }),
			familyName: z.string().min(2, { message: "Error" }),
			email: z.string().email(),
			password: z.string().min(2),
			confirmPassword: z.string(),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "the-password-does-not-match",
			path: ["confirmPassword"],
		}),
	logIn: z.object({
		email: z.string().email(),
		password: z.string().min(2, { message: "Wrong Password" }),
	}),
};

export { zodResolver };

export default zodSchema;
