import {useParams} from "react-router-dom";
import {useMembershipContext} from "../../context/MemberContext.tsx";

export const JoinServerButton = () => {
	const {serverId} = useParams();
	const {joinServer, isUserMember, isLoading, leaveServer} = useMembershipContext();

	const handleJoinServer = async () => {
		try {
			await joinServer(Number(serverId));
			console.log("joined server")
		} catch (err) {
			console.log(err);
		}
	}

	const handleLeaveServer = async () => {
		try {
			await leaveServer(Number(serverId));
			console.log("left server")
		} catch (err) {
			console.log(err);
		}
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<>
			{isUserMember ? (
				<button onClick={handleLeaveServer}>Leave Server</button>
			) : (
				<button onClick={handleJoinServer}>Join Server</button>
			)
			}
		</>
	);
};