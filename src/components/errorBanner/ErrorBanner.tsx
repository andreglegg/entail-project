type Props = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorBanner({ message, onRetry }: Props) {
  return (
    <div className="error__card" role="alert">
      <div>{message}</div>
      {onRetry != undefined ? (
        <button className="btn__primary" style={{ marginTop: 8 }} onClick={onRetry}>
          Retry
        </button>
      ) : undefined}
    </div>
  );
}
