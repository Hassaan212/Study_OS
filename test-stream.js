// Test streaming endpoint
const fetch = require('node-fetch');

async function testStreaming() {
  try {
    const response = await fetch('http://localhost:3001/api/chat-stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'Count from 1 to 5 and explain each number' }
        ]
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error:', error);
      return;
    }

    console.log('Streaming response:');
    console.log('-------------------');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          if (data === '[DONE]') {
            console.log('\n-------------------');
            console.log('Stream completed!');
            return;
          }

          try {
            const parsed = JSON.parse(data);
            if (parsed.chunk) {
              process.stdout.write(parsed.chunk);
            } else if (parsed.error) {
              console.error('\nError:', parsed.error);
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testStreaming();
