import React from 'react';
import axios from 'axios';

const URL = 'http://hn.algolia.com/api/v1/search';

type Story = {
  objectID: string;
  url: string;
  title: string;
};

const App: React.FC = () => {
  const [stories, setStories] = React.useState<Story[]>([]);
  const [error, setError] = React.useState(null);

  const handleFetch = async () => {
    let result;
    try {
      result = await axios.get(`${URL}?query=React`);

      setStories(result.data.hits);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <button type="button" onClick={() => handleFetch()}>
        Fetch Stories
      </button>

      {error && <span>Something went wrong ...</span>}

      <ul>
        {stories.map(({ objectID, title, url }: Story) => (
          <li key={objectID}>
            <a href={url}>{title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
