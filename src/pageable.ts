export interface PaginationParams {
    pageNumber: number;
    pageSize: number;
    searchTerm?: string;
    searchBy?: string[];
    sortBy?: string;
    sorting?: 'asc' | 'desc';
  }
  
  export interface PaginatedResponse<T> {
    contents: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  }
  
  export abstract class Pageable<T> {
    abstract fetchData(
      params: PaginationParams
    ): Promise<{ data: T[]; totalCount: number }>;
  
    async paginate(params: PaginationParams): Promise<PaginatedResponse<T>> {
      const { pageNumber = 1, pageSize = 10 } = params;
      const { data, totalCount } = await this.fetchData(params);
  
      return {
        contents: data,
        totalCount,
        pageNumber,
        pageSize,
      };
    }
  }
  