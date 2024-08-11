type ParticipantsListWrapper = {
  children: React.ReactNode;
};
export const ParticipantsListWrapper = ({ children }: ParticipantsListWrapper) => {
  return <section className="fixed left-4 top-16 z-10">{children}</section>;
};
