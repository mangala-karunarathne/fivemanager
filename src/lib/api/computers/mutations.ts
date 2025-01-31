import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NewComputer, insertComputerSchema, computers, computerIdSchema, ComputerId } from "@/lib/db/schema/computers";

export const createComputer = async (computer: NewComputer) => {
	const newComputer = insertComputerSchema.parse(computer);
	try {
		await db.insert(computers).values(newComputer);
		return { success: true };
	} catch (err) {
		const message = (err as Error).message ?? "Error, please try again";
		console.error(message);
		return { error: message };
	}
};

export const updateComputer = async (id: ComputerId, computer: NewComputer) => {
	const { id: computerId } = computerIdSchema.parse({ id });
	const newComputer = insertComputerSchema.parse(computer);
	try {
		await db.update(computers).set(newComputer).where(eq(computers.id, computerId!));
		return { success: true };
	} catch (err) {
		const message = (err as Error).message ?? "Error, please try again";
		console.error(message);
		return { error: message };
	}
};

export const deleteComputer = async (id: ComputerId) => {
	const { id: computerId } = computerIdSchema.parse({ id });
	try {
		await db.delete(computers).where(eq(computers.id, computerId!));
		return { success: true };
	} catch (err) {
		const message = (err as Error).message ?? "Error, please try again";
		console.error(message);
		return { error: message };
	}
};
