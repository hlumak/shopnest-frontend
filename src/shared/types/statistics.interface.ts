export interface IMainStatistics {
	id: number
	name: string
	value: string | number
}

export interface IMonthlySales {
	date: string
	value: string | number
}

export interface ILastUsers {
	id: string
	name: string
	email: string
	picture: string
	total: string | number
}

export interface IMiddleStatistics {
	monthlySales: IMonthlySales[]
	lastUsers: ILastUsers[]
}
