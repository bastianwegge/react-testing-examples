import React from 'react';

function App(): JSX.Element {
  const [search, setSearch] = React.useState<string>('');

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(ev.target.value);
  };

  return (
    <div>
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>

      <p>Searches for {search ? search : '...'}</p>
    </div>
  );
}

type SearchOptions = {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

// eslint-disable-next-line react/prop-types
function Search({ value, onChange, children }: SearchOptions) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input id="search" type="text" value={value} onChange={onChange} />
    </div>
  );
}

export default App;
