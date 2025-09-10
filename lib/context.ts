import type { SpaceModel } from "@generated/zenstack/models";
import { useRouter } from "next/router";
import type { User } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext } from "react";
import { useFindManySpace } from "./hooks";

export const UserContext = createContext<User | undefined>(undefined);

export function useCurrentUser() {
	const { data: session } = useSession();
	return session?.user;
}

export const SpaceContext = createContext<SpaceModel | undefined>(undefined);

export function useCurrentSpace() {
	const router = useRouter();
	const { data: spaces } = useFindManySpace(
		{
			where: {
				slug: router.query.slug as string,
			},
		},
		{
			disabled: !router.query.slug,
		},
	);

	return spaces?.[0];
}
