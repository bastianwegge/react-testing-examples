import React from 'react';

type SearchOptions = {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

// eslint-disable-next-line react/prop-types
export function Search({ value, onChange, children }: SearchOptions): JSX.Element {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input id="search" type="text" value={value} onChange={onChange} />
    </div>
  );
}

function getUser(): Promise<User> {
  const user: User = { id: '1', name: 'Robin' };
  return Promise.resolve(user);
}

type User = {
  id: string;
  name: string;
};

function App(): JSX.Element {
  const [search, setSearch] = React.useState<string>('');
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    loadUser();
  }, []);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(ev.target.value);
  };

  return (
    <div>
      {user ? <p>Signed in as {user.name}</p> : null}

      <Search value={search} onChange={handleChange}>
        Search:
      </Search>

      <p>Searches for {search ? search : '...'}</p>
    </div>
  );
}

export default App;
