// Типы ошибок API
export interface ApiError {
  message: string;
}

// Опции для useApi
export interface UseApiOptions {
  isMessageError?: boolean;
  messagesError?: Record<number, string>;
  resetOnSuccess?: boolean;
  signal?: AbortSignal;
}

export interface ApiResponse<T = null> {
  details: T;
  message: string;
}

// Пагинация
export interface ResponsePagination<T> {
  objects: T[] | null;
  number_of_objects: number;
}
