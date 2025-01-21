# use-fetch-swr

`use-fetch-swr` is an SWR wrapper that simplifies HTTP request management in React, adding extra features like token handling, message control, and query management.

## Features

- 🔒 Automatic token authentication handling
- 🔄 Loading and validation state control
- 💬 Customizable message system
- 🔍 URL query management
- 🎯 Full TypeScript support
- ⚡ Based on SWR for efficient revalidation

## Installation

```bash
npm install use-fetch-swr
# or
yarn add use-fetch-swr
```

## Basic Usage

```typescript
import { useFetchSWR } from 'use-fetch-swr';

function MyComponent() {
  const { data, error, isLoading, message, isValidating, mutation } = useFetchSWR(
    'https://api.example.com/data', 
    {
      token: 'your-auth-token',          // Optional: Auth token
      queries: { page: 1, limit: 10 },   // Optional: URL queries
      messageURL: 'Invalid URL',         // Optional: Custom URL message
      messageError: 'Failed to load',    // Optional: Error message
      config: {                          // Optional: SWR config
        revalidateOnFocus: false
      }
    }
  );

  if (isLoading) return <div>{message}</div>;  // Shows "Loading" by default
  if (error) return <div>{message}</div>;      // Shows error message
  return <div>{/* Render data */}</div>;
}
```

## Message System

The hook handles messages automatically following this priority:

1. **Server Message** (Highest priority)
```typescript
// If API responds with:
{ message: "Unauthorized user", status: false }
// Message will be: "Unauthorized user"
```

2. **Error Messages** (If an error occurs)
   - Error message priority:
     1. Server error message (if exists)
     2. Request error message (error.message)
     3. Custom message (configured messageError)
```typescript
// Error cascade example
const { message } = useFetchSWR('/api/users', {
  messageError: 'Custom error' // lowest priority
}); 

// If server error exists: shows server message
// If error.message exists: shows error.message
// If none exists: shows "Custom error"
// If messageError not configured: shows "Error in the request"
```

3. **Loading State**
```typescript
// During loading
// Message: "Loading" (default)
```

4. **Success**
```typescript
// Successful operation
// Message: "Ok" (default)
```

## Complete API

### Parameters
```typescript
useFetchSWR<Data>(
  url: string,           // Required: Request URL
  params?: {            // Optional: Configuration
    token?: string;     // Bearer token
    config?: SWRConfiguration;
    queries?: Queries;  // URL parameters
    messageURL?: string;
    messageError?: string;
  }
)
```

### Return
```typescript
{
  data: Data | null;
  error: boolean;
  message: string;
  isLoading: boolean;
  isValidating?: boolean;
  mutation?: () => Promise<any>;
}
```

## Usage Examples

### URL Queries
```typescript
const { data } = useFetchSWR('/api/users', {
  queries: { page: 1, search: 'john' }
});
// Result: /api/users?page=1&search=john
```

### TypeScript
```typescript
interface User { id: number; name: string; }
const { data } = useFetchSWR<User[]>('/api/users');
// data will be User[] | null
```

## SWR Configuration

All SWR configuration options are available through the `config` parameter:

```typescript
const { data } = useFetchSWR('/api/data', {
  config: {
    revalidateOnFocus: false,
    refreshInterval: 3000
  }
});
```

## License

MIT © [Ricardo8Abreu]