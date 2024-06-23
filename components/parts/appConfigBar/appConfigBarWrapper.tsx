type AppConfigBarProps = {
  children: React.ReactNode;
};
export const AppConfigBarWrapper = ({ children }: AppConfigBarProps) => {
  return <div className="absolute left-4 top-4">{children}</div>;
};
