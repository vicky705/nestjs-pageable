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
    totalPage: number;
    pageNumber: number;
    pageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
  }
  
  export abstract class Pageable<T> {
    abstract fetchData(
      params: PaginationParams
    ): Promise<{ data: T[]; totalCount: number }>;
  
    async paginate(params: PaginationParams): Promise<PaginatedResponse<T>> {
      const { pageNumber = 1, pageSize = 10 } = params;
      const { data, totalCount } = await this.fetchData(params);
  
      const totalPage = Math.ceil(totalCount / pageSize);
      const isFirstPage = pageNumber === 1;
      const isLastPage = pageNumber >= totalPage;

      return {
        contents: data,
        totalCount,
        totalPage,
        pageNumber,
        pageSize,
        isFirstPage,
        isLastPage,
      };
    }
  }
  