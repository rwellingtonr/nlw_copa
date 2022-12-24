import { api } from "./api";

interface IPostPool {
	({ title }: TitlePool): Promise<TitlePool>;
}

type TitlePool = {
	title: string;
};

export const createPool: IPostPool = async ({ title }) => {
	const { data } = await api.post<TitlePool>("pools", { title });
	return {
		title: data.title,
	};
};
