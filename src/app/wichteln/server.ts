"use server";

import type { Room, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import {
  type JoinSchema,
  joinSchema,
  createSchema,
  type CreateSchema,
  type UserIdSchema,
  userIdSchema,
  type RoomIdSchema,
  roomIdSchema,
} from "./schemas";

export const createRoom = async (data: CreateSchema) => {
  createSchema.parse(data);
  const room = await db.room.create({ data: {} });
  const user = await db.user.create({
    data: {
      name: data.name,
      admin: true,
      room: { connect: { id: room.id } },
    },
  });
  redirect(`/wichteln/${room.id}?secret=${user.secret}`);
};

export const joinRoom = async (data: JoinSchema) => {
  joinSchema.parse(data);
  const room = await db.room.findUniqueOrThrow({
    where: { id: data.roomId },
  });
  if (room.started)
    throw new Error("You cannot join a game which was already started");
  const createdUser = await db.user.create({
    data: { name: data.name, room: { connect: { id: data.roomId } } },
  });
  revalidatePath("/wichteln/[id]/admin", "page");
  redirect(
    `/wichteln/${createdUser.roomId}?secret=${createdUser.secret}&showJoinModal=true`,
  );
};

export const kickFromRoom = async (data: UserIdSchema) => {
  userIdSchema.parse(data);
  const user = await db.user.findUniqueOrThrow({
    where: { id: data.userId },
    include: { room: true },
  });
  if (user.room.started)
    throw new Error("You cannot kick users from a game which has started");
  await db.user.delete({ where: { id: user.id } });
  revalidatePath("/wichteln/[id]/admin", "page");
};

export type GetRoomResult = {
  admin: false;
  id: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
};
export type GetAdminRoomResult = {
  admin: true;
  id: string;
  users: User[];
  adminKey: string;
  createdAt: Date;
  updatedAt: Date;
};

const filterUser = (user: User) => {
  const { secret, ...filtered } = user;
  return filtered;
};

const filterUserWithPartner = (user: UserWithPartner) => {
  const partner = user.partner === null ? null : filterUser(user.partner);
  return { ...user, partner };
};

export const getRoom = async (id: string) => {
  const res = await db.room.findUniqueOrThrow({
    where: { id },
    include: { users: true },
  });
  const filtered = {
    ...res,
    users: res.users.map((user) => filterUser(user)),
  };
  return filtered;
};

export const getRoomAdmin = async (roomId: string, adminSecret: string) => {
  const user = await db.user.findFirst({
    where: { AND: [{ room: { id: roomId } }, { admin: true }] },
  });
  if (user?.secret !== adminSecret)
    throw new Error("You are not the admin of this room");
  const room = await db.room.findUniqueOrThrow({
    where: { id: roomId },
    include: { users: true },
  });
  return room;
};

export const getUser = async (secret: string | undefined) => {
  if (secret === undefined) return undefined;
  const user = await db.user.findUniqueOrThrow({
    where: { secret },
    include: { partner: true },
  });
  return filterUserWithPartner(user);
};

export const getSecret = async (currentUserId: string, userId: string) => {
  const currentUser = await db.user.findUniqueOrThrow({
    where: { id: currentUserId },
  });
  if (!currentUser.admin)
    throw new Error("Only admin can get the secret of another user");
  const user = await db.user.findUniqueOrThrow({ where: { id: userId } });
  return user;
};

const pick = async (users: User[], userPool: User[]) => {
  if (users.length === 0) return;
  // fix edge case:
  // when there are only 2 users left in the user array and a bad random selection happens
  // an inresolvable situation in the last run of this function occurs.
  // in the final run the last user is the same as the last user in the userPool
  // which leads to the user getting filtered from the userPool and no user can be selected because the pool is empty
  // This has to be resolved in the second last run of this function otherwise the problem cannot be resolved in the last run
  if (users.length === 2) {
    const user0inPool = userPool.find((user) => user.id === users[0]!.id);
    const user1inPool = userPool.find((user) => user.id === users[1]!.id);
    if (user0inPool !== undefined) {
      // get other user from pool
      const other = userPool.find((user) => user.id !== user0inPool.id)!;
      await db.user.update({
        where: { id: user0inPool.id },
        data: { partner: { connect: { id: other.id } } },
      });
      await pick(
        users.filter((user) => user.id !== user0inPool.id),
        userPool.filter((user) => user.id !== other.id),
      );
      return;
    }
    if (user1inPool !== undefined) {
      // get other user from pool
      const other = userPool.find((user) => user.id !== user1inPool.id)!;

      await db.user.update({
        where: { id: user1inPool.id },
        data: { partner: { connect: { id: other.id } } },
      });
      await pick(
        users.filter((user) => user.id !== user1inPool.id),
        userPool.filter((user) => user.id !== other.id),
      );
      return;
    }
  }
  // pick a user from array
  const random = Math.floor(Math.random() * users.length);
  const selected = users[random]!;
  // remove current user from pool so the user cannot get himself as a partner
  const filteredUserPool = userPool.filter((user) => user.id !== selected.id);
  const partner =
    filteredUserPool[Math.floor(Math.random() * filteredUserPool.length)]!;
  await db.user.update({
    where: { id: selected.id },
    data: { partnerId: partner.id },
  });
  // call same function with selected user removed from users and partner removed from userPool
  await pick(
    users.filter((user) => user.id !== selected.id),
    userPool.filter((user) => user.id !== partner.id),
  );
};

export const startGame = async (data: RoomIdSchema) => {
  roomIdSchema.parse(data);
  const room = await db.room.findUniqueOrThrow({
    where: { id: data.roomId },
    include: { users: true },
  });
  if (room.users.length <= 1)
    throw new Error("Cannot start game with 1 or less players");
  if (room.started) throw new Error("Game is already started");
  await pick(room.users, room.users);
  await db.room.update({ where: { id: room.id }, data: { started: true } });
  revalidatePath("/wichteln/[id]", "page");
  revalidatePath("/wichteln/[id]/admin", "page");
};

export type FilteredUser = Omit<User, "secret">;

export interface RoomWithUsers extends Room {
  users: FilteredUser[];
}
export interface UserWithPartner extends User {
  partner: User | null;
}

export interface FilteredUserWithPartner extends User {
  partner: FilteredUser | null;
}
