export interface ServerD {
	id: number;
	name: string;
	category: string;
	icon: string;
	description: string;
	server: string;
	server_channel: {
		id: number;
		name: string;
		description: string;
		icon: string;
		server: string;
		owner: string;
		topic: string;
	}[];
}