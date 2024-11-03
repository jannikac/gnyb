import { z } from "zod";

export const createSchema = z.object({ name: z.string().min(1) });
export type CreateSchema = z.infer<typeof createSchema>;

export const joinSchema = z.object({
  name: z.string().min(1),
  roomId: z.string(),
});
export type JoinSchema = z.infer<typeof joinSchema>;

export const userIdSchema = z.object({ userId: z.string() });
export type UserIdSchema = z.infer<typeof userIdSchema>;

export const roomIdSchema = z.object({ roomId: z.string() });
export type RoomIdSchema = z.infer<typeof roomIdSchema>;
