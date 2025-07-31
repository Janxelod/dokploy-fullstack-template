'use client';

interface ButtonProps {
  className?: string;
  onClick?: () => void;
}

export const Button = ({ className, onClick }: ButtonProps) => {
  return (
    <button
      style={{
        borderRadius: '4px',
        padding: '8px 12px',
      }}
      className={className}
      onClick={onClick}
    >
      Click me!
    </button>
  );
};
