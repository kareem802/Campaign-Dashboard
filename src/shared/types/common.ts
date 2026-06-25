export type WithClassName<T = unknown> = T & { className?: string };

export type PropsWithChildren<P = unknown> = P & { children?: React.ReactNode };

export type Nullable<T> = T | null;

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
