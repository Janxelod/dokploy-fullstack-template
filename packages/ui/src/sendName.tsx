'use client';

import { useEffect, useState } from 'react';
import { Button } from './button';

interface InputProps {
  apiUrl?: string;
}
export const SendName: React.FC<InputProps> = ({ apiUrl }) => {
  const [response, setResponse] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [value, setText] = useState<string>('');

  useEffect(() => {
    setResponse(null);
    setError(undefined);
  }, [value]);

  useEffect(() => {
    console.log('ApiUrl:', apiUrl);
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {error && (
        <div>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      {response && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            alignItems: 'center',
          }}
        >
          <h3>Greeting</h3>
          <p>{response.message}</p>
          <p>From api: {apiUrl}</p>
        </div>
      )}
      <Button
        onClick={async () => {
          try {
            const result = await fetch(`${apiUrl}/message/${value}`);
            const response = await result.json();
            setResponse(response);
          } catch (err) {
            console.error(err);
            setError('Unable to fetch response');
          }
        }}
      />
      <input
        type="text"
        placeholder="Write your name ..."
        style={{
          padding: '6px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        value={value}
        onChange={(e) => setText?.(e.target.value)}
      />
    </div>
  );
};
