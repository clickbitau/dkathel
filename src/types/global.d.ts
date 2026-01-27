import '@testing-library/jest-dom';

declare namespace JSX {
  interface IntrinsicElements {
    'lord-icon': {
      src: string;
      trigger?: string;
      delay?: string;
      style?: React.CSSProperties;
      className?: string;
    };
  }
}
