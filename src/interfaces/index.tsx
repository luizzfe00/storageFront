export interface PropsQuery {
  [key: string]: string | boolean | PropsQuery;
}

export type Mutate = (
  data?: any,
  shouldRevalidate?: boolean | undefined,
) => Promise<any>;
