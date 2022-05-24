import { IUserData } from "./user";
import { UsersExportFormat } from "./view";

export interface IUserQueryParams {
	results?: number;
	page?: number;
	gender?: string;
	password?: string;
	seed?: string;
	format?: UsersExportFormat;
	nat?: string;
	inc?: string[];
	exc?: string[];
}

export interface IUserExportParams extends IUserQueryParams {
	page: number;
	results: number;
	format: UsersExportFormat;
}

export interface IUserListResponse {
	results: IUserData[];
	info: {
		seed: string;
		results: number;
		page: number;
		version: string;
	}
}