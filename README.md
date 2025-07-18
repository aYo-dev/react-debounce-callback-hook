# React Debounce Hook

A lightweight and easy-to-use custom React hook for debouncing function calls. This hook helps improve performance by limiting the rate at which a function is executed.

## Installation

```bash
npm install @ayovchev/react-debounce-callback-hook
```

or

```bash
yarn add @ayovchev/react-debounce-callback-hook
```

## Usage

```jsx
import  {useDebounceCallback} from'@ayovchev/react-debounce-callback-hook';
import { useEffect, useState } from 'react';

function App() {
    const [value, setValue] = useState('');
    const debouncedCallback = useDebounceCallback((newValue) => {
        setValue(newValue);
    }, 500);

    const handleChange = (e) => {
        debouncedCallback(e.target.value);
    };

    useEffect(() => console.log('new value', value), [value]);

    return (
      <>
        <div>{value}</div>

        <textarea
            type="text"
            onChange={handleChange}
            placeholder="Type something..."
        />
      </>
    );
}

export default App;
```

### Demo

Check out the live demo on [StackBlitz](https://stackblitz.com/edit/vitejs-vite-yhrnqn1j?file=src%2FApp.tsx)

## API

### `useDebounceCallback(callback, delay)`

- **`callback`**: The function for debouncing.
- **`delay`**: The debounce delay in milliseconds(optional).

Returns the debounced value.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.