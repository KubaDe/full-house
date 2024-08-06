type AppConfigBarProps = {
  children: React.ReactNode;
};
export const AppConfigBarWrapper = ({ children }: AppConfigBarProps) => {
  return <div className="fixed left-4 top-4">{children}</div>;
};
