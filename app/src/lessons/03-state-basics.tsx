import type { LessonMeta } from '@/types/lesson';

// AI:PROTECTED - Do not modify meta structure
export const meta: LessonMeta = {
  slug: 'state-basics',
  title: 'Understanding State',
  order: 3,
  section: 'fundamentals',
  description: 'Learn how to add interactivity to your components using React state.',
  estimatedMinutes: 12,
  objectives: [
    'Understand what state is and when to use it',
    'Use the useState hook to manage component state',
    'Update state and trigger re-renders',
    'Handle user interactions with state'
  ],
  quiz: {
    id: 'quiz-state-basics',
    prompt: 'What hook do you use to add state to a function component?',
    type: 'single-choice',
    options: [
      'useEffect()',
      'useState()',
      'createState()',
      'useReducer()'
    ],
    correctAnswer: 1,
    explanation: 'The useState hook is the primary way to add state to function components. It returns the current state value and a function to update it.',
    maxAttempts: 3
  }
};

// AI:SAFE-EDIT START - Lesson content
export default function StateBasicsLesson() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>Understanding State</h1>

      <p>
        State is data that changes over time in your component. When state
        changes, React automatically re-renders your component with the
        new data. This is how you make your UI interactive.
      </p>

      <h2>What is State?</h2>
      <p>
        Think of state as the component's memory. It remembers information
        between renders and allows your component to respond to user actions,
        network requests, and other events.
      </p>

      <h2>The useState Hook</h2>
      <p>
        React provides the <code>useState</code> hook to add state to
        function components. Here is how it works:
      </p>

      <pre><code>{`import { useState } from 'react';

function Counter() {
  // Declare state variable 'count' with initial value 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}</code></pre>

      <h3>How useState Works</h3>
      <ul>
        <li><code>useState(0)</code> creates a state variable with initial value 0</li>
        <li>Returns an array: <code>[currentValue, updateFunction]</code></li>
        <li><code>count</code> is the current state value</li>
        <li><code>setCount</code> is the function to update the state</li>
      </ul>

      <h2>Updating State</h2>
      <p>
        When you call the state update function, React schedules a re-render
        with the new value. Never modify state directly:
      </p>

      <pre><code>{`// ✅ Correct - use the setter function
setCount(count + 1);

// ❌ Wrong - never modify state directly
count = count + 1;`}</code></pre>

      <h2>Multiple State Variables</h2>
      <p>
        You can use <code>useState</code> multiple times in the same component:
      </p>

      <pre><code>{`function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
    </form>
  );
}`}</code></pre>

      <h2>State with Objects</h2>
      <p>
        You can store objects in state, but remember to create a new
        object when updating:
      </p>

      <pre><code>{`function Profile() {
  const [user, setUser] = useState({
    name: 'Alice',
    age: 25
  });

  const updateName = (newName) => {
    // Create a new object with updated values
    setUser({
      ...user,
      name: newName
    });
  };

  return <div>Hello, {user.name}!</div>;
}`}</code></pre>

      <h2>Best Practices</h2>
      <ul>
        <li>Keep state as simple as possible</li>
        <li>Don't duplicate data that can be calculated</li>
        <li>Group related state together</li>
        <li>Always use the setter function to update state</li>
        <li>State updates may be asynchronous</li>
      </ul>

      <h2>Next Steps</h2>
      <p>
        You now understand how to add interactivity to your components
        using state. State is the foundation of building dynamic React
        applications. Practice using <code>useState</code> in different
        scenarios to become comfortable with it.
      </p>
    </article>
  );
}
// AI:SAFE-EDIT END
