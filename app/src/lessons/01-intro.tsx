import type { LessonMeta } from '@/types/lesson';

// AI:PROTECTED - Do not modify meta structure
export const meta: LessonMeta = {
  slug: 'intro-to-react',
  title: 'Introduction to React',
  order: 1,
  section: 'fundamentals',
  description: 'Learn the basics of React: components, props, and state management fundamentals.',
  estimatedMinutes: 12,
  objectives: [
    'Understand what React is and why it is useful for building UIs',
    'Create your first React component using function syntax',
    'Learn how to pass data between components using props'
  ],
  quiz: {
    id: 'quiz-intro-to-react',
    prompt: 'Which function syntax creates a React component?',
    type: 'single-choice',
    options: [
      'createElement()',
      'function MyComponent() {}',
      'new Component()',
      'class MyComponent extends Component {}'
    ],
    correctAnswer: 1,
    explanation: 'React components are regular JavaScript functions that return JSX. Modern React prefers function components over class components.',
    maxAttempts: 3
  }
};

// AI:SAFE-EDIT START - Lesson content
export default function IntroLesson() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>Introduction to React</h1>

      <p>
        React is a JavaScript library for building user interfaces.
        It was created by Facebook and is now maintained by Meta and
        the open-source community. React has become one of the most
        popular tools for building modern web applications.
      </p>

      <h2>Why React?</h2>
      <p>
        React makes it easier to build interactive UIs by breaking
        them into reusable components. Instead of manipulating the DOM
        directly, you describe what the UI should look like, and React
        handles the updates efficiently.
      </p>

      <h3>Key Benefits</h3>
      <ul>
        <li><strong>Component-Based:</strong> Build encapsulated components that manage their own state</li>
        <li><strong>Declarative:</strong> Design simple views for each state of your application</li>
        <li><strong>Learn Once, Write Anywhere:</strong> Use React on the server, mobile, and VR</li>
      </ul>

      <h2>Your First Component</h2>
      <p>
        A React component is a JavaScript function that returns JSX
        (JavaScript XML). Here is a simple example:
      </p>

      <pre><code>{`function Welcome() {
  return <h1>Hello, React!</h1>;
}`}</code></pre>

      <p>
        This component renders a heading with the text "Hello, React!".
        You can use this component anywhere in your app by writing
        <code>&lt;Welcome /&gt;</code>.
      </p>

      <h2>Props: Passing Data</h2>
      <p>
        Components can accept inputs called "props" (short for properties).
        Props let you pass data from parent components to child components:
      </p>

      <pre><code>{`function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage:
<Greeting name="Alice" />
// Renders: <h1>Hello, Alice!</h1>`}</code></pre>

      <h2>Next Steps</h2>
      <p>
        Now that you understand the basics of React components and props,
        you are ready to dive deeper into building interactive user interfaces.
        In the next lesson, we will explore React components in more detail.
      </p>
    </article>
  );
}
// AI:SAFE-EDIT END
