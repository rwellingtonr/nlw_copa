import { api } from "./api";

interface IGetAllCounter {
	(): Promise<CounterResponse>;
}

type CounterResponse = {
	poolCount: number;
	guessCount: number;
	userCount: number;
};

type CounterApi = {
	count: number;
};

export const getAllCounter: IGetAllCounter = async () => {
	const [poolsResponse, guessesResponse, userResponse] = await Promise.all([
		api.get<CounterApi>("pools/count"),
		api.get<CounterApi>("guess/count"),
		api.get<CounterApi>("user/count"),
	]);

	const { count: poolCount } = poolsResponse.data;
	const { count: guessCount } = guessesResponse.data;
	const { count: userCount } = userResponse.data;

	return { poolCount, userCount, guessCount };
};
