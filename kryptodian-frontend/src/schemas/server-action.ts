export type TSVaction<T> = { data: T, error: null } | { data: null, error: string }