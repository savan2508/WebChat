import {IuseMembership} from "../context/MemberContext.tsx";
import useAxiosWithInterceptors from "../helper/jwtinterceptor.ts";
import {useState} from "react";
import {BASE_URL} from "../config.ts";

export const useMembership = (): IuseMembership => {
	const jwtAxios = useAxiosWithInterceptors();
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isUserMember, setIsUserMember] = useState(false);

	const joinServer = async (serverId: number): Promise<void> => {
		setIsLoading(true);
		try {
			const response = await jwtAxios.post(
				`${BASE_URL}/membership/${serverId}/membership/`, {withCredentials: true}
			)
			setIsLoading(false);
			if (response.status === 200) {
				setIsUserMember(true);
			}
		} catch (err: any) {
			setError(err);
			setIsLoading(false);
			throw err;
		}
	}

	const leaveServer = async (serverId: number): Promise<void> => {
		setIsLoading(true);
		try {
			await jwtAxios.delete(
				`${BASE_URL}/membership/${serverId}/membership/remove_member`, {withCredentials: true}
			)
			setIsLoading(false);
			setIsUserMember(false);

		} catch (err: any) {
			setError(err);
			setIsLoading(false);
			throw err;
		}
	}

	const isMember = async (serverId: number): Promise<void> => {
		setIsLoading(true);
		try {
			const response = await jwtAxios.get(
				`${BASE_URL}/membership/${serverId}/membership/is_member`, {withCredentials: true}
			)
			setIsLoading(false);
			setIsUserMember(response.data.is_member);
		} catch (err: any) {
			setError(err);
			setIsLoading(false);
			throw err;
		}
	}

	return {joinServer, leaveServer, error, isLoading, isMember, isUserMember}
}