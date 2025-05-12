# React Debounce Hook

A lightweight and easy-to-use custom React hook for debouncing function calls. This hook helps improve performance by limiting the rate at which a function is executed.

## Installation

```bash
npm install react-debounce-hook
```

or

```bash
yarn add react-debounce-hook
```

## Usage

```jsx
    import { useEffect } from 'react';
    import { useDebounceCallback } from 'react-debounce-hook';

    const [value, setValue] = useState('');
    const debouncedCallback = useDebounceCallback((newValue) => {
        setValue(e.target.value);
    }, 500);

    const handleChange = (e) => {
        debouncedCallback(e.target.value);
    };

    useEffect(() => console.log('new value', value), [value]);

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Type something..."
        />
    );
```

## API

### `useDebounce(value, delay)`

- **`value`**: The value to debounce.
- **`delay`**: The debounce delay in milliseconds.

Returns the debounced value.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.