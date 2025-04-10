# @nestjs/pageable

A reusable pagination helper for NestJS (or any Node.js backend), providing support for:

- ✅ Pagination (`pageNumber`, `pageSize`)
- 🔍 Search (`searchTerm`, `searchBy`)
- 📊 Sorting (`sortBy`, `sorting`)
- ✅ Typed and extensible
- 📦 Ready for integration with databases like MongoDB, PostgreSQL, etc.

---

## 📦 Installation

```bash
npm install @nestjs/pageable
```

## 🚀 Usage

### 1. Extend Pageable<T>
if you extend `Pageable<T>` then you need to overide fetchData() according to your database schema as you needed.
```ts
import { Pageable, PaginationParams, PaginatedResponse } from '@nestjs/pageable';

interface User {
  id: string;
  name: string;
  email: string;
}

class UserPagination extends Pageable<User> {
  async fetchData(params: PaginationParams): Promise<{ data: User[]; totalCount: number }> {
    const { pageNumber, pageSize, searchTerm, searchBy, sortBy, sorting } = params;

    // Example: Fetch from DB here
    const data: User[] = []; // fetch paginated & filtered data
    const totalCount = 0; // fetch total matching count

    return { data, totalCount };
  }
}
```

### 2. Call paginate()
```ts
const userPagination = new UserPagination();
const result = await userPagination.paginate({
  pageNumber: 1,
  pageSize: 10,
  searchTerm: 'john',
  searchBy: ['name', 'email'],
  sortBy: 'name',
  sorting: 'asc'
});

console.log(result);
/*
{
  contents: [...],
  totalCount: 42,
  pageNumber: 1,
  pageSize: 10
}
*/
```

## 📘 Interfaces

`PaginationParams`

```ts
interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  searchBy?: string[];
  sortBy?: string;
  sorting?: 'asc' | 'desc';
}
```

`PaginatedResponse<T>`
```ts
interface PaginatedResponse<T> {
  contents: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
```

## 🛠 Methods
`paginate(params: PaginationParams): Promise<PaginatedResponse<T>>`
- Calls the abstract fetchData() method you override
- Automatically packages pagination metadata into a unified response

`fetchData(params: PaginationParams): Promise<{ data: T[]; totalCount: number }>`
- Override this method in your subclass
- Use it to query your database or API

## ✅ Example Use Cases
- NestJS services/controllers that return paginated results
- MongoDB queries using skip() and limit()
- PostgreSQL with LIMIT, OFFSET, and ORDER BY

## 📄 License
MIT

## 👨‍💻 Author
- Made with ❤️ by `vicky705 (vicky kumar)`

## ✅ Github Repository
```sh
https://github.com/vicky705/nestjs-pageable.git
```

## 📚 Issues
Please report ypur [issues]('https://github.com/vicky705/nestjs-pageable/issues) here.

# Thank You