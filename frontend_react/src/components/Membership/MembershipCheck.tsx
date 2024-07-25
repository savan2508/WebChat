import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useMembershipContext} from "../../context/MemberContext.tsx";

interface MembershipCheckProps {
	children: any;
}

export const MembershipCheck: React.FC<MembershipCheckProps> = ({children}) => {
	const serverId = useParams();
	const {isMember, isLoading, error} = useMembershipContext();

	useEffect(() => {
		const checkMembership = async () => {
			try {
				await isMember(Number(serverId));
			} catch (err) {
				console.log("Error checking membership", err);
			}
		}
		checkMembership();
	}, [serverId]);

	return (
		<>
			{children}
		</>
	);
};