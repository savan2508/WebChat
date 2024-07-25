import React, {createContext, useContext} from "react";
import {useMembership} from "../services/membershipService.ts";

export interface IuseMembership {
	joinServer: (serverId: number) => Promise<void>;
	leaveServer: (serverId: number) => Promise<void>;
	isMember: (serverId: number) => Promise<void>;
	isUserMember: boolean;
	error: Error | null;
	isLoading: boolean;
}

const MembershipContext = createContext<IuseMembership | null>(null);

export function MembershipProvider({children}: { children: React.ReactNode }) {
	const membershipService = useMembership();
	return (
		<MembershipContext.Provider value={membershipService}>
			{children}
		</MembershipContext.Provider>
	);
}

export function useMembershipContext(): IuseMembership {
	const context = useContext(MembershipContext);
	if (!context) {
		throw new Error("useMembership must be used within an MembershipProvider");
	}
	return context;
}