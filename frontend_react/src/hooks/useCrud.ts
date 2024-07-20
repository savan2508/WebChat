import useAxiosWithInterceptors from "../helper/jwtinterceptor.ts";
import {BASE_URL} from "../config.ts";
import {useState} from "react";

interface IuseCrud<T> {
	dataCrud: T[];
	fetchData: () => Promise<T[]>;
	error: Error | null;
	isLoading: boolean;
}

const useCrud = <T>(initialData: T[], apiUrl: string): IuseCrud<T> => {
	const jwtAxios = useAxiosWithInterceptors();
	const [dataCrud, setDataCrud] = useState<T[]>(initialData);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await jwtAxios.get(`${BASE_URL}${apiUrl}`);
			const data = response;
			if (data.status === 200) {
				setDataCrud(data.data);
				setError(null);
				setIsLoading(false);
			}
			return data;
		} catch (err: any) {
			if (err.response && err.response.status === 400) {
				setError(new Error("400"));
				setDataCrud([]);
			}
			setIsLoading(false);
			throw err;
		}
	};
	return {dataCrud, fetchData, error, isLoading};
};
export default useCrud;
